// Across — crossword grid generator.
//
// A simplified constraint-based fill: place the longest candidate word,
// then greedily place further words wherever they can validly intersect
// what's already down, backtracking-free (skip and move to the next
// candidate on failure rather than undoing prior placements). This is not
// the symmetric-block-pattern-first approach a real NYT-style constructor
// uses — grids will be sparser and less uniformly shaped — but it's real
// interlocking generation from the word bank, constrained by keywords,
// size, and difficulty.
//
// Density is improved three cost-bounded ways (kept bounded rather than
// exhaustive because this runs as pure CPU-bound JS inside a Cloudflare
// Worker request, which has a real — and on the free plan, tight — CPU
// time budget per invocation; unlike I/O waits, computation time here
// counts directly against that budget):
//   1. findPlacement prefers a placement that overlaps 2+ existing letters
//      over one that only overlaps 1, instead of just taking whichever
//      valid spot is scanned first.
//   2. attemptFill sweeps the candidate list up to 3 times — a word that
//      couldn't intersect anything on pass 1 often can once more letters
//      are down from later passes.
//   3. generatePuzzle tries a few full reshuffled attempts and keeps
//      whichever produced the tightest-packed (highest fill-ratio) grid.
// Together that's at most a 3x3=9x multiplier over the original
// single-pass/single-attempt cost, not an unbounded search.

const SIZE_MAP = { mini: 5, standard: 11, large: 15 };
const DIFFICULTY_MAP = { easy: 1, medium: 2, hard: 3 };
// Aspirational caps — the fill loop stops early if the candidate pool (esp.
// a narrow single-category one) runs out before reaching these.
const TARGET_WORDS = { mini: 8, standard: 24, large: 38 };
const FILL_ATTEMPTS = 5;
const FILL_PASSES = 4;

export function generatePuzzle({ keywords = [], size = "standard", difficulty = "medium", wordBank }) {
  const n = SIZE_MAP[size] || SIZE_MAP.standard;
  const maxDiff = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP.medium;
  const targetWords = TARGET_WORDS[size] || TARGET_WORDS.standard;

  const groups = buildCandidateGroups(wordBank, keywords, maxDiff, n);
  let result = attemptBest(groups, n, targetWords);

  if (result.words.length < 3 && keywords.length > 0) {
    // Keywords were too restrictive to build a real grid — retry with the
    // full corpus so puzzle creation doesn't just fail on a niche topic.
    const fallbackGroups = buildCandidateGroups(wordBank, [], maxDiff, n);
    result = attemptBest(fallbackGroups, n, targetWords);
  }

  if (result.words.length < 3) {
    throw new Error("could not generate enough interlocking words for this size/difficulty");
  }

  return cropAndNumber(result.grid, result.words, n);
}

// Runs a few independently-reshuffled fill attempts and keeps whichever
// packed the most letters into the tightest bounding box — a cheap stand-in
// for real backtracking search.
function attemptBest(groups, n, targetWords) {
  let best = null;
  let bestScore = -1;
  for (let i = 0; i < FILL_ATTEMPTS; i++) {
    const candidates = groups.flatMap((g) => shuffleByLength(g));
    const result = attemptFill(candidates, n, targetWords);
    const score = densityScore(result.grid, n);
    if (score > bestScore) {
      bestScore = score;
      best = result;
    }
  }
  return best;
}

function densityScore(grid, n) {
  let minRow = n, maxRow = -1, minCol = n, maxCol = -1, filled = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c].letter) {
        minRow = Math.min(minRow, r);
        maxRow = Math.max(maxRow, r);
        minCol = Math.min(minCol, c);
        maxCol = Math.max(maxCol, c);
        filled++;
      }
    }
  }
  if (filled === 0) return 0;
  const area = (maxRow - minRow + 1) * (maxCol - minCol + 1);
  // Filled-cell count weighted by how tightly packed they are — rewards
  // both "more words" and "less white space" together, since either alone
  // is a bad proxy (a tiny fully-packed cluster shouldn't beat a bigger,
  // still-reasonably-dense grid).
  return filled * (filled / area);
}

