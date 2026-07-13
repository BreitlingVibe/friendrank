import {
  getAllCategories,
  getCategoriesByPillar,
  getPillarBySlug,
} from "@/lib/discovery/category-registry";
import { findCategoriesForEvergreenPage } from "@/lib/discovery/discovery-utils";
import {
  getAllEvergreenHubs,
  getEvergreenHubBySlug,
} from "@/lib/evergreen-hubs/registry";
import type { EvergreenHubPageData } from "@/lib/evergreen-hubs/types";
import {
  getClusterMemberSlugs,
  PRIMARY_PILLAR_SLUGS,
  SUPPLEMENTAL_EVERGREEN_HUB_PARENT,
  type ContentTopicDefinition,
} from "@/lib/growth/content-opportunities/topic-definitions";
import {
  getIntentBySlug,
  getLiveIntents,
  getPlannedIntents,
} from "@/lib/landing-pages/planning/intent-registry";

export type SlugKind =
  | "landing-live"
  | "landing-planned"
  | "pillar"
  | "evergreen-hub"
  | "category-live"
  | "category-planned"
  | "category-seed"
  | "unknown";

export function classifySlug(slug: string): SlugKind {
  const intent = getIntentBySlug(slug);
  if (intent) {
    return intent.status === "live" ? "landing-live" : "landing-planned";
  }

  const category = getAllCategories().find((entry) => entry.slug === slug);
  if (category) {
    if (category.status === "live") {
      return "category-live";
    }
    if (category.status === "planned") {
      return "category-planned";
    }
    return "category-seed";
  }

  if ((PRIMARY_PILLAR_SLUGS as readonly string[]).includes(slug)) {
    return "pillar";
  }

  const evergreenHub = getEvergreenHubBySlug(slug);
  if (evergreenHub) {
    return evergreenHub.pageKind === "pillar" ? "pillar" : "evergreen-hub";
  }

  if (getAllEvergreenHubs().some((hub) => hub.slug === slug)) {
    return "evergreen-hub";
  }

  return "unknown";
}

export function isLandingSlug(slug: string): boolean {
  const kind = classifySlug(slug);
  return kind === "landing-live" || kind === "landing-planned";
}

export function getTopicMemberSlugs(topic: ContentTopicDefinition): string[] {
  const members = new Set<string>();

  for (const clusterId of topic.clusterIds) {
    for (const slug of getClusterMemberSlugs(clusterId)) {
      members.add(slug);
    }
  }

  return [...members];
}

export function getTopicLandingSlugs(topic: ContentTopicDefinition): {
  live: string[];
  planned: string[];
} {
  const live: string[] = [];
  const planned: string[] = [];

  for (const slug of getTopicMemberSlugs(topic)) {
    const kind = classifySlug(slug);
    if (kind === "landing-live") {
      live.push(slug);
    } else if (kind === "landing-planned") {
      planned.push(slug);
    }
  }

  return { live, planned };
}

export function getTopicEvergreenHubSlugs(topic: ContentTopicDefinition): string[] {
  const hubs = new Set<string>();

  for (const slug of getTopicMemberSlugs(topic)) {
    const kind = classifySlug(slug);
    if (kind === "pillar" || kind === "evergreen-hub") {
      hubs.add(slug);
    }
  }

  if (topic.pillarSlug) {
    hubs.add(topic.pillarSlug);
  }

  for (const [hubSlug, parentSlug] of Object.entries(
    SUPPLEMENTAL_EVERGREEN_HUB_PARENT,
  )) {
    if (parentSlug === topic.pillarSlug) {
      hubs.add(hubSlug);
    }
  }

  return [...hubs];
}

export function getTopicCategoryHubSlugs(topic: ContentTopicDefinition): {
  live: string[];
  planned: string[];
  seed: string[];
} {
  const live: string[] = [];
  const planned: string[] = [];
  const seed: string[] = [];

  if (topic.pillarSlug) {
    for (const category of getCategoriesByPillar(topic.pillarSlug)) {
      if (category.status === "live") {
        live.push(category.slug);
      } else if (category.status === "planned") {
        planned.push(category.slug);
      } else {
        seed.push(category.slug);
      }
    }
  }

  for (const slug of getTopicMemberSlugs(topic)) {
    const kind = classifySlug(slug);
    if (kind === "category-live" && !live.includes(slug)) {
      live.push(slug);
    } else if (kind === "category-planned" && !planned.includes(slug)) {
      planned.push(slug);
    } else if (kind === "category-seed" && !seed.includes(slug)) {
      seed.push(slug);
    }
  }

  return { live, planned, seed };
}

export function getPillarComingSoonCards(
  pillarSlug: string | null,
): string[] {
  if (!pillarSlug) {
    return [];
  }

  const hub = getEvergreenHubBySlug(pillarSlug);
  if (!hub || hub.pageKind !== "pillar") {
    return [];
  }

  return hub.categoryCards
    .filter((card) => card.comingSoon)
    .map((card) => card.title);
}

export function countLiveLandingPagesLinkedToCategoryHubs(
  liveLandingSlugs: string[],
): number {
  return liveLandingSlugs.filter((slug) =>
    findCategoriesForEvergreenPage(slug).some(
      (category) => category.status === "live",
    ),
  ).length;
}

export function countCategoryHubsWithFullLiveRegistry(
  liveCategorySlugs: string[],
): number {
  return liveCategorySlugs.filter((categorySlug) => {
    const category = getAllCategories().find(
      (entry) => entry.slug === categorySlug,
    );
    if (!category || category.relatedEvergreenSlugs.length === 0) {
      return false;
    }

    return category.relatedEvergreenSlugs.every((slug) => {
      const intent = getIntentBySlug(slug);
      return intent?.status === "live";
    });
  }).length;
}

export function getGlobalContentCounts() {
  return {
    totalLiveLandingPages: getLiveIntents().length,
    totalPlannedLandingPages: getPlannedIntents().length,
    totalEvergreenHubs: getAllEvergreenHubs().length,
    totalLiveCategoryHubs: getAllCategories().filter(
      (category) => category.status === "live",
    ).length,
    totalPlannedCategoryHubs: getAllCategories().filter(
      (category) => category.status === "planned",
    ).length,
  };
}

export function getPillarTitle(pillarSlug: string | null): string | null {
  if (!pillarSlug) {
    return null;
  }

  return (
    getPillarBySlug(pillarSlug)?.title ??
    getEvergreenHubBySlug(pillarSlug)?.title ??
    null
  );
}

export function isPillarLive(pillarSlug: string | null): boolean {
  if (!pillarSlug) {
    return false;
  }

  return getEvergreenHubBySlug(pillarSlug)?.pageKind === "pillar";
}

export function getEvergreenHubKind(
  slug: string,
): EvergreenHubPageData["pageKind"] | null {
  return getEvergreenHubBySlug(slug)?.pageKind ?? null;
}
