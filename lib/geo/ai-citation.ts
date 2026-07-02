import { SITE_NAME } from "@/lib/seo/site-metadata";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import { getPrimaryTopicHubIdForSlug } from "@/lib/landing-pages/recommendation-utils";
import type { BestForTagId } from "@/lib/landing-pages/best-for-tags";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import type { TopicHubPageData } from "@/lib/landing-pages/topic-hub-experience";
import {
  buildHomepageGeoFoundation,
  type GeoFoundation,
  type GeoUserIntent,
} from "@/lib/geo/geo-foundation";
import { getHubDefinition } from "@/lib/topic-hubs/hub-registry";
import { getRecommendedTopicHubs } from "@/lib/topic-hubs/hub-recommendations";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";

export const CANONICAL_ANSWER_MIN_WORDS = 60;
export const CANONICAL_ANSWER_MAX_WORDS = 140;
export const CITATION_SUMMARY_MAX_CHARS = 280;
export const MIN_LIKELY_QUESTIONS = 3;
export const KEY_TAKEAWAYS_COUNT = 3;

export const CITATION_CONFIDENCE_LEVELS = ["High", "Medium", "Low"] as const;

export type CitationConfidence = (typeof CITATION_CONFIDENCE_LEVELS)[number];

export type AiCitationEvidence = {
  purpose: string;
  audience: string;
  typicalGroupSize: string;
  typicalDuration: string;
  playStyle: string;
  requiresRegistration: string;
  mobileFriendly: string;
  conversationBased: string;
  competitive: string;
  anonymousVoting: string;
};

export type AiCitationRelatedKnowledge = {
  relatedConcepts: string[];
  alternativeGameFormats: string[];
  complementaryPages: string[];
  parentTopic: string;
  siblingTopics: string[];
  knowledgeGraphConnections: string[];
};

export type AiCitationLayer = {
  canonicalAnswer: string;
  likelyQuestions: string[];
  evidence: AiCitationEvidence;
  keyTakeaways: [string, string, string];
  citationSummary: string;
  relatedKnowledge: AiCitationRelatedKnowledge;
  citationConfidence: CitationConfidence;
};

export type AiCitationPageRecord = {
  path: string;
  title: string;
  aiCitation: AiCitationLayer;
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

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function fitCitationSummary(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= CITATION_SUMMARY_MAX_CHARS) {
    return normalized;
  }

  const shortened = normalized
    .slice(0, CITATION_SUMMARY_MAX_CHARS - 1)
    .replace(/\s+\S*$/, "")
    .trim();

  return /[.!?]$/.test(shortened) ? shortened : `${shortened}.`;
}

function assembleCanonicalAnswer(sentences: string[]): string {
  const selected: string[] = [];
  let wordCount = 0;

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) {
      continue;
    }

    const sentenceWords = countWords(trimmed);
    if (
      wordCount + sentenceWords > CANONICAL_ANSWER_MAX_WORDS &&
      wordCount >= CANONICAL_ANSWER_MIN_WORDS
    ) {
      break;
    }

    selected.push(trimmed);
    wordCount += sentenceWords;

    if (wordCount >= CANONICAL_ANSWER_MIN_WORDS) {
      if (wordCount >= CANONICAL_ANSWER_MAX_WORDS) {
        break;
      }
    }
  }

  let answer = selected.join(" ").replace(/\s+/g, " ").trim();
  let words = answer.split(/\s+/).filter(Boolean);

  if (words.length > CANONICAL_ANSWER_MAX_WORDS) {
    words = words.slice(0, CANONICAL_ANSWER_MAX_WORDS);
    answer = `${words.join(" ").replace(/[,;]$/, "")}.`;
  }

  if (countWords(answer) < CANONICAL_ANSWER_MIN_WORDS) {
    const padding =
      "FriendRank runs in the browser, needs no app install, and works well when groups want a fast social activity with shareable results everyone can see together.";
    answer = `${answer} ${padding}`.replace(/\s+/g, " ").trim();
    words = answer.split(/\s+/).filter(Boolean);
    if (words.length > CANONICAL_ANSWER_MAX_WORDS) {
      answer = `${words.slice(0, CANONICAL_ANSWER_MAX_WORDS).join(" ").replace(/[,;]$/, "")}.`;
    }
  }

  return answer;
}

function resolvePlayStyle(userIntent: GeoUserIntent): string {
  switch (userIntent) {
    case "discover":
      return "Browse and compare formats";
    case "create":
      return "Create and share a custom game";
    case "compare":
      return "Compare options before playing";
    case "learn":
      return "Conversation prompts and question lists";
    default:
      return "Anonymous group voting";
  }
}

