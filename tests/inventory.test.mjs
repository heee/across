import assert from "node:assert/strict";
import test from "node:test";
import worker, { createPuzzleFromInventory, purgePuzzleRows } from "../worker/index.js";
import { validateBlueprint } from "../scripts/puzzle-inventory.mjs";

class Statement {
  constructor(db, sql, params = []) { this.db = db; this.sql = sql.replace(/\s+/g, " ").trim(); this.params = params; }
  bind(...params) { return new Statement(this.db, this.sql, params); }
  async all() {
    if (this.sql === "SELECT id FROM puzzles ORDER BY id") return { results: [...this.db.puzzles.keys()].map((id) => ({ id })) };
    throw new Error(`Unhandled SQL: ${this.sql}`);
  }
  async run() {
    if (this.sql.startsWith("INSERT INTO puzzles")) {
      this.db.puzzles.set(this.params[0], JSON.parse(this.params[13]));
    } else if (this.sql === "DELETE FROM blueprint_exposures WHERE puzzle_id = ?") {
      this.db.exposures = this.db.exposures.filter((row) => row.puzzle_id !== this.params[0]);
    } else if (this.sql === "DELETE FROM blueprint_exposures") {
      this.db.exposures = [];
    } else if (this.sql === "DELETE FROM puzzles") {
      this.db.puzzles.clear();
    } else throw new Error(`Unhandled SQL: ${this.sql}`);
    return { success: true };
  }
}

class InventoryD1 {
  constructor(blueprints) {
    this.blueprints = blueprints;
    this.exposures = [];
    this.puzzles = new Map();
    this.users = new Map([["Ada", { hue: 250, settings: { showTimers: false } }]]);
  }
  prepare(sql) { return new Statement(this, sql); }
  async batch(statements) {
    if (statements[0].sql.startsWith("INSERT OR IGNORE INTO blueprint_exposures")) {
      const [user, puzzleId, usedAt, category, size, difficulty] = statements[0].params;
      const selected = this.blueprints.find((blueprint) =>
        blueprint.category === category && blueprint.size === size && blueprint.difficulty === difficulty &&
        !this.exposures.some((row) => row.blueprint_id === blueprint.id && row.user_name === user));
      if (selected) this.exposures.push({ blueprint_id: selected.id, user_name: user, puzzle_id: puzzleId, used_at: usedAt });
      const claim = this.exposures.find((row) => row.puzzle_id === puzzleId && row.user_name === user);
      const blueprint = claim && this.blueprints.find((item) => item.id === claim.blueprint_id);
      return [{ success: true }, { success: true, results: blueprint ? [{ id: blueprint.id, grid_json: blueprint.grid_json }] : [] }];
    }
    const results = [];
    for (const statement of statements) results.push(await statement.run());
    return results;
  }
}

function request(createdBy = "Ada") {
  return {
    title: "Malt Intentions", description: "", keywords: ["beer & brewing"], category: "beer & brewing",
    size: "mini", difficulty: "beginner", visibility: "private", createdBy,
  };
}

function validMiniGrid() {
  const rows = ["SATOR", "AREPO", "TENET", "OPERA", "ROTAS"];
  const cells = rows.flatMap((answer, row) => [...answer].map((letter, col) => ({ row, col, letter, block: false, number: col === 0 ? row + 1 : null })));
  const words = rows.map((answer, row) => ({
    number: row + 1, direction: "across", answer, clue: `Row ${row + 1}`, row, col: 0, length: 5,
    cells: Array.from({ length: 5 }, (_, col) => [row, col]),
  }));
  return { rows: 5, cols: 5, cells, words };
}

