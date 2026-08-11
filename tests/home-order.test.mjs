import assert from "node:assert/strict";
import test from "node:test";
import {
  hasStartedPuzzle,
  puzzleParticipantNames,
  sortPuzzlesByUserActivity,
  userPuzzleActivityTimestamp,
} from "../home-order.js";

const puzzle = (id, createdAt, sessions) => ({ id, createdAt, sessions });

test("Continue playing orders puzzles by the current player's latest activity", () => {
  const puzzles = [
    puzzle("newer-puzzle", "2026-08-10T12:00:00.000Z", {
      Henning: { joinedAt: "2026-08-10T12:00:00.000Z", lastActiveAt: "2026-08-10T12:05:00.000Z" },
      Christie: { lastActiveAt: "2026-08-10T15:00:00.000Z" },
    }),
    puzzle("older-puzzle", "2026-08-09T12:00:00.000Z", {
      Henning: { joinedAt: "2026-08-09T12:00:00.000Z", lastActiveAt: "2026-08-10T14:00:00.000Z" },
    }),
  ];

  assert.deepEqual(sortPuzzlesByUserActivity(puzzles, "Henning").map(({ id }) => id), ["older-puzzle", "newer-puzzle"]);
});

test("legacy sessions fall back to the player's join time, then puzzle creation time", () => {
  const joined = puzzle("joined", "2026-08-01T00:00:00.000Z", { Henning: { joinedAt: "2026-08-09T00:00:00.000Z" } });
  const created = puzzle("created", "2026-08-08T00:00:00.000Z", { Henning: {} });

  assert.ok(userPuzzleActivityTimestamp(joined, "Henning") > userPuzzleActivityTimestamp(created, "Henning"));
  assert.deepEqual(sortPuzzlesByUserActivity([created, joined], "Henning").map(({ id }) => id), ["joined", "created"]);
});

test("a seeded creator is not participating until they actually solve or spend time", () => {
  const untouched = {
    createdBy: "Henning",
    players: ["Henning"],
    sessions: { Henning: { joinedAt: "2026-08-10T12:00:00.000Z", timeSpentMs: 0 } },
    cells: {},
  };
  assert.equal(hasStartedPuzzle(untouched, "Henning"), false);
  assert.deepEqual(puzzleParticipantNames(untouched), []);

  untouched.sessions.Henning.timeSpentMs = 1;
  assert.equal(hasStartedPuzzle(untouched, "Henning"), true);
  assert.deepEqual(puzzleParticipantNames(untouched), ["Henning"]);
});

test("joining players count as participants even before their first letter", () => {
  const joined = {
    createdBy: "Henning",
    players: ["Henning", "Christie"],
    sessions: { Henning: {}, Christie: {} },
    cells: {},
  };
  assert.equal(hasStartedPuzzle(joined, "Christie"), true);
  assert.deepEqual(puzzleParticipantNames(joined), ["Christie"]);
});
