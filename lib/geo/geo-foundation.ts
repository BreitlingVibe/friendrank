import { SITE_NAME } from "@/lib/seo/site-metadata";
import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import type { TopicHubPageData } from "@/lib/landing-pages/topic-hub-experience";
import { getRecommendedTopicHubs } from "@/lib/topic-hubs/hub-recommendations";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";

export const GEO_SUMMARY_MAX_CHARS = 300;

export const GEO_CONTENT_TYPES = [
  "homepage",
  "topic-hub",
  "landing-page",
] as const;

export type GeoContentType = (typeof GEO_CONTENT_TYPES)[number];

export const GEO_USER_INTENTS = [
  "discover",
  "create",
  "compare",
  "learn",
  "play",
] as const;

export type GeoUserIntent = (typeof GEO_USER_INTENTS)[number];

export const GEO_PURPOSES = [
  "exploration",
  "conversion",
  "education",
  "reference",
] as const;

export type GeoPurpose = (typeof GEO_PURPOSES)[number];

export type GeoSemanticRelationship = {
  entity: string;
  relationship: "related-to" | "supports" | "alternative-to" | "part-of";
  target: string;
};

export type GeoContentSignals = {
  primaryTopics: string[];
  secondaryTopics: string[];
  relatedConcepts: string[];
  conversationConcepts: string[];
  intentConcepts: string[];
};

export type GeoFoundation = {
  primaryEntity: string;
  supportingEntities: string[];
  relatedEntities: string[];
  userIntent: GeoUserIntent;
  audience: string;
  contentType: GeoContentType;
  purpose: GeoPurpose;
  semanticRelationships: GeoSemanticRelationship[];
  summary: string;
  contentSignals: GeoContentSignals;
};

export type GeoPageRecord = {
  path: string;
  title: string;
  geoFoundation: GeoFoundation;
};

function uniqueNonEmpty(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(trimmed);
  }

  return result;
}

function significantWords(text: string, limit = 6): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, limit);
}

function fitSummary(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= GEO_SUMMARY_MAX_CHARS) {
    return normalized;
  }

  const shortened = normalized
    .slice(0, GEO_SUMMARY_MAX_CHARS - 1)
    .replace(/\s+\S*$/, "")
    .trim();

  return /[.!?]$/.test(shortened) ? shortened : `${shortened}.`;
}

function deriveAudienceLabel(audience: string, intentCategory?: string): string {
  const lower = audience.toLowerCase();

  if (lower.includes("couple") || lower.includes("dating")) {
    return "couples";
  }

  if (
    lower.includes("team") ||
    lower.includes("coworker") ||
    lower.includes("workplace") ||
    lower.includes("office")
  ) {
    return "teams";
  }

  if (lower.includes("party") || lower.includes("hangout")) {
    return "party groups";
  }

  if (lower.includes("friend") || lower.includes("group chat")) {
    return "friends";
  }

  if (lower.includes("classroom") || lower.includes("student")) {
    return "students";
  }

  if (intentCategory === INTENT_CATEGORIES.RELATIONSHIPS) {
    return "couples";
  }

  if (intentCategory === INTENT_CATEGORIES.TEAMS) {
    return "teams";
  }

  if (intentCategory === INTENT_CATEGORIES.PARTY) {
    return "party groups";
  }

  return "groups";
}

function resolveLandingUserIntent(slug: string, searchIntent: string): GeoUserIntent {
  if (slug.startsWith("games-for-")) {
    return "discover";
  }

  if (slug.includes("questions")) {
    return "learn";
  }

  if (slug.includes("generator") || slug.includes("quiz")) {
    return "create";
  }

  if (/compare|choose between|versus/i.test(searchIntent)) {
    return "compare";
  }

  return "play";
}

function resolvePurpose(
  contentType: GeoContentType,
  userIntent: GeoUserIntent,
): GeoPurpose {
  if (contentType === "homepage") {
    return "conversion";
  }

  if (contentType === "topic-hub") {
    return "exploration";
  }

  if (userIntent === "learn") {
    return "education";
  }

  if (userIntent === "discover" || userIntent === "compare") {
    return "exploration";
  }

  if (userIntent === "create" || userIntent === "play") {
    return "conversion";
  }

  return "reference";
}

function buildSemanticRelationships(
  primaryEntity: string,
  supportingEntities: string[],
  relatedEntities: string[],
): GeoSemanticRelationship[] {
  const relationships: GeoSemanticRelationship[] = [];

  for (const entity of supportingEntities.slice(0, 4)) {
    relationships.push({
      entity: primaryEntity,
      relationship: "supports",
      target: entity,
    });
  }

  for (const entity of relatedEntities.slice(0, 4)) {
    relationships.push({
      entity: primaryEntity,
      relationship: "related-to",
      target: entity,
    });
  }

  return relationships;
}