function resolveGroupSize(tagIds: Set<BestForTagId>): string {
  if (tagIds.has("large-groups")) {
    return "8–20 people";
  }
  if (tagIds.has("small-groups")) {
    return "3–6 people";
  }
  return "3–12 people";
}

function resolveDuration(tagIds: Set<BestForTagId>, audience: string): string {
  if (tagIds.has("quick-game")) {
    return "5–10 minutes";
  }
  if (audience === "teams") {
    return "10–20 minutes";
  }
  return "5–15 minutes";
}

function resolveConversationBased(
  slug: string,
  userIntent: GeoUserIntent,
): string {
  if (slug.includes("questions") || userIntent === "learn") {
    return "Yes — question-driven prompts";
  }
  if (userIntent === "discover") {
    return "Moderate — format exploration";
  }
  return "Yes — prompts spark group discussion";
}

function resolveCompetitive(userIntent: GeoUserIntent): string {
  if (userIntent === "learn" || userIntent === "discover") {
    return "Low — exploration focused";
  }
  return "Light competition through anonymous votes";
}

function buildLikelyQuestions(primaryEntity: string): string[] {
  return [
    `What is ${primaryEntity}?`,
    `How do you play ${primaryEntity}?`,
    `When should you use ${primaryEntity}?`,
    `Who is ${primaryEntity} for?`,
    `What games are similar to ${primaryEntity}?`,
    `Why is ${primaryEntity} fun?`,
  ];
}

function buildKeyTakeaways(
  bestForLabels: string[],
  goodForBullets: string[],
  audience: string,
): [string, string, string] {
  const candidates = uniqueNonEmpty([
    ...bestForLabels.map((label) => {
      if (label === "No signup") {
        return "No signup required";
      }
      if (label === "Mobile play") {
        return "Works on mobile";
      }
      if (label === "Quick game") {
        return "Quick to start";
      }
      return label;
    }),
    ...goodForBullets.slice(0, 4).map((bullet) => {
      const trimmed = bullet.trim();
      if (trimmed.length <= 40) {
        return trimmed;
      }
      return trimmed.split(/[.;]/)[0]?.trim() ?? trimmed;
    }),
    audience === "teams" ? "Great for teams" : "Great for groups",
    "Anonymous phone voting",
    "Share one link",
  ]);

  const takeaways = candidates.slice(0, KEY_TAKEAWAYS_COUNT);

  while (takeaways.length < KEY_TAKEAWAYS_COUNT) {
    const fallbacks = ["Easy to start", "Works on mobile", "Fun group results"];
    takeaways.push(fallbacks[takeaways.length] ?? "Fun group results");
  }

  return [takeaways[0]!, takeaways[1]!, takeaways[2]!];
}

function buildLandingRelatedKnowledge(
  page: LandingPageData,
  geo: GeoFoundation,
): AiCitationRelatedKnowledge {
  const hubId = getPrimaryTopicHubIdForSlug(page.slug);
  const parentHub = hubId ? getHubDefinition(hubId) : undefined;

  return {
    relatedConcepts: uniqueNonEmpty([
      ...geo.contentSignals.relatedConcepts,
      ...geo.contentSignals.conversationConcepts,
    ]).slice(0, 6),
    alternativeGameFormats: uniqueNonEmpty([
      ...geo.relatedEntities,
      ...geo.supportingEntities,
    ]).slice(0, 6),
    complementaryPages: uniqueNonEmpty([
      ...page.relatedPages.map((entry) => entry.title),
      ...page.youMayAlsoLike.map((entry) => entry.title),
    ]).slice(0, 6),
    parentTopic: parentHub?.title ?? geo.supportingEntities[0] ?? geo.primaryEntity,
    siblingTopics: uniqueNonEmpty([
      ...page.playersAlsoEnjoy.map((entry) => entry.title),
      ...page.popularSearches.map((entry) => entry.title),
    ]).slice(0, 6),
    knowledgeGraphConnections: uniqueNonEmpty([
      ...geo.semanticRelationships.map(
        (relationship) => `${relationship.entity} ${relationship.relationship} ${relationship.target}`,
      ),
      ...page.primaryEntities.map((entity) => entity.name),
      ...page.secondaryEntities.map((entity) => entity.name),
    ]).slice(0, 8),
  };
}

