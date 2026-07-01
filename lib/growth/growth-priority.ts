import type { CtaLocation } from "@/lib/analytics";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import {
  getPriorityTier,
  HIGH_PRIORITY_THRESHOLD,
  type IntentPriorityTier,
} from "@/lib/landing-pages/planning/intent-priority";
import {
  getLiveIntents,
  type IntentDefinition,
} from "@/lib/landing-pages/planning/intent-registry";
import { getTopicHubCtaLocation } from "@/lib/topic-hubs/hub-analytics";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import { collectHubMemberSlugs } from "@/lib/topic-hubs/hub-utils";

export const GROWTH_PAGE_TYPES = [
  "homepage",
  "topic-hub",
  "landing-page",
] as const;

export type GrowthPageType = (typeof GROWTH_PAGE_TYPES)[number];

export const GROWTH_TIERS = ["P0", "P1", "P2", "P3"] as const;

export type GrowthTier = (typeof GROWTH_TIERS)[number];

export type GrowthCategoryGroupKey =
  | "friend"
  | "party"
  | "team"
  | "relationship"
  | "question";

export const GROWTH_CATEGORY_GROUPS: Record<
  GrowthCategoryGroupKey,
  {
    label: string;
    intentCategories: IntentDefinition["intentCategory"][];
    hubIds: string[];
  }
> = {
  friend: {
    label: "Friend",
    intentCategories: [
      INTENT_CATEGORIES.FRIENDSHIP,
      INTENT_CATEGORIES.SOCIAL_VOTING,
    ],
    hubIds: ["friend-games"],
  },
  party: {
    label: "Party",
    intentCategories: [INTENT_CATEGORIES.PARTY],
    hubIds: ["party-games"],
  },
  team: {
    label: "Team",
    intentCategories: [
      INTENT_CATEGORIES.TEAMS,
      INTENT_CATEGORIES.ICEBREAKERS,
    ],
    hubIds: ["team-building-games", "icebreaker-games"],
  },
  relationship: {
    label: "Relationship",
    intentCategories: [INTENT_CATEGORIES.RELATIONSHIPS],
    hubIds: ["relationship-games"],
  },
  question: {
    label: "Question",
    intentCategories: [INTENT_CATEGORIES.ENTERTAINMENT],
    hubIds: ["question-games"],
  },
};

export const STRONG_PAGES_PER_GROUP = 5;
export const SEARCH_CONSOLE_LANDING_PAGE_LIMIT = 20;

export type SearchConsoleAction =
  | "inspect-weekly"
  | "inspect-and-index"
  | "monitor-performance"
  | "track-position-8-30"
  | "indexing-check-quarterly";

export type GrowthPageClassification = {
  url: string;
  path: string;
  title: string;
  pageType: GrowthPageType;
  growthTier: GrowthTier;
  estimatedPriority: number;
  priorityTier: IntentPriorityTier | "Critical";
  topicHubId: string | null;
  topicHubSlug: string | null;
  categoryGroup: GrowthCategoryGroupKey | null;
  intentCategory: IntentDefinition["intentCategory"] | null;
  searchIntent: string | null;
  ctaLocation: CtaLocation | null;
  trafficPotential: number;
  featuredInHub: boolean;
  searchConsoleAction: SearchConsoleAction;
  searchConsoleActionLabel: string;
  monitorPriority: boolean;
};

const FEATURED_HUB_SLUGS = new Set(
  getAllHubDefinitions().flatMap((hub) => hub.featuredLandingPages ?? []),
);

const HUB_MEMBERSHIP = buildHubMembershipIndex();

function buildHubMembershipIndex(): Map<
  string,
  { hubId: string; hubSlug: string }
> {
  const index = new Map<string, { hubId: string; hubSlug: string }>();

  for (const hub of getAllHubDefinitions()) {
    for (const slug of collectHubMemberSlugs(hub)) {
      if (!index.has(slug)) {
        index.set(slug, { hubId: hub.id, hubSlug: hub.slug });
      }
    }
  }

  return index;
}

function resolveCategoryGroup(
  intent: IntentDefinition,
): GrowthCategoryGroupKey | null {
  for (const [groupKey, group] of Object.entries(GROWTH_CATEGORY_GROUPS) as [
    GrowthCategoryGroupKey,
    (typeof GROWTH_CATEGORY_GROUPS)[GrowthCategoryGroupKey],
  ][]) {
    if (group.intentCategories.includes(intent.intentCategory)) {
      return groupKey;
    }
  }

  return null;
}

