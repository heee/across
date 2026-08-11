// One-off tool: randomly generates 180-degree-symmetric block patterns,
// validates them with the generator's own validateTemplate, and additionally
// rejects any template that leans too hard on word lengths our corpus is
// thin at (9-11+ letters) — that mismatch, not a solver bug, was why the
// hand-written templates never filled within budget. Prints the winners as
// JS array literals to paste into generator.js's TEMPLATES.
import { WORD_BANK } from "../worker/corpus.js";
import {
  buildCandidatePool,
  buildWordIndex,
  extractSlots,
  pruneDomains,
  runMaintainingArcConsistencyFill,
  validateTemplate,
} from "../worker/generator.js";

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
    tightness += (count * count) / pool;
    // Crossing combinations tighten much faster than raw bucket counts imply.
    // Prefer patterns dominated by flexible 3–6 letter fill.
    tightness += count * Math.pow(Math.max(0, Number(len) - 6), 3) * 0.08;
  }
  const fill = v.whiteCount / (v.whiteCount + v.blockCount);
  const shortSlots = slots.filter((slot) => slot.length <= 6).length;
  return { fill, blockCount: v.blockCount, tightness, slots: slots.length, shortRatio: shortSlots / slots.length, byLen };
}

function findBest(n, blockCount, attempts, wordBank, keep = 40) {
  const poolByLen = maxLenPool(wordBank, n);
  const candidates = new Map();
  for (let i = 0; i < attempts; i++) {
    const rows = randomSymmetricTemplate(n, blockCount);
    const s = score(rows, n, poolByLen);
    if (!s) continue;
    if (s.fill < 0.8) continue;
    candidates.set(rows.join("/"), { rows, s });
  }
  return [...candidates.values()]
    .sort((a, b) => a.s.tightness - b.s.tightness || b.s.shortRatio - a.s.shortRatio)
    .slice(0, keep);
}

function solveGenericMedium(rows, n, wordBank, budgetMs, retries) {
  const pool = buildCandidatePool(wordBank, [], "", 2, n);
  const index = buildWordIndex(pool);
  const slots = extractSlots(rows);
  const started = Date.now();
  for (let retry = 0; retry < retries; retry++) {
    const deadline = Date.now() + budgetMs;
    const domains = pruneDomains(slots, index, deadline);
    if (slots.some((slot) => (domains.get(slot.id) || []).length === 0)) continue;
    const result = runMaintainingArcConsistencyFill(slots, domains, new Set(), deadline, 2);
    if (result.success) return { solved: true, elapsedMs: Date.now() - started, retries: retry + 1 };
  }
  return { solved: false, elapsedMs: Date.now() - started, retries };
}

const CONFIGS = [
  { size: "mini", n: 5, blockCounts: [4, 6], perCount: 500 },
  { size: "quick", n: 7, blockCounts: [8, 10, 12, 14], perCount: 900 },
  { size: "compact", n: 9, blockCounts: [12, 14, 16], perCount: 5000 },
  { size: "standard", n: 11, blockCounts: [20, 22, 24, 26, 28, 30, 32], perCount: 1500 },
  { size: "large", n: 15, blockCounts: [38, 42, 46], perCount: 3000 },
];

const requestedSize = process.argv.find((arg) => !arg.startsWith("--") && arg !== process.argv[0] && arg !== process.argv[1]);
const solveCandidates = process.argv.includes("--solve");
const attemptOverride = Number.parseInt(process.env.TEMPLATE_ATTEMPTS || "", 10);
const solveBudgetMs = Number.parseInt(process.env.TEMPLATE_SOLVE_MS || "1500", 10);
const solveRetries = Number.parseInt(process.env.TEMPLATE_SOLVE_RETRIES || "2", 10);
const shortlist = Number.parseInt(process.env.TEMPLATE_SHORTLIST || "40", 10);
for (const cfg of CONFIGS.filter((item) => !requestedSize || item.size === requestedSize)) {
  console.log(`\n  ${cfg.size}: [`);
  const results = [];
  for (const bc of cfg.blockCounts) {
    const candidates = findBest(cfg.n, bc, attemptOverride || cfg.perCount, WORD_BANK, shortlist);
    for (const candidate of candidates) {
      const solve = solveCandidates
        ? solveGenericMedium(candidate.rows, cfg.n, WORD_BANK, solveBudgetMs, solveRetries)
        : { solved: true, elapsedMs: 0, retries: 0 };
      if (solve.solved) results.push({ bc, ...candidate, solve });
    }
  }
  results.sort((a, b) => a.s.tightness - b.s.tightness);
  for (const r of results) {
    const fillPct = Math.round(r.s.fill * 100);
    console.log(`    // blocks=${r.s.blockCount} fill=${fillPct}% tightness=${r.s.tightness.toFixed(2)} short=${Math.round(r.s.shortRatio * 100)}% genericMedium=${r.solve.elapsedMs}ms lens=${JSON.stringify(r.s.byLen)}`);
    console.log(`    [${r.rows.map((row) => `"${row}"`).join(", ")}],`);
  }
  console.log(`  ],`);
}
