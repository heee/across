import assert from "node:assert/strict";
import test from "node:test";
import {
  PuzzleRoom,
  deleteUser,
  getPuzzle,
  joinPuzzle,
  loadData,
  renameUser,
  registerUser,
  updateUserColor,
  updateUserSettings,
  upsertPuzzle,
} from "../worker/index.js";
import worker from "../worker/index.js";
import { generatePuzzle } from "../worker/generator.js";
import { WORD_BANK } from "../worker/corpus.js";

class Statement {
  constructor(db, sql) { this.db = db; this.sql = sql.replace(/\s+/g, " ").trim(); this.params = []; }
  bind(...params) { const statement = new Statement(this.db, this.sql); statement.params = params; return statement; }
  async first(column) {
    let row = null;
    if (this.sql.startsWith("SELECT COUNT(*)")) row = { count: this.db.users.size };
    else if (this.sql.includes("lower(name)")) row = [...this.db.users.values()].find((user) => user.name.toLowerCase() === String(this.params[0]).toLowerCase() && user.name !== this.params[1]) || null;
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
    } else if (this.sql.startsWith("UPDATE users SET settings_json")) {
      const [settings_json, updated_at, name] = this.params;
      const row = this.db.users.get(name);
      if (row) Object.assign(row, { settings_json, updated_at });
    } else if (this.sql.startsWith("UPDATE users SET name")) {
      const [newName, updated_at, oldName] = this.params;
      const row = this.db.users.get(oldName);
      if (row) {
        this.db.users.delete(oldName);
        this.db.users.set(newName, { ...row, name: newName, updated_at });
      }
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

test("user settings persist timer visibility and default legacy users to on", async () => {
  const db = new FakeD1();
  await registerUser(db, "Henning");
  const row = db.users.get("Henning");
  row.settings_json = JSON.stringify({ push: false, sound: true, haptic: true });
  assert.equal((await loadData(db)).users.Henning.settings.showTimers, true);

  const settings = await updateUserSettings(db, "Henning", { showTimers: false });
  assert.equal(settings.showTimers, false);
  assert.equal(settings.push, false);
  assert.equal((await loadData(db)).users.Henning.settings.showTimers, false);
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

test("renaming a user preserves their global puzzle identity", async () => {
  const db = new FakeD1();
  await registerUser(db, "Henning");
  const puzzle = samplePuzzle();
  puzzle.cells["0-0"] = { letter: "A", owner: "Henning", revealed: false };
  puzzle.highlights = ["Henning typed the most letters"];
  await upsertPuzzle(db, puzzle);

  const result = await renameUser(db, "Henning", "Henry");
  assert.deepEqual(result.affectedPuzzleIds, ["test-1"]);
  const data = await loadData(db);
  assert.equal(data.users.Henning, undefined);
  assert.equal(data.users.Henry.hue, 250);
  assert.equal(data.puzzles["test-1"].createdBy, "Henry");
  assert.deepEqual(data.puzzles["test-1"].players, ["Henry"]);
  assert.ok(data.puzzles["test-1"].sessions.Henry);
  assert.equal(data.puzzles["test-1"].cells["0-0"].owner, "Henry");
  assert.equal(data.puzzles["test-1"].highlights[0], "Henry typed the most letters");
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

test("WebSocket routing reaches the Durable Object in one request without a D1 read", async () => {
  let roomFetches = 0;
  const response = await worker.fetch(new Request("https://worker/puzzle/test-1/connect?user=Henning"), {
    DB: { prepare() { throw new Error("D1 should not be read by the outer route"); } },
    PUZZLE_ROOM: {
      idFromName(id) { return id; },
      get() {
        return {
          async fetch() {
            roomFetches += 1;
            return new Response("proxied");
          },
        };
      },
    },
  });

  assert.equal(await response.text(), "proxied");
  assert.equal(roomFetches, 1);
});

test("a cold Durable Object seeds from D1 once, then restores its own storage", async () => {
  const db = new FakeD1();
  await upsertPuzzle(db, samplePuzzle());
  let storedPuzzle = null;
  const state = {
    storage: {
      async get() { return storedPuzzle; },
      async put(_key, puzzle) { storedPuzzle = puzzle; },
    },
  };

  const firstRoom = new PuzzleRoom(state, { DB: db });
  assert.equal((await firstRoom.ensurePuzzle("test-1")).id, "test-1");
  assert.equal(storedPuzzle.id, "test-1");

  db.puzzles.clear();
  const restoredRoom = new PuzzleRoom(state, { DB: db });
  assert.equal((await restoredRoom.ensurePuzzle("test-1")).id, "test-1");
});

test("a checkpoint snapshots recent WebSocket progress to D1 before exit", async () => {
  const db = new FakeD1();
  const puzzle = samplePuzzle();
  puzzle.grid.cells = [
    { row: 0, col: 0, letter: "A", block: false },
    { row: 0, col: 1, letter: "B", block: false },
  ];
  await upsertPuzzle(db, puzzle);
  const sent = [];
  const socket = { send(payload) { sent.push(JSON.parse(payload)); } };
  const room = new PuzzleRoom({
    storage: { async put() {} },
  }, { DB: db });
  room.puzzle = structuredClone(puzzle);
  room.lastPersist = Date.now();

  await room.handleMessage(socket, "Henning", {
    data: JSON.stringify({ type: "cell-update", row: 0, col: 0, letter: "A", isCorrect: true }),
  });
  assert.equal((await getPuzzle(db, "test-1")).cells["0-0"], undefined);

  await room.handleMessage(socket, "Henning", {
    data: JSON.stringify({ type: "checkpoint", requestId: "exit-1" }),
  });

  assert.equal((await getPuzzle(db, "test-1")).cells["0-0"].letter, "A");
  assert.deepEqual(sent.at(-1), { type: "checkpoint-saved", requestId: "exit-1" });
});

test("creation persists a validated client-generated grid without server-side generation", async () => {
  const db = new FakeD1();
  let seededPuzzle = null;
  const env = {
    APP_KEY: "test-key",
    DB: db,
    PUZZLE_ROOM: {
      idFromName(id) { return id; },
      get() {
        return {
          async fetch(_url, options) {
            seededPuzzle = JSON.parse(options.body);
            return new Response("ok");
          },
        };
      },
    },
  };
  const grid = generatePuzzle({ keywords: ["general knowledge"], title: "Client grid", size: "mini", difficulty: "beginner", wordBank: WORD_BANK });
  const response = await worker.fetch(new Request("https://worker/create-puzzle", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Key": "test-key" },
    body: JSON.stringify({
      title: "Client grid",
      description: "",
      keywords: ["general knowledge"],
      size: "mini",
      difficulty: "beginner",
      visibility: "private",
      createdBy: "Henning",
      grid,
    }),
  }), env);

  assert.equal(response.status, 200);
  const { puzzle } = await response.json();
  assert.equal(puzzle.grid.rows, 5);
  assert.equal(seededPuzzle.id, puzzle.id);
  assert.equal((await getPuzzle(db, puzzle.id)).grid.words.length, grid.words.length);
});

test("creation rejects missing or malformed client grids before persistence", async () => {
  const db = new FakeD1();
  const base = {
    title: "Missing grid",
    description: "",
    keywords: ["general knowledge"],
    size: "mini",
    difficulty: "beginner",
    visibility: "private",
    createdBy: "Henning",
  };
  const env = { APP_KEY: "test-key", DB: db };

  const missing = await worker.fetch(new Request("https://worker/create-puzzle", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Key": "test-key" },
    body: JSON.stringify(base),
  }), env);
  assert.equal(missing.status, 409);

  const malformed = await worker.fetch(new Request("https://worker/create-puzzle", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Key": "test-key" },
    body: JSON.stringify({ ...base, grid: { rows: 5, cols: 5, cells: [], words: [] } }),
  }), env);
  assert.equal(malformed.status, 400);
  assert.equal(db.puzzles.size, 0);
});

test("completed replays create distinct linked private attempts without changing the title", async () => {
  const db = new FakeD1();
  const source = samplePuzzle();
  source.state = "completed";
  source.completedAt = "2026-08-10T00:00:00.000Z";
  await upsertPuzzle(db, source);
  const env = {
    APP_KEY: "test-key",
    DB: db,
    PUZZLE_ROOM: {
      idFromName(id) { return id; },
      get() { return { async fetch() { return new Response("ok"); } }; },
    },
  };

  async function replay() {
    const response = await worker.fetch(new Request("https://worker/fork-puzzle", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-App-Key": "test-key" },
      body: JSON.stringify({ puzzleId: source.id, user: "Henning", newAttempt: true }),
    }), env);
    assert.equal(response.status, 200);
    return (await response.json()).puzzle;
  }

  const second = await replay();
  const third = await replay();
  assert.notEqual(second.id, third.id);
  assert.equal(second.title, source.title);
  assert.equal(second.visibility, "private");
  assert.equal(second.seriesId, source.id);
  assert.equal(second.attemptOf, source.id);
  assert.equal(second.attemptNumber, 2);
  assert.equal(third.attemptNumber, 3);
  assert.equal(second.statsEligible, false);
  assert.deepEqual(second.cells, {});
});
