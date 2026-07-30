// Generate PWA icons as raw PNGs using only Node's built-in zlib — same
// zero-dependency approach as Boys Pushup Bonanza's icon script (no
// canvas/image library on this machine). Run: node scripts/generate-icons.cjs
//
// The mark reuses the exact 4x4 colored-tile pattern from the Completion
// screen's mockup (design_handoff_across_mobile), converted from its OKLCH
// design tokens via a real OKLCH->sRGB conversion so the icon's colors
// match the app's actual player hues rather than an eyeballed approximation.
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const BG = hexToRgb("#faf8f4");
const HUES = [250, 30, 140, 90]; // blue, coral, green, amber — see style.css --player-hue-*
// Same 4x4 pattern as .completion-badge-grid in the mockup.
const PATTERN = [
  [0, 1, 2, 0],
  [1, 2, 1, 0],
  [0, 2, 1, 2],
  [1, 0, 2, 1],
];

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// ---- OKLCH -> sRGB (Björn Ottosson's OKLab, standard matrices) ----
function oklchToRgb(L, C, Hdeg) {
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;

  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  const enc = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(Math.max(c, 0), 1 / 2.4) - 0.055);
  return [r, g, bl].map((c) => Math.round(Math.max(0, Math.min(1, enc(c))) * 255));
}

const HUE_RGB = HUES.map((h) => oklchToRgb(0.58, 0.1, h));

function makeCanvas(size, bg) {
  const px = new Array(size * size);
  for (let i = 0; i < px.length; i++) px[i] = [bg[0], bg[1], bg[2]];
  return { size, px };
}
function blendPx(canvas, x, y, color, alpha) {
  if (alpha <= 0 || x < 0 || y < 0 || x >= canvas.size || y >= canvas.size) return;
  const i = y * canvas.size + x;
  const dst = canvas.px[i];
  canvas.px[i] = [
    dst[0] + (color[0] - dst[0]) * alpha,
    dst[1] + (color[1] - dst[1]) * alpha,
    dst[2] + (color[2] - dst[2]) * alpha,
  ];
}
function roundedRectSdf(px, py, x0, y0, x1, y1, radius) {
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const hx = (x1 - x0) / 2 - radius, hy = (y1 - y0) / 2 - radius;
  const dx = Math.abs(px - cx) - hx;
  const dy = Math.abs(py - cy) - hy;
  const ax = Math.max(dx, 0), ay = Math.max(dy, 0);
  return Math.sqrt(ax * ax + ay * ay) + Math.min(Math.max(dx, dy), 0) - radius;
}
function fillRoundedRect(canvas, x0, y0, x1, y1, radius, color) {
  const minX = Math.max(0, Math.floor(x0 - 1)), maxX = Math.min(canvas.size - 1, Math.ceil(x1 + 1));
  const minY = Math.max(0, Math.floor(y0 - 1)), maxY = Math.min(canvas.size - 1, Math.ceil(y1 + 1));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const d = roundedRectSdf(x + 0.5, y + 0.5, x0, y0, x1, y1, radius);
      const coverage = Math.max(0, Math.min(1, 0.5 - d));
      if (coverage > 0) blendPx(canvas, x, y, color, coverage);
    }
  }
}

function drawMark(canvas, size) {
  fillRoundedRect(canvas, 0, 0, size, size, size * 0.22, BG);

  const gridSize = size * 0.62;
  const gap = size * 0.035;
  const cell = (gridSize - gap * 3) / 4;
  const originX = (size - gridSize) / 2;
  const originY = (size - gridSize) / 2;

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x0 = originX + c * (cell + gap);
      const y0 = originY + r * (cell + gap);
      fillRoundedRect(canvas, x0, y0, x0 + cell, y0 + cell, size * 0.018, HUE_RGB[PATTERN[r][c]]);
    }
  }
}

function crc32(buf) {
  return zlib.crc32 ? zlib.crc32(buf) >>> 0 : (() => {
    let c, crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = (crc ^ buf[i]) & 0xff;
      for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      crc = (crc >>> 8) ^ c;
    }
    return (crc ^ 0xffffffff) >>> 0;
  })();
}
function chunk(tag, data) {
  const tagBuf = Buffer.from(tag, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([tagBuf, data])), 0);
  return Buffer.concat([lenBuf, tagBuf, data, crcBuf]);
}
function writePng(filePath, canvas) {
  const size = canvas.size;
  const rowBytes = 1 + size * 4;
  const raw = Buffer.alloc(rowBytes * size);
  for (let y = 0; y < size; y++) {
    const rowStart = y * rowBytes;
    raw[rowStart] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b] = canvas.px[y * size + x];
      const off = rowStart + 1 + x * 4;
      raw[off] = Math.round(Math.max(0, Math.min(255, r)));
      raw[off + 1] = Math.round(Math.max(0, Math.min(255, g)));
      raw[off + 2] = Math.round(Math.max(0, Math.min(255, b)));
      raw[off + 3] = 255;
    }
  }
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const idat = zlib.deflateSync(raw, { level: 9 });
  const png = Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
  fs.writeFileSync(filePath, png);
}

function main() {
  const outDir = path.join(__dirname, "..", "icons");
  fs.mkdirSync(outDir, { recursive: true });
  for (const [size, name] of [[192, "icon-192.png"], [512, "icon-512.png"], [180, "apple-touch-icon.png"]]) {
    const canvas = makeCanvas(size, BG);
    drawMark(canvas, size);
    writePng(path.join(outDir, name), canvas);
    console.log("wrote", name);
  }
}

main();