function buildLandingContentSignals(page: LandingPageData): GeoContentSignals {
  const registryIntent = getIntentBySlug(page.slug);

  return {
    primaryTopics: uniqueNonEmpty([
      ...(registryIntent ? [registryIntent.intentCategory] : []),
      ...page.primaryEntities.map((entity) => entity.name),
      page.title,
    ]).slice(0, 6),
    secondaryTopics: uniqueNonEmpty([
      ...page.secondaryEntities.map((entity) => entity.name),
      ...page.bestForTags.map((tag) => tag.label),
    ]).slice(0, 8),
    relatedConcepts: uniqueNonEmpty([
      ...page.relatedPages.map((entry) => entry.title),
      ...page.youMayAlsoLike.map((entry) => entry.title),
      ...page.popularSearches.map((entry) => entry.title),
    ]).slice(0, 8),
    conversationConcepts: uniqueNonEmpty([
      ...page.exampleQuestions.map((entry) => entry.text),
      ...page.contentQuality.goodFor.bullets,
      "anonymous voting",
      "group results",
    ]).slice(0, 6),
    intentConcepts: uniqueNonEmpty([
      ...(registryIntent ? significantWords(registryIntent.searchIntent) : []),
      ...(registryIntent ? significantWords(registryIntent.audience, 4) : []),
    ]).slice(0, 8),
  };
}

function buildLandingSummary(
  page: LandingPageData,
  audience: string,
  userIntent: GeoUserIntent,
): string {
  const titleLower = page.title.toLowerCase();

  switch (userIntent) {
    case "learn":
      return fitSummary(
        `This page helps ${audience} learn and use ${titleLower} as conversation prompts they can turn into a live FriendRank voting game.`,
      );
    case "discover":
      return fitSummary(
        `This page helps ${audience} discover ${titleLower} options, compare formats and choose a browser game that fits their group.`,
      );
    case "compare":
      return fitSummary(
        `This page helps ${audience} compare ${titleLower} formats and pick the best anonymous voting game for their occasion.`,
      );
    case "create":
      return fitSummary(
        `This page helps ${audience} create ${titleLower} with FriendRank, share one link and collect anonymous phone votes.`,
      );
    default:
      return fitSummary(
        `This page helps ${audience} play ${titleLower} online with anonymous voting, quick setup and shareable group results.`,
      );
  }
}

function buildLandingGeoFoundation(
  page: Omit<LandingPageData, "geoFoundation" | "aiCitation">,
): GeoFoundation {
  const registryIntent = getIntentBySlug(page.slug);
  const searchIntent = registryIntent?.searchIntent ?? page.intentSummary;
  const registryAudience = registryIntent?.audience ?? page.heroSubtitle;
  const intentCategory = registryIntent?.intentCategory;

  const primaryEntity = page.primaryEntities[0]?.name ?? page.title;
  const supportingEntities = uniqueNonEmpty([
    ...page.primaryEntities.slice(1).map((entity) => entity.name),
    ...page.secondaryEntities.map((entity) => entity.name),
  ]).slice(0, 6);
  const relatedEntities = uniqueNonEmpty([
    ...page.relatedEntities.map((entity) => entity.name),
    ...page.relatedPages.slice(0, 3).map((entry) => entry.title),
    ...page.youMayAlsoLike.slice(0, 2).map((entry) => entry.title),
  ]).slice(0, 6);

  const userIntent = resolveLandingUserIntent(page.slug, searchIntent);
  const audience = deriveAudienceLabel(registryAudience, intentCategory);
  const contentType: GeoContentType = "landing-page";
  const purpose = resolvePurpose(contentType, userIntent);

  return {
    primaryEntity,
    supportingEntities,
    relatedEntities,
    userIntent,
    audience,
    contentType,
    purpose,
    semanticRelationships: buildSemanticRelationships(
      primaryEntity,
      supportingEntities,
      relatedEntities,
    ),
    summary: buildLandingSummary(page as LandingPageData, audience, userIntent),
    contentSignals: buildLandingContentSignals(page as LandingPageData),
  };
}

function buildTopicHubSummary(primaryKeyword: string): string {
  return fitSummary(
    `This page helps groups discover online ${primaryKeyword}, compare game formats and quickly choose one that fits their occasion.`,
  );
}

