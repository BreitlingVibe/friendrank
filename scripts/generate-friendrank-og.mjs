import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outputDir = path.join(root, "public/og");
const outputPath = path.join(outputDir, "friendrank-og.png");
const logoPath = path.join(root, "public/icon-512.png");

const WIDTH = 1200;
const HEIGHT = 630;

function buildBackgroundSvg() {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0a14"/>
      <stop offset="45%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#071018"/>
    </linearGradient>
    <radialGradient id="glowViolet" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0"/>
      <stop offset="35%" stop-color="#8b5cf6" stop-opacity="0.55"/>
      <stop offset="65%" stop-color="#22d3ee" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="headlineAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="45%" stop-color="#67e8f9"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <ellipse cx="980" cy="110" rx="320" ry="220" fill="url(#glowViolet)"/>
  <ellipse cx="180" cy="540" rx="280" ry="200" fill="url(#glowCyan)"/>
  <rect x="96" y="598" width="1008" height="2" fill="url(#accentLine)" opacity="0.7"/>

  <text x="248" y="268" fill="#f8fafc" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="58" font-weight="700" letter-spacing="-1.5">
    Discover your
  </text>
  <text x="248" y="340" fill="url(#headlineAccent)" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="58" font-weight="700" letter-spacing="-1.5">
    group&apos;s lore.
  </text>

  <text x="248" y="404" fill="#94a3b8" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="30" font-weight="500">
    Create your game. Vote. Reveal the chaos.
  </text>

  <text x="248" y="468" fill="#64748b" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="22" font-weight="600" letter-spacing="0.4">
    FriendRank
  </text>

  <text x="1104" y="582" text-anchor="end" fill="#a5b4fc" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="24" font-weight="600" letter-spacing="0.2">
    friendrank.app
  </text>
</svg>`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const logo = await sharp(logoPath)
    .resize(112, 112, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp(buildBackgroundSvg())
    .composite([{ input: logo, top: 248, left: 96 }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const { width, height } = await sharp(outputPath).metadata();
  console.log(`Generated ${outputPath} (${width}x${height})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