// Returns priority-ordered *groups* (not a flat shuffled list) so
// attemptBest can reshuffle within each group per attempt while preserving
// the strong/weak keyword-match priority across every attempt.
function buildCandidateGroups(wordBank, keywords, maxDiff, n) {
  const seen = new Set();
  const deduped = [];
  for (const entry of wordBank) {
    const w = entry.w.toUpperCase();
    if (!/^[A-Z]+$/.test(w)) continue;
    if (w.length < 3 || w.length > n) continue;
    if (entry.diff > maxDiff) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    deduped.push({ word: w, clue: entry.c, cat: entry.cat });
  }

  // Multi-word topics ("European capitals") almost never appear as one
  // exact substring in a clue, so match on individual significant words
  // instead (dropping short stopwords that would otherwise match almost
  // everything).
  const STOPWORDS = new Set(["the", "and", "for", "with", "from", "that", "this", "are", "was", "were"]);
  const rawTokens = keywords
    .flatMap((k) => k.toLowerCase().split(/\s+/))
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
  // A plain substring check misses "capitals" against a clue that says
  // "capital" (singular) — add the naive-singular form of any plural-looking
  // token so simple pluralization doesn't cause a miss.
  const keywordTokens = [...new Set(rawTokens.flatMap((t) => (t.endsWith("s") && t.length > 4 ? [t, t.slice(0, -1)] : [t])))];
  const matchCount = (entry) => {
    if (keywordTokens.length === 0) return 0;
    const hay = `${entry.word.toLowerCase()} ${entry.clue.toLowerCase()} ${entry.cat.toLowerCase()}`;
    return keywordTokens.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0);
  };

  if (keywordTokens.length === 0) return [deduped];

  // Keyword-topic puzzles stay 100% on-topic — no silent padding from the
  // rest of the word bank. If that's too sparse to build a real grid,
  // generatePuzzle()'s caller-level fallback retries with the full corpus.
  //
  // Entries matching more than one keyword token (e.g. both "european" and
  // "capital" for the topic "European capitals") are placed first, so a
  // compound topic prioritizes its most specifically-relevant words as
  // anchors before falling back to single-token matches to fill the grid.
  const strong = [];
  const weak = [];
  for (const entry of deduped) {
    const n = matchCount(entry);
    if (n >= 2) strong.push(entry);
    else if (n === 1) weak.push(entry);
  }
  return [strong, weak];
}

function shuffleByLength(list) {
  // Sort longest-first (better anchors / more intersection surface),
  // shuffling within each length band so regenerating the same request
  // doesn't always produce an identical grid.
  const byLength = new Map();
  for (const entry of list) {
    if (!byLength.has(entry.word.length)) byLength.set(entry.word.length, []);
    byLength.get(entry.word.length).push(entry);
  }
  const lengths = [...byLength.keys()].sort((a, b) => b - a);
  const out = [];
  for (const len of lengths) {
    const bucket = byLength.get(len);
    for (let i = bucket.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bucket[i], bucket[j]] = [bucket[j], bucket[i]];
    }
    out.push(...bucket);
  }
  return out;
}

function attemptFill(candidates, n, targetWords) {
  if (candidates.length === 0) return { grid: makeEmptyGrid(n), words: [] };

  const grid = makeEmptyGrid(n);
  const words = [];
  const placedSet = new Set();

  const first = candidates[0];
  const startRow = Math.floor(n / 2);
  const startCol = Math.floor((n - first.word.length) / 2);
  placeWord(grid, first.word, startRow, startCol, "across");
  words.push(makeWordRecord(first, startRow, startCol, "across", words.length));
  placedSet.add(first.word);

  // Multiple sweeps: a word that couldn't intersect anything on pass 1 may
  // become placeable once later words in that same pass opened up new
  // letters, so re-sweep the still-unplaced candidates a bounded number of
  // times rather than a single forward pass.
  for (let pass = 0; pass < FILL_PASSES && words.length < targetWords; pass++) {
    let placedThisPass = false;
    for (let idx = 1; idx < candidates.length && words.length < targetWords; idx++) {
      const entry = candidates[idx];
      if (placedSet.has(entry.word)) continue;
      const placement = findPlacement(grid, entry.word, n);
      if (!placement) continue;
      placeWord(grid, entry.word, placement.row, placement.col, placement.direction);
      words.push(makeWordRecord(entry, placement.row, placement.col, placement.direction, words.length));
      placedSet.add(entry.word);
      placedThisPass = true;
    }
    if (!placedThisPass) break; // no point sweeping again if nothing changed
  }

  return { grid, words };
}

function makeWordRecord(entry, row, col, direction, tempId) {
  return { id: tempId, answer: entry.word, clue: entry.clue, row, col, direction, length: entry.word.length };
}

function makeEmptyGrid(n) {
  const grid = [];
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push({ letter: null, across: false, down: false });
    grid.push(row);
  }
  return grid;
}

function inBounds(n, r, c) {
  return r >= 0 && r < n && c >= 0 && c < n;
}

// Prefers a placement that overlaps 2+ existing letters (denser — it's
// pulling double duty crossing two words) over one that only overlaps the
// single letter it was found from, but doesn't exhaustively search for the
// true best — stops as soon as it finds a "good enough" (2+) one, falling
// back to the first valid placement seen if nothing better ever turns up.
// Same overall scan cost as plain first-fit, just smarter about which hit
// it commits to.
function findPlacement(grid, word, n) {
  let fallback = null;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const cell = grid[r][c];
        if (cell.letter !== letter) continue;

        let direction = null;
        if (cell.across && !cell.down) direction = "down";
        else if (cell.down && !cell.across) direction = "across";
        else continue; // both taken, or neither (shouldn't happen for a filled cell)

        const row = direction === "down" ? r - i : r;
        const col = direction === "across" ? c - i : c;
        const overlaps = validPlacementOverlaps(grid, word, row, col, direction, n);
        if (overlaps === 0) continue; // invalid
        if (overlaps >= 2) return { row, col, direction };
        if (!fallback) fallback = { row, col, direction };
      }
    }
  }
  return fallback;
}

