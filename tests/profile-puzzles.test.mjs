import assert from "node:assert/strict";
import test from "node:test";
import { profilePuzzleCollections, puzzleLeaderboard, puzzleProgress } from "../profile-puzzles.js";

function puzzle(overrides = {}) {
  const id = overrides.id || "puzzle-1";
  return {
    id,
    title: id,
    createdBy: "Alex",
    createdAt: "2026-08-01T12:00:00.000Z",
    visibility: "open",
    state: "open",
    players: ["Alex"],
    sessions: { Alex: { lettersEntered: 1, lastActiveAt: "2026-08-02T12:00:00.000Z" } },
    grid: { rows: 2, cols: 2, cells: [
      { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0, block: true }, { row: 1, col: 1 },
    ] },
    cells: { "0-0": { letter: "A", owner: "Alex" } },
    ...overrides,
  };
}

test("profile collections enforce open visibility for visitors and include private puzzles for the owner", () => {
  const openActive = puzzle({ id: "open-active" });
  const privateActive = puzzle({ id: "private-active", visibility: "private" });
  const completed = puzzle({ id: "done", state: "completed", completedAt: "2026-08-03T12:00:00.000Z" });
  const unstartedCreation = puzzle({ id: "created", sessions: { Alex: { lettersEntered: 0 } }, cells: {} });
  const replay = puzzle({ id: "replay", forkOf: "done", isReplay: true, state: "completed" });

  const visitor = profilePuzzleCollections([openActive, privateActive, completed, unstartedCreation, replay], "Alex", "Blair");
  assert.deepEqual(visitor.active.map(({ id }) => id), ["open-active"]);
  assert.deepEqual(visitor.completed.map(({ id }) => id).sort(), ["done", "replay"]);
  assert.deepEqual(visitor.created.map(({ id }) => id).sort(), ["created", "done", "open-active"]);

  const owner = profilePuzzleCollections([openActive, privateActive], "Alex", "Alex");
  assert.deepEqual(owner.active.map(({ id }) => id).sort(), ["open-active", "private-active"]);
});

test("puzzle progress ignores block cells", () => {
  assert.equal(puzzleProgress(puzzle()), 33);
});

test("leaderboard includes a team solve and only each player's fastest solo attempt", () => {
  const team = puzzle({
    id: "series",
    state: "completed",
    totalTimeMs: 120_000,
    players: ["Alex", "Blair"],
    sessions: {
      Alex: { lettersEntered: 2, autoCheckUsed: true },
      Blair: { lettersEntered: 2, revealsUsed: 1 },
    },
  });
  const slow = puzzle({
    id: "slow",
    forkOf: "series",
    forkedBy: "Casey",
    state: "completed",
    totalTimeMs: 110_000,
    players: ["Casey"],
    sessions: { Casey: { lettersEntered: 3 } },
  });
  const fast = puzzle({
    id: "fast",
    forkOf: "series",
    forkedBy: "Casey",
    state: "completed",
    totalTimeMs: 90_000,
    players: ["Casey"],
    sessions: { Casey: { lettersEntered: 3, autoCheckUsed: true } },
  });

  const leaderboard = puzzleLeaderboard([team, slow, fast], team);
  assert.deepEqual(leaderboard.map(({ kind, names, timeMs }) => ({ kind, names, timeMs })), [
    { kind: "solo", names: ["Casey"], timeMs: 90_000 },
    { kind: "team", names: ["Alex", "Blair"], timeMs: 120_000 },
  ]);
  assert.equal(leaderboard[0].assists[0].autoCheckUsed, true);
  assert.equal(leaderboard[1].assists.length, 2);
});
