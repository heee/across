// Produces the single deployable Worker file. Crossword generation and its
// corpus run in the browser; the Worker validates and persists grids.
// If you use the dashboard Quick Edit textarea, paste worker/dist/bundle.js.
//
//   node scripts/bundle-worker.cjs

const fs = require("fs");
const path = require("path");

const workerDir = path.join(__dirname, "..", "worker");
const distDir = path.join(workerDir, "dist");

function stripModuleSyntax(src, { keepDefaultExport = false, keepClassExport = false } = {}) {
  return src
    .split("\n")
    .filter((line) => !/^import .* from ["'].*["'];?$/.test(line.trim()))
    .join("\n")
    .replace(/^export const /gm, "const ")
    .replace(/^export function /gm, "function ")
    .replace(/^export \{[^}]+\};?$/gm, "")
    .replace(keepDefaultExport ? /\0/ : /^export default /gm, keepDefaultExport ? "$&" : "const __worker_default__ = ")
    .replace(keepClassExport ? /\0/ : /^export class /gm, keepClassExport ? "$&" : "class ");
}

// These two exports are required by the Workers runtime.
const index = stripModuleSyntax(fs.readFileSync(path.join(workerDir, "index.js"), "utf8"), {
  keepDefaultExport: true,
  keepClassExport: true,
});

const banner = `// AUTO-GENERATED — do not edit directly.\n// Source: worker/index.js\n// Regenerate with: node scripts/bundle-worker.cjs\n\n`;

fs.mkdirSync(distDir, { recursive: true });
const bundle = banner + index;
fs.writeFileSync(path.join(distDir, "bundle.js"), `${bundle.trimEnd()}\n`, "utf8");

console.log("Wrote worker/dist/bundle.js");
