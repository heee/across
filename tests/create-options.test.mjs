import assert from "node:assert/strict";
import test from "node:test";
import { hasActiveDiscoverCriteria, pickRandomItem, shuffledCopy } from "../create-options.js";

test("shuffledCopy randomizes a copy without changing the category source", () => {
  const categories = ["Geography", "History", "Science", "Nature"];
  const shuffled = shuffledCopy(categories, () => 0);

  assert.deepEqual(shuffled, ["History", "Science", "Nature", "Geography"]);
  assert.deepEqual(categories, ["Geography", "History", "Science", "Nature"]);
});

test("pickRandomItem selects from the supplied title pool", () => {
  const titles = ["First", "Second", "Third"];

  assert.equal(pickRandomItem(titles, () => 0), "First");
  assert.equal(pickRandomItem(titles, () => 0.999), "Third");
  assert.equal(pickRandomItem([], () => 0), null);
});

test("Discover creation CTA requires a search term or non-default filter", () => {
  assert.equal(hasActiveDiscoverCriteria(), false);
  assert.equal(hasActiveDiscoverCriteria({ query: "   " }), false);
  assert.equal(hasActiveDiscoverCriteria({ query: "malt" }), true);
  assert.equal(hasActiveDiscoverCriteria({ category: "Beer & Brewing" }), true);
  assert.equal(hasActiveDiscoverCriteria({ difficulty: "hard" }), true);
  assert.equal(hasActiveDiscoverCriteria({ size: "large" }), true);
});
