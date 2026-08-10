import assert from "node:assert/strict";
import test from "node:test";
import { DIFFICULTY_PROFILES, SIZE_MAP, generatePuzzle } from "../worker/generator.js";
import { WORD_BANK } from "../worker/corpus.js";

test("creation exposes five distinct grid sizes and difficulty profiles", () => {
  assert.deepEqual(SIZE_MAP, { mini: 5, quick: 7, compact: 9, standard: 11, large: 15 });
  assert.deepEqual(Object.keys(DIFFICULTY_PROFILES), ["beginner", "easy", "medium", "hard", "expert"]);
  assert.ok(DIFFICULTY_PROFILES.beginner.maxDiff < DIFFICULTY_PROFILES.expert.maxDiff);
  assert.ok(DIFFICULTY_PROFILES.hard.targetDiff < DIFFICULTY_PROFILES.expert.targetDiff);
});

test("new quick and compact selections generate their selected dimensions", () => {
  for (const size of ["quick", "compact"]) {
    const puzzle = generatePuzzle({ keywords: ["general knowledge"], size, difficulty: "medium", wordBank: WORD_BANK });
    assert.equal(puzzle.rows, SIZE_MAP[size]);
    assert.equal(puzzle.cols, SIZE_MAP[size]);
    assert.ok(puzzle.words.length >= 3);
  }
});
