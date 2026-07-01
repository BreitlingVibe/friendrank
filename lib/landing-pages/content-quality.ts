import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import {
  getIntentBySlug,
  type IntentDefinition,
} from "@/lib/landing-pages/planning/intent-registry";
import { getBestForTags } from "@/lib/landing-pages/best-for-tags";
import { resolveLandingPageEntities } from "@/lib/entities/entity-utils";
import { ENTITY_TYPES } from "@/lib/entities/entity-registry";
import { getHubDefinition } from "@/lib/topic-hubs/hub-registry";
import { getTopicHubIdsForSlug } from "@/lib/landing-pages/recommendation-utils";

export type ContentQualityBlock = {
  title: string;
  paragraphs: string[];
  bullets: string[];
};

export type QuickSetupContent = {
  title: string;
  steps: string[];
};

export type LandingPageContentQuality = {
  goodFor: ContentQualityBlock;
  whenToUse: ContentQualityBlock;
  whatMakesDifferent: ContentQualityBlock;
  quickSetup: QuickSetupContent;
  enhancedIntentLead: string;
  enhancedHeroSubtitle: string;
};

const GOOD_FOR_TITLE = "What this game is good for";
const WHEN_TO_USE_TITLE = "When to use it";
const WHAT_MAKES_DIFFERENT_TITLE = "What makes it different";
const QUICK_SETUP_TITLE = "Quick setup";

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed || seen.has(trimmed.toLowerCase())) {
      continue;
    }

    seen.add(trimmed.toLowerCase());
    result.push(trimmed);
  }

  return result;
}

function audienceSnippet(intent: IntentDefinition): string {
  return intent.audience.split(",")[0]?.trim().toLowerCase() ?? "your group";
}

function audienceList(intent: IntentDefinition, max = 3): string {
  return intent.audience
    .split(",")
    .slice(0, max)
    .map((entry) => entry.trim().toLowerCase())
    .join(", ");
}

const OCCASION_ENTITY_TYPES = new Set<string>([
  ENTITY_TYPES.OCCASION,
  ENTITY_TYPES.PARTY,
  ENTITY_TYPES.HOLIDAY,
  ENTITY_TYPES.FAMILY,
]);

function occasionPhrases(slug: string): string[] {
  const { primaryEntities, secondaryEntities } = resolveLandingPageEntities(slug);
  const entities = [...primaryEntities, ...secondaryEntities];

  return uniqueStrings(
    entities
      .filter((entity) => OCCASION_ENTITY_TYPES.has(entity.entityType))
      .map((entity) => entity.name.toLowerCase()),
  );
}

function hubPhrase(slug: string): string | null {
  const hubId = getTopicHubIdsForSlug(slug)[0];
  if (!hubId) {
    return null;
  }

  const hub = getHubDefinition(hubId);
  return hub ? hub.title.toLowerCase() : null;
}

function clusterPhrase(slug: string): string | null {
  const cluster = getClustersBySlug(slug)[0];
  if (!cluster) {
    return null;
  }

  return cluster.searchIntent.split(".")[0]?.trim().toLowerCase() ?? null;
}

function categoryGoodForParagraphs(
  intent: IntentDefinition,
  slug: string,
): string[] {
  const titleLower = intent.title.toLowerCase();
  const audience = audienceSnippet(intent);
  const occasions = occasionPhrases(slug);
  const occasionText =
    occasions.length > 0
      ? occasions.slice(0, 2).join(" or ")
      : audienceList(intent, 2);

  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.PARTY:
      return [
        `This works well when you want a quick ${titleLower} that gets everyone involved without planning a full party activity.`,
        `Use it for ${occasionText} where people can vote from their phones and unlock funny group results together.`,
      ];
    case INTENT_CATEGORIES.TEAMS:
      return [
        `This works well when your team needs a lightweight activity that coworkers can join without a long setup.`,
        `It fits ${audience} who want low-friction participation, anonymous voting, and results everyone can react to in the same meeting or chat.`,
      ];
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return [
        `This works well when couples or friend groups want a playful way to compare answers and see how the group votes.`,
        `Use it for ${occasionText} when you want conversation-friendly prompts with shared results instead of a solo quiz.`,
      ];
    case INTENT_CATEGORIES.ICEBREAKERS:
      return [
        `This works well when a new group needs a fast way to warm up without awkward introductions.`,
        `It fits ${audience} who want a simple icebreaker that works on phones and creates an easy shared moment.`,
      ];
    case INTENT_CATEGORIES.ENTERTAINMENT:
      return [
        `This works well when you want ${titleLower} prompts that become a live group game instead of static question lists.`,
        `Use it with ${audience} when you want quick participation, anonymous voting, and results you can share back into the chat.`,
      ];
    case INTENT_CATEGORIES.SOCIAL_VOTING:
    default:
      return [
        `This works well when you want a quick ${titleLower} where everyone votes privately and sees group results together.`,
        `Use it for ${occasionText} when you need one shareable link, phone-friendly play, and no app download.`,
      ];
  }
}

