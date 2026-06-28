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
const LOGO_SIZE = 128;
const LOGO_LEFT = 84;
const LOGO_TOP = 248;
const TEXT_X = 244;

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
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0"/>
      <stop offset="35%" stop-color="#8b5cf6" stop-opacity="0.6"/>
      <stop offset="65%" stop-color="#22d3ee" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="headlineAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ddd6fe"/>
      <stop offset="45%" stop-color="#67e8f9"/>
      <stop offset="100%" stop-color="#c4b5fd"/>
    </linearGradient>
    <linearGradient id="brandAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <ellipse cx="990" cy="96" rx="340" ry="230" fill="url(#glowViolet)"/>
  <ellipse cx="170" cy="548" rx="300" ry="210" fill="url(#glowCyan)"/>
  <rect x="84" y="598" width="1032" height="2" fill="url(#accentLine)" opacity="0.75"/>

  <text x="${TEXT_X}" y="214" fill="url(#brandAccent)" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="36" font-weight="800" letter-spacing="-0.5">
    FriendRank
  </text>

  <text x="${TEXT_X}" y="286" fill="#f8fafc" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="68" font-weight="800" letter-spacing="-2">
    Discover your
  </text>
  <text x="${TEXT_X}" y="366" fill="url(#headlineAccent)" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="68" font-weight="800" letter-spacing="-2">
    group&apos;s lore.
  </text>

  <text x="${TEXT_X}" y="432" fill="#cbd5e1" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="34" font-weight="500">
    Create your game. Vote. Reveal the chaos.
  </text>

  <text x="${TEXT_X}" y="484" fill="#67e8f9" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="30" font-weight="700" letter-spacing="-0.3">
    Discover who&apos;s really #1
  </text>

  <text x="1116" y="582" text-anchor="end" fill="#c4b5fd" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="28" font-weight="700" letter-spacing="0.2">
    friendrank.app
  </text>
</svg>`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const logo = await sharp(logoPath)
    .resize(LOGO_SIZE, LOGO_SIZE, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp(buildBackgroundSvg())
    .composite([{ input: logo, top: LOGO_TOP, left: LOGO_LEFT }])
    .png({ compressionLevel: 6 })
    .toFile(outputPath);

  const { width, height } = await sharp(outputPath).metadata();
  console.log(`Generated ${outputPath} (${width}x${height})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
