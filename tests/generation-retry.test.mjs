import assert from "node:assert/strict";
import test from "node:test";
import { GENERATION_ATTEMPTS, generateWithRetries } from "../generation-retry.js";

test("Mini generation retries transient density failures", () => {
  let calls = 0;
  const grid = { rows: 5, cols: 5 };
  const result = generateWithRetries(() => {
    calls += 1;
    if (calls < GENERATION_ATTEMPTS.mini) throw new Error("density target");
    return grid;
  }, { size: "mini", keywords: ["travel"], difficulty: "beginner" }, []);
  assert.equal(result, grid);
  assert.equal(calls, GENERATION_ATTEMPTS.mini);
});

test("Generation stops after the size-specific retry limit", () => {
  let calls = 0;
  assert.throws(() => generateWithRetries(() => {
    calls += 1;
    throw new Error("still impossible");
  }, { size: "large" }, []), /still impossible/);
  assert.equal(calls, GENERATION_ATTEMPTS.large);
});
