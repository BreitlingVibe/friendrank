import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { OG_IMAGE } from "@/lib/seo/site-metadata";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

const ROOT = process.cwd();

type AssetSpec = {
  relativePath: string;
  width?: number;
  height?: number;
  context: string;
};

const PUBLIC_ICON_ASSETS: AssetSpec[] = [
  { relativePath: "public/favicon.ico", context: "public favicon" },
  { relativePath: "public/icon-16.png", width: 16, height: 16, context: "icon-16" },
  { relativePath: "public/icon-32.png", width: 32, height: 32, context: "icon-32" },
  { relativePath: "public/icon-48.png", width: 48, height: 48, context: "icon-48" },
  {
    relativePath: "public/icon-192.png",
    width: 192,
    height: 192,
    context: "icon-192",
  },
  {
    relativePath: "public/icon-512.png",
    width: 512,
    height: 512,
    context: "icon-512",
  },
  {
    relativePath: "public/apple-touch-icon.png",
    width: 180,
    height: 180,
    context: "apple-touch-icon",
  },
  {
    relativePath: "public/og/friendrank-og.png",
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    context: "og-image",
  },
];

const APP_ROUTER_ICON_ASSETS: AssetSpec[] = [
  { relativePath: "app/favicon.ico", context: "app favicon" },
  {
    relativePath: "app/icon.png",
    width: 512,
    height: 512,
    context: "app/icon",
  },
  {
    relativePath: "app/apple-icon.png",
    width: 180,
    height: 180,
    context: "app/apple-icon",
  },
];

const BRAND_SOURCE_ASSETS: AssetSpec[] = [
  {
    relativePath: "public/brand/friendrank-a2-source.png",
    context: "brand-source",
  },
];

const METADATA_ICON_PATHS = [
  "/favicon.ico",
  "/icon-16.png",
  "/icon-32.png",
  "/icon-48.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
] as const;

const MANIFEST_ICON_PATHS = ["/icon-192.png", "/icon-512.png"] as const;

function resolveAssetPath(relativePath: string): string {
  return path.join(ROOT, relativePath);
}

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

function validateAsset(spec: AssetSpec, issues: ValidationIssue[]): void {
  const absolutePath = resolveAssetPath(spec.relativePath);

  if (!existsSync(absolutePath)) {
    issues.push(
      issue(
        "brand.missing_asset",
        "error",
        `Missing branding asset at ${spec.relativePath}.`,
        spec.context,
      ),
    );
    return;
  }

  if (spec.width === undefined || spec.height === undefined) {
    return;
  }

  const dimensions = readPngDimensions(absolutePath);
  if (!dimensions) {
    issues.push(
      issue(
        "brand.invalid_png",
        "error",
        `Expected PNG dimensions for ${spec.relativePath}.`,
        spec.context,
      ),
    );
    return;
  }

  if (dimensions.width !== spec.width || dimensions.height !== spec.height) {
    issues.push(
      issue(
        "brand.invalid_dimensions",
        "error",
        `${spec.relativePath} is ${dimensions.width}x${dimensions.height}, expected ${spec.width}x${spec.height}.`,
        spec.context,
      ),
    );
  }
}

function validateMetadataReferences(issues: ValidationIssue[]): void {
  for (const iconPath of METADATA_ICON_PATHS) {
    const publicPath = iconPath.replace(/^\//, "public/");
    if (!existsSync(resolveAssetPath(publicPath))) {
      issues.push(
        issue(
          "brand.metadata_icon_missing",
          "error",
          `rootSiteMetadata.icons references ${iconPath} but the file is missing.`,
          iconPath,
        ),
      );
    }
  }

  const ogPath = OG_IMAGE.url.replace(/^\//, "public/");
  if (!existsSync(resolveAssetPath(ogPath))) {
    issues.push(
      issue(
        "brand.og_image_missing",
        "error",
        `OG_IMAGE references ${OG_IMAGE.url} but the file is missing.`,
        OG_IMAGE.url,
      ),
    );
  }
}

function validateManifestReferences(issues: ValidationIssue[]): void {
  for (const iconPath of MANIFEST_ICON_PATHS) {
    const publicPath = iconPath.replace(/^\//, "public/");
    if (!existsSync(resolveAssetPath(publicPath))) {
      issues.push(
        issue(
          "brand.manifest_icon_missing",
          "error",
          `manifest icons reference ${iconPath} but the file is missing.`,
          iconPath,
        ),
      );
    }
  }
}

/** Validates FriendRank branding assets and metadata references. */
export function validateBrandAssets(): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const spec of [
    ...PUBLIC_ICON_ASSETS,
    ...APP_ROUTER_ICON_ASSETS,
    ...BRAND_SOURCE_ASSETS,
  ]) {
    validateAsset(spec, issues);
  }

  validateMetadataReferences(issues);
  validateManifestReferences(issues);

  return createValidationResult(issues);
}

export type BrandAssetsAuditReport = {
  valid: boolean;
  assets: {
    publicIcons: number;
    appRouterIcons: number;
    brandSource: number;
    metadataReferences: number;
    manifestReferences: number;
  };
  result: ValidationResult;
};

/** Builds a report for brand asset verification. */
export function buildBrandAssetsAuditReport(): BrandAssetsAuditReport {
  const result = validateBrandAssets();

  return {
    valid: result.valid,
    assets: {
      publicIcons: PUBLIC_ICON_ASSETS.length,
      appRouterIcons: APP_ROUTER_ICON_ASSETS.length,
      brandSource: BRAND_SOURCE_ASSETS.length,
      metadataReferences: METADATA_ICON_PATHS.length + 1,
      manifestReferences: MANIFEST_ICON_PATHS.length,
    },
    result,
  };
}

export function formatBrandAssetsAuditReport(report: BrandAssetsAuditReport): string {
  const lines: string[] = [
    "FriendRank brand assets verification",
    `Status: ${report.valid ? "PASS" : "FAIL"}`,
    `Public icon assets checked: ${report.assets.publicIcons}`,
    `App Router icon assets checked: ${report.assets.appRouterIcons}`,
    `Brand source assets checked: ${report.assets.brandSource}`,
    `Metadata icon references checked: ${report.assets.metadataReferences}`,
    `Manifest icon references checked: ${report.assets.manifestReferences}`,
    "",
  ];

  if (report.result.issues.length === 0) {
    lines.push("All branding assets and references are present and valid.");
    return lines.join("\n").trimEnd();
  }

  for (const entry of report.result.issues) {
    const context = entry.context ? ` [${entry.context}]` : "";
    lines.push(
      `  - ${entry.severity.toUpperCase()} ${entry.code}${context}: ${entry.message}`,
    );
  }

  return lines.join("\n").trimEnd();
}