test("inventory assigns each player an unseen blueprint and clones request metadata", async () => {
  const grid = validMiniGrid();
  const db = new InventoryD1([
    { id: "beer-mini-1", category: "beer & brewing", size: "mini", difficulty: "beginner", grid_json: JSON.stringify(grid) },
    { id: "beer-mini-2", category: "beer & brewing", size: "mini", difficulty: "beginner", grid_json: JSON.stringify(grid) },
  ]);

  const first = await createPuzzleFromInventory(db, request());
  const second = await createPuzzleFromInventory(db, request());
  const depleted = await createPuzzleFromInventory(db, request());
  assert.equal(first.title, "Malt Intentions");
  assert.equal(first.createdBy, "Ada");
  assert.equal(first.visibility, "private");
  assert.notEqual(first.blueprintId, second.blueprintId);
  assert.equal(depleted, null);

  const otherPlayer = await createPuzzleFromInventory(db, request("Grace"));
  assert.equal(otherPlayer.blueprintId, "beer-mini-1");
});

test("D1 purge removes puzzle-associated rows while preserving users and inventory", async () => {
  const db = new InventoryD1([{ id: "kept-blueprint" }]);
  db.puzzles.set("legacy", { id: "legacy" });
  db.exposures.push({ blueprint_id: "kept-blueprint", user_name: "Ada", puzzle_id: "legacy" });
  const usersBefore = structuredClone([...db.users]);
  await purgePuzzleRows(db);
  assert.equal(db.puzzles.size, 0);
  assert.deepEqual(db.exposures, []);
  assert.deepEqual([...db.users], usersBefore);
  assert.equal(db.blueprints.length, 1);
});

test("maintenance purge clears every room before D1 and requires its separate secret", async () => {
  const db = new InventoryD1([{ id: "kept-blueprint" }]);
  db.puzzles.set("legacy-a", { id: "legacy-a" });
  db.puzzles.set("legacy-b", { id: "legacy-b" });
  const cleared = [];
  const env = {
    WRITE_DISABLED: "1", PURGE_KEY: "one-time-secret", DB: db,
    PUZZLE_ROOM: {
      idFromName(id) { return id; },
      get(id) { return { async fetch() { cleared.push(id); return new Response("ok"); } }; },
    },
  };
  const request = (key) => new Request("https://worker/maintenance/purge-legacy-puzzles", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Purge-Key": key },
    body: JSON.stringify({ confirmation: "DELETE ALL PUZZLES, KEEP USERS" }),
  });
  assert.equal((await worker.fetch(request("wrong"), env)).status, 401);
  const response = await worker.fetch(request("one-time-secret"), env);
  assert.equal(response.status, 200);
  assert.deepEqual(cleared.sort(), ["legacy-a", "legacy-b"]);
  assert.equal(db.puzzles.size, 0);
  assert.equal(db.users.size, 1);
  assert.equal(db.blueprints.length, 1);
});

test("offline inventory validation enforces density and 40-60% relevance", () => {
  const cells = Array.from({ length: 25 }, (_, index) => ({ row: Math.floor(index / 5), col: index % 5, block: index >= 21 }));
  const candidate = {
    category: "beer & brewing", size: "mini", difficulty: "medium", cells,
    grid: {
      rows: 5, cols: 5, cells,
      words: [
        { number: 1, direction: "across", answer: "MALT", clue: "Brewing grain", row: 0, col: 0, length: 4, cells: [] },
        { number: 2, direction: "down", answer: "HOPS", clue: "Bittering flowers", row: 0, col: 0, length: 4, cells: [] },
        { number: 3, direction: "across", answer: "AREA", clue: "Region", row: 1, col: 0, length: 4, cells: [] },
        { number: 4, direction: "down", answer: "EASE", clue: "Comfort", row: 0, col: 1, length: 4, cells: [] },
      ],
    },
    themeAnswers: ["MALT", "HOPS"],
  };
  assert.equal(validateBlueprint(candidate).ok, true);
  candidate.grid.cells[20].block = true;
  candidate.grid.cells[19].block = true;
  assert.match(validateBlueprint(candidate).errors.join(" "), /below 80%/);
});
