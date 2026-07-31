// Deploys worker/dist/bundle.js to Cloudflare directly via the REST API —
// the same mechanism `wrangler deploy` uses under the hood, which explicitly
// declares the Durable Object class + migration in the same request instead
// of relying on the dashboard's Quick Edit UI to detect an exported class
// from pasted code (which can silently fail to pick it up).
//
// Doesn't need wrangler/workerd at all — just HTTPS — so it works fine on
// Windows ARM64.
//
// Usage: set the environment variables below, then run:
//   node scripts/deploy-worker.cjs
//
// Required env vars:
//   CF_API_TOKEN     Cloudflare API token with "Workers Scripts: Edit" permission
//                     (create at https://dash.cloudflare.com/profile/api-tokens)
//   CF_ACCOUNT_ID     Your Cloudflare account ID (Workers & Pages overview page,
//                     right-hand sidebar)
//   CF_WORKER_NAME    The Worker's name, e.g. "across-worker" (must already exist —
//                     create it once via the dashboard's "Create Worker" button first)
//   GH_OWNER, GH_REPO, GH_BRANCH, ALLOWED_ORIGIN, GITHUB_TOKEN, APP_KEY
//                     Same values described in the README's Worker setup section.
//
// Re-running this is safe — Cloudflare treats a migration with the same tag
// as already-applied and skips re-creating the class.

const fs = require("fs");
const path = require("path");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return v;
}

async function main() {
  const apiToken = requireEnv("CF_API_TOKEN");
  const accountId = requireEnv("CF_ACCOUNT_ID");
  const workerName = process.env.CF_WORKER_NAME || "across-worker";

  const ghOwner = requireEnv("GH_OWNER");
  const ghRepo = requireEnv("GH_REPO");
  const ghBranch = process.env.GH_BRANCH || "main";
  const allowedOrigin = requireEnv("ALLOWED_ORIGIN");
  const githubToken = requireEnv("GITHUB_TOKEN");
  const appKey = requireEnv("APP_KEY");

  const bundlePath = path.join(__dirname, "..", "worker", "dist", "bundle.js");
  if (!fs.existsSync(bundlePath)) {
    console.error(`${bundlePath} not found — run "node scripts/bundle-worker.cjs" first.`);
    process.exit(1);
  }
  const scriptContent = fs.readFileSync(bundlePath, "utf8");

  const metadata = {
    main_module: "bundle.js",
    compatibility_date: "2026-01-01",
    bindings: [
      { type: "plain_text", name: "GH_OWNER", text: ghOwner },
      { type: "plain_text", name: "GH_REPO", text: ghRepo },
      { type: "plain_text", name: "GH_BRANCH", text: ghBranch },
      { type: "plain_text", name: "ALLOWED_ORIGIN", text: allowedOrigin },
      { type: "secret_text", name: "GITHUB_TOKEN", text: githubToken },
      { type: "secret_text", name: "APP_KEY", text: appKey },
      { type: "durable_object_namespace", name: "PUZZLE_ROOM", class_name: "PuzzleRoom" },
    ],
    migrations: {
      // Re-deploys with this same tag are a no-op on Cloudflare's end — safe
      // to leave this in place on every future deploy, not just the first.
      tag: "v1",
      new_sqlite_classes: ["PuzzleRoom"],
    },
  };

  const form = new FormData();
  form.set("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.set("bundle.js", new Blob([scriptContent], { type: "application/javascript+module" }), "bundle.js");

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${apiToken}` },
    body: form,
  });
  const json = await res.json();

  if (!res.ok || !json.success) {
    console.error("Deploy failed:", JSON.stringify(json.errors || json, null, 2));
    process.exit(1);
  }

  console.log(`Deployed ${workerName} successfully.`);
  console.log(`Worker URL: https://${workerName}.<your-subdomain>.workers.dev (see the dashboard's Overview tab for your actual subdomain)`);
  process.exit(0); // avoids a harmless-but-noisy Node/Windows shutdown assertion from an open fetch handle
}

main().catch((e) => {
  console.error("Deploy script crashed:", e);
  process.exit(1);
});
