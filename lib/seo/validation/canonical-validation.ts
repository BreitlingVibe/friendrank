import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import {
  getLiveIntents,
  getPlannedIntents,
} from "@/lib/landing-pages/planning/intent-registry";
import { buildTopicHubMetadata } from "@/lib/seo/page-metadata";
import { getAllHubs } from "@/lib/topic-hubs";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function expectedCanonical(slug: string): string {
  return `${PRODUCTION_APP_URL}/${slug}`;
}

/** Validates canonical URLs for live landing pages and topic hubs. */
export function validateCanonicalUrls(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const canonicalOwners = new Map<string, string>();
  const liveIntentSlugs = new Set(getLiveIntents().map((intent) => intent.slug));
  const plannedIntentSlugs = new Set(
    getPlannedIntents().map((intent) => intent.slug),
  );

  for (const page of LANDING_PAGES) {
    const canonical = normalizeUrl(page.canonicalUrl);
    const expected = normalizeUrl(expectedCanonical(page.slug));

    if (!page.canonicalUrl.trim()) {
      issues.push(
        issue(
          "canonical.missing_landing_url",
          "error",
          `Landing page "${page.slug}" is missing a canonical URL.`,
          page.slug,
        ),
      );
      continue;
    }

    if (!canonical.startsWith(PRODUCTION_APP_URL)) {
      issues.push(
        issue(
          "canonical.invalid_domain",
          "error",
          `Landing page "${page.slug}" canonical must use production domain.`,
          page.slug,
        ),
      );
    }

    if (canonical !== expected) {
      issues.push(
        issue(
          "canonical.slug_mismatch",
          "error",
          `Landing page "${page.slug}" canonical "${page.canonicalUrl}" does not match route slug.`,
          page.slug,
        ),
      );
    }

    if (!liveIntentSlugs.has(page.slug)) {
      issues.push(
        issue(
          "canonical.non_live_landing",
          "error",
          `Landing page "${page.slug}" canonical is set for a non-live intent.`,
          page.slug,
        ),
      );
    }

    if (plannedIntentSlugs.has(page.slug)) {
      issues.push(
        issue(
          "canonical.planned_landing",
          "error",
          `Planned intent "${page.slug}" must not expose a canonical URL.`,
          page.slug,
        ),
      );
    }

    const owner = canonicalOwners.get(canonical);
    if (owner && owner !== page.slug) {
      issues.push(
        issue(
          "canonical.duplicate_url",
          "error",
          `Canonical "${page.canonicalUrl}" is shared by "${owner}" and "${page.slug}".`,
          page.slug,
        ),
      );
    } else {
      canonicalOwners.set(canonical, page.slug);
    }
  }

  for (const hub of getAllHubs()) {
    const metadata = buildTopicHubMetadata({
      title: hub.title,
      description: getHubPageContent(hub.id)?.metaDescription ?? hub.description,
      slug: hub.slug,
    });
    const canonical = normalizeUrl(String(metadata.alternates?.canonical ?? ""));
    const expected = normalizeUrl(expectedCanonical(hub.slug));

    if (!canonical) {
      issues.push(
        issue(
          "canonical.missing_hub_url",
          "error",
          `Topic hub "${hub.slug}" is missing a canonical URL.`,
          hub.slug,
        ),
      );
      continue;
    }

    if (!canonical.startsWith(PRODUCTION_APP_URL)) {
      issues.push(
        issue(
          "canonical.invalid_hub_domain",
          "error",
          `Topic hub "${hub.slug}" canonical must use production domain.`,
          hub.slug,
        ),
      );
    }

    if (canonical !== expected) {
      issues.push(
        issue(
          "canonical.hub_slug_mismatch",
          "error",
          `Topic hub "${hub.slug}" canonical does not match route slug.`,
          hub.slug,
        ),
      );
    }

    const owner = canonicalOwners.get(canonical);
    if (owner && owner !== hub.slug) {
      issues.push(
        issue(
          "canonical.duplicate_url",
          "error",
          `Canonical for hub "${hub.slug}" duplicates "${owner}".`,
          hub.slug,
        ),
      );
    } else {
      canonicalOwners.set(canonical, hub.slug);
    }
  }

  return createValidationResult(issues);
}