function buildTopicHubRelatedKnowledge(
  page: TopicHubPageData,
  geo: GeoFoundation,
): AiCitationRelatedKnowledge {
  return {
    relatedConcepts: uniqueNonEmpty([
      ...geo.contentSignals.relatedConcepts,
      ...geo.contentSignals.conversationConcepts,
    ]).slice(0, 6),
    alternativeGameFormats: uniqueNonEmpty([
      ...geo.relatedEntities,
      ...page.featuredPages.map((entry) => entry.title),
    ]).slice(0, 6),
    complementaryPages: uniqueNonEmpty([
      ...page.allLivePages.slice(0, 4).map((entry) => entry.title),
      ...page.plannedPages.slice(0, 2).map((entry) => entry.title),
    ]).slice(0, 6),
    parentTopic: SITE_NAME,
    siblingTopics: uniqueNonEmpty([
      ...getRecommendedTopicHubs(page.hub.id).map((hub) => hub.title),
      ...page.otherHubs.map((hub) => hub.title),
    ]).slice(0, 6),
    knowledgeGraphConnections: uniqueNonEmpty([
      ...geo.semanticRelationships.map(
        (relationship) => `${relationship.entity} ${relationship.relationship} ${relationship.target}`,
      ),
      ...page.entityNavigation.groups.flatMap((group) =>
        group.chips.map((chip) => chip.name),
      ),
    ]).slice(0, 8),
  };
}

function buildLandingEvidence(
  page: LandingPageData,
  geo: GeoFoundation,
): AiCitationEvidence {
  const tagIds = new Set(page.bestForTags.map((tag) => tag.id));

  return {
    purpose: geo.purpose.charAt(0).toUpperCase() + geo.purpose.slice(1),
    audience: geo.audience,
    typicalGroupSize: resolveGroupSize(tagIds),
    typicalDuration: resolveDuration(tagIds, geo.audience),
    playStyle: resolvePlayStyle(geo.userIntent),
    requiresRegistration: tagIds.has("no-signup")
      ? "No account required"
      : "No signup needed",
    mobileFriendly: tagIds.has("mobile-play")
      ? "Yes — optimized for phone browsers"
      : "Yes — works on mobile browsers",
    conversationBased: resolveConversationBased(page.slug, geo.userIntent),
    competitive: resolveCompetitive(geo.userIntent),
    anonymousVoting: "Yes — private phone votes",
  };
}

function buildTopicHubEvidence(
  page: TopicHubPageData,
  geo: GeoFoundation,
): AiCitationEvidence {
  return {
    purpose: geo.purpose.charAt(0).toUpperCase() + geo.purpose.slice(1),
    audience: geo.audience,
    typicalGroupSize: "3–12 people",
    typicalDuration: "5–15 minutes per game",
    playStyle: "Browse formats and launch a game",
    requiresRegistration: "No account required",
    mobileFriendly: "Yes — phone browser games",
    conversationBased: "Yes — social prompts and voting",
    competitive: "Light competition through group votes",
    anonymousVoting: "Yes — private phone votes",
  };
}

function intentSentence(userIntent: GeoUserIntent, entityLower: string): string {
  switch (userIntent) {
    case "learn":
      return `${entityLower} works well when groups want conversation prompts they can turn into a live voting game.`;
    case "discover":
      return `${entityLower} helps groups compare popular formats and pick one that fits their occasion.`;
    case "compare":
      return `${entityLower} makes it easier to weigh different game styles before committing to one format.`;
    case "create":
      return `${entityLower} lets hosts build a custom game, share one link, and collect anonymous votes from phones.`;
    default:
      return `${entityLower} helps people vote anonymously, compare opinions, answer fun questions, and start conversations together.`;
  }
}

function buildLandingCanonicalAnswer(
  page: LandingPageData,
  geo: GeoFoundation,
): string {
  const registryIntent = getIntentBySlug(page.slug);
  const entity = geo.primaryEntity;
  const entityLower = entity.toLowerCase();
  const titleLower = page.title.toLowerCase();
  const goodForBullet = page.contentQuality.goodFor.bullets[0];
  const whenToUseBullet = page.contentQuality.whenToUse.bullets[0];
  const differentBullet = page.contentQuality.whatMakesDifferent.bullets[0];

  return assembleCanonicalAnswer([
    `${entity} is a browser-based social game format designed for ${geo.audience}.`,
    intentSentence(geo.userIntent, entityLower),
    goodForBullet
      ? `${goodForBullet.charAt(0).toUpperCase()}${goodForBullet.slice(1)}.`
      : `Groups use ${titleLower} when they want a quick activity without complicated setup.`,
    whenToUseBullet
      ? `${whenToUseBullet.charAt(0).toUpperCase()}${whenToUseBullet.slice(1)}.`
      : `It fits hangouts, group chats, and casual get-togethers where everyone has a phone nearby.`,
    differentBullet
      ? `${differentBullet.charAt(0).toUpperCase()}${differentBullet.slice(1)}.`
      : `FriendRank adds anonymous phone voting so results feel fair and surprising.`,
    page.howToPlay.steps[0]
      ? `${page.howToPlay.steps[0].title}: ${page.howToPlay.steps[0].description}`
      : "Create a game, share one link, and let everyone vote from their phone.",
    page.entitySummary
      ? page.entitySummary
      : registryIntent
        ? `${registryIntent.searchIntent.charAt(0).toUpperCase()}${registryIntent.searchIntent.slice(1)}.`
        : page.intentSummary,
    `This page explains how ${titleLower} works and helps ${geo.audience} choose the right format for their occasion.`,
  ]);
}

