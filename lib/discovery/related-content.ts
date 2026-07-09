import {
  getCategoryBySlug,
  getPillarBySlug,
} from "@/lib/discovery/category-registry";
import {
  findCategoriesForEvergreenPage,
  findCategoriesForPillar,
  getGameEntryPoint,
  getParentPillar,
  getRecommendedNextPage,
  getRelatedCategories,
  getRelatedPages,
} from "@/lib/discovery/discovery-utils";
import type {
  DiscoveryLink,
  DiscoveryPageContext,
  RelatedContent,
} from "@/lib/discovery/types";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";

function buildRecommendedNextPages(
  primary: DiscoveryLink | null,
  relatedCategories: DiscoveryLink[],
  relatedEvergreenPages: DiscoveryLink[],
): DiscoveryLink[] {
  const results: DiscoveryLink[] = [];
  const seen = new Set<string>();

  const candidates = [
    primary,
    ...relatedEvergreenPages.filter((link) => link.available),
    ...relatedCategories.filter((link) => link.available),
  ];

  for (const link of candidates) {
    if (!link || seen.has(`${link.kind}:${link.slug}`)) {
      continue;
    }

    seen.add(`${link.kind}:${link.slug}`);
    results.push(link);

    if (results.length >= 3) {
      break;
    }
  }

  return results;
}

function resolveCategoryContext(slug: string): RelatedContent | null {
  const category = getCategoryBySlug(slug);
  if (!category) {
    return null;
  }

  const context: DiscoveryPageContext = { type: "category", slug };
  const relatedPillar = getParentPillar(slug);
  const relatedCategories = getRelatedCategories(slug);
  const relatedEvergreenPages = getRelatedPages(slug);
  const recommended = getRecommendedNextPage(slug);

  return {
    context,
    relatedPillar,
    relatedCategories,
    relatedEvergreenPages,
    recommendedNextPages: buildRecommendedNextPages(
      recommended,
      relatedCategories,
      relatedEvergreenPages,
    ),
    gameEntryPoint: getGameEntryPoint(),
  };
}

function resolvePillarContext(slug: string): RelatedContent | null {
  const pillar = getPillarBySlug(slug);
  if (!pillar) {
    return null;
  }

  const context: DiscoveryPageContext = { type: "pillar", slug };
  const relatedPillar: DiscoveryLink = {
    slug: pillar.slug,
    title: pillar.title,
    description: pillar.description,
    href: `/${pillar.slug}`,
    available: true,
    kind: "pillar",
  };

  const relatedCategories = findCategoriesForPillar(slug).map((category) => ({
    slug: category.slug,
    title: category.title,
    description: category.description,
    href: `/categories/${category.slug}`,
    available: category.status === "live",
    kind: "category" as const,
  }));

  const evergreenSlugs = new Set<string>();
  for (const category of findCategoriesForPillar(slug)) {
    for (const pageSlug of category.relatedEvergreenSlugs) {
      evergreenSlugs.add(pageSlug);
    }
  }

  const relatedEvergreenPages: DiscoveryLink[] = [];
  for (const pageSlug of evergreenSlugs) {
    const intent = getIntentBySlug(pageSlug);
    if (!intent) {
      continue;
    }

    relatedEvergreenPages.push({
      slug: pageSlug,
      title: intent.title,
      href: `/${pageSlug}`,
      available: intent.status === "live",
      kind: "evergreen",
    });
  }

  const recommended =
    relatedEvergreenPages.find((link) => link.available) ??
    relatedCategories.find((link) => link.available) ??
    null;

  return {
    context,
    relatedPillar,
    relatedCategories,
    relatedEvergreenPages,
    recommendedNextPages: buildRecommendedNextPages(
      recommended,
      relatedCategories,
      relatedEvergreenPages,
    ),
    gameEntryPoint: getGameEntryPoint(),
  };
}

function resolveEvergreenContext(slug: string): RelatedContent | null {
  const intent = getIntentBySlug(slug);
  if (!intent) {
    return null;
  }

  const context: DiscoveryPageContext = { type: "evergreen", slug };
  const matchingCategories = findCategoriesForEvergreenPage(slug);
  const primaryCategory = matchingCategories[0];

  const relatedPillar = primaryCategory
    ? getParentPillar(primaryCategory.slug)
    : null;

  const relatedCategories: DiscoveryLink[] = matchingCategories.map((category) => ({
    slug: category.slug,
    title: category.title,
    description: category.description,
    href: `/categories/${category.slug}`,
    available: category.status === "live",
    kind: "category",
  }));

  const relatedEvergreenPages: DiscoveryLink[] = primaryCategory
    ? getRelatedPages(primaryCategory.slug).filter((link) => link.slug !== slug)
    : [];

  const recommended =
    relatedEvergreenPages.find((link) => link.available) ??
    relatedCategories.find((link) => link.available) ??
    relatedPillar;

  return {
    context,
    relatedPillar,
    relatedCategories,
    relatedEvergreenPages,
    recommendedNextPages: buildRecommendedNextPages(
      recommended ?? null,
      relatedCategories,
      relatedEvergreenPages,
    ),
    gameEntryPoint: getGameEntryPoint(),
  };
}

/**
 * Generic related-content resolver for pillars, category hubs, and evergreen pages.
 */
export function getRelatedContent(context: DiscoveryPageContext): RelatedContent | null {
  switch (context.type) {
    case "category":
      return resolveCategoryContext(context.slug);
    case "pillar":
      return resolvePillarContext(context.slug);
    case "evergreen":
      return resolveEvergreenContext(context.slug);
    default:
      return null;
  }
}

/** Convenience wrapper for category hub pages. */
export function getRelatedContentForCategory(
  categorySlug: string,
): RelatedContent | null {
  return getRelatedContent({ type: "category", slug: categorySlug });
}
