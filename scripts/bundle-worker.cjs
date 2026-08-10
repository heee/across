// Concatenates worker/corpus.js + worker/generator.js + worker/index.js into
// a single deployable file, stripping their import/export statements.
//
// Why this exists: worker/index.js is written as ES modules importing from
// ./corpus.js and ./generator.js, which is the cleanest way to maintain it
// and works fine if your Cloudflare dashboard's Worker code editor supports
// multiple files (the modern "Edit code" view generally does). If you only
// have the older single-file Quick Edit textarea, run this script and paste
// worker/dist/bundle.js instead — same result, one file.
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

const corpus = stripModuleSyntax(fs.readFileSync(path.join(workerDir, "corpus.js"), "utf8"));
const generator = stripModuleSyntax(fs.readFileSync(path.join(workerDir, "generator.js"), "utf8"));
// index.js keeps its `export default` and `export class PuzzleRoom` — those
// two exports are required by the Workers runtime itself.
const index = stripModuleSyntax(fs.readFileSync(path.join(workerDir, "index.js"), "utf8"), {
  keepDefaultExport: true,
  keepClassExport: true,
});

const banner = `// AUTO-GENERATED — do not edit directly.\n// Source: worker/corpus.js + worker/generator.js + worker/index.js\n// Regenerate with: node scripts/bundle-worker.cjs\n\n`;

fs.mkdirSync(distDir, { recursive: true });
const bundle = banner + corpus + "\n\n" + generator + "\n\n" + index;
fs.writeFileSync(path.join(distDir, "bundle.js"), `${bundle.trimEnd()}\n`, "utf8");

console.log("Wrote worker/dist/bundle.js");