function buildTopicHubCanonicalAnswer(
  page: TopicHubPageData,
  geo: GeoFoundation,
): string {
  const keyword = page.hub.primaryKeyword;
  const benefit = page.benefits[0];

  return assembleCanonicalAnswer([
    `${geo.primaryEntity} are short online social games designed for ${geo.audience}.`,
    `They help people vote, compare opinions, answer fun questions, and start conversations together.`,
    `This topic hub groups the most popular ${keyword} formats so visitors can browse, compare, and launch a game quickly.`,
    page.hub.description,
    benefit
      ? `${benefit.title}: ${benefit.description}`
      : `Each format runs in the browser with anonymous phone voting and shareable group results.`,
    `Featured picks highlight high-intent games that work well for ${geo.audience}.`,
    `Use this page when you want to explore ${keyword}, understand differences between formats, and jump into a live game in minutes.`,
    geo.summary,
  ]);
}

function buildHomepageCanonicalAnswer(geo: GeoFoundation): string {
  const hubTitles = getAllHubDefinitions()
    .map((hub) => hub.title)
    .slice(0, 4);

  return assembleCanonicalAnswer([
    `${SITE_NAME} is a free browser platform for group voting games designed for ${geo.audience}.`,
    `Hosts create a game in under a minute, share one link, and collect anonymous votes from phones without requiring an app download.`,
    `Players answer prompts, vote privately, and reveal funny or surprising group results together on the same link.`,
    `The platform supports friend games, party games, team building activities, relationship quizzes, and question-based formats.`,
    `Popular categories include ${hubTitles.join(", ")}.`,
    `Games work on mobile browsers, need no signup, and fit group chats, parties, meetings, and casual hangouts.`,
    geo.summary,
    `This homepage helps visitors understand what FriendRank offers and choose the best game type for their group.`,
  ]);
}

function deriveCitationConfidence(
  geo: GeoFoundation,
  evidence: AiCitationEvidence,
  canonicalAnswer: string,
  relatedKnowledge: AiCitationRelatedKnowledge,
): CitationConfidence {
  let score = 0;

  if (geo.primaryEntity.trim()) {
    score += 2;
  }
  if (geo.audience.trim()) {
    score += 2;
  }
  if (geo.summary.trim().length >= 40) {
    score += 2;
  }
  if (geo.contentSignals.primaryTopics.length >= 2) {
    score += 1;
  }
  if (countWords(canonicalAnswer) >= CANONICAL_ANSWER_MIN_WORDS) {
    score += 2;
  }
  if (relatedKnowledge.relatedConcepts.length >= 2) {
    score += 1;
  }
  if (relatedKnowledge.complementaryPages.length >= 2) {
    score += 1;
  }
  if (evidence.purpose && evidence.audience && evidence.anonymousVoting) {
    score += 1;
  }

  if (score >= 10) {
    return "High";
  }
  if (score >= 6) {
    return "Medium";
  }
  return "Low";
}

function buildLandingAiCitation(page: LandingPageData): AiCitationLayer {
  const geo = page.geoFoundation;
  const evidence = buildLandingEvidence(page, geo);
  const relatedKnowledge = buildLandingRelatedKnowledge(page, geo);
  const canonicalAnswer = buildLandingCanonicalAnswer(page, geo);

  return {
    canonicalAnswer,
    likelyQuestions: buildLikelyQuestions(geo.primaryEntity),
    evidence,
    keyTakeaways: buildKeyTakeaways(
      page.bestForTags.map((tag) => tag.label),
      page.contentQuality.goodFor.bullets,
      geo.audience,
    ),
    citationSummary: fitCitationSummary(
      `${geo.primaryEntity} on FriendRank helps ${geo.audience} ${geo.userIntent === "learn" ? "learn and use" : geo.userIntent === "discover" ? "discover" : "play"} ${page.title.toLowerCase()} with anonymous phone voting and shareable group results.`,
    ),
    relatedKnowledge,
    citationConfidence: deriveCitationConfidence(
      geo,
      evidence,
      canonicalAnswer,
      relatedKnowledge,
    ),
  };
}

