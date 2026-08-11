// Offline puzzle-inventory builder, validator, and D1 seeder.
//
// No model or generation API is called by the Worker. Future LLM batch jobs
// can emit this same versioned manifest shape and pass through `validate`
// before anything is uploaded.
//
// Examples:
//   node scripts/puzzle-inventory.mjs generate --category "beer & brewing" --size large --difficulty medium --count 10 --time-budget-ms 120000 --theme-plan-attempts 1000 --out inventory.json
//   node scripts/puzzle-inventory.mjs validate --file inventory.json
//   node scripts/puzzle-inventory.mjs seed --file inventory.json --confirm-seed

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generatePuzzle, SIZE_MAP } from "../worker/generator.js";
import { WORD_BANK } from "../worker/corpus.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIFFICULTIES = new Set(["beginner", "easy", "medium", "hard", "expert"]);

function option(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function canonicalGrid(grid) {
  return {
    rows: grid.rows,
    cols: grid.cols,
    cells: [...grid.cells].sort((a, b) => a.row - b.row || a.col - b.col),
    words: [...grid.words].sort((a, b) => a.number - b.number || a.direction.localeCompare(b.direction)),
  };
}

function hashGrid(grid) {
  return crypto.createHash("sha256").update(JSON.stringify(canonicalGrid(grid))).digest("hex");
}

function categoryAnswers(category) {
  return new Set(WORD_BANK.filter((entry) => entry.cat === category).map((entry) => entry.w));
}

export function validateBlueprint(raw) {
  const errors = [];
  const category = String(raw?.category || "").trim().toLowerCase();
  const size = String(raw?.size || "");
  const difficulty = String(raw?.difficulty || "");
  const grid = raw?.grid;
  const expected = SIZE_MAP[size];
  if (!category) errors.push("category is required");
  if (!expected) errors.push(`unsupported size: ${size}`);
  if (!DIFFICULTIES.has(difficulty)) errors.push(`unsupported difficulty: ${difficulty}`);
  if (!grid || grid.rows !== expected || grid.cols !== expected) errors.push("grid dimensions do not match size");
  if (!Array.isArray(grid?.cells) || grid.cells.length !== expected * expected) errors.push("grid must contain every cell");
  if (!Array.isArray(grid?.words) || grid.words.length < 3) errors.push("grid must contain at least three answers");
  if (errors.length) return { ok: false, errors };

  const openCells = grid.cells.filter((cell) => cell.block === false).length;
  const density = openCells / (expected * expected);
  if (density < 0.8) errors.push(`density ${(density * 100).toFixed(1)}% is below 80%`);

  const answers = grid.words.map((word) => String(word.answer || "").toUpperCase());
  if (new Set(answers).size !== answers.length) errors.push("answers must be unique");
  const explicitTheme = Array.isArray(raw.themeAnswers)
    ? new Set(raw.themeAnswers.map((answer) => String(answer).toUpperCase()))
    : categoryAnswers(category);
  const themedAnswerCount = answers.filter((answer) => explicitTheme.has(answer)).length;
  const themeRatio = themedAnswerCount / answers.length;
  if (themeRatio < 0.4 || themeRatio > 0.6) {
    errors.push(`theme ratio ${(themeRatio * 100).toFixed(1)}% is outside 40-60%`);
  }
  const longAnswers = grid.words.filter((word) => word.length >= 8);
  const themedLongCount = longAnswers.filter((word) => explicitTheme.has(String(word.answer).toUpperCase())).length;
  if (longAnswers.length && themedLongCount / longAnswers.length < 0.5) {
    errors.push(`at least half of long answers must be themed (${themedLongCount}/${longAnswers.length})`);
  }

  const gridHash = hashGrid(grid);
  if (raw.gridHash && raw.gridHash !== gridHash) errors.push("gridHash does not match grid contents");
  return { ok: errors.length === 0, errors, density, themedAnswerCount, answerCount: answers.length, gridHash };
}

function normalizedBlueprint(raw, validation) {
  const createdAt = raw.createdAt || new Date().toISOString();
  const category = raw.category.trim().toLowerCase();
  return {
    id: raw.id || `${category.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${raw.size}-${raw.difficulty}-${validation.gridHash.slice(0, 12)}`,
    category,
    size: raw.size,
    difficulty: raw.difficulty,
    gridHash: validation.gridHash,
    grid: canonicalGrid(raw.grid),
    density: validation.density,
    themedAnswerCount: validation.themedAnswerCount,
    answerCount: validation.answerCount,
    source: raw.source || "offline-generator",
    metadata: raw.metadata || {},
    status: raw.status === "disabled" ? "disabled" : "ready",
    createdAt,
    updatedAt: new Date().toISOString(),
  };
}

function validateManifest(manifest) {
  if (manifest?.version !== 1 || !Array.isArray(manifest.blueprints)) throw new Error("Expected a version 1 inventory manifest.");
  const normalized = [];
  const failures = [];
  const hashes = new Set();
  for (const [index, raw] of manifest.blueprints.entries()) {
    const result = validateBlueprint(raw);
    if (!result.ok) failures.push(`#${index}: ${result.errors.join("; ")}`);
    else if (hashes.has(result.gridHash)) failures.push(`#${index}: duplicate grid ${result.gridHash}`);
    else {
      hashes.add(result.gridHash);
      normalized.push(normalizedBlueprint(raw, result));
    }
  }
  if (failures.length) throw new Error(`Inventory validation failed:\n${failures.join("\n")}`);
  return normalized;
}

async function generateManifest() {
  const category = option("category").trim().toLowerCase();
  const size = option("size");
  const difficulty = option("difficulty");
  const count = Number(option("count", "10"));
  const timeBudgetMs = Number(option("time-budget-ms", "120000"));
  const themePlanAttempts = Number(option("theme-plan-attempts", "1000"));
  const output = option("out");
  if (!category || !SIZE_MAP[size] || !DIFFICULTIES.has(difficulty) || !Number.isInteger(count) || count < 1
    || !Number.isFinite(timeBudgetMs) || timeBudgetMs < 1
    || !Number.isInteger(themePlanAttempts) || themePlanAttempts < 1 || !output) {
    throw new Error("generate requires --category, --size, --difficulty, positive --count, and --out");
  }
  const blueprints = [];
  const hashes = new Set();
  const maxAttempts = count * 50;
  for (let attempt = 0; attempt < maxAttempts && blueprints.length < count; attempt++) {
    let grid;
    try {
      grid = generatePuzzle({
        keywords: [category],
        title: "",
        size,
        difficulty,
        wordBank: WORD_BANK,
        timeBudgetMs,
        themePlanAttempts,
      });
    } catch {
      continue;
    }
    const candidate = { category, size, difficulty, grid, source: "offline-generator" };
    const validation = validateBlueprint(candidate);
    if (!validation.ok || hashes.has(validation.gridHash)) continue;
    hashes.add(validation.gridHash);
    blueprints.push(normalizedBlueprint(candidate, validation));
  }
  if (blueprints.length !== count) throw new Error(`Only generated ${blueprints.length}/${count} distinct accepted blueprints in ${maxAttempts} attempts.`);
  fs.writeFileSync(path.resolve(output), `${JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), blueprints }, null, 2)}\n`);
  console.log(`Wrote ${blueprints.length} validated blueprints to ${path.resolve(output)}.`);
}

async function cloudflareQuery(statements) {
  const token = process.env.CF_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CF_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CF_D1_DATABASE_ID;
  if (!token || !accountId || !databaseId) throw new Error("Set Cloudflare API token, account ID, and CF_D1_DATABASE_ID.");
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(Array.isArray(statements) ? { batch: statements } : statements),
  });
  const text = await response.text();
  const result = JSON.parse(text);
  if (!response.ok || !result.success) throw new Error(`D1 request failed: ${JSON.stringify(result.errors || result)}`);
  return result.result;
}

