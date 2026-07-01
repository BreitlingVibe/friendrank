import fs from "node:fs";
import path from "node:path";
import { LANDING_PAGES, getLandingPageBySlug } from "@/lib/landing-pages/landing-page-data";
import {
  getLiveIntents,
  getPlannedIntents,
} from "@/lib/landing-pages/planning/intent-registry";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

const APP_DIR = path.join(process.cwd(), "app");
const RESERVED_ROUTE_DIRS = new Set(["game"]);

/** Static app route slugs with a top-level page.tsx (excludes / and /game/*). */
export function getFilesystemRouteSlugs(): string[] {
  if (!fs.existsSync(APP_DIR)) {
    return [];
  }

  const slugs: string[] = [];

  for (const entry of fs.readdirSync(APP_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name.startsWith("_") || RESERVED_ROUTE_DIRS.has(entry.name)) {
      continue;
    }

    const pagePath = path.join(APP_DIR, entry.name, "page.tsx");
    if (fs.existsSync(pagePath)) {
      slugs.push(entry.name);
    }
  }

  return slugs.sort();
}

function readRoutePageSource(slug: string): string | null {
  const pagePath = path.join(APP_DIR, slug, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    return null;
  }

  return fs.readFileSync(pagePath, "utf8");
}

/** Validates landing page and topic hub route integrity. */
export function validateRouteIntegrity(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const filesystemRoutes = new Set(getFilesystemRouteSlugs());
  const landingSlugs = new Set(LANDING_PAGES.map((page) => page.slug));
  const hubSlugs = new Set(getAllHubDefinitions().map((hub) => hub.slug));
  const liveIntentSlugs = new Set(getLiveIntents().map((intent) => intent.slug));
  const plannedIntentSlugs = new Set(
    getPlannedIntents().map((intent) => intent.slug),
  );
  const expectedRoutes = new Set([...landingSlugs, ...hubSlugs]);

  for (const slug of landingSlugs) {
    if (!filesystemRoutes.has(slug)) {
      issues.push(
        issue(
          "routes.missing_landing_route",
          "error",
          `Landing page "${slug}" is missing app/${slug}/page.tsx.`,
          slug,
        ),
      );
    }

    if (!liveIntentSlugs.has(slug)) {
      issues.push(
        issue(
          "routes.landing_not_live_intent",
          "error",
          `Landing page "${slug}" is not a live intent in the registry.`,
          slug,
        ),
      );
    }

    const page = getLandingPageBySlug(slug);
    if (!page) {
      issues.push(
        issue(
          "routes.missing_landing_page_data",
          "error",
          `Landing page "${slug}" is missing from LANDING_PAGES assembly.`,
          slug,
        ),
      );
    }

    const source = readRoutePageSource(slug);
    if (source) {
      if (!source.includes("IntentLandingPage")) {
        issues.push(
          issue(
            "routes.invalid_landing_wrapper",
            "error",
            `Route app/${slug}/page.tsx must render IntentLandingPage.`,
            slug,
          ),
        );
      }

      if (!source.includes("landing-page-data")) {
        issues.push(
          issue(
            "routes.missing_landing_data_import",
            "error",
            `Route app/${slug}/page.tsx must import from landing-page-data.`,
            slug,
          ),
        );
      }
    }
  }

  for (const hub of getAllHubDefinitions()) {
    if (!filesystemRoutes.has(hub.slug)) {
      issues.push(
        issue(
          "routes.missing_hub_route",
          "error",
          `Topic hub "${hub.slug}" is missing app/${hub.slug}/page.tsx.`,
          hub.slug,
        ),
      );
    }

    const source = readRoutePageSource(hub.slug);
    if (source && !source.includes("createTopicHubRoute")) {
      issues.push(
        issue(
          "routes.invalid_hub_wrapper",
          "error",
          `Route app/${hub.slug}/page.tsx must use createTopicHubRoute().`,
          hub.slug,
        ),
      );
    }
  }

  for (const routeSlug of filesystemRoutes) {
    if (plannedIntentSlugs.has(routeSlug)) {
      issues.push(
        issue(
          "routes.planned_page_exposed",
          "error",
          `Planned intent "${routeSlug}" has a live app route.`,
          routeSlug,
        ),
      );
    }

    if (!expectedRoutes.has(routeSlug)) {
      issues.push(
        issue(
          "routes.orphan_route",
          "error",
          `Route app/${routeSlug}/page.tsx is not a landing page or topic hub.`,
          routeSlug,
        ),
      );
    }
  }

  if (filesystemRoutes.size !== expectedRoutes.size) {
    issues.push(
      issue(
        "routes.route_count_mismatch",
        "warning",
        `Filesystem routes (${filesystemRoutes.size}) differ from expected landing + hub routes (${expectedRoutes.size}).`,
      ),
    );
  }

  return createValidationResult(issues);
}
