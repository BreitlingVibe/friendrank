import { execSync } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outputDir = path.join(root, "public/distribution");
const logoPath = path.join(root, "public/icon-512.png");
const ogSourcePath = path.join(root, "public/og/friendrank-og.png");
const launcherDir = path.join(root, "distribution/itch-launcher");
const launcherIconSource = path.join(root, "public/icon-192.png");

const FONT =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function gradientDefs() {
  return `
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
    <linearGradient id="cta" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#0891b2"/>
    </linearGradient>
  </defs>`;
}

function background(width, height, accentY = height - 8) {
  return `
  ${gradientDefs()}
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <ellipse cx="${Math.round(width * 0.82)}" cy="${Math.round(height * 0.15)}" rx="${Math.round(width * 0.28)}" ry="${Math.round(height * 0.22)}" fill="url(#glowViolet)"/>
  <ellipse cx="${Math.round(width * 0.14)}" cy="${Math.round(height * 0.87)}" rx="${Math.round(width * 0.25)}" ry="${Math.round(height * 0.2)}" fill="url(#glowCyan)"/>
  <rect x="${Math.round(width * 0.07)}" y="${accentY}" width="${Math.round(width * 0.86)}" height="2" fill="url(#accentLine)" opacity="0.75"/>`;
}

function browserChrome(width, height, contentSvg) {
  const frameX = Math.round(width * 0.08);
  const frameY = Math.round(height * 0.1);
  const frameW = Math.round(width * 0.84);
  const frameH = Math.round(height * 0.78);
  const innerX = frameX + 18;
  const innerY = frameY + 52;
  const innerW = frameW - 36;
  const innerH = frameH - 70;

  return `
  <rect x="${frameX}" y="${frameY}" width="${frameW}" height="${frameH}" rx="24" fill="#0b1220" stroke="#334155" stroke-width="2"/>
  <rect x="${frameX}" y="${frameY}" width="${frameW}" height="44" rx="24" fill="#111827"/>
  <circle cx="${frameX + 24}" cy="${frameY + 22}" r="6" fill="#ef4444"/>
  <circle cx="${frameX + 44}" cy="${frameY + 22}" r="6" fill="#f59e0b"/>
  <circle cx="${frameX + 64}" cy="${frameY + 22}" r="6" fill="#22c55e"/>
  <rect x="${frameX + 92}" y="${frameY + 12}" width="${frameW - 120}" height="20" rx="10" fill="#1e293b"/>
  <rect x="${innerX}" y="${innerY}" width="${innerW}" height="${innerH}" rx="18" fill="#020617" stroke="#475569" stroke-width="1"/>
  <svg x="${innerX}" y="${innerY}" width="${innerW}" height="${innerH}" viewBox="0 0 ${innerW} ${innerH}">
    ${contentSvg}
  </svg>`;
}

function buildItchCoverSvg(width, height) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${background(width, height)}
  <text x="56" y="118" fill="url(#brandAccent)" font-family="${FONT}" font-size="28" font-weight="800">FriendRank</text>
  <text x="56" y="196" fill="#f8fafc" font-family="${FONT}" font-size="52" font-weight="800" letter-spacing="-1.5">Discover your</text>
  <text x="56" y="258" fill="url(#headlineAccent)" font-family="${FONT}" font-size="52" font-weight="800" letter-spacing="-1.5">group&apos;s lore.</text>
  <text x="56" y="318" fill="#cbd5e1" font-family="${FONT}" font-size="24" font-weight="500">Vote on friends. Reveal the chaos.</text>
  <rect x="56" y="360" width="220" height="52" rx="26" fill="url(#cta)"/>
  <text x="166" y="394" text-anchor="middle" fill="#ffffff" font-family="${FONT}" font-size="22" font-weight="700">Play in browser</text>
  <text x="${width - 56}" y="${height - 36}" text-anchor="end" fill="#c4b5fd" font-family="${FONT}" font-size="20" font-weight="700">friendrank.app</text>
