// Generate the complete PWA/iOS icon set from the approved high-resolution
// artwork in icons/icon-source.png. This intentionally performs only a
// deterministic resize: the source already includes a full-bleed background
// and keeps its crossword mark inside the maskable safe area.
//
// Run: node scripts/generate-icons.cjs
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "icons", "icon-source.png");

function crc32(buf) {
  if (zlib.crc32) return zlib.crc32(buf) >>> 0;
  let crc = 0xffffffff;
  for (const byte of buf) {
    let c = (crc ^ byte) & 0xff;
    for (let i = 0; i < 8; i++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(tag, data) {
  const tagBuf = Buffer.from(tag, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([tagBuf, data])));
  return Buffer.concat([length, tagBuf, data, checksum]);
}

function decodeRgbaPng(file) {
  const png = fs.readFileSync(file);
  const signature = "89504e470d0a1a0a";
  if (png.subarray(0, 8).toString("hex") !== signature) throw new Error("Icon source is not a PNG");

  let width = 0, height = 0, bitDepth = 0, colorType = 0, interlace = 0;
  const idat = [];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("ascii", offset + 4, offset + 8);
    const data = png.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += length + 12;
  }
  if (bitDepth !== 8 || colorType !== 6 || interlace !== 0) {
    throw new Error(`Expected a non-interlaced 8-bit RGBA PNG; got depth=${bitDepth}, color=${colorType}, interlace=${interlace}`);
  }

  const packed = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * 4;
  const pixels = Buffer.alloc(width * height * 4);
  let input = 0;
  for (let y = 0; y < height; y++) {
    const filter = packed[input++];
    const row = y * stride;
    for (let x = 0; x < stride; x++) {
      const raw = packed[input++];
      const left = x >= 4 ? pixels[row + x - 4] : 0;
      const up = y > 0 ? pixels[row - stride + x] : 0;
      const upLeft = y > 0 && x >= 4 ? pixels[row - stride + x - 4] : 0;
      let value;
      if (filter === 0) value = raw;
      else if (filter === 1) value = raw + left;
      else if (filter === 2) value = raw + up;
      else if (filter === 3) value = raw + Math.floor((left + up) / 2);
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left), pb = Math.abs(p - up), pc = Math.abs(p - upLeft);
        value = raw + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft);
      } else throw new Error(`Unsupported PNG row filter ${filter}`);
      pixels[row + x] = value & 0xff;
    }
  }
  return { width, height, pixels };
}

// Exact area averaging gives crisp, stable reductions when every target is
// an integer divisor of the 2048px source (2x, 4x, 8x, etc.). The 180px iOS
// target uses the same weighted area method without relying on native tools.
function resizeArea(source, targetSize) {
  const { width, height, pixels } = source;
  if (width !== height || targetSize > width) throw new Error("Icon source must be square and no smaller than the target");
  const output = Buffer.alloc(targetSize * targetSize * 4);
  const scale = width / targetSize;
  for (let ty = 0; ty < targetSize; ty++) {
    const sy0 = ty * scale, sy1 = (ty + 1) * scale;
    const yStart = Math.floor(sy0), yEnd = Math.ceil(sy1);
    for (let tx = 0; tx < targetSize; tx++) {
      const sx0 = tx * scale, sx1 = (tx + 1) * scale;
      const xStart = Math.floor(sx0), xEnd = Math.ceil(sx1);
      const sums = [0, 0, 0, 0];
      let total = 0;
      for (let sy = yStart; sy < yEnd; sy++) {
        const wy = Math.min(sy + 1, sy1) - Math.max(sy, sy0);
        for (let sx = xStart; sx < xEnd; sx++) {
          const wx = Math.min(sx + 1, sx1) - Math.max(sx, sx0);
          const weight = wx * wy;
          const src = (sy * width + sx) * 4;
          for (let channel = 0; channel < 4; channel++) sums[channel] += pixels[src + channel] * weight;
          total += weight;
        }
      }
      const dst = (ty * targetSize + tx) * 4;
      for (let channel = 0; channel < 4; channel++) output[dst + channel] = Math.round(sums[channel] / total);
    }
  }
  return output;
}

function writeRgbaPng(file, size, pixels) {
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const png = Buffer.concat([
    Buffer.from("89504e470d0a1a0a", "hex"),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  fs.writeFileSync(file, png);
}

function main() {
  const source = decodeRgbaPng(SOURCE);
  const targets = [
    [1024, "icon-1024.png"],
    [512, "icon-512.png"],
    [192, "icon-192.png"],
    [180, "apple-touch-icon.png"],
    [512, "icon-512-maskable.png"],
    [192, "icon-192-maskable.png"],
  ];
  for (const [size, name] of targets) {
    writeRgbaPng(path.join(ROOT, "icons", name), size, resizeArea(source, size));
    console.log(`wrote ${name} (${size}x${size})`);
  }
}

main();