function buildTopicHubAiCitation(page: TopicHubPageData): AiCitationLayer {
  const geo = page.geoFoundation;
  const evidence = buildTopicHubEvidence(page, geo);
  const relatedKnowledge = buildTopicHubRelatedKnowledge(page, geo);
  const canonicalAnswer = buildTopicHubCanonicalAnswer(page, geo);

  return {
    canonicalAnswer,
    likelyQuestions: buildLikelyQuestions(geo.primaryEntity),
    evidence,
    keyTakeaways: buildKeyTakeaways(
      page.benefits.map((benefit) => benefit.title),
      page.benefits.map((benefit) => benefit.description),
      geo.audience,
    ),
    citationSummary: fitCitationSummary(geo.summary),
    relatedKnowledge,
    citationConfidence: deriveCitationConfidence(
      geo,
      evidence,
      canonicalAnswer,
      relatedKnowledge,
    ),
  };
}

/** Builds AI citation metadata for the homepage. */
export function buildHomepageAiCitation(): AiCitationLayer {
  const geo = buildHomepageGeoFoundation();
  const evidence: AiCitationEvidence = {
    purpose: "Conversion",
    audience: geo.audience,
    typicalGroupSize: "3–12 people",
    typicalDuration: "5–15 minutes",
    playStyle: "Create and share a custom game",
    requiresRegistration: "No account required",
    mobileFriendly: "Yes — phone browser games",
    conversationBased: "Yes — prompts and voting",
    competitive: "Light competition through votes",
    anonymousVoting: "Yes — private phone votes",
  };
  const relatedKnowledge: AiCitationRelatedKnowledge = {
    relatedConcepts: geo.contentSignals.relatedConcepts,
    alternativeGameFormats: geo.supportingEntities,
    complementaryPages: getAllHubDefinitions().map((hub) => hub.title),
    parentTopic: SITE_NAME,
    siblingTopics: geo.supportingEntities,
    knowledgeGraphConnections: geo.semanticRelationships.map(
      (relationship) =>
        `${relationship.entity} ${relationship.relationship} ${relationship.target}`,
    ),
  };
  const canonicalAnswer = buildHomepageCanonicalAnswer(geo);

  return {
    canonicalAnswer,
    likelyQuestions: buildLikelyQuestions(SITE_NAME),
    evidence,
    keyTakeaways: [
      "Create games in minutes",
      "Anonymous phone voting",
      "Works for any group size",
    ],
    citationSummary: fitCitationSummary(geo.summary),
    relatedKnowledge,
    citationConfidence: deriveCitationConfidence(
      geo,
      evidence,
      canonicalAnswer,
      relatedKnowledge,
    ),
  };
}

function isTopicHubPage(
  page: LandingPageData | TopicHubPageData,
): page is TopicHubPageData {
  return "topicHubExperience" in page;
}

/** Enriches GEO-assembled pages with AI citation metadata. */
export function applyAiCitationLayer(
  page: Omit<LandingPageData, "aiCitation">,
): LandingPageData;
export function applyAiCitationLayer(
  page: Omit<TopicHubPageData, "aiCitation">,
): TopicHubPageData;
export function applyAiCitationLayer(
  page:
    | Omit<LandingPageData, "aiCitation">
    | Omit<TopicHubPageData, "aiCitation">,
): LandingPageData | TopicHubPageData {
  if (isTopicHubPage(page as LandingPageData | TopicHubPageData)) {
    const topicHubPage = page as TopicHubPageData;
    return {
      ...topicHubPage,
      aiCitation: buildTopicHubAiCitation(topicHubPage),
    };
  }

  const landingPage = page as LandingPageData;
  return {
    ...landingPage,
    aiCitation: buildLandingAiCitation(landingPage),
  };
}

/** Collects AI citation records for homepage, landing pages, and topic hubs. */
export function collectAiCitationPageRecords(input: {
  landingPages: LandingPageData[];
  topicHubPages: TopicHubPageData[];
}): AiCitationPageRecord[] {
  return [
    {
      path: "/",
      title: SITE_NAME,
      aiCitation: buildHomepageAiCitation(),
    },
    ...input.landingPages.map((page) => ({
      path: `/${page.slug}`,
      title: page.title,
      aiCitation: page.aiCitation,
    })),
    ...input.topicHubPages.map((page) => ({
      path: `/${page.hub.slug}`,
      title: page.hub.title,
      aiCitation: page.aiCitation,
    })),
  ];
}

export { countWords };
