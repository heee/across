// One-time, deliberately gated production cleanup.
//
// This script does not delete anything unless all of the following are true:
// - the deployed Worker is in WRITE_DISABLED=1 maintenance mode;
// - a separate PURGE_KEY secret is configured on the Worker and supplied here;
// - the exact confirmation flag is present.
//
// It asks the Worker to clear each puzzle's Durable Object storage before
// removing puzzle/exposure rows from D1. User accounts, hues, and settings are
// snapshotted and compared before/after. Blueprint inventory is preserved.
//
// Usage:
//   node scripts/purge-legacy-puzzles.cjs --confirm-delete-all-puzzles-keep-users
// Required env: CF_WORKER_URL, PURGE_KEY, Cloudflare API token/account ID, CF_D1_DATABASE_ID

const crypto = require("crypto");

function requireEither(primary, alias) {
  const value = process.env[primary] || process.env[alias];
  if (!value) throw new Error(`Missing ${primary}${alias ? ` (or ${alias})` : ""}.`);
  return value;
}

async function d1Query(sql) {
  const token = requireEither("CF_API_TOKEN", "CLOUDFLARE_API_TOKEN");
  const accountId = requireEither("CF_ACCOUNT_ID", "CLOUDFLARE_ACCOUNT_ID");
  const databaseId = requireEither("CF_D1_DATABASE_ID");
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql }),
  });
  const text = await response.text();
  const body = JSON.parse(text);
  if (!response.ok || !body.success) throw new Error(`D1 query failed: ${JSON.stringify(body.errors || body)}`);
  return body.result?.[0]?.results || [];
}

function digest(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

async function main() {
  if (!process.argv.includes("--confirm-delete-all-puzzles-keep-users")) {
    throw new Error("Refusing to purge. Re-run with --confirm-delete-all-puzzles-keep-users after enabling maintenance mode.");
  }
  const workerUrl = requireEither("CF_WORKER_URL").replace(/\/$/, "");
  const purgeKey = requireEither("PURGE_KEY");
  const usersBefore = await d1Query("SELECT name, hue, created_at, settings_json, updated_at FROM users ORDER BY name");
  const puzzlesBefore = await d1Query("SELECT id FROM puzzles ORDER BY id");
  console.log(`About to delete ${puzzlesBefore.length} puzzles while preserving ${usersBefore.length} users.`);

  const response = await fetch(`${workerUrl}/maintenance/purge-legacy-puzzles`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Purge-Key": purgeKey },
    body: JSON.stringify({ confirmation: "DELETE ALL PUZZLES, KEEP USERS" }),
  });
  const text = await response.text();
  let result;
  try { result = JSON.parse(text); } catch { throw new Error(`Worker returned HTTP ${response.status}: ${text.slice(0, 300)}`); }
  if (!response.ok || !result.ok) throw new Error(`Purge failed (${response.status}): ${JSON.stringify(result)}`);

  const [usersAfter, puzzlesAfter, exposuresAfter] = await Promise.all([
    d1Query("SELECT name, hue, created_at, settings_json, updated_at FROM users ORDER BY name"),
    d1Query("SELECT id FROM puzzles LIMIT 1"),
    d1Query("SELECT puzzle_id FROM blueprint_exposures LIMIT 1"),
  ]);
  if (puzzlesAfter.length || exposuresAfter.length) throw new Error("Verification failed: puzzle-associated D1 rows remain.");
  if (digest(usersBefore) !== digest(usersAfter)) throw new Error("Verification failed: user records changed during purge.");
  console.log(`Verified deletion of ${result.deletedPuzzles} puzzles and preservation of ${usersAfter.length} user records.`);
  console.log("Durable Object storage was cleared through each room's delete handler before D1 deletion.");
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
