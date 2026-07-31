// One-off tool: randomly generates 180-degree-symmetric block patterns,
// validates them with the generator's own validateTemplate, and additionally
// rejects any template that leans too hard on word lengths our corpus is
// thin at (9-11+ letters) — that mismatch, not a solver bug, was why the
// hand-written templates never filled within budget. Prints the winners as
// JS array literals to paste into generator.js's TEMPLATES.
import { WORD_BANK } from "../worker/corpus.js";
import { validateTemplate, extractSlots } from "../worker/generator.js";

// Incremental construction: start from the all-white grid (always valid —
// trivially connected, every run is the full length >=3, full coverage),
// then repeatedly try adding one random symmetric block-pair, keeping the
// addition only if the template is *still* valid afterward. Pure
// from-scratch random placement almost never satisfies the connectivity +
// min-run + full-coverage constraints simultaneously at 11x11/15x15 scale
// (see the abandoned randomSymmetricTemplate attempt); walking there one
// validated step at a time succeeds far more often because every
// intermediate state is already known-good.
function randomSymmetricTemplate(n, targetBlockCount) {
  let grid = Array.from({ length: n }, () => Array(n).fill("."));
  const mid = n % 2 === 1 ? Math.floor(n / 2) : -1;

  const cellPairs = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const mr = n - 1 - r, mc = n - 1 - c;
    if (r < mr || (r === mr && c < mc)) cellPairs.push([r, c, mr, mc]);
  }

  let blockCount = 0;
  const maxTries = 4000;
  for (let tries = 0; tries < maxTries && blockCount < targetBlockCount; tries++) {
    const [r, c, mr, mc] = cellPairs[Math.floor(Math.random() * cellPairs.length)];
    if (grid[r][c] === "#") continue;
    const next = grid.map((row) => row.slice());
    next[r][c] = "#";
    next[mr][mc] = "#";
    const rows = next.map((row) => row.join(""));
    if (validateTemplate(rows).ok) {
      grid = next;
      blockCount += r === mr && c === mc ? 1 : 2;
    }
  }
  if (mid >= 0 && targetBlockCount % 2 === 1 && grid[mid][mid] === ".") {
    const next = grid.map((row) => row.slice());
    next[mid][mid] = "#";
    const rows = next.map((row) => row.join(""));
    if (validateTemplate(rows).ok) grid = next;
  }
  return grid.map((row) => row.join(""));
}

function maxLenPool(wordBank, n) {
  const seen = new Set();
  const byLen = new Map();
  for (const e of wordBank) {
    const w = e.w.toUpperCase();
    if (!/^[A-Z]+$/.test(w) || w.length < 3 || w.length > n || seen.has(w)) continue;
    seen.add(w);
    byLen.set(w.length, (byLen.get(w.length) || 0) + 1);
  }
  return byLen;
}

function score(rows, n, poolByLen) {
  const v = validateTemplate(rows);
  if (!v.ok) return null;
  const slots = extractSlots(rows);
  // Penalize slots whose length has a thin pool relative to how many
  // simultaneous slots of that length this template demands — the actual
  // failure mode we saw (6 slots chasing a 31-word pool).
  const byLen = {};
  for (const s of slots) byLen[s.length] = (byLen[s.length] || 0) + 1;
  let tightness = 0;
  for (const [len, count] of Object.entries(byLen)) {
    const pool = poolByLen.get(+len) || 1;
    tightness += (count * count) / pool; // demand^2/supply — quadratic penalty for stacking many same-length slots against a small pool
  }
  const fill = v.whiteCount / (v.whiteCount + v.blockCount);
  return { fill, tightness, slots: slots.length, byLen };
}

function findBest(n, blockCount, attempts, wordBank) {
  const poolByLen = maxLenPool(wordBank, n);
  let best = null;
  for (let i = 0; i < attempts; i++) {
    const rows = randomSymmetricTemplate(n, blockCount);
    const s = score(rows, n, poolByLen);
    if (!s) continue;
    if (!best || s.tightness < best.s.tightness) best = { rows, s };
  }
  return best;
}

const CONFIGS = [
  { size: "mini", n: 5, blockCounts: [4, 6], perCount: 500 },
  { size: "standard", n: 11, blockCounts: [20, 22, 24, 26, 28, 30, 32], perCount: 1500 },
  { size: "large", n: 15, blockCounts: [38, 42, 46, 50, 54, 58], perCount: 1000 },
];

for (const cfg of CONFIGS) {
  console.log(`\n  ${cfg.size}: [`);
  const results = [];
  for (const bc of cfg.blockCounts) {
    const best = findBest(cfg.n, bc, cfg.perCount, WORD_BANK);
    if (best) results.push({ bc, ...best });
  }
  results.sort((a, b) => a.s.tightness - b.s.tightness);
  for (const r of results) {
    const fillPct = Math.round(r.s.fill * 100);
    console.log(`    // blocks=${r.bc} fill=${fillPct}% tightness=${r.s.tightness.toFixed(2)} lens=${JSON.stringify(r.s.byLen)}`);
    console.log(`    [${r.rows.map((row) => `"${row}"`).join(", ")}],`);
  }
  console.log(`  ],`);
}
