import { PRODUCTION_APP_URL } from "@/lib/app-url";

export const DISTRIBUTION_OUTPUT_DIR = "public/distribution";

export const ITCH_LAUNCHER_DIR = "distribution/itch-launcher";
export const ITCH_LAUNCHER_ZIP = "distribution/friendrank-itch-launcher.zip";

export type DistributionAssetSpec = {
  filename: string;
  width: number;
  height: number;
  purpose: string;
  channels: string[];
};

export const DISTRIBUTION_ASSETS: DistributionAssetSpec[] = [
  {
    filename: "friendrank-itch-cover.png",
    width: 630,
    height: 500,
    purpose: "Primary itch.io project cover image.",
    channels: ["itch.io"],
  },
  {
    filename: "friendrank-itch-screenshot-1.png",
    width: 1280,
    height: 720,
    purpose: "Hero / product overview screenshot for itch.io and browser game directories.",
    channels: ["itch.io", "browser game directories"],
  },
  {
    filename: "friendrank-itch-screenshot-2.png",
    width: 1280,
    height: 720,
    purpose: "Voting / cards / gameplay screenshot for itch.io.",
    channels: ["itch.io", "browser game directories"],
  },
  {
    filename: "friendrank-itch-screenshot-3.png",
    width: 1280,
    height: 720,
    purpose: "Results / social proof screenshot for itch.io.",
    channels: ["itch.io", "browser game directories"],
  },
  {
    filename: "friendrank-og-distribution.png",
    width: 1200,
    height: 630,
    purpose: "Open Graph and social sharing image for directory submissions.",
    channels: ["LinkedIn", "Reddit", "Pinterest", "AI directories", "Product Hunt"],
  },
  {
    filename: "friendrank-directory-square.png",
    width: 512,
    height: 512,
    purpose: "Square thumbnail for directories, AI listings, and app-style previews.",
    channels: ["AI directories", "browser game directories", "Product Hunt"],
  },
  {
    filename: "friendrank-product-hunt-preview.png",
    width: 1270,
    height: 760,
    purpose: "Wide gallery preview for Product Hunt and similar launch pages.",
    channels: ["Product Hunt"],
  },
];

export const ITCH_LAUNCHER_FILES = [
  "distribution/itch-launcher/index.html",
  "distribution/itch-launcher/styles.css",
  "distribution/itch-launcher/README.md",
  "distribution/itch-launcher/icon-192.png",
] as const;

export const ITCH_IO_RECOMMENDATIONS = {
  uploadFile: ITCH_LAUNCHER_ZIP,
  coverImage: `${DISTRIBUTION_OUTPUT_DIR}/friendrank-itch-cover.png`,
  screenshots: [
    `${DISTRIBUTION_OUTPUT_DIR}/friendrank-itch-screenshot-1.png`,
    `${DISTRIBUTION_OUTPUT_DIR}/friendrank-itch-screenshot-2.png`,
    `${DISTRIBUTION_OUTPUT_DIR}/friendrank-itch-screenshot-3.png`,
  ],
  projectType: "HTML",
  title: "FriendRank",
  tagline: "Create hilarious voting games for friends, parties, and teams.",
  genre: "Party",
  tags: ["browser", "multiplayer", "party", "friends", "voting", "web"],
  pricing: "Free or name your own price ($0 recommended)",
  visibility: "Public or draft until listing copy is approved",
  officialUrl: PRODUCTION_APP_URL,
} as const;

export function getDistributionAssetPath(filename: string): string {
  return `${DISTRIBUTION_OUTPUT_DIR}/${filename}`;
}

export type DistributionAssetsReport = {
  valid: boolean;
  assets: DistributionAssetSpec[];
  launcherFiles: readonly string[];
  zipPath: string;
  itchRecommendations: typeof ITCH_IO_RECOMMENDATIONS;
};

export function buildDistributionAssetsReport(input: {
  valid: boolean;
}): DistributionAssetsReport {
  return {
    valid: input.valid,
    assets: DISTRIBUTION_ASSETS,
    launcherFiles: ITCH_LAUNCHER_FILES,
    zipPath: ITCH_LAUNCHER_ZIP,
    itchRecommendations: ITCH_IO_RECOMMENDATIONS,
  };
}

export function formatDistributionAssetsReport(report: DistributionAssetsReport): string {
  const lines: string[] = [
    "FriendRank distribution assets verification",
    `Status: ${report.valid ? "PASS" : "FAIL"}`,
    "",
    "Distribution images",
  ];

  for (const asset of report.assets) {
    lines.push(
      `- ${getDistributionAssetPath(asset.filename)} (${asset.width}x${asset.height}) — ${asset.purpose}`,
    );
  }

  lines.push(
    "",
    "itch.io launcher",
    `- Directory: ${ITCH_LAUNCHER_DIR}/`,
    `- Upload ZIP: ${report.zipPath}`,
    `- Official app URL: ${report.itchRecommendations.officialUrl}`,
    "",
    "itch.io upload recommendation",
    `- Project type: ${report.itchRecommendations.projectType}`,
    `- Cover: ${report.itchRecommendations.coverImage}`,
    `- Screenshots: ${report.itchRecommendations.screenshots.join(", ")}`,
    `- Title: ${report.itchRecommendations.title}`,
    `- Tagline: ${report.itchRecommendations.tagline}`,
  );

  return lines.join("\n").trimEnd();
}
