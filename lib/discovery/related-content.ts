import {
  getCategoryBySlug,
  getPillarBySlug,
} from "@/lib/discovery/category-registry";
import {
  dedupeDiscoveryLinks,
  excludeDiscoverySlug,
} from "@/lib/discovery/link-utils";
import {
  findCategoriesForEvergreenPage,
  findCategoriesForPillar,
  getGameEntryPoint,
  getParentPillar,
  getRelatedCategories,
  getRelatedPages,
  toCategoryLinkFromDefinition,
  toEvergreenLinkFromSlug,
  toPillarLinkFromSlug,
} from "@/lib/discovery/discovery-utils";
import type {
  DiscoveryLink,
  DiscoveryPageContext,
  RelatedContent,
} from "@/lib/discovery/types";
import { getEvergreenHubBySlug } from "@/lib/evergreen-hubs/registry";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import { getLiveRelatedPages } from "@/lib/landing-pages/internal-links";

/** Maps supplemental evergreen hubs to their parent pillar for discovery. */
export const EVERGREEN_HUB_PARENT_PILLAR: Record<string, string> = {
  "anonymous-voting-games": "friend-games",
  "browser-party-games": "party-games",
  "icebreaker-games": "team-building-games",
};

function buildRecommendedNextPages(
  siblingPages: DiscoveryLink[],
  relatedCategories: DiscoveryLink[],
  limit = 4,
): DiscoveryLink[] {
  return dedupeDiscoveryLinks([
    ...siblingPages.filter((link) => link.available),
    ...relatedCategories.filter((link) => link.available),
  ]).slice(0, limit);
}

function resolveCategoryContext(slug: string): RelatedContent | null {
  const category = getCategoryBySlug(slug);
  if (!category) {
    return null;
  }

  const context: DiscoveryPageContext = { type: "category", slug };
  const relatedPillar = getParentPillar(slug);
  const relatedCategories = excludeDiscoverySlug(getRelatedCategories(slug), slug);
  const relatedEvergreenPages = getRelatedPages(slug);
  const siblingPages = excludeDiscoverySlug(relatedEvergreenPages, slug);

  return {
    context,
    relatedPillar,
    relatedCategories,
    relatedEvergreenPages,
    recommendedNextPages: buildRecommendedNextPages(
      siblingPages,
      relatedCategories,
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
  const relatedPillar = toPillarLinkFromSlug(slug);
  const relatedCategories = findCategoriesForPillar(slug).map(
    toCategoryLinkFromDefinition,
  );

  const evergreenSlugs = new Set<string>();
  for (const category of findCategoriesForPillar(slug)) {
    for (const pageSlug of category.relatedEvergreenSlugs) {
      evergreenSlugs.add(pageSlug);
    }
  }

  const relatedEvergreenPages = [...evergreenSlugs]
    .map(toEvergreenLinkFromSlug)
    .filter((link): link is DiscoveryLink => link !== null);

  const siblingPages = relatedEvergreenPages.filter((link) => link.slug !== slug);

  return {
    context,
    relatedPillar,
    relatedCategories,
    relatedEvergreenPages,
    recommendedNextPages: buildRecommendedNextPages(
      siblingPages,
      relatedCategories,
    ),
    gameEntryPoint: getGameEntryPoint(),
  };
}

function buildEvergreenSiblings(
  slug: string,
  registryPages: DiscoveryLink[],
): DiscoveryLink[] {
  const seen = new Set(registryPages.map((link) => link.slug));
  const siblings: DiscoveryLink[] = [...registryPages];

  for (const page of getLiveRelatedPages(slug)) {
    if (!page.available || page.slug === slug || seen.has(page.slug)) {
      continue;
    }

    seen.add(page.slug);
    siblings.push({
      slug: page.slug,
      title: page.title,
      href: `/${page.slug}`,
      available: true,
      kind: "evergreen",
    });
  }

  return excludeDiscoverySlug(siblings, slug);
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

  const relatedCategories = matchingCategories.map(toCategoryLinkFromDefinition);

  const registryPages = primaryCategory
    ? excludeDiscoverySlug(getRelatedPages(primaryCategory.slug), slug)
    : [];

  const siblingPages = buildEvergreenSiblings(slug, registryPages);

  return {
    context,
    relatedPillar,
    relatedCategories,
    relatedEvergreenPages: siblingPages,
    recommendedNextPages: buildRecommendedNextPages(
      siblingPages,
      relatedCategories,
    ),
    gameEntryPoint: getGameEntryPoint(),
  };
}

function resolveEvergreenHubContext(slug: string): RelatedContent | null {
  const hub = getEvergreenHubBySlug(slug);
  if (!hub) {
    return null;
  }

  const parentPillarSlug = getPillarBySlug(slug)?.slug ?? EVERGREEN_HUB_PARENT_PILLAR[slug];
  const relatedPillar = parentPillarSlug
    ? toPillarLinkFromSlug(parentPillarSlug)
    : null;

  const relatedCategories = parentPillarSlug
    ? findCategoriesForPillar(parentPillarSlug).map(toCategoryLinkFromDefinition)
    : [];

  const hubLinks: DiscoveryLink[] = hub.internalLinks.map((link) => {
    const path = link.href.replace(/^\//, "");
    return {
      slug: path,
      title: link.label,
      href: link.href,
      available: true,
      kind: "evergreen" as const,
    };
  });

  const siblingPages = excludeDiscoverySlug(
    dedupeDiscoveryLinks([
      ...hubLinks,
      ...relatedCategories.flatMap((category) => {
        const definition = getCategoryBySlug(category.slug);
        if (!definition) {
          return [];
        }

        return getRelatedPages(definition.slug);
      }),
    ]),
    slug,
  );

  const context: DiscoveryPageContext = { type: "pillar", slug: parentPillarSlug ?? slug };

  return {
    context,
    relatedPillar,
    relatedCategories,
    relatedEvergreenPages: siblingPages,
    recommendedNextPages: buildRecommendedNextPages(
      siblingPages,
      relatedCategories,
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

/** Resolves discovery context from any public content slug. */
export function getRelatedContentForSlug(slug: string): RelatedContent | null {
  if (getCategoryBySlug(slug)?.status === "live") {
    return getRelatedContent({ type: "category", slug });
  }

  if (getPillarBySlug(slug)) {
    return getRelatedContent({ type: "pillar", slug });
  }

  if (getIntentBySlug(slug)?.status === "live") {
    return getRelatedContent({ type: "evergreen", slug });
  }

  if (getEvergreenHubBySlug(slug)) {
    return resolveEvergreenHubContext(slug);
  }

  return null;
}

/** Convenience wrapper for category hub pages. */
export function getRelatedContentForCategory(
  categorySlug: string,
): RelatedContent | null {
  return getRelatedContent({ type: "category", slug: categorySlug });
}