function buildTopicHubGeoFoundation(
  page: Omit<TopicHubPageData, "geoFoundation" | "aiCitation">,
): GeoFoundation {
  const primaryEntity = page.hub.title;
  const supportingEntities = uniqueNonEmpty([
    ...page.featuredPages.map((entry) => entry.title),
    ...page.entityNavigation.groups.flatMap((group) =>
      group.chips.slice(0, 2).map((chip) => chip.name),
    ),
  ]).slice(0, 6);
  const relatedEntities = uniqueNonEmpty([
    ...getRecommendedTopicHubs(page.hub.id).map((hub) => hub.title),
    ...page.allLivePages.slice(0, 3).map((entry) => entry.title),
  ]).slice(0, 6);

  const userIntent: GeoUserIntent = "discover";
  const audience = deriveAudienceLabel(
    page.hub.description,
    page.hub.primaryKeyword.includes("team")
      ? INTENT_CATEGORIES.TEAMS
      : page.hub.primaryKeyword.includes("relationship")
        ? INTENT_CATEGORIES.RELATIONSHIPS
        : page.hub.primaryKeyword.includes("party")
          ? INTENT_CATEGORIES.PARTY
          : undefined,
  );
  const contentType: GeoContentType = "topic-hub";
  const purpose = resolvePurpose(contentType, userIntent);

  return {
    primaryEntity,
    supportingEntities,
    relatedEntities,
    userIntent,
    audience,
    contentType,
    purpose,
    semanticRelationships: buildSemanticRelationships(
      primaryEntity,
      supportingEntities,
      relatedEntities,
    ),
    summary: buildTopicHubSummary(page.hub.primaryKeyword),
    contentSignals: {
      primaryTopics: uniqueNonEmpty([
        page.hub.title,
        page.hub.primaryKeyword,
        ...page.featuredPages.map((entry) => entry.title),
      ]).slice(0, 6),
      secondaryTopics: uniqueNonEmpty([
        ...page.benefits.map((benefit) => benefit.title),
        ...page.entityNavigation.groups.flatMap((group) =>
          group.chips.map((chip) => chip.name),
        ),
      ]).slice(0, 8),
      relatedConcepts: uniqueNonEmpty([
        ...relatedEntities,
        ...page.plannedPages.slice(0, 2).map((entry) => entry.title),
      ]).slice(0, 8),
      conversationConcepts: uniqueNonEmpty([
        "game discovery",
        "group voting",
        "browser games",
        page.hub.primaryKeyword,
      ]).slice(0, 6),
      intentConcepts: uniqueNonEmpty([
        ...significantWords(page.hub.description),
        ...significantWords(page.hub.hero),
        "discover",
        "explore",
      ]).slice(0, 8),
    },
  };
}

/** Builds GEO metadata for the homepage. */
export function buildHomepageGeoFoundation(): GeoFoundation {
  const primaryEntity = SITE_NAME;
  const supportingEntities = getAllHubDefinitions()
    .map((hub) => hub.title)
    .slice(0, 6);
  const relatedEntities = supportingEntities.slice(0, 4);
  const userIntent: GeoUserIntent = "create";
  const audience = "groups";
  const contentType: GeoContentType = "homepage";
  const purpose = resolvePurpose(contentType, userIntent);

  return {
    primaryEntity,
    supportingEntities,
    relatedEntities,
    userIntent,
    audience,
    contentType,
    purpose,
    semanticRelationships: buildSemanticRelationships(
      primaryEntity,
      supportingEntities,
      relatedEntities,
    ),
    summary: fitSummary(
      `${SITE_NAME} helps groups create free browser voting games, share one link, vote anonymously from phones and reveal funny group results together.`,
    ),
    contentSignals: {
      primaryTopics: uniqueNonEmpty([
        SITE_NAME,
        "group voting game",
        "friend games",
        "party games",
      ]),
      secondaryTopics: supportingEntities,
      relatedConcepts: uniqueNonEmpty([
        ...supportingEntities,
        "anonymous voting",
        "browser games",
      ]),
      conversationConcepts: uniqueNonEmpty([
        "create a game",
        "share one link",
        "group results",
        "phone voting",
      ]),
      intentConcepts: uniqueNonEmpty([
        "create",
        "vote",
        "friends",
        "party",
        "groups",
        "browser",
      ]),
    },
  };
}

function isTopicHubPage(
  page: LandingPageData | TopicHubPageData,
): page is TopicHubPageData {
  return "topicHubExperience" in page;
}

/** Enriches assembled landing or topic hub pages with internal GEO metadata. */
export function applyGeoFoundation(
  page: Omit<LandingPageData, "geoFoundation" | "aiCitation">,
): Omit<LandingPageData, "aiCitation">;
export function applyGeoFoundation(
  page: Omit<TopicHubPageData, "geoFoundation" | "aiCitation">,
): Omit<TopicHubPageData, "aiCitation">;
export function applyGeoFoundation(
  page:
    | Omit<LandingPageData, "geoFoundation" | "aiCitation">
    | Omit<TopicHubPageData, "geoFoundation" | "aiCitation">,
): Omit<LandingPageData, "aiCitation"> | Omit<TopicHubPageData, "aiCitation"> {
  if (isTopicHubPage(page as LandingPageData | TopicHubPageData)) {
    return {
      ...(page as TopicHubPageData),
      geoFoundation: buildTopicHubGeoFoundation(page as TopicHubPageData),
    };
  }

  return {
    ...(page as LandingPageData),
    geoFoundation: buildLandingGeoFoundation(page as LandingPageData),
  };
}

/** Collects GEO records for homepage, landing pages, and topic hubs. */
export function collectGeoPageRecords(input: {
  landingPages: LandingPageData[];
  topicHubPages: TopicHubPageData[];
}): GeoPageRecord[] {
  return [
    {
      path: "/",
      title: SITE_NAME,
      geoFoundation: buildHomepageGeoFoundation(),
    },
    ...input.landingPages.map((page) => ({
      path: `/${page.slug}`,
      title: page.title,
      geoFoundation: page.geoFoundation,
    })),
    ...input.topicHubPages.map((page) => ({
      path: `/${page.hub.slug}`,
      title: page.hub.title,
      geoFoundation: page.geoFoundation,
    })),
  ];
}
