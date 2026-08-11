import assert from "node:assert/strict";
import test from "node:test";
import { WORD_BANK } from "../worker/corpus.js";
import { EXPANDED_WORD_BANK } from "../worker/corpus.generated.js";
import { COMMUNITY_WORD_BANK } from "../worker/corpus.community.js";
import { WHISKY_WORD_BANK } from "../worker/corpus.whisky.js";
import { LLM_WORD_BANK } from "../worker/corpus.llm.js";

const CATEGORIES = [
  "geography", "history", "science", "nature", "animals", "space",
  "literature", "language", "philosophy", "mythology", "art & design", "music",
  "movies & tv", "pop culture", "technology", "business & economics",
  "politics & society", "food & drink", "travel", "sports", "games", "kids",
  "people", "general knowledge",
];

test("generated corpus substantially expands usable coverage with balanced lengths", () => {
  assert.equal(EXPANDED_WORD_BANK.length, 14240);
  assert.equal(new Set(EXPANDED_WORD_BANK.map((entry) => entry.w)).size, EXPANDED_WORD_BANK.length);

  const unique = [...new Map(WORD_BANK.map((entry) => [entry.w, entry])).values()];
  const usable = unique.filter((entry) => /^[A-Z]+$/.test(entry.w) && entry.w.length >= 3 && entry.w.length <= 15);
  assert.ok(usable.length >= 18800, `expected at least 18800 usable unique entries, got ${usable.length}`);

  const minimumByLength = { 3: 1000, 4: 2500, 5: 2800, 6: 2500, 7: 1800, 8: 1500, 9: 1300, 10: 1100, 11: 950, 12: 790, 13: 650, 14: 490, 15: 350 };
  for (const [length, minimum] of Object.entries(minimumByLength)) {
    const entries = usable.filter((entry) => entry.w.length === Number(length));
    assert.ok(entries.length >= minimum, `length ${length}: expected >=${minimum}, got ${entries.length}`);
    for (let position = 0; position < Number(length); position++) {
      const letters = new Set(entries.map((entry) => entry.w[position]));
      assert.ok(letters.size >= 15, `length ${length}, position ${position}: only ${letters.size} letters represented`);
    }
  }
});

test("community corpus deeply covers the two new categories", () => {
  const categories = ["houston & texas", "beer & brewing"];
  assert.equal(new Set(COMMUNITY_WORD_BANK.map((entry) => entry.w)).size, COMMUNITY_WORD_BANK.length);

  for (const category of categories) {
    const entries = COMMUNITY_WORD_BANK.filter((entry) => entry.cat === category);
    assert.ok(entries.length >= 220, `${category}: expected at least 220 entries, got ${entries.length}`);
    for (const difficulty of [1, 2, 3]) {
      const count = entries.filter((entry) => entry.diff === difficulty).length;
      assert.ok(count >= 15, `${category}: difficulty ${difficulty} has only ${count} entries`);
    }
    for (let length = 3; length <= 15; length++) {
      const count = entries.filter((entry) => entry.w.length === length).length;
      assert.ok(count >= 1, `${category}: no ${length}-letter answers`);
    }
  }

  for (const entry of COMMUNITY_WORD_BANK) {
    assert.match(entry.w, /^[A-Z]{3,15}$/);
    assert.ok(entry.c.length >= 8 && entry.c.length <= 150);
  }
});

test("whisky corpus deeply covers production, maturation, regions, and tasting without cocktails", () => {
  assert.ok(WHISKY_WORD_BANK.length >= 350, `expected at least 350 entries, got ${WHISKY_WORD_BANK.length}`);
  assert.equal(new Set(WHISKY_WORD_BANK.map((entry) => entry.w)).size, WHISKY_WORD_BANK.length);
  assert.ok(WORD_BANK.some((entry) => entry.cat === "whisky"));

  for (const difficulty of [1, 2, 3]) {
    const count = WHISKY_WORD_BANK.filter((entry) => entry.diff === difficulty).length;
    assert.ok(count >= 40, `difficulty ${difficulty} has only ${count} entries`);
  }
  for (let length = 3; length <= 15; length++) {
    assert.ok(WHISKY_WORD_BANK.some((entry) => entry.w.length === length), `no ${length}-letter whisky answers`);
  }

  const cocktailAnswers = new Set(["MANHATTAN", "OLDFASHIONED", "HIGHBALL", "WHISKYSOUR", "ROBROY", "MINTJULEP"]);
  assert.equal(WHISKY_WORD_BANK.filter((entry) => cocktailAnswers.has(entry.w)).length, 0);
  for (const entry of WHISKY_WORD_BANK) {
    assert.match(entry.w, /^[A-Z]{3,15}$/);
    assert.equal(entry.cat, "whisky");
    assert.ok(entry.c.length >= 8 && entry.c.length <= 150);
  }
});

test("generated corpus supplies every category and difficulty tier", () => {
  for (const category of CATEGORIES) {
    const count = EXPANDED_WORD_BANK.filter((entry) => entry.cat === category).length;
    assert.ok(count >= 90, `${category}: expected >=90 entries, got ${count}`);
  }
  for (const difficulty of [1, 2, 3]) {
    const count = EXPANDED_WORD_BANK.filter((entry) => entry.diff === difficulty).length;
    assert.ok(count >= 1000, `difficulty ${difficulty}: expected >=1000 entries, got ${count}`);
  }
  for (const entry of EXPANDED_WORD_BANK) {
    assert.match(entry.w, /^[A-Z]{3,15}$/);
    assert.ok(entry.c.length >= 8 && entry.c.length <= 150);
  }
});

test("screened Batch corpus preserves category coverage and crossword constraints", () => {
  assert.equal(LLM_WORD_BANK.length, 4503);
  assert.equal(new Set(LLM_WORD_BANK.map((entry) => entry.w)).size, LLM_WORD_BANK.length);
  assert.equal(new Set(LLM_WORD_BANK.map((entry) => entry.cat)).size, 27);
  assert.equal(LLM_WORD_BANK.filter((entry) => entry.cat === "beer & brewing").length, 173);
  assert.equal(LLM_WORD_BANK.filter((entry) => entry.cat === "whisky").length, 160);
  const cocktailAnswers = new Set(["MANHATTAN", "OLDFASHIONED", "HIGHBALL", "WHISKYSOUR", "ROBROY", "MINTJULEP"]);
  for (const entry of LLM_WORD_BANK) {
    assert.match(entry.w, /^[A-Z]{3,15}$/);
    assert.ok(entry.c.length >= 8 && entry.c.length <= 150);
    assert.ok([1, 2, 3].includes(entry.diff));
    if (entry.cat === "whisky") assert.equal(cocktailAnswers.has(entry.w), false);
  }
});
