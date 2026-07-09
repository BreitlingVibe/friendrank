import { getPillarBySlug } from "@/lib/discovery/category-registry";
import {
  dedupeDiscoveryLinks,
  excludeDiscoverySlug,
  excludeDiscoverySlugs,
} from "@/lib/discovery/link-utils";
import { getRelatedContent, getRelatedContentForSlug } from "@/lib/discovery/related-content";
import type {
  DiscoveryLink,
  DiscoveryPageContext,
  OrderedDiscoveryRecommendations,
} from "@/lib/discovery/types";
import { getLiveRelatedPages } from "@/lib/landing-pages/internal-links";

function landingRelatedToDiscoveryLink(
  slug: string,
  title: string,
  available: boolean,
): DiscoveryLink {
  return {
    slug,
    title,
    href: `/${slug}`,
    available,
    kind: "evergreen",
  };
}

function buildSiblingPagesFromInternalLinks(
  slug: string,
  excludeSlugs: readonly string[],
): DiscoveryLink[] {
  const blocked = new Set([slug, ...excludeSlugs]);

  return getLiveRelatedPages(slug)
    .filter((page) => page.available && !blocked.has(page.slug))
    .map((page) =>
      landingRelatedToDiscoveryLink(page.slug, page.title, page.available),
    );
}

/**
 * Builds recommendation groups in a consistent order:
 * sibling pages → parent pillar → related categories → related games → game CTA.
 */
export function getOrderedRecommendations(
  context: DiscoveryPageContext,
  options: { excludeSlugs?: readonly string[] } = {},
): OrderedDiscoveryRecommendations | null {
  const related = getRelatedContent(context);
  if (!related) {
    return null;
  }

  const excludeSlugs = options.excludeSlugs ?? [];
  const currentSlug = context.slug;
  const seen = new Set<string>();

  const siblingCandidates = dedupeDiscoveryLinks(
    [
      ...excludeDiscoverySlug(related.recommendedNextPages, currentSlug),
      ...excludeDiscoverySlug(related.relatedEvergreenPages, currentSlug),
      ...(context.type === "evergreen"
        ? buildSiblingPagesFromInternalLinks(currentSlug, excludeSlugs)
        : []),
    ],
    seen,
  );

  const relatedPages = excludeDiscoverySlugs(siblingCandidates, excludeSlugs);

  for (const link of relatedPages) {
    seen.add(`${link.kind}:${link.slug}`);
  }

  const parentPillar = related.relatedPillar;

  const relatedCategories = dedupeDiscoveryLinks(
    excludeDiscoverySlugs(related.relatedCategories, [currentSlug, ...excludeSlugs]),
    seen,
  );

  const relatedGames = dedupeDiscoveryLinks(
    excludeDiscoverySlugs(
      excludeDiscoverySlug(related.relatedEvergreenPages, currentSlug),
      excludeSlugs,
    ),
    seen,
  );

  return {
    siblingPages: relatedPages,
    parentPillar,
    relatedCategories,
    relatedGames,
    gameEntryPoint: related.gameEntryPoint,
  };
}

export function getOrderedRecommendationsForSlug(
  slug: string,
  options: { excludeSlugs?: readonly string[] } = {},
): OrderedDiscoveryRecommendations | null {
  const related = getRelatedContentForSlug(slug);
  if (!related) {
    return null;
  }

  return getOrderedRecommendations(related.context, options);
}

export function getLiveCategoriesForPillar(pillarSlug: string): DiscoveryLink[] {
  const context: DiscoveryPageContext = { type: "pillar", slug: pillarSlug };
  const ordered = getOrderedRecommendations(context);
  if (!ordered) {
    return [];
  }

  return ordered.relatedCategories.filter((link) => link.available);
}

export function isPillarSlug(slug: string): boolean {
  return Boolean(getPillarBySlug(slug));
}
