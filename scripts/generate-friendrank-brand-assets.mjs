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

async function renderPng(size, outputPath) {
  await sharp(sourceImage)
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

async function main() {
  await mkdir(brandDir, { recursive: true });

  const masterPng = await sharp(sourceImage).ensureAlpha().png().toBuffer();
  await writeFile(path.join(brandDir, "friendrank-a2-source.png"), masterPng);
  await writeMasterSvg(masterPng);

  for (const { size, name } of PNG_SIZES) {
    await renderPng(size, path.join(publicDir, name));
  }

  await renderPng(180, path.join(publicDir, "apple-touch-icon.png"));

  const icoImages = [];
  for (const size of ICO_SIZES) {
    const png = await sharp(sourceImage)
      .resize(size, size, { kernel: sharp.kernel.lanczos3 })
      .ensureAlpha()
      .png()
      .toBuffer();
    icoImages.push({ size, png });
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
