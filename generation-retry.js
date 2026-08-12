export const GENERATION_ATTEMPTS = Object.freeze({
  mini: 8,
  quick: 6,
  compact: 4,
  standard: 4,
  large: 3,
});

export function generateWithRetries(generate, request, wordBank) {
  const attempts = GENERATION_ATTEMPTS[request?.size] || 4;
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return generate({
        keywords: request?.keywords || [],
        title: request?.title || "",
        size: request?.size || "compact",
        difficulty: request?.difficulty || "medium",
        wordBank,
      });
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Crossword generation failed");
}
