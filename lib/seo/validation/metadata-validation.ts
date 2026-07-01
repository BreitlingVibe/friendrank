import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { getPlannedIntents } from "@/lib/landing-pages/planning/intent-registry";
import {
  buildLandingPageMetadata,
  buildTopicHubMetadata,
} from "@/lib/seo/page-metadata";
import { getAllHubs } from "@/lib/topic-hubs";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function registerDuplicate(
  issues: ValidationIssue[],
  code: string,
  severity: "error" | "warning",
  label: string,
  value: string,
  slug: string,
  seen: Map<string, string>,
): void {
  const normalized = normalizeText(value);
  if (!normalized) {
    return;
  }

  const previous = seen.get(normalized);
  if (previous && previous !== slug) {
    issues.push(
      issue(
        code,
        severity,
        `${label} duplicates "${previous}" on "${slug}".`,
        slug,
      ),
    );
    return;
  }

  seen.set(normalized, slug);
}

/** Validates metadata consistency for live landing pages and topic hubs. */
export function validateMetadataConsistency(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const titleSeen = new Map<string, string>();
  const descriptionSeen = new Map<string, string>();
  const plannedSlugs = new Set(getPlannedIntents().map((intent) => intent.slug));

  for (const page of LANDING_PAGES) {
    if (plannedSlugs.has(page.slug)) {
      issues.push(
        issue(
          "metadata.planned_page_indexable",
          "error",
          `Planned intent "${page.slug}" is assembled as an indexable landing page.`,
          page.slug,
        ),
      );
    }

    if (!page.metaTitle.trim()) {
      issues.push(
        issue(
          "metadata.empty_title",
          "error",
          "Landing page meta title is empty.",
          page.slug,
        ),
      );
    }

    if (!page.metaDescription.trim()) {
      issues.push(
        issue(
          "metadata.empty_description",
          "error",
          "Landing page meta description is empty.",
          page.slug,
        ),
      );
    }

    const metadata = buildLandingPageMetadata({
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      canonicalUrl: page.canonicalUrl,
    });

    if (!metadata.openGraph?.title) {
      issues.push(
        issue(
          "metadata.missing_og_title",
          "error",
          "Landing page Open Graph title is missing.",
          page.slug,
        ),
      );
    }

    if (!metadata.openGraph?.description) {
      issues.push(
        issue(
          "metadata.missing_og_description",
          "error",
          "Landing page Open Graph description is missing.",
          page.slug,
        ),
      );
    }

    if (
      metadata.robots &&
      typeof metadata.robots === "object" &&
      "index" in metadata.robots &&
      metadata.robots.index === false
    ) {
      issues.push(
        issue(
          "metadata.live_page_noindex",
          "error",
          "Live landing page is marked noindex.",
          page.slug,
        ),
      );
    }

    registerDuplicate(
      issues,
      "metadata.duplicate_title",
      "error",
      "Meta title",
      page.metaTitle,
      page.slug,
      titleSeen,
    );
    registerDuplicate(
      issues,
      "metadata.duplicate_description",
      "error",
      "Meta description",
      page.metaDescription,
      page.slug,
      descriptionSeen,
    );
  }

  for (const hub of getAllHubs()) {
    const description =
      getHubPageContent(hub.id)?.metaDescription ?? hub.description;

    if (!hub.title.trim()) {
      issues.push(
        issue(
          "metadata.empty_hub_title",
          "error",
          "Topic hub title is empty.",
          hub.slug,
        ),
      );
    }

    if (!description.trim()) {
      issues.push(
        issue(
          "metadata.empty_hub_description",
          "error",
          "Topic hub description is empty.",
          hub.slug,
        ),
      );
    }

    const metadata = buildTopicHubMetadata({
      title: hub.title,
      description,
      slug: hub.slug,
    });

    if (!metadata.openGraph?.title) {
      issues.push(
        issue(
          "metadata.missing_hub_og_title",
          "error",
          "Topic hub Open Graph title is missing.",
          hub.slug,
        ),
      );
    }

    if (!metadata.openGraph?.description) {
      issues.push(
        issue(
          "metadata.missing_hub_og_description",
          "error",
          "Topic hub Open Graph description is missing.",
          hub.slug,
        ),
      );
    }

    if (
      metadata.robots &&
      typeof metadata.robots === "object" &&
      (("index" in metadata.robots && metadata.robots.index !== true) ||
        ("follow" in metadata.robots && metadata.robots.follow !== true))
    ) {
      issues.push(
        issue(
          "metadata.hub_not_indexable",
          "error",
          "Topic hub must use index/follow robots settings.",
          hub.slug,
        ),
      );
    }

    const hubTitle = String(metadata.openGraph?.title ?? hub.title);
    registerDuplicate(
      issues,
      "metadata.duplicate_hub_title",
      "warning",
      "Hub Open Graph title",
      hubTitle,
      hub.slug,
      titleSeen,
    );
    registerDuplicate(
      issues,
      "metadata.duplicate_hub_description",
      "warning",
      "Hub description",
      description,
      hub.slug,
      descriptionSeen,
    );
  }

  return createValidationResult(issues);
}