</svg>`);
}

function buildHeroScreenshotSvg(width, height) {
  const content = `
    ${background(960, 520, 500)}
    <text x="72" y="120" fill="url(#brandAccent)" font-family="${FONT}" font-size="24" font-weight="800">FriendRank</text>
    <text x="72" y="210" fill="#f8fafc" font-family="${FONT}" font-size="54" font-weight="800">Create a game.</text>
    <text x="72" y="278" fill="url(#headlineAccent)" font-family="${FONT}" font-size="54" font-weight="800">Invite your group.</text>
    <text x="72" y="350" fill="#cbd5e1" font-family="${FONT}" font-size="26">Funny roles. Real votes. Instant lore.</text>
    <rect x="72" y="390" width="240" height="56" rx="28" fill="url(#cta)"/>
    <text x="192" y="426" text-anchor="middle" fill="#ffffff" font-family="${FONT}" font-size="24" font-weight="700">Start a game</text>`;

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${background(width, height)}
  ${browserChrome(width, height, content)}
  <text x="${width - 48}" y="${height - 28}" text-anchor="end" fill="#94a3b8" font-family="${FONT}" font-size="18">Screenshot 1 — Hero</text>
</svg>`);
}

function buildVotingScreenshotSvg(width, height) {
  const cards = [
    { y: 70, name: "Alex", role: "Most likely to start drama", votes: "4 votes" },
    { y: 190, name: "Jordan", role: "Secret snack hoarder", votes: "3 votes" },
    { y: 310, name: "Sam", role: "Main Character energy", votes: "5 votes" },
  ];

  const cardMarkup = cards
    .map(
      (card) => `
    <rect x="64" y="${card.y}" width="832" height="96" rx="18" fill="#0f172a" stroke="#7c3aed" stroke-opacity="0.45" stroke-width="2"/>
    <text x="96" y="${card.y + 38}" fill="#f8fafc" font-family="${FONT}" font-size="28" font-weight="700">${card.name}</text>
    <text x="96" y="${card.y + 68}" fill="#94a3b8" font-family="${FONT}" font-size="20">${card.role}</text>
    <text x="820" y="${card.y + 54}" text-anchor="end" fill="#67e8f9" font-family="${FONT}" font-size="20" font-weight="700">${card.votes}</text>`,
    )
    .join("");

  const content = `
    <text x="64" y="48" fill="#e2e8f0" font-family="${FONT}" font-size="24" font-weight="700">Round 2 — cast your votes</text>
    <rect x="64" y="430" width="832" height="12" rx="6" fill="#1e293b"/>
    <rect x="64" y="430" width="520" height="12" rx="6" fill="url(#cta)"/>
    <text x="64" y="468" fill="#94a3b8" font-family="${FONT}" font-size="18">6 of 8 players voted</text>
    ${cardMarkup}`;

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${background(width, height)}
  ${browserChrome(width, height, content)}
  <text x="${width - 48}" y="${height - 28}" text-anchor="end" fill="#94a3b8" font-family="${FONT}" font-size="18">Screenshot 2 — Voting</text>
</svg>`);
}

function buildResultsScreenshotSvg(width, height) {
  const content = `
    ${background(960, 520, 500)}
    <text x="480" y="72" text-anchor="middle" fill="#cbd5e1" font-family="${FONT}" font-size="22" font-weight="600">Results unlocked</text>
    <text x="480" y="148" text-anchor="middle" fill="url(#headlineAccent)" font-family="${FONT}" font-size="58" font-weight="800">Main Character</text>
    <text x="480" y="206" text-anchor="middle" fill="#f8fafc" font-family="${FONT}" font-size="40" font-weight="700">Jordan</text>
    <rect x="120" y="250" width="720" height="110" rx="22" fill="#111827" stroke="#7c3aed" stroke-opacity="0.35"/>
    <text x="160" y="292" fill="#a78bfa" font-family="${FONT}" font-size="22" font-weight="700">Chaos Agent</text>
    <text x="160" y="328" fill="#f8fafc" font-family="${FONT}" font-size="28" font-weight="700">Alex</text>
    <text x="560" y="292" fill="#67e8f9" font-family="${FONT}" font-size="22" font-weight="700">Secret Villain</text>
    <text x="560" y="328" fill="#f8fafc" font-family="${FONT}" font-size="28" font-weight="700">Sam</text>
    <text x="480" y="430" text-anchor="middle" fill="#94a3b8" font-family="${FONT}" font-size="20">Share the lore with your group</text>`;

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${background(width, height)}
  ${browserChrome(width, height, content)}
  <text x="${width - 48}" y="${height - 28}" text-anchor="end" fill="#94a3b8" font-family="${FONT}" font-size="18">Screenshot 3 — Results</text>
</svg>`);
}

