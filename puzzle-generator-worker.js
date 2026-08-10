import { generatePuzzle } from "./worker/generator.js";
import { WORD_BANK } from "./worker/corpus.js";

self.onmessage = ({ data }) => {
  try {
    const grid = generatePuzzle({
      keywords: data?.keywords || [],
      title: data?.title || "",
      size: data?.size || "compact",
      difficulty: data?.difficulty || "medium",
      wordBank: WORD_BANK,
    });
    self.postMessage({ ok: true, grid });
  } catch (error) {
    self.postMessage({ ok: false, error: error?.message || "Crossword generation failed" });
  }
};
