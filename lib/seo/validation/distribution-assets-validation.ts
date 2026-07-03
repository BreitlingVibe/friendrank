import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  DISTRIBUTION_ASSETS,
  ITCH_LAUNCHER_FILES,
  ITCH_LAUNCHER_ZIP,
  getDistributionAssetPath,
} from "@/lib/growth/distribution-assets";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

const ROOT = process.cwd();
const FORBIDDEN_LAUNCHER_SCRIPT_PATTERN =
  /<script[^>]+src=["']https?:\/\//i;

function isPng(buffer: Buffer): boolean {
  return (
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  );
}

function readPngDimensions(
  filePath: string,
): { width: number; height: number } | null {
  const buffer = readFileSync(filePath);
  if (!isPng(buffer)) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function resolvePath(relativePath: string): string {
  return path.join(ROOT, relativePath);
}

function validateDistributionImages(issues: ValidationIssue[]): void {
  for (const asset of DISTRIBUTION_ASSETS) {
    const relativePath = getDistributionAssetPath(asset.filename);
    const absolutePath = resolvePath(relativePath);
    const context = asset.filename;

    if (!existsSync(absolutePath)) {
      issues.push(
        issue(
          "distribution.missing_asset",
          "error",
          `Missing distribution asset at ${relativePath}.`,
          context,
        ),
      );
      continue;
    }

    const dimensions = readPngDimensions(absolutePath);
    if (!dimensions) {
      issues.push(
        issue(
          "distribution.invalid_png",
          "error",
          `Expected PNG dimensions for ${relativePath}.`,
          context,
        ),
      );
      continue;
    }

    if (dimensions.width !== asset.width || dimensions.height !== asset.height) {
      issues.push(
        issue(
          "distribution.invalid_dimensions",
          "error",
          `${relativePath} is ${dimensions.width}x${dimensions.height}, expected ${asset.width}x${asset.height}.`,
          context,
        ),
      );
    }
  }
}

function validateLauncherFiles(issues: ValidationIssue[]): void {
  for (const relativePath of ITCH_LAUNCHER_FILES) {
    if (!existsSync(resolvePath(relativePath))) {
      issues.push(
        issue(
          "distribution.missing_launcher_file",
          "error",
          `Missing itch.io launcher file at ${relativePath}.`,
          relativePath,
        ),
      );
    }
  }

  if (!existsSync(resolvePath(ITCH_LAUNCHER_ZIP))) {
    issues.push(
      issue(
        "distribution.missing_launcher_zip",
        "error",
        `Missing itch.io launcher ZIP at ${ITCH_LAUNCHER_ZIP}.`,
        ITCH_LAUNCHER_ZIP,
      ),
    );
  }
}

function validateLauncherHtml(issues: ValidationIssue[]): void {
  const htmlPath = resolvePath("distribution/itch-launcher/index.html");
  if (!existsSync(htmlPath)) {
    return;
  }

  const html = readFileSync(htmlPath, "utf8");

  if (!html.includes(PRODUCTION_APP_URL)) {
    issues.push(
      issue(
        "distribution.missing_official_url",
        "error",
        `Launcher HTML must reference the official FriendRank URL (${PRODUCTION_APP_URL}).`,
        "distribution/itch-launcher/index.html",
      ),
    );
  }

  if (FORBIDDEN_LAUNCHER_SCRIPT_PATTERN.test(html)) {
    issues.push(
      issue(
        "distribution.forbidden_external_script",
        "error",
        "Launcher HTML must not load external scripts.",
        "distribution/itch-launcher/index.html",
      ),
    );
  }

  if (!html.includes('target="_blank"')) {
    issues.push(
      issue(
        "distribution.missing_external_target",
        "error",
        "Launcher CTA must open the official FriendRank URL in a new tab (target=\"_blank\").",
        "distribution/itch-launcher/index.html",
      ),
    );
  }

  if (!html.includes('rel="noopener noreferrer"')) {
    issues.push(
      issue(
        "distribution.missing_external_rel",
        "error",
        "Launcher external links must include rel=\"noopener noreferrer\".",
        "distribution/itch-launcher/index.html",
      ),
    );
  }

  if (!html.includes("Open FriendRank")) {
    issues.push(
      issue(
        "distribution.missing_launcher_cta_label",
        "error",
        "Launcher primary CTA must use the Open FriendRank label.",
        "distribution/itch-launcher/index.html",
      ),
    );
  }

  if (!html.includes("If the button does not open, use this direct link:")) {
    issues.push(
      issue(
        "distribution.missing_fallback_link_copy",
        "error",
        "Launcher must include visible fallback direct-link copy.",
        "distribution/itch-launcher/index.html",
      ),
    );
  }

  const cssPath = resolvePath("distribution/itch-launcher/styles.css");
  if (html.includes('href="styles.css"') && !existsSync(cssPath)) {
    issues.push(
      issue(
        "distribution.missing_launcher_stylesheet",
        "error",
        "Launcher HTML references styles.css but the file is missing.",
        "distribution/itch-launcher/styles.css",
      ),
    );
  }

  if (html.includes('src="icon-192.png"') && !existsSync(resolvePath("distribution/itch-launcher/icon-192.png"))) {
    issues.push(
      issue(
        "distribution.missing_launcher_icon",
        "error",
        "Launcher HTML references icon-192.png but the file is missing.",
        "distribution/itch-launcher/icon-192.png",
      ),
    );
  }
}

/** Validates FriendRank distribution assets and itch.io launcher package. */
export function validateDistributionAssets(): ValidationResult {
  const issues: ValidationIssue[] = [];

  validateDistributionImages(issues);
  validateLauncherFiles(issues);
  validateLauncherHtml(issues);

  return createValidationResult(issues);
}