async function seedManifest(blueprints) {
  if (!process.argv.includes("--confirm-seed")) throw new Error("Seed is a remote write. Re-run with --confirm-seed after validating the manifest.");
  const migration = fs.readFileSync(path.join(ROOT, "migrations", "0002_puzzle_blueprints.sql"), "utf8");
  const schemaStatements = migration.split(";").map((sql) => sql.trim()).filter(Boolean).map((sql) => ({ sql }));
  await cloudflareQuery(schemaStatements);
  const statements = blueprints.map((item) => ({
    sql: `INSERT INTO puzzle_blueprints (
      id, category, size, difficulty, grid_hash, grid_json, density,
      themed_answer_count, answer_count, source, metadata_json, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      category=excluded.category, size=excluded.size, difficulty=excluded.difficulty,
      grid_hash=excluded.grid_hash, grid_json=excluded.grid_json, density=excluded.density,
      themed_answer_count=excluded.themed_answer_count, answer_count=excluded.answer_count,
      source=excluded.source, metadata_json=excluded.metadata_json, status=excluded.status,
      updated_at=excluded.updated_at`,
    params: [
      item.id, item.category, item.size, item.difficulty, item.gridHash, JSON.stringify(item.grid), item.density,
      item.themedAnswerCount, item.answerCount, item.source, JSON.stringify(item.metadata), item.status,
      item.createdAt, item.updatedAt,
    ],
  }));
  for (let index = 0; index < statements.length; index += 50) await cloudflareQuery(statements.slice(index, index + 50));
  console.log(`Seeded ${blueprints.length} puzzle blueprints.`);
}

async function main() {
  const command = process.argv[2];
  if (command === "generate") return generateManifest();
  if (!["validate", "seed"].includes(command)) throw new Error("Use generate, validate, or seed.");
  const file = option("file");
  if (!file) throw new Error(`${command} requires --file`);
  const blueprints = validateManifest(JSON.parse(fs.readFileSync(path.resolve(file), "utf8")));
  console.log(`Validated ${blueprints.length} puzzle blueprints.`);
  if (command === "seed") await seedManifest(blueprints);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
