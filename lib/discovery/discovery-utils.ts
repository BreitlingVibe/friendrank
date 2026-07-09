import {
  getAllCategories,
  getCategoriesByPillar,
  getCategoryBySlug,
  getCategoryHubPath,
  getPillarBySlug,
  isCategoryHubLive,
} from "@/lib/discovery/category-registry";
import type { CategoryDefinition, DiscoveryLink } from "@/lib/discovery/types";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";

const GAME_CREATE_PATH = "/#create-game";

function toEvergreenLink(slug: string): DiscoveryLink | null {
  const intent = getIntentBySlug(slug);
  if (!intent) {
    return null;
  }

  return {
    slug,
    title: intent.title,
    href: `/${slug}`,
    available: intent.status === "live",
    kind: "evergreen",
  };
}

export function toEvergreenLinkFromSlug(slug: string): DiscoveryLink | null {
  return toEvergreenLink(slug);
}

function toCategoryLink(category: CategoryDefinition): DiscoveryLink {
  const live = isCategoryHubLive(category.slug);

  return {
    slug: category.slug,
    title: category.title,
    description: category.description,
    href: live ? getCategoryHubPath(category.slug) : getCategoryHubPath(category.slug),
    available: live,
    kind: "category",
  };
}

export function toCategoryLinkFromDefinition(
  category: CategoryDefinition,
): DiscoveryLink {
  return toCategoryLink(category);
}

function toPillarLink(pillarSlug: string): DiscoveryLink | null {
  const pillar = getPillarBySlug(pillarSlug);
  if (!pillar) {
    return null;
  }

  return {
    slug: pillar.slug,
    title: pillar.title,
    description: pillar.description,
    href: `/${pillar.slug}`,
    available: true,
    kind: "pillar",
  };
}

export function toPillarLinkFromSlug(pillarSlug: string): DiscoveryLink | null {
  return toPillarLink(pillarSlug);
}

export function getParentPillar(categorySlug: string): DiscoveryLink | null {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return null;
  }

  return toPillarLink(category.parentPillar);
}

export function getSiblingCategories(categorySlug: string): DiscoveryLink[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return [];
  }

  return getCategoriesByPillar(category.parentPillar)
    .filter((entry) => entry.slug !== categorySlug)
    .map(toCategoryLink);
}

export function getRelatedCategories(categorySlug: string): DiscoveryLink[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return [];
  }

  const links: DiscoveryLink[] = [];
  const seen = new Set<string>([categorySlug]);

  for (const slug of category.relatedCategorySlugs) {
    if (seen.has(slug)) {
      continue;
    }

    const related = getCategoryBySlug(slug);
    if (related) {
      seen.add(slug);
      links.push(toCategoryLink(related));
    }
  }

  for (const sibling of getSiblingCategories(categorySlug)) {
    if (seen.has(sibling.slug)) {
      continue;
    }

    seen.add(sibling.slug);
    links.push(sibling);
  }

  return links;
}

export function getRelatedPages(categorySlug: string): DiscoveryLink[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return [];
  }

  const links: DiscoveryLink[] = [];
  const seen = new Set<string>();

  for (const slug of category.relatedEvergreenSlugs) {
    if (seen.has(slug)) {
      continue;
    }

    const link = toEvergreenLink(slug);
    if (link) {
      seen.add(slug);
      links.push(link);
    }
  }

  return links;
}

export function getRecommendedNextPage(categorySlug: string): DiscoveryLink | null {
  const sibling = getRelatedPages(categorySlug).find((link) => link.available);
  if (sibling) {
    return sibling;
  }

  const pillar = getParentPillar(categorySlug);
  if (pillar) {
    return pillar;
  }

  const category = getRelatedCategories(categorySlug).find((link) => link.available);
  if (category) {
    return category;
  }

  return getGameEntryPoint();
}

export function getGameEntryPoint(): DiscoveryLink {
  return {
    slug: "create-game",
    title: "Create a free game",
    href: GAME_CREATE_PATH,
    available: true,
    kind: "game-creation",
  };
}

export function findCategoriesForEvergreenPage(
  evergreenSlug: string,
): CategoryDefinition[] {
  return getAllCategories().filter((category) =>
    category.relatedEvergreenSlugs.includes(evergreenSlug),
  );
}

export function findCategoriesForPillar(pillarSlug: string): CategoryDefinition[] {
  return getCategoriesByPillar(pillarSlug);
}
