import assert from "node:assert/strict";
import test from "node:test";
import {
  DIFFICULTY_PROFILES,
  SIZE_MAP,
  TEMPLATES,
  buildCandidatePool,
  computeLongSlotIds,
  extractSlots,
  generatePuzzle,
  runMaintainingArcConsistencyFill,
  validateTemplate,
} from "../worker/generator.js";
import { WORD_BANK } from "../worker/corpus.js";

test("generator preserves every supported output size and difficulty profile", () => {
  assert.deepEqual(SIZE_MAP, { mini: 5, quick: 7, compact: 9, standard: 11, large: 15 });
  assert.deepEqual(Object.keys(DIFFICULTY_PROFILES), ["beginner", "easy", "medium", "hard", "expert"]);
  assert.ok(DIFFICULTY_PROFILES.beginner.maxDiff < DIFFICULTY_PROFILES.expert.maxDiff);
});

test("every eligible dense template is square, connected, uncropped, and at least 80% open", () => {
  for (const [size, templates] of Object.entries(TEMPLATES)) {
    const n = SIZE_MAP[size];
    const eligible = templates.filter((rows) => rows.join("").replaceAll("#", "").length / (n * n) >= 0.8);
    assert.ok(eligible.length > 0, `${size} needs an 80% template`);
    for (const rows of eligible) {
      assert.equal(rows.length, n, `${size} row count`);
      assert.ok(rows.every((row) => row.length === n), `${size} column count`);
      assert.equal(validateTemplate(rows).ok, true, `${size} template validity`);
    }
  }
});

test("category relevance uses explicit category membership and ignores decorative titles", () => {
  const maltTitle = buildCandidatePool(WORD_BANK, ["beer & brewing"], "Malt intentions", 3, 15);
  const unrelatedTitle = buildCandidatePool(WORD_BANK, ["beer & brewing"], "Tiger mountain", 3, 15);
  assert.deepEqual(maltTitle, unrelatedTitle);
  assert.ok(maltTitle.some((entry) => entry.word === "ALE" && entry.themed));
  assert.ok(maltTitle.some((entry) => entry.word === "TIGER" && !entry.themed));
});

test("category-specific clue wins when the same answer also has a generic entry", () => {
  const pool = buildCandidatePool([
    { w: "MALT", c: "Generic clue", cat: "general", diff: 1 },
    { w: "MALT", c: "Germinated grain used in whisky and beer", cat: "beer & brewing", diff: 1 },
  ], ["beer & brewing"], "Any title", 3, 5);
  assert.deepEqual(pool, [{
    word: "MALT",
    clue: "Germinated grain used in whisky and beer",
    cat: "beer & brewing",
    diff: 1,
    tier: 1,
    themed: true,
  }]);
});

test("offline callers can override search time and theme-plan attempts", () => {
  const puzzle = generatePuzzle({
    keywords: [],
    size: "mini",
    difficulty: "hard",
    wordBank: WORD_BANK,
    timeBudgetMs: 2500,
    themePlanAttempts: 1,
  });
  assert.equal(puzzle.rows, 5);
  assert.equal(puzzle.cols, 5);
  assert.ok(puzzle.cells.filter((cell) => !cell.block).length / puzzle.cells.length >= 0.8);
});

test("the fill solver enforces a 40–60% theme band and mandatory long anchors", () => {
  const rows = TEMPLATES.mini[0];
  const slots = extractSlots(rows);
  const answers = ["ABCD", "EFGH", "IJKLM", "NOPQ", "RSTU", "AEI", "BFJNR", "CGKOS", "DHLPT", "MQU"];
  const themedIds = new Set([0, 2, 6, 9]);
  const domains = new Map(slots.map((slot) => [slot.id, [{
    word: answers[slot.id],
    clue: `Clue ${slot.id}`,
    cat: themedIds.has(slot.id) ? "beer & brewing" : "general",
    diff: 1,
    tier: themedIds.has(slot.id) ? 1 : 0,
    themed: themedIds.has(slot.id),
  }]]));
  const longIds = computeLongSlotIds(slots);
  assert.ok([...longIds].filter((id) => themedIds.has(id)).length >= Math.ceil(longIds.size * 0.5));
  const result = runMaintainingArcConsistencyFill(
    slots,
    domains,
    longIds,
    Date.now() + 1000,
    1,
    { min: 4, max: 6 },
  );
  assert.equal(result.success, true);
  assert.equal(result.assignment.filter((entry) => entry.themed).length / slots.length, 0.4);
  assert.ok([...longIds].filter((id) => result.assignment[id].themed).length >= Math.ceil(longIds.size * 0.5));
});