function resolveGrowthTier(input: {
  pageType: GrowthPageType;
  estimatedPriority: number;
  featuredInHub: boolean;
}): GrowthTier {
  if (input.pageType === "homepage" || input.pageType === "topic-hub") {
    return "P0";
  }

  if (input.estimatedPriority >= HIGH_PRIORITY_THRESHOLD || input.featuredInHub) {
    return "P1";
  }

  if (input.estimatedPriority >= 40) {
    return "P2";
  }

  return "P3";
}

function resolveTrafficPotential(input: {
  pageType: GrowthPageType;
  estimatedPriority: number;
  featuredInHub: boolean;
}): number {
  if (input.pageType === "homepage") {
    return 100;
  }

  if (input.pageType === "topic-hub") {
    return 92;
  }

  let score = input.estimatedPriority;
  if (input.featuredInHub) {
    score += 8;
  }

  return Math.min(score, 100);
}

function resolveSearchConsoleAction(
  growthTier: GrowthTier,
  pageType: GrowthPageType,
): { action: SearchConsoleAction; label: string } {
  if (pageType === "homepage") {
    return {
      action: "inspect-weekly",
      label: "Inspect homepage weekly; confirm indexed; review branded queries",
    };
  }

  if (pageType === "topic-hub") {
    return {
      action: "inspect-and-index",
      label: "Inspect URL; request indexing after major content updates; monitor hub queries",
    };
  }

  switch (growthTier) {
    case "P1":
      return {
        action: "track-position-8-30",
        label:
          "Inspect URL; monitor avg position 8–30; review CTR and query coverage weekly",
      };
    case "P2":
      return {
        action: "monitor-performance",
        label: "Track in Performance report; inspect if crawled but not indexed",
      };
    default:
      return {
        action: "indexing-check-quarterly",
        label: "Quarterly indexing check; promote only if impressions appear",
      };
  }
}

function classifyHomepage(): GrowthPageClassification {
  return {
    url: PRODUCTION_APP_URL,
    path: "/",
    title: "FriendRank Homepage",
    pageType: "homepage",
    growthTier: "P0",
    estimatedPriority: 100,
    priorityTier: "Critical",
    topicHubId: null,
    topicHubSlug: null,
    categoryGroup: null,
    intentCategory: null,
    searchIntent: "Create a FriendRank group voting game and share one link.",
    ctaLocation: "hero_start",
    trafficPotential: 100,
    featuredInHub: false,
    searchConsoleAction: "inspect-weekly",
    searchConsoleActionLabel:
      "Inspect homepage weekly; confirm indexed; review branded queries",
    monitorPriority: true,
  };
}

function classifyTopicHub(hub: ReturnType<typeof getAllHubDefinitions>[number]): GrowthPageClassification {
  const action = resolveSearchConsoleAction("P0", "topic-hub");

  return {
    url: `${PRODUCTION_APP_URL}/${hub.slug}`,
    path: `/${hub.slug}`,
    title: hub.title,
    pageType: "topic-hub",
    growthTier: "P0",
    estimatedPriority: 92,
    priorityTier: "Critical",
    topicHubId: hub.id,
    topicHubSlug: hub.slug,
    categoryGroup: null,
    intentCategory: null,
    searchIntent: hub.description,
    ctaLocation: getTopicHubCtaLocation(hub.id),
    trafficPotential: 92,
    featuredInHub: false,
    searchConsoleAction: action.action,
    searchConsoleActionLabel: action.label,
    monitorPriority: true,
  };
}

