import assert from "node:assert/strict";
import fs from "node:fs";

const worker = fs.readFileSync(new URL("../worker/index.js", import.meta.url), "utf8");
const deploy = fs.readFileSync(new URL("./deploy-worker.cjs", import.meta.url), "utf8");
const importer = fs.readFileSync(new URL("./migrate-data-to-d1.cjs", import.meta.url), "utf8");
const schema = fs.readFileSync(new URL("../migrations/0001_initial.sql", import.meta.url), "utf8");
const inventorySchema = fs.readFileSync(new URL("../migrations/0002_puzzle_blueprints.sql", import.meta.url), "utf8");
const bundle = fs.readFileSync(new URL("../worker/dist/bundle.js", import.meta.url), "utf8");

assert.match(worker, /env\.DB/);
assert.doesNotMatch(worker, /api\.github\.com|GITHUB_TOKEN|commitMutation|fetchGithubFile/);
assert.match(worker, /WRITE_DISABLED === "1"/);
assert.match(deploy, /type: "d1", name: "DB", id: databaseId/);
assert.match(deploy, /type: "inherit", name: "APP_KEY"/);
assert.match(deploy, /bindings_inherit=strict/);
assert.doesNotMatch(deploy, /GITHUB_TOKEN|GH_OWNER|GH_REPO|GH_BRANCH/);
assert.match(importer, /body: JSON\.stringify\(statement\)/);
assert.doesNotMatch(importer, /body: JSON\.stringify\(statements\)/);
assert.match(schema, /CREATE TABLE IF NOT EXISTS users/);
assert.match(schema, /CREATE TABLE IF NOT EXISTS puzzles/);
assert.match(inventorySchema, /CREATE TABLE IF NOT EXISTS puzzle_blueprints/);
assert.match(inventorySchema, /CREATE TABLE IF NOT EXISTS blueprint_exposures/);
assert.match(bundle, /env\.DB/);
assert.doesNotMatch(bundle, /api\.github\.com|GITHUB_TOKEN|commitMutation|fetchGithubFile/);

console.log("Worker/D1 static validation passed.");
