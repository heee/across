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
//   CF_API_TOKEN (or CLOUDFLARE_API_TOKEN)
//                    Cloudflare API token with "Workers Scripts: Edit" permission
//                     (create at https://dash.cloudflare.com/profile/api-tokens)
//   CF_ACCOUNT_ID (or CLOUDFLARE_ACCOUNT_ID)
//                    Your Cloudflare account ID (Workers & Pages overview page,
//                     right-hand sidebar)
//   CF_WORKER_NAME    The Worker's name, e.g. "across-worker" (must already exist —
//                     create it once via the dashboard's "Create Worker" button first)
//   CF_D1_DATABASE_ID  D1 database UUID created/imported by migrate-data-to-d1.cjs
// Existing ALLOWED_ORIGIN and APP_KEY bindings are inherited from the deployed
// Worker, so their values do not need to be exposed to this process.
// Optional: WRITE_DISABLED=1 deploys a read-only maintenance gate for cutover.
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

function requireEither(primary, alias) {
  const value = process.env[primary] || process.env[alias];
  if (!value) {
    console.error(`Missing required environment variable: ${primary} (or ${alias})`);
    process.exit(1);
  }
  return value;
}

async function main() {
  const apiToken = requireEither("CF_API_TOKEN", "CLOUDFLARE_API_TOKEN");
  const accountId = requireEither("CF_ACCOUNT_ID", "CLOUDFLARE_ACCOUNT_ID");
  const workerName = process.env.CF_WORKER_NAME || "across-worker";

  const databaseId = requireEnv("CF_D1_DATABASE_ID");

  const schemaCheckUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;
  const schemaCheckRes = await fetch(schemaCheckUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql: "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('puzzle_blueprints', 'blueprint_exposures') ORDER BY name" }),
  });
  const schemaCheck = await schemaCheckRes.json();
  const inventoryTables = new Set(schemaCheck.result?.[0]?.results?.map((row) => row.name) || []);
  if (!schemaCheckRes.ok || !schemaCheck.success || !inventoryTables.has("puzzle_blueprints") || !inventoryTables.has("blueprint_exposures")) {
    throw new Error("D1 migration 0002_puzzle_blueprints.sql must be applied before deploying this Worker.");
  }

  const settingsUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}/settings`;
  const settingsRes = await fetch(settingsUrl, { headers: { Authorization: `Bearer ${apiToken}` } });
  const settingsJson = await settingsRes.json();
  if (!settingsRes.ok || !settingsJson.success) {
    throw new Error(`Could not read existing Worker settings: ${JSON.stringify(settingsJson.errors || settingsJson)}`);
  }
  const existingBindingNames = new Set((settingsJson.result?.bindings || []).map((binding) => binding.name));
  for (const name of ["ALLOWED_ORIGIN", "APP_KEY"]) {
    if (!existingBindingNames.has(name)) throw new Error(`Existing Worker is missing required binding: ${name}`);
  }
  if (process.env.WRITE_DISABLED === "1" && !existingBindingNames.has("PURGE_KEY")) {
    throw new Error("Maintenance purge requires an existing PURGE_KEY secret binding. Add it in Cloudflare before deploying WRITE_DISABLED=1.");
  }

  const bundlePath = path.join(__dirname, "..", "worker", "dist", "bundle.js");
  if (!fs.existsSync(bundlePath)) {
    console.error(`${bundlePath} not found — run "node scripts/bundle-worker.cjs" first.`);
    process.exit(1);
  }
  const scriptContent = fs.readFileSync(bundlePath, "utf8");

  const metadata = {
    main_module: "bundle.js",
    compatibility_date: "2026-08-09",
    bindings: [
      { type: "d1", name: "DB", id: databaseId },
      { type: "inherit", name: "ALLOWED_ORIGIN" },
      { type: "inherit", name: "APP_KEY" },
      { type: "durable_object_namespace", name: "PUZZLE_ROOM", class_name: "PuzzleRoom" },
    ],
  };

  if (existingBindingNames.has("PURGE_KEY")) {
    metadata.bindings.push({ type: "inherit", name: "PURGE_KEY" });
  }

  if (process.env.WRITE_DISABLED === "1") {
    metadata.bindings.push({ type: "plain_text", name: "WRITE_DISABLED", text: "1" });
  }

  // The migration that creates the PuzzleRoom class only needs to run once —
  // Cloudflare rejects re-declaring new_sqlite_classes for a class that
  // already exists (contrary to what an earlier version of this script's
  // comment assumed). Only set CF_APPLY_MIGRATION=1 for the very first
  // deploy against a fresh Worker; omit it on every deploy after that.
  if (process.env.CF_APPLY_MIGRATION === "1") {
    metadata.migrations = { tag: "v1", new_sqlite_classes: ["PuzzleRoom"] };
  }

  const form = new FormData();
  form.set("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.set("bundle.js", new Blob([scriptContent], { type: "application/javascript+module" }), "bundle.js");

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}?bindings_inherit=strict`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${apiToken}` },
    body: form,
  });

  // Cloudflare's API normally returns JSON even for errors, but a wrong
  // account ID, bad token, or hitting the wrong URL entirely can return an
  // HTML error page instead — parsing that as JSON crashes with an unhelpful
  // "Unexpected token '<'" error. Read as text first so a bad response is
  // diagnosable instead of opaque.
  const bodyText = await res.text();
  let json;
  try {
    json = JSON.parse(bodyText);
  } catch (e) {
    console.error(`Deploy failed: HTTP ${res.status} ${res.statusText}, and the response wasn't JSON.`);
    console.error(`URL requested: ${url}`);
    console.error(`Response body (first 500 chars):\n${bodyText.slice(0, 500)}`);
    if (res.status >= 500) {
      console.error("\nThis is a 5xx error — Cloudflare's own API had a transient problem (not your account ID or token). Just wait a minute and re-run this same command.");
    } else {
      console.error("\nThis usually means CF_ACCOUNT_ID is wrong/malformed, or CF_API_TOKEN is invalid/expired. Double-check both against the Cloudflare dashboard.");
    }
    process.exit(1);
  }

  if (!res.ok || !json.success) {
    console.error(`Deploy failed (HTTP ${res.status}):`, JSON.stringify(json.errors || json, null, 2));
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