function categoryWhenToUse(intent: IntentDefinition, slug: string): string[] {
  const tags = new Set(getBestForTags(slug).map((tag) => tag.id));
  const occasions = occasionPhrases(slug);
  const suggestions: string[] = [];

  if (tags.has("parties") || occasions.some((entry) => /party|birthday|sleepover/.test(entry))) {
    suggestions.push("Before a party or hangout starts");
    suggestions.push("During a birthday gathering or celebration");
  }

  if (tags.has("teams") || tags.has("icebreakers")) {
    suggestions.push("At the start of a team meeting");
    suggestions.push("When a new group needs a quick icebreaker");
  }

  if (tags.has("remote-play")) {
    suggestions.push("During a remote team call or virtual hangout");
  }

  if (tags.has("couples")) {
    suggestions.push("On a date night or double date");
  }

  if (tags.has("friends")) {
    suggestions.push("In a group chat when friends want something funny to do");
  }

  if (tags.has("quick-game")) {
    suggestions.push("When you only have a few minutes before the main event");
  }

  suggestions.push("When your group wants funny shared results to react to together");

  if (occasions.length > 0) {
    for (const occasion of occasions.slice(0, 2)) {
      suggestions.push(`During a ${occasion}`);
    }
  }

  const hub = hubPhrase(slug);
  if (hub) {
    suggestions.push(`As a starting point from the ${hub} collection`);
  }

  return uniqueStrings(suggestions).slice(0, 6);
}

function categoryDifferentiators(intent: IntentDefinition): string[] {
  const shared = [
    "Anonymous voting so people answer honestly",
    "One shareable link for the whole group",
    "No app download or account required",
    "Works from phones in under a minute",
    "Group-generated results everyone reveals together",
  ];

  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.ENTERTAINMENT:
      return uniqueStrings([
        "Turns question prompts into a live voting game",
        "Keeps conversation going with group picks instead of solo answers",
        ...shared.slice(0, 3),
      ]).slice(0, 5);
    case INTENT_CATEGORIES.PARTY:
      return uniqueStrings([
        "Built for party energy and quick group participation",
        "Creates funny roles and reactions for the whole room",
        ...shared.slice(0, 3),
      ]).slice(0, 5);
    case INTENT_CATEGORIES.TEAMS:
      return uniqueStrings([
        "Low-friction setup for meetings and coworker groups",
        "Keeps participation light while still getting everyone involved",
        ...shared.slice(0, 3),
      ]).slice(0, 5);
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return uniqueStrings([
        "Playful way to discover how your group sees each relationship dynamic",
        "Works for couples and mixed friend groups",
        ...shared.slice(0, 3),
      ]).slice(0, 5);
    case INTENT_CATEGORIES.ICEBREAKERS:
      return uniqueStrings([
        "Fast warm-up for groups that do not know each other well",
        "Easy to run without a facilitator or printed materials",
        ...shared.slice(0, 3),
      ]).slice(0, 5);
    case INTENT_CATEGORIES.SOCIAL_VOTING:
    default:
      return uniqueStrings([
        "Focuses on group voting instead of solo quiz scores",
        "Creates shareable results for group chats and hangouts",
        ...shared.slice(0, 3),
      ]).slice(0, 5);
  }
}