function classifyLandingPage(
  intent: IntentDefinition,
): GrowthPageClassification {
  const landingPage = LANDING_PAGES.find((page) => page.slug === intent.slug);
  const hubMembership = HUB_MEMBERSHIP.get(intent.slug) ?? null;
  const featuredInHub = FEATURED_HUB_SLUGS.has(intent.slug);
  const categoryGroup = resolveCategoryGroup(intent);
  const growthTier = resolveGrowthTier({
    pageType: "landing-page",
    estimatedPriority: intent.estimatedPriority,
    featuredInHub,
  });
  const action = resolveSearchConsoleAction(growthTier, "landing-page");

  return {
    url: landingPage?.canonicalUrl ?? `${PRODUCTION_APP_URL}/${intent.slug}`,
    path: `/${intent.slug}`,
    title: intent.title,
    pageType: "landing-page",
    growthTier,
    estimatedPriority: intent.estimatedPriority,
    priorityTier: getPriorityTier(intent.estimatedPriority),
    topicHubId: hubMembership?.hubId ?? null,
    topicHubSlug: hubMembership?.hubSlug ?? null,
    categoryGroup,
    intentCategory: intent.intentCategory,
    searchIntent: intent.searchIntent,
    ctaLocation: landingPage?.ctaLocation ?? null,
    trafficPotential: resolveTrafficPotential({
      pageType: "landing-page",
      estimatedPriority: intent.estimatedPriority,
      featuredInHub,
    }),
    featuredInHub,
    searchConsoleAction: action.action,
    searchConsoleActionLabel: action.label,
    monitorPriority: growthTier === "P0" || growthTier === "P1",
  };
}

/** Classifies every indexable growth surface from existing registries. */
export function getAllGrowthClassifications(): GrowthPageClassification[] {
  const pages: GrowthPageClassification[] = [classifyHomepage()];

  for (const hub of getAllHubDefinitions()) {
    pages.push(classifyTopicHub(hub));
  }

  for (const intent of getLiveIntents()) {
    pages.push(classifyLandingPage(intent));
  }

  return pages.sort((pageA, pageB) => {
    if (pageB.trafficPotential !== pageA.trafficPotential) {
      return pageB.trafficPotential - pageA.trafficPotential;
    }

    return pageA.path.localeCompare(pageB.path);
  });
}

/** Returns the curated monitor list: homepage, hubs, and strongest category pages. */
export function getGrowthPriorityPages(): GrowthPageClassification[] {
  const allPages = getAllGrowthClassifications();
  const priorityPaths = new Set<string>();

  const selected: GrowthPageClassification[] = [];

  function addPage(page: GrowthPageClassification | undefined) {
    if (!page || priorityPaths.has(page.path)) {
      return;
    }

    priorityPaths.add(page.path);
    selected.push(page);
  }

  addPage(allPages.find((page) => page.pageType === "homepage"));

  for (const hub of getAllHubDefinitions()) {
    addPage(
      allPages.find(
        (page) => page.pageType === "topic-hub" && page.topicHubId === hub.id,
      ),
    );
  }

  for (const groupKey of Object.keys(GROWTH_CATEGORY_GROUPS) as GrowthCategoryGroupKey[]) {
    const group = GROWTH_CATEGORY_GROUPS[groupKey];
    const strongest = allPages
      .filter(
        (page) =>
          page.pageType === "landing-page" &&
          page.categoryGroup === groupKey &&
          (group.hubIds.includes(page.topicHubSlug ?? "") ||
            page.intentCategory !== null),
      )
      .sort((pageA, pageB) => pageB.estimatedPriority - pageA.estimatedPriority)
      .slice(0, STRONG_PAGES_PER_GROUP);

    for (const page of strongest) {
      addPage(page);
    }
  }

  return selected.sort((pageA, pageB) => {
    if (pageB.trafficPotential !== pageA.trafficPotential) {
      return pageB.trafficPotential - pageA.trafficPotential;
    }

    return pageA.path.localeCompare(pageB.path);
  });
}

/** Top landing pages for Search Console URL inspection beyond hubs. */
export function getSearchConsoleLandingPageTargets(
  limit = SEARCH_CONSOLE_LANDING_PAGE_LIMIT,
): GrowthPageClassification[] {
  return getAllGrowthClassifications()
    .filter((page) => page.pageType === "landing-page")
    .sort((pageA, pageB) => pageB.estimatedPriority - pageA.estimatedPriority)
    .slice(0, limit);
}

/** Strongest live pages for one growth category group. */
export function getStrongestPagesForGroup(
  groupKey: GrowthCategoryGroupKey,
  limit = STRONG_PAGES_PER_GROUP,
): GrowthPageClassification[] {
  return getAllGrowthClassifications()
    .filter(
      (page) =>
        page.pageType === "landing-page" && page.categoryGroup === groupKey,
    )
    .sort((pageA, pageB) => pageB.estimatedPriority - pageA.estimatedPriority)
    .slice(0, limit);
}

