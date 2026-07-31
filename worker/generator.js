// Across — crossword grid generator.
//
// A simplified constraint-based fill: place the longest candidate word,
// then greedily place further words wherever they can validly intersect
// what's already down, backtracking-free (skip and move to the next
// candidate on failure rather than undoing prior placements). This is not
// the symmetric-block-pattern-first approach a real NYT-style constructor
// uses — grids will be sparser and less uniformly shaped — but it's real
// interlocking generation from the word bank, constrained by keywords,
// size, and difficulty, which is what v1 needs. Revisit with a proper
// symmetric template + full backtracking if grid density becomes a
// complaint once real puzzles are being played.

const SIZE_MAP = { mini: 5, standard: 11, large: 15 };
const DIFFICULTY_MAP = { easy: 1, medium: 2, hard: 3 };
const TARGET_WORDS = { mini: 6, standard: 18, large: 30 };

export function generatePuzzle({ keywords = [], size = "standard", difficulty = "medium", wordBank }) {
  const n = SIZE_MAP[size] || SIZE_MAP.standard;
  const maxDiff = DIFFICULTY_MAP[difficulty] || DIFFICULTY_MAP.medium;
  const targetWords = TARGET_WORDS[size] || TARGET_WORDS.standard;

  const candidates = buildCandidateList(wordBank, keywords, maxDiff, n);
  let result = attemptFill(candidates, n, targetWords);

  if (result.words.length < 3 && keywords.length > 0) {
    // Keywords were too restrictive to build a real grid — retry with the
    // full corpus so puzzle creation doesn't just fail on a niche topic.
    const fallbackCandidates = buildCandidateList(wordBank, [], maxDiff, n);
    result = attemptFill(fallbackCandidates, n, targetWords);
  }

  if (result.words.length < 3) {
    throw new Error("could not generate enough interlocking words for this size/difficulty");
  }

  return cropAndNumber(result.grid, result.words, n);
}

function buildCandidateList(wordBank, keywords, maxDiff, n) {
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

  if (keywordTokens.length === 0) return shuffleByLength(deduped);

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
  return [...shuffleByLength(strong), ...shuffleByLength(weak)];
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

  for (let idx = 1; idx < candidates.length && words.length < targetWords; idx++) {
    const entry = candidates[idx];
    if (placedSet.has(entry.word)) continue;
    const placement = findPlacement(grid, entry.word, n);
    if (!placement) continue;
    placeWord(grid, entry.word, placement.row, placement.col, placement.direction);
    words.push(makeWordRecord(entry, placement.row, placement.col, placement.direction, words.length));
    placedSet.add(entry.word);
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

function findPlacement(grid, word, n) {
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
        if (isValidPlacement(grid, word, row, col, direction, n)) {
          return { row, col, direction };
        }
      }
    }
  }
  return null;
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
