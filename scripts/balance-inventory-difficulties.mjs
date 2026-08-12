// Re-labels a generated inventory evenly across the five player-facing clue
// difficulties and selects the best available clue variant for every answer.

import fs from "node:fs";
import path from "node:path";
import { WORD_BANK } from "../worker/corpus.js";
import { applyDifficultyClues } from "../worker/generator.js";
import { validateBlueprint } from "./puzzle-inventory.mjs";

const DIFFICULTIES = ["beginner", "easy", "medium", "hard", "expert"];

function option(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const input = option("file");
const output = option("out", input);
if (!input || !output) throw new Error("Pass --file and optionally --out.");

const manifest = JSON.parse(fs.readFileSync(path.resolve(input), "utf8"));
if (manifest?.version !== 1 || !Array.isArray(manifest.blueprints)) {
  throw new Error("Expected a version 1 inventory manifest.");
}
if (manifest.blueprints.length % DIFFICULTIES.length !== 0) {
  throw new Error(`Blueprint count must divide evenly across ${DIFFICULTIES.length} difficulties.`);
}

const perDifficulty = manifest.blueprints.length / DIFFICULTIES.length;
const balanced = manifest.blueprints.map((blueprint, index) => {
  const difficulty = DIFFICULTIES[Math.floor(index / perDifficulty)];
  const category = String(blueprint.category).toLowerCase();
  const themedAnswers = new Set(WORD_BANK
    .filter((entry) => String(entry.cat).toLowerCase() === category)
    .map((entry) => entry.w));
  const assignment = blueprint.grid.words.map((word) => ({
    word: word.answer,
    clue: word.clue,
    diff: 2,
    themed: themedAnswers.has(word.answer),
  }));
  const clues = applyDifficultyClues(assignment, WORD_BANK, [category], difficulty);
  const grid = {
    ...blueprint.grid,
    words: blueprint.grid.words.map((word, wordIndex) => ({ ...word, clue: clues[wordIndex].clue })),
  };
  const candidate = { ...blueprint, difficulty, grid, gridHash: undefined };
  const validation = validateBlueprint(candidate);
  if (!validation.ok) throw new Error(`${blueprint.id}: ${validation.errors.join("; ")}`);
  return {
    ...candidate,
    id: `${category.replace(/[^a-z0-9]+/g, "-")}-${blueprint.size}-${difficulty}-${validation.gridHash.slice(0, 12)}`,
    gridHash: validation.gridHash,
    grid: validation.grid,
    updatedAt: new Date().toISOString(),
    metadata: { ...(blueprint.metadata || {}), clueDifficultyBalanced: true },
  };
});

fs.writeFileSync(path.resolve(output), `${JSON.stringify({
  ...manifest,
  generatedAt: new Date().toISOString(),
  blueprints: balanced,
}, null, 2)}\n`);
console.log(`Balanced ${balanced.length} blueprints (${perDifficulty} per difficulty) in ${path.resolve(output)}.`);
