// Imports a final data.json snapshot into D1 and verifies every record.
// Safe to rerun: all writes are UPSERTs. Pass --verify-only to perform no
// writes, and --prune to remove destination records absent from the source.
//
// Required: CF_API_TOKEN/CF_ACCOUNT_ID (CLOUDFLARE_* aliases are accepted) and either CF_D1_DATABASE_ID or
// CF_D1_DATABASE_NAME (defaults to "across").
// Usage: node scripts/migrate-data-to-d1.cjs path/to/final-data.json [--prune]

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function requireEither(primary, alias) {
  const value = process.env[primary] || process.env[alias];
  if (!value) throw new Error(`Missing required environment variable: ${primary} (or ${alias})`);
  return value;
}

const apiToken = requireEither("CF_API_TOKEN", "CLOUDFLARE_API_TOKEN");
const accountId = requireEither("CF_ACCOUNT_ID", "CLOUDFLARE_ACCOUNT_ID");
const sourceArg = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
if (!sourceArg) throw new Error("Pass the final data.json snapshot path as the first argument.");
const sourcePath = path.resolve(sourceArg);
const verifyOnly = process.argv.includes("--verify-only");
const prune = process.argv.includes("--prune");

async function api(pathname, options = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}${pathname}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); } catch (e) { throw new Error(`Cloudflare returned HTTP ${response.status}: ${text.slice(0, 300)}`); }
  if (!response.ok || !body.success) {
    throw new Error(`Cloudflare API failed (${response.status}): ${JSON.stringify(body.errors || body)}`);
  }
  return body.result;
}

async function resolveDatabaseId() {
  if (process.env.CF_D1_DATABASE_ID) return process.env.CF_D1_DATABASE_ID;
  const name = process.env.CF_D1_DATABASE_NAME || "across";
  const databases = await api("/d1/database?per_page=100");
  const existing = databases.find((database) => database.name === name);
  if (existing) return existing.uuid;
  if (verifyOnly) throw new Error(`D1 database ${name} does not exist.`);
  const created = await api("/d1/database", { method: "POST", body: JSON.stringify({ name }) });
  console.log(`Created D1 database ${name}.`);
  return created.uuid;
}

async function query(databaseId, statements) {
  const list = Array.isArray(statements) ? statements : [statements];
  const results = [];
  for (const statement of list) {
    const result = await api(`/d1/database/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify(statement),
    });
    if (Array.isArray(result)) results.push(...result);
    else results.push(result);
  }
  return results;
}

function statementsFromSchema(sql) {
  return sql.split(";").map((statement) => statement.trim()).filter(Boolean).map((sqlText) => ({ sql: sqlText }));
}

function puzzleUpsert(puzzle) {
  const now = new Date().toISOString();
  return {
    sql: `INSERT INTO puzzles (
      id, title, description, keywords_json, size, difficulty, visibility,
      created_by, created_at, state, completed_at, fork_of, forked_by,
      payload_json, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title=excluded.title, description=excluded.description,
      keywords_json=excluded.keywords_json, size=excluded.size,
      difficulty=excluded.difficulty, visibility=excluded.visibility,
      created_by=excluded.created_by, created_at=excluded.created_at,
      state=excluded.state, completed_at=excluded.completed_at,
      fork_of=excluded.fork_of, forked_by=excluded.forked_by,
      payload_json=excluded.payload_json, updated_at=excluded.updated_at`,
    params: [
      puzzle.id, puzzle.title || "", puzzle.description || "", JSON.stringify(puzzle.keywords || []),
      puzzle.size || "standard", puzzle.difficulty || "medium", puzzle.visibility || "open",
      puzzle.createdBy || "", puzzle.createdAt || now, puzzle.state || "open",
      puzzle.completedAt || null, puzzle.forkOf || null, puzzle.forkedBy || null,
      JSON.stringify(puzzle), now,
    ],
  };
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
  }
  return value;
}

function digest(value) {
  return crypto.createHash("sha256").update(JSON.stringify(canonical(value))).digest("hex");
}

async function main() {
  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  if (!source.users || !source.puzzles) throw new Error("Source must contain users and puzzles objects.");
  const databaseId = await resolveDatabaseId();
  console.log(`Using D1 database ${databaseId}.`);

  if (!verifyOnly) {
    const schema = fs.readFileSync(path.join(__dirname, "..", "migrations", "0001_initial.sql"), "utf8");
    await query(databaseId, statementsFromSchema(schema));
    const writes = [];
    const now = new Date().toISOString();
    for (const [name, user] of Object.entries(source.users)) {
      writes.push({
        sql: `INSERT INTO users (name, hue, created_at, settings_json, updated_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(name) DO UPDATE SET hue=excluded.hue, created_at=excluded.created_at,
          settings_json=excluded.settings_json, updated_at=excluded.updated_at`,
        params: [name, user.hue, user.createdAt, JSON.stringify(user.settings || {}), now],
      });
    }
    for (const puzzle of Object.values(source.puzzles)) writes.push(puzzleUpsert(puzzle));
    if (writes.length) await query(databaseId, writes);

    if (prune) {
      const userNames = Object.keys(source.users);
      const puzzleIds = Object.keys(source.puzzles);
      await query(databaseId, [
        userNames.length
          ? { sql: `DELETE FROM users WHERE name NOT IN (${userNames.map(() => "?").join(",")})`, params: userNames }
          : { sql: "DELETE FROM users" },
        puzzleIds.length
          ? { sql: `DELETE FROM puzzles WHERE id NOT IN (${puzzleIds.map(() => "?").join(",")})`, params: puzzleIds }
          : { sql: "DELETE FROM puzzles" },
      ]);
    }
  }

  const [usersResult, puzzlesResult] = await query(databaseId, [
    { sql: "SELECT name, hue, created_at, settings_json FROM users ORDER BY name" },
    { sql: "SELECT id, payload_json FROM puzzles ORDER BY id" },
  ]);
  const destination = { users: {}, puzzles: {} };
  for (const row of usersResult.results || []) {
    destination.users[row.name] = { hue: row.hue, createdAt: row.created_at, settings: JSON.parse(row.settings_json) };
  }
  for (const row of puzzlesResult.results || []) destination.puzzles[row.id] = JSON.parse(row.payload_json);

  const failures = [];
  for (const kind of ["users", "puzzles"]) {
    const sourceKeys = Object.keys(source[kind]).sort();
    const destinationKeys = Object.keys(destination[kind]).sort();
    if (JSON.stringify(sourceKeys) !== JSON.stringify(destinationKeys)) {
      failures.push(`${kind} key set differs (source ${sourceKeys.length}, D1 ${destinationKeys.length})`);
    }
    for (const key of sourceKeys) {
      if (!(key in destination[kind])) continue;
      const sourceHash = digest(source[kind][key]);
      const destinationHash = digest(destination[kind][key]);
      if (sourceHash !== destinationHash) failures.push(`${kind}/${key}: ${sourceHash} != ${destinationHash}`);
    }
  }
  if (failures.length) throw new Error(`Verification failed:\n${failures.join("\n")}`);
  console.log(`Verified ${Object.keys(source.users).length} users and ${Object.keys(source.puzzles).length} puzzles record by record.`);
  console.log(`Set CF_D1_DATABASE_ID=${databaseId} for deployment.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
