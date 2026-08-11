import assert from "node:assert/strict";
import test from "node:test";
import { pickRandomItem, shuffledCopy } from "../create-options.js";

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
