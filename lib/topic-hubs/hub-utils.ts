import { getCluster } from "@/lib/landing-pages/planning/keyword-clusters";
import {
  getIntentBySlug,
  type IntentDefinition,
} from "@/lib/landing-pages/planning/intent-registry";
import type {
  HubLandingPageRef,
  HubStats,
  TopicHubDefinition,
} from "@/lib/topic-hubs/hub-types";

function toHubLandingPageRef(intent: IntentDefinition): HubLandingPageRef {
  return {
    slug: intent.slug,
    title: intent.title,
    status: intent.status,
    estimatedPriority: intent.estimatedPriority,
    intentCategory: intent.intentCategory,
    searchIntent: intent.searchIntent,
    audience: intent.audience,
  };
}

/** Collects unique member slugs from all clusters linked to a hub. */
export function collectHubMemberSlugs(hub: TopicHubDefinition): string[] {
  const slugs = new Set<string>();

  for (const clusterId of hub.clusterIds) {
    const cluster = getCluster(clusterId);
    if (!cluster) {
      continue;
    }

    for (const slug of cluster.memberSlugs) {
      slugs.add(slug);
    }
  }

  return [...slugs];
}

/** Resolves registry intents for hub member slugs. Unknown slugs are skipped. */
export function resolveHubMemberIntents(
  hub: TopicHubDefinition,
): IntentDefinition[] {
  return collectHubMemberSlugs(hub)
    .map((slug) => getIntentBySlug(slug))
    .filter((intent): intent is IntentDefinition => intent !== undefined);
}

function compareByFeaturedThenPriority(
  slugA: string,
  slugB: string,
  featuredSlugs: string[],
  priorityBySlug: Map<string, number>,
): number {
  const featuredIndexA = featuredSlugs.indexOf(slugA);
  const featuredIndexB = featuredSlugs.indexOf(slugB);
  const isFeaturedA = featuredIndexA !== -1;
  const isFeaturedB = featuredIndexB !== -1;

  if (isFeaturedA && isFeaturedB) {
    return featuredIndexA - featuredIndexB;
  }

  if (isFeaturedA) {
    return -1;
  }

  if (isFeaturedB) {
    return 1;
  }

  const priorityA = priorityBySlug.get(slugA) ?? 0;
  const priorityB = priorityBySlug.get(slugB) ?? 0;

  if (priorityB !== priorityA) {
    return priorityB - priorityA;
  }

  return slugA.localeCompare(slugB);
}

export function sortHubLandingPages(
  pages: HubLandingPageRef[],
  featuredSlugs: string[] = [],
): HubLandingPageRef[] {
  const priorityBySlug = new Map(
    pages.map((page) => [page.slug, page.estimatedPriority]),
  );

  return [...pages].sort((pageA, pageB) =>
    compareByFeaturedThenPriority(
      pageA.slug,
      pageB.slug,
      featuredSlugs,
      priorityBySlug,
    ),
  );
}

export function partitionHubPages(intents: IntentDefinition[]): {
  landingPages: HubLandingPageRef[];
  plannedPages: HubLandingPageRef[];
} {
  const landingPages: HubLandingPageRef[] = [];
  const plannedPages: HubLandingPageRef[] = [];

  for (const intent of intents) {
    const ref = toHubLandingPageRef(intent);

    if (intent.status === "live") {
      landingPages.push(ref);
    } else {
      plannedPages.push(ref);
    }
  }

  return { landingPages, plannedPages };
}

export function computeHubStats(
  landingPages: HubLandingPageRef[],
  plannedPages: HubLandingPageRef[],
): HubStats {
  const allPages = [...landingPages, ...plannedPages];
  const liveCount = landingPages.length;
  const plannedCount = plannedPages.length;
  const totalCount = allPages.length;

  if (totalCount === 0) {
    return {
      liveCount,
      plannedCount,
      totalCount,
      highestPriorityPage: null,
      averagePriority: 0,
    };
  }

  const highestPriorityPage = [...allPages].sort(
    (pageA, pageB) => pageB.estimatedPriority - pageA.estimatedPriority,
  )[0];

  const prioritySum = allPages.reduce(
    (sum, page) => sum + page.estimatedPriority,
    0,
  );

  return {
    liveCount,
    plannedCount,
    totalCount,
    highestPriorityPage: highestPriorityPage ?? null,
    averagePriority: Math.round((prioritySum / totalCount) * 10) / 10,
  };
}
