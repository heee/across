import { generatePuzzle } from "./worker/generator.js";
import { WORD_BANK } from "./worker/corpus.js";
import { generateWithRetries } from "./generation-retry.js";

self.onmessage = ({ data }) => {
  try {
    const grid = generateWithRetries(generatePuzzle, data, WORD_BANK);
    self.postMessage({ ok: true, grid });
  } catch (error) {
    self.postMessage({ ok: false, error: error?.message || "Crossword generation failed" });
  }
};