// Returns the number of existing letters this placement would overlap
// (always >=1 for a valid placement, since it must intersect something to
// be valid at all), or 0 if the placement isn't valid.
function validPlacementOverlaps(grid, word, row, col, direction, n) {
  return isValidPlacement(grid, word, row, col, direction, n) ? countOverlaps(grid, word, row, col, direction) : 0;
}

function countOverlaps(grid, word, row, col, direction) {
  const dRow = direction === "down" ? 1 : 0;
  const dCol = direction === "across" ? 1 : 0;
  let overlaps = 0;
  for (let i = 0; i < word.length; i++) {
    if (grid[row + dRow * i][col + dCol * i].letter) overlaps++;
  }
  return overlaps;
}

function isValidPlacement(grid, word, row, col, direction, n) {
  const dRow = direction === "down" ? 1 : 0;
  const dCol = direction === "across" ? 1 : 0;

  const endRow = row + dRow * (word.length - 1);
  const endCol = col + dCol * (word.length - 1);
  if (!inBounds(n, row, col) || !inBounds(n, endRow, endCol)) return false;

  const beforeRow = row - dRow;
  const beforeCol = col - dCol;
  if (inBounds(n, beforeRow, beforeCol) && grid[beforeRow][beforeCol].letter) return false;
  const afterRow = row + dRow * word.length;
  const afterCol = col + dCol * word.length;
  if (inBounds(n, afterRow, afterCol) && grid[afterRow][afterCol].letter) return false;

  let hasIntersection = false;
  for (let i = 0; i < word.length; i++) {
    const r = row + dRow * i;
    const c = col + dCol * i;
    const cell = grid[r][c];

    if (cell.letter) {
      if (cell.letter !== word[i]) return false;
      // Existing cell being crossed — must not already have this same
      // direction occupied (would mean overlapping parallel words).
      if (direction === "across" && cell.across) return false;
      if (direction === "down" && cell.down) return false;
      hasIntersection = true;
      continue;
    }

    // New cell for this word — its perpendicular neighbors must be empty,
    // otherwise it would silently run alongside another word.
    const perp1r = r + dCol;
    const perp1c = c + dRow;
    const perp2r = r - dCol;
    const perp2c = c - dRow;
    if (inBounds(n, perp1r, perp1c) && grid[perp1r][perp1c].letter) return false;
    if (inBounds(n, perp2r, perp2c) && grid[perp2r][perp2c].letter) return false;
  }

  return hasIntersection;
}

function placeWord(grid, word, row, col, direction) {
  const dRow = direction === "down" ? 1 : 0;
  const dCol = direction === "across" ? 1 : 0;
  for (let i = 0; i < word.length; i++) {
    const r = row + dRow * i;
    const c = col + dCol * i;
    grid[r][c].letter = word[i];
    if (direction === "across") grid[r][c].across = true;
    else grid[r][c].down = true;
  }
}

function cropAndNumber(grid, words, n) {
  let minRow = n, maxRow = -1, minCol = n, maxCol = -1;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c].letter) {
        minRow = Math.min(minRow, r);
        maxRow = Math.max(maxRow, r);
        minCol = Math.min(minCol, c);
        maxCol = Math.max(maxCol, c);
      }
    }
  }

  const rows = maxRow - minRow + 1;
  const cols = maxCol - minCol + 1;

  const cells = [];
  const numberAt = new Map();
  let nextNumber = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const src = grid[r + minRow][c + minCol];
      const block = !src.letter;
      let number = null;
      if (!block) {
        const startsAcross = src.across && (c === 0 || !grid[r + minRow][c + minCol - 1].letter) && c + 1 < cols && grid[r + minRow][c + minCol + 1]?.letter;
        const startsDown = src.down && (r === 0 || !grid[r + minRow - 1][c + minCol]?.letter) && r + 1 < rows && grid[r + minRow + 1]?.[c + minCol]?.letter;
        if (startsAcross || startsDown) {
          number = nextNumber++;
          numberAt.set(`${r}-${c}`, number);
        }
      }
      cells.push({ row: r, col: c, letter: block ? null : src.letter, block, number });
    }
  }

  const finalWords = words.map((w) => {
    const row = w.row - minRow;
    const col = w.col - minCol;
    const number = numberAt.get(`${row}-${col}`) || null;
    const wordCells = [];
    for (let i = 0; i < w.length; i++) {
      wordCells.push(w.direction === "across" ? [row, col + i] : [row + i, col]);
    }
    return { number, direction: w.direction, answer: w.answer, clue: w.clue, row, col, length: w.length, cells: wordCells };
  }).filter((w) => w.number !== null)
    .sort((a, b) => a.number - b.number || (a.direction === "across" ? 0 : 1) - (b.direction === "across" ? 0 : 1));

  return { rows, cols, cells, words: finalWords };
}