export type GrowthPriorityAuditIssue = {
  code: string;
  message: string;
};

/** Lightweight registry audit for growth priority coverage. */
export function auditGrowthPriorities(): {
  valid: boolean;
  issues: GrowthPriorityAuditIssue[];
  totals: {
    indexablePages: number;
    priorityPages: number;
    p0Pages: number;
    p1Pages: number;
  };
} {
  const issues: GrowthPriorityAuditIssue[] = [];
  const allPages = getAllGrowthClassifications();
  const priorityPages = getGrowthPriorityPages();

  if (!allPages.some((page) => page.pageType === "homepage")) {
    issues.push({
      code: "growth.missing_homepage",
      message: "Homepage classification is missing.",
    });
  }

  const hubCount = getAllHubDefinitions().length;
  const classifiedHubs = allPages.filter((page) => page.pageType === "topic-hub");

  if (classifiedHubs.length !== hubCount) {
    issues.push({
      code: "growth.hub_coverage_gap",
      message: `Expected ${hubCount} topic hub classifications, found ${classifiedHubs.length}.`,
    });
  }

  const liveIntentCount = getLiveIntents().length;
  const classifiedLandingPages = allPages.filter(
    (page) => page.pageType === "landing-page",
  );

  if (classifiedLandingPages.length !== liveIntentCount) {
    issues.push({
      code: "growth.landing_coverage_gap",
      message: `Expected ${liveIntentCount} live landing page classifications, found ${classifiedLandingPages.length}.`,
    });
  }

  for (const groupKey of Object.keys(GROWTH_CATEGORY_GROUPS) as GrowthCategoryGroupKey[]) {
    const strongest = getStrongestPagesForGroup(groupKey);
    if (strongest.length === 0) {
      issues.push({
        code: "growth.empty_category_group",
        message: `No live pages classified for ${GROWTH_CATEGORY_GROUPS[groupKey].label} group.`,
      });
    }
  }

  const duplicateUrls = allPages.length - new Set(allPages.map((page) => page.url)).size;
  if (duplicateUrls > 0) {
    issues.push({
      code: "growth.duplicate_urls",
      message: "Duplicate growth priority URLs detected.",
    });
  }

  for (const page of classifiedLandingPages) {
    if (!page.ctaLocation) {
      issues.push({
        code: "growth.missing_cta_location",
        message: `Landing page "${page.path}" has no CTA location mapping.`,
      });
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    totals: {
      indexablePages: allPages.length,
      priorityPages: priorityPages.length,
      p0Pages: allPages.filter((page) => page.growthTier === "P0").length,
      p1Pages: allPages.filter((page) => page.growthTier === "P1").length,
    },
  };
}

export function formatGrowthPriorityReport(): string {
  const audit = auditGrowthPriorities();
  const priorityPages = getGrowthPriorityPages();
  const inspectTargets = getSearchConsoleLandingPageTargets();

  const lines: string[] = [
    "FriendRank growth priority report",
    `Status: ${audit.valid ? "PASS" : "FAIL"}`,
    `Indexable pages: ${audit.totals.indexablePages}`,
    `Priority monitor URLs: ${audit.totals.priorityPages}`,
    `P0 pages: ${audit.totals.p0Pages}`,
    `P1 pages: ${audit.totals.p1Pages}`,
    "",
    "Top priority URLs",
  ];

  for (const page of priorityPages) {
    const hubLabel = page.topicHubSlug ?? "—";
    const categoryLabel = page.categoryGroup ?? "—";
    lines.push(
      `- ${page.path} | ${page.pageType} | tier ${page.growthTier} | hub ${hubLabel} | category ${categoryLabel}`,
    );
    lines.push(`  action: ${page.searchConsoleActionLabel}`);
  }

  lines.push("", `Search Console landing page inspect targets (top ${inspectTargets.length})`);

  for (const page of inspectTargets) {
    lines.push(
      `- ${page.path} | priority ${page.estimatedPriority} | ${page.intentCategory ?? "—"}`,
    );
  }

  if (audit.issues.length > 0) {
    lines.push("", "Audit issues");
    for (const entry of audit.issues) {
      lines.push(`- ${entry.code}: ${entry.message}`);
    }
  }

  return lines.join("\n").trimEnd();
}
