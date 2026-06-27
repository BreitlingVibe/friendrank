import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const brandDir = path.join(root, "public/brand");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "app");

const sourceImage =
  process.env.FRIENDRANK_ICON_SOURCE ??
  path.join(brandDir, "friendrank-a2-source.png");

const PNG_SIZES = [
  { size: 16, name: "icon-16.png" },
  { size: 32, name: "icon-32.png" },
  { size: 48, name: "icon-48.png" },
  { size: 180, name: "icon-180.png" },
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },
];

const ICO_SIZES = [16, 32, 48];

/** White matte outside the rounded icon — connected to image edges only. */
function removeOpaqueWhiteBackground(rgba, width, height, threshold = 248) {
  const pixelCount = width * height;
  const isBackgroundCandidate = (offset) =>
    rgba[offset] >= threshold &&
    rgba[offset + 1] >= threshold &&
    rgba[offset + 2] >= threshold;

  const isBackground = new Uint8Array(pixelCount);
  const queue = [];

  const tryAdd = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return;
    }
    const idx = y * width + x;
    if (isBackground[idx]) {
      return;
    }
    const offset = idx * 4;
    if (!isBackgroundCandidate(offset)) {
      return;
    }
    isBackground[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    tryAdd(x, 0);
    tryAdd(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    tryAdd(0, y);
    tryAdd(width - 1, y);
  }

  for (let qi = 0; qi < queue.length; qi++) {
    const idx = queue[qi];
    const x = idx % width;
    const y = Math.floor(idx / width);
    tryAdd(x + 1, y);
    tryAdd(x - 1, y);
    tryAdd(x, y + 1);
    tryAdd(x, y - 1);
  }

  const output = Buffer.from(rgba);
  for (let idx = 0; idx < pixelCount; idx++) {
    if (isBackground[idx]) {
      output[idx * 4 + 3] = 0;
    }
  }

  return output;
}

async function loadTransparentMasterPng() {
  const { data, info } = await sharp(sourceImage)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = removeOpaqueWhiteBackground(data, info.width, info.height);

  return sharp(cleaned, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();
}

async function renderPng(masterPng, size, outputPath) {
  await sharp(masterPng)
    .resize(size, size, { kernel: sharp.kernel.lanczos3 })
    .ensureAlpha()
    .png()
    .toFile(outputPath);
}

function buildIco(images) {
  const count = images.length;
  const entrySize = 16;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + entrySize * count;

  for (const { size, png } of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(({ png }) => png)]);
}

async function writeMasterSvg(masterPngBuffer) {
  const base64 = masterPngBuffer.toString("base64");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="FriendRank A2 master icon">
  <title>FriendRank A2 Master</title>
  <image width="1024" height="1024" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${base64}"/>
</svg>
`;

  await writeFile(path.join(brandDir, "friendrank-master.svg"), svg, "utf8");
}

async function verifyTransparency(pngPathOrBuffer, label) {
  const image = Buffer.isBuffer(pngPathOrBuffer)
    ? sharp(pngPathOrBuffer)
    : sharp(pngPathOrBuffer);
  const name = label ?? (Buffer.isBuffer(pngPathOrBuffer) ? "buffer" : path.basename(pngPathOrBuffer));

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const corners = [
    [0, 0],
    [info.width - 1, 0],
    [0, info.height - 1],
    [info.width - 1, info.height - 1],
  ];

  for (const [x, y] of corners) {
    const offset = (y * info.width + x) * 4;
    const alpha = data[offset + 3];
    if (alpha !== 0) {
      throw new Error(
        `${name} corner (${x}, ${y}) alpha=${alpha}, expected 0`,
      );
    }
  }
}

async function main() {
  await mkdir(brandDir, { recursive: true });

  const masterPng = await loadTransparentMasterPng();
  await writeFile(path.join(brandDir, "friendrank-a2-source.png"), masterPng);
  await writeMasterSvg(masterPng);

  for (const { size, name } of PNG_SIZES) {
    const outputPath = path.join(publicDir, name);
    await renderPng(masterPng, size, outputPath);
    await verifyTransparency(outputPath);
  }

  const appleTouchPath = path.join(publicDir, "apple-touch-icon.png");
  await renderPng(masterPng, 180, appleTouchPath);
  await verifyTransparency(appleTouchPath);

  const icoImages = [];
  for (const size of ICO_SIZES) {
    const png = await sharp(masterPng)
      .resize(size, size, { kernel: sharp.kernel.lanczos3 })
      .ensureAlpha()
      .png()
      .toBuffer();
    icoImages.push({ size, png });
    await verifyTransparency(png, `favicon-${size}x${size}.png`);
  }

  const ico = buildIco(icoImages);
  await writeFile(path.join(publicDir, "favicon.ico"), ico);
  await writeFile(path.join(appDir, "favicon.ico"), ico);

  console.log("FriendRank brand assets generated from approved source.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