function buildQuickSetupSteps(intent: IntentDefinition): string[] {
  const formatLabel =
    intent.intentCategory === INTENT_CATEGORIES.ENTERTAINMENT
      ? "Pick your question prompts"
      : intent.intentCategory === INTENT_CATEGORIES.TEAMS
        ? "Pick the team-friendly format"
        : "Pick the game format";

  return [
    formatLabel,
    "Add your group members",
    "Share the link with everyone",
    "Vote privately and reveal the results together",
  ];
}

/** Builds a specific hero subtitle from registry intent signals. */
export function buildEnhancedHeroSubtitle(
  intent: IntentDefinition,
  fallback: string,
): string {
  const titleLower = intent.title.toLowerCase();
  const audience = audienceSnippet(intent);
  const clusterLead = clusterPhrase(intent.slug);
  const hub = hubPhrase(intent.slug);

  if (clusterLead && hub) {
    return `Use this page when you want ${titleLower} for ${audience}. FriendRank helps you ${clusterLead} with one link, phone voting, and funny group results.`;
  }

  if (clusterLead) {
    return `Use this page when you want ${titleLower} for ${audience}. ${clusterLead.charAt(0).toUpperCase()}${clusterLead.slice(1)} with one shareable link and anonymous phone voting.`;
  }

  return fallback;
}

/** Builds a specific intro lead shown above the intent summary. */
export function buildEnhancedIntentLead(intent: IntentDefinition): string {
  const titleLower = intent.title.toLowerCase();
  const audience = audienceList(intent, 3);
  const occasions = occasionPhrases(intent.slug);
  const setting =
    occasions.length > 0
      ? occasions.slice(0, 2).join(", ")
      : audience;

  const searchLead = intent.searchIntent.split(".")[0]?.trim();
  if (searchLead && searchLead.length >= 24) {
    return `${searchLead}. This page is built for ${setting} when you want ${titleLower} with anonymous voting and shared results.`;
  }

  return `Use this page when you want a quick ${titleLower} for ${setting}. Everyone votes from their phones, results unlock together, and you can share them back into the chat.`;
}

/** Registry-driven content quality blocks for a landing page slug. */
export function buildLandingPageContentQuality(
  slug: string,
): LandingPageContentQuality {
  const intent = getIntentBySlug(slug);
  const fallbackIntent: IntentDefinition = intent ?? {
    slug,
    title: slug.replace(/-/g, " "),
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent: "Play a quick group voting game with friends online.",
    audience: "Friend groups and casual hangouts",
    estimatedPriority: 0,
    status: "live",
  };

  const goodForParagraphs = categoryGoodForParagraphs(fallbackIntent, slug);
  const whenToUseBullets = categoryWhenToUse(fallbackIntent, slug);
  const differentBullets = categoryDifferentiators(fallbackIntent);

  while (whenToUseBullets.length < 4) {
    whenToUseBullets.push("When friends want a quick game without extra setup");
  }

  return {
    goodFor: {
      title: GOOD_FOR_TITLE,
      paragraphs: goodForParagraphs,
      bullets: [],
    },
    whenToUse: {
      title: WHEN_TO_USE_TITLE,
      paragraphs: [],
      bullets: whenToUseBullets.slice(0, 6),
    },
    whatMakesDifferent: {
      title: WHAT_MAKES_DIFFERENT_TITLE,
      paragraphs: [],
      bullets: differentBullets,
    },
    quickSetup: {
      title: QUICK_SETUP_TITLE,
      steps: buildQuickSetupSteps(fallbackIntent),
    },
    enhancedIntentLead: buildEnhancedIntentLead(fallbackIntent),
    enhancedHeroSubtitle: buildEnhancedHeroSubtitle(
      fallbackIntent,
      `Looking for ${fallbackIntent.title.toLowerCase()}? FriendRank helps ${audienceSnippet(fallbackIntent)} vote anonymously from their phones and reveal funny group results in minutes.`,
    ),
  };
}
