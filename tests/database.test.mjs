import assert from "node:assert/strict";
import test from "node:test";
import {
  PuzzleRoom,
  deleteUser,
  getPuzzle,
  joinPuzzle,
  loadData,
  registerUser,
  updateUserColor,
  upsertPuzzle,
} from "../worker/index.js";
import worker from "../worker/index.js";

class Statement {
  constructor(db, sql) { this.db = db; this.sql = sql.replace(/\s+/g, " ").trim(); this.params = []; }
  bind(...params) { const statement = new Statement(this.db, this.sql); statement.params = params; return statement; }
  async first(column) {
    let row = null;
    if (this.sql.startsWith("SELECT COUNT(*)")) row = { count: this.db.users.size };
    else if (this.sql.includes("FROM users WHERE name")) row = this.db.users.get(this.params[0]) || null;
    else if (this.sql.includes("FROM puzzles WHERE id")) {
      const puzzle = this.db.puzzles.get(this.params[0]);
      row = puzzle ? { payload_json: puzzle.payload_json } : null;
    }
    return column ? row?.[column] ?? null : row;
  }
  async all() {
    if (this.sql.includes("FROM puzzles")) {
      return { results: [...this.db.puzzles.values()].map((row) => ({ payload_json: row.payload_json })) };
    }
    return { results: [] };
  }
  async run() {
    if (this.sql.startsWith("INSERT OR IGNORE INTO users")) {
      const [name, hue, created_at, settings_json, updated_at] = this.params;
      if (!this.db.users.has(name)) this.db.users.set(name, { name, hue, created_at, settings_json, updated_at });
    } else if (this.sql.startsWith("UPDATE users SET hue")) {
      const [hue, updated_at, name] = this.params;
      const row = this.db.users.get(name);
      if (row) Object.assign(row, { hue, updated_at });
    } else if (this.sql.startsWith("DELETE FROM users")) this.db.users.delete(this.params[0]);
    else if (this.sql.startsWith("DELETE FROM puzzles")) this.db.puzzles.delete(this.params[0]);
    else if (this.sql.startsWith("INSERT INTO puzzles")) {
      const [id, title, description, keywords_json, size, difficulty, visibility, created_by,
        created_at, state, completed_at, fork_of, forked_by, payload_json, updated_at] = this.params;
      this.db.puzzles.set(id, { id, title, description, keywords_json, size, difficulty, visibility,
        created_by, created_at, state, completed_at, fork_of, forked_by, payload_json, updated_at });
    } else throw new Error(`Unhandled SQL: ${this.sql}`);
    return { success: true };
  }
}

class FakeD1 {
  constructor() { this.users = new Map(); this.puzzles = new Map(); }
  prepare(sql) { return new Statement(this, sql); }
  async batch(statements) {
    const results = [];
    for (const statement of statements) {
      if (statement.sql.startsWith("SELECT name")) results.push({ results: [...this.users.values()] });
      else if (statement.sql.startsWith("SELECT payload_json")) results.push({ results: [...this.puzzles.values()].map(({ payload_json }) => ({ payload_json })) });
      else results.push(await statement.run());
    }
    return results;
  }
}

function samplePuzzle() {
  return {
    id: "test-1", title: "Test", description: "", keywords: ["kids"], size: "mini",
    difficulty: "medium", visibility: "open", createdBy: "Henning",
    createdAt: "2026-08-09T00:00:00.000Z", grid: { cells: [] }, cells: {},
    players: ["Henning"], sessions: { Henning: { lettersEntered: 0 } }, state: "open",
    completedAt: null, totalTimeMs: 0, highlights: [],
  };
}

test("D1 helpers preserve the legacy /data shape", async () => {
  const db = new FakeD1();
  const user = await registerUser(db, "Henning");
  assert.equal(user.hue, 250);
  await updateUserColor(db, "Henning", 30);
  await upsertPuzzle(db, samplePuzzle());
  await joinPuzzle(db, "test-1", "Christie");

  const data = await loadData(db);
  assert.deepEqual(Object.keys(data), ["users", "puzzles"]);
  assert.equal(data.users.Henning.hue, 30);
  assert.deepEqual(data.puzzles["test-1"].players, ["Henning", "Christie"]);
  assert.ok(data.puzzles["test-1"].sessions.Christie);
  assert.deepEqual(await getPuzzle(db, "test-1"), data.puzzles["test-1"]);
});

test("deleting a user scrubs every puzzle snapshot", async () => {
  const db = new FakeD1();
  await registerUser(db, "Henning");
  await upsertPuzzle(db, samplePuzzle());
  assert.deepEqual(await deleteUser(db, "Henning"), ["test-1"]);
  const puzzle = await getPuzzle(db, "test-1");
  assert.deepEqual(puzzle.players, []);
  assert.equal("Henning" in puzzle.sessions, false);
});

test("maintenance mode blocks mutations and WebSocket connects", async () => {
  const env = { WRITE_DISABLED: "1", ALLOWED_ORIGIN: "https://example.com" };
  const post = await worker.fetch(new Request("https://worker/register-user", { method: "POST" }), env);
  assert.equal(post.status, 503);
  assert.equal(post.headers.get("Retry-After"), "60");
  assert.deepEqual(await post.json(), { error: "maintenance" });

  const connect = await worker.fetch(new Request("https://worker/puzzle/test-1/connect"), env);
  assert.equal(connect.status, 503);
});

test("re-seeding a deleted Durable Object revives the room", async () => {
  let storedPuzzle = null;
  const room = new PuzzleRoom({
    storage: {
      async get() { return storedPuzzle; },
      async put(_key, puzzle) { storedPuzzle = puzzle; },
    },
  }, {});
  room.deleted = true;

  const response = await room.fetch(new Request("https://internal/seed-if-empty", {
    method: "POST",
    body: JSON.stringify(samplePuzzle()),
  }));

  assert.equal(response.status, 200);
  assert.equal(room.deleted, false);
  assert.equal(storedPuzzle.id, "test-1");
});
