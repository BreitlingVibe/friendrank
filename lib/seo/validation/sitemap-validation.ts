import { PRODUCTION_APP_URL } from "@/lib/app-url";
import sitemap from "@/app/sitemap";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import {
  getLiveIntents,
  getPlannedIntents,
} from "@/lib/landing-pages/planning/intent-registry";
import { getAllHubs } from "@/lib/topic-hubs";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

/** Validates sitemap entries against live landing pages and topic hubs. */
export function validateSitemapIntegrity(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const entries = sitemap();
  const urls = entries.map((entry) => normalizeUrl(entry.url));
  const urlCounts = new Map<string, number>();

  for (const url of urls) {
    urlCounts.set(url, (urlCounts.get(url) ?? 0) + 1);
  }

  for (const [url, count] of urlCounts.entries()) {
    if (count > 1) {
      issues.push(
        issue(
          "sitemap.duplicate_url",
          "error",
          `Sitemap URL "${url}" appears ${count} times.`,
          url,
        ),
      );
    }
  }

  const sitemapUrlSet = new Set(urls);
  const liveIntentSlugs = new Set(getLiveIntents().map((intent) => intent.slug));
  const plannedIntentSlugs = new Set(
    getPlannedIntents().map((intent) => intent.slug),
  );

  const homeUrl = normalizeUrl(PRODUCTION_APP_URL);
  if (!sitemapUrlSet.has(homeUrl)) {
    issues.push(
      issue(
        "sitemap.missing_home",
        "error",
        "Sitemap is missing the home page URL.",
        homeUrl,
      ),
    );
  }

  for (const page of LANDING_PAGES) {
    const canonical = normalizeUrl(page.canonicalUrl);

    if (!sitemapUrlSet.has(canonical)) {
      issues.push(
        issue(
          "sitemap.missing_landing_page",
          "error",
          `Sitemap is missing landing page "${page.slug}".`,
          page.slug,
        ),
      );
    }

    if (!liveIntentSlugs.has(page.slug)) {
      issues.push(
        issue(
          "sitemap.non_live_landing_page",
          "error",
          `Sitemap landing page "${page.slug}" is not a live intent.`,
          page.slug,
        ),
      );
    }

    if (!canonical.startsWith(`${PRODUCTION_APP_URL}/`)) {
      issues.push(
        issue(
          "sitemap.invalid_landing_url",
          "error",
          `Landing page "${page.slug}" has invalid canonical URL "${page.canonicalUrl}".`,
          page.slug,
        ),
      );
    }
  }

  for (const hub of getAllHubs()) {
    const hubUrl = normalizeUrl(`${PRODUCTION_APP_URL}/${hub.slug}`);

    if (!sitemapUrlSet.has(hubUrl)) {
      issues.push(
        issue(
          "sitemap.missing_hub",
          "error",
          `Sitemap is missing topic hub "${hub.slug}".`,
          hub.slug,
        ),
      );
    }
  }

  for (const url of urls) {
    if (!url.startsWith(PRODUCTION_APP_URL)) {
      issues.push(
        issue(
          "sitemap.invalid_url_prefix",
          "error",
          `Sitemap URL "${url}" does not use production app URL.`,
          url,
        ),
      );
      continue;
    }

    const slug = url.replace(`${PRODUCTION_APP_URL}/`, "");
    if (slug && plannedIntentSlugs.has(slug)) {
      issues.push(
        issue(
          "sitemap.planned_page_listed",
          "error",
          `Sitemap includes planned intent slug "${slug}".`,
          slug,
        ),
      );
    }
  }

  const expectedCount = 1 + LANDING_PAGES.length + getAllHubs().length;
  if (entries.length !== expectedCount) {
    issues.push(
      issue(
        "sitemap.unexpected_entry_count",
        "warning",
        `Sitemap has ${entries.length} entries; expected ${expectedCount} (home + landing + hubs).`,
      ),
    );
  }

  return createValidationResult(issues);
}
