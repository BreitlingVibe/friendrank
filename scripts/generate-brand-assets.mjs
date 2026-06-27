import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const brandDir = path.join(root, "public/brand");
const publicDir = path.join(root, "public");
const rasterSource = path.join(brandDir, "friendrank-a2-raster-source.png");

async function renderFromSource(size, outputPath) {
  await sharp(rasterSource)
    .resize(size, size, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile(outputPath);
}

function buildIco(png16, png32) {
  const width = 16;
  const height = 16;
  const width32 = 32;
  const height32 = 32;

  const headerSize = 6;
  const entrySize = 16;
  const count = 2;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  const images = [png16, png32];
  const sizes = [16, 32];
  let offset = headerSize + entrySize * count;

  for (let index = 0; index < count; index += 1) {
    const png = images[index];
    const size = sizes[index];
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...images]);
}

async function main() {
  await mkdir(brandDir, { recursive: true });

  const iconJobs = [
    [16, path.join(publicDir, "icon-16.png")],
    [32, path.join(publicDir, "icon-32.png")],
    [192, path.join(publicDir, "icon-192.png")],
    [512, path.join(publicDir, "icon-512.png")],
    [180, path.join(publicDir, "apple-touch-icon.png")],
    [1024, path.join(brandDir, "friendrank-a2-preview.png")],
  ];

  for (const [size, outputPath] of iconJobs) {
    await renderFromSource(size, outputPath);
  }

  const png16 = await sharp(path.join(publicDir, "icon-16.png")).png().toBuffer();
  const png32 = await sharp(path.join(publicDir, "icon-32.png")).png().toBuffer();
  const ico = buildIco(png16, png32);
  await writeFile(path.join(publicDir, "favicon.ico"), ico);

  console.log("FriendRank A2 brand assets generated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