function buildDirectorySquareSvg(size) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${background(size, size, size - 12)}
  <text x="${size / 2}" y="${size - 28}" text-anchor="middle" fill="#c4b5fd" font-family="${FONT}" font-size="22" font-weight="700">friendrank.app</text>
</svg>`);
}

function buildProductHuntSvg(width, height) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${background(width, height)}
  <text x="96" y="150" fill="url(#brandAccent)" font-family="${FONT}" font-size="34" font-weight="800">FriendRank</text>
  <text x="96" y="250" fill="#f8fafc" font-family="${FONT}" font-size="72" font-weight="800" letter-spacing="-2">Vote on your friends.</text>
  <text x="96" y="340" fill="url(#headlineAccent)" font-family="${FONT}" font-size="72" font-weight="800" letter-spacing="-2">Reveal the lore.</text>
  <text x="96" y="430" fill="#cbd5e1" font-family="${FONT}" font-size="34">Free browser party game for groups.</text>
  <rect x="96" y="500" width="280" height="64" rx="32" fill="url(#cta)"/>
  <text x="236" y="542" text-anchor="middle" fill="#ffffff" font-family="${FONT}" font-size="28" font-weight="700">Play FriendRank</text>
  <text x="${width - 96}" y="${height - 48}" text-anchor="end" fill="#c4b5fd" font-family="${FONT}" font-size="28" font-weight="700">friendrank.app</text>
</svg>`);
}

async function renderWithLogo(svgBuffer, outputPath, logoSize, logoLeft, logoTop) {
  const logo = await sharp(logoPath)
    .resize(logoSize, logoSize, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp(svgBuffer)
    .composite([{ input: logo, top: logoTop, left: logoLeft }])
    .png({ compressionLevel: 6 })
    .toFile(outputPath);
}

async function renderSvg(svgBuffer, outputPath) {
  await sharp(svgBuffer).png({ compressionLevel: 6 }).toFile(outputPath);
}

async function generateDistributionImages() {
  await mkdir(outputDir, { recursive: true });

  await renderWithLogo(
    buildItchCoverSvg(630, 500),
    path.join(outputDir, "friendrank-itch-cover.png"),
    96,
    390,
    56,
  );

  await renderSvg(
    buildHeroScreenshotSvg(1280, 720),
    path.join(outputDir, "friendrank-itch-screenshot-1.png"),
  );
  await renderSvg(
    buildVotingScreenshotSvg(1280, 720),
    path.join(outputDir, "friendrank-itch-screenshot-2.png"),
  );
  await renderSvg(
    buildResultsScreenshotSvg(1280, 720),
    path.join(outputDir, "friendrank-itch-screenshot-3.png"),
  );

  await copyFile(ogSourcePath, path.join(outputDir, "friendrank-og-distribution.png"));

  await renderWithLogo(
    buildDirectorySquareSvg(512),
    path.join(outputDir, "friendrank-directory-square.png"),
    320,
    96,
    96,
  );

  await renderWithLogo(
    buildProductHuntSvg(1270, 760),
    path.join(outputDir, "friendrank-product-hunt-preview.png"),
    128,
    96,
    180,
  );
}

async function prepareLauncherAssets() {
  await mkdir(launcherDir, { recursive: true });
  await copyFile(launcherIconSource, path.join(launcherDir, "icon-192.png"));
}

async function packageLauncherZip() {
  const zipPath = path.join(root, "distribution/friendrank-itch-launcher.zip");
  execSync(
    `cd "${path.join(root, "distribution")}" && rm -f friendrank-itch-launcher.zip && zip -r friendrank-itch-launcher.zip itch-launcher/index.html itch-launcher/styles.css itch-launcher/icon-192.png itch-launcher/README.md`,
    { stdio: "inherit" },
  );
  return zipPath;
}

async function main() {
  await generateDistributionImages();
  await prepareLauncherAssets();
  const zipPath = await packageLauncherZip();

  for (const asset of [
    "friendrank-itch-cover.png",
    "friendrank-itch-screenshot-1.png",
    "friendrank-itch-screenshot-2.png",
    "friendrank-itch-screenshot-3.png",
    "friendrank-og-distribution.png",
    "friendrank-directory-square.png",
    "friendrank-product-hunt-preview.png",
  ]) {
    const filePath = path.join(outputDir, asset);
    const { width, height } = await sharp(filePath).metadata();
    console.log(`Generated ${filePath} (${width}x${height})`);
  }

  console.log(`Packaged ${zipPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
