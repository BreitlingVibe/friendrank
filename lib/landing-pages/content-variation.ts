import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import {
  getIntentBySlug,
  type IntentDefinition,
} from "@/lib/landing-pages/planning/intent-registry";
import type { LandingPageContentQuality } from "@/lib/landing-pages/content-quality";
import { resolveLandingPageEntities } from "@/lib/entities/entity-utils";
import { ENTITY_TYPES } from "@/lib/entities/entity-registry";
import { getHubDefinition } from "@/lib/topic-hubs/hub-registry";
import { getTopicHubIdsForSlug } from "@/lib/landing-pages/recommendation-utils";

export const APPROVED_LAYOUT_IDS = [
  "social-default",
  "party-fast",
  "work-practical",
  "relationship-playful",
] as const;

export type ContentLayoutId = (typeof APPROVED_LAYOUT_IDS)[number];

export const REORDERABLE_SECTIONS = [
  "bestFor",
  "goodFor",
  "entityExplorer",
  "entityAuthority",
  "intentSummary",
  "whenToUse",
  "whatMakesDifferent",
  "quickSetup",
  "howToPlay",
] as const;

export type ReorderableSectionKey = (typeof REORDERABLE_SECTIONS)[number];

export type ContentVariationHeadings = {
  goodFor: string;
  whenToUse: string;
  whatMakesDifferent: string;
  quickSetup: string;
};

export type ContentVariationTransitions = {
  beforeGoodFor?: string;
  beforeWhenToUse?: string;
  beforeWhatMakesDifferent?: string;
  beforeQuickSetup?: string;
  beforeHowToPlay?: string;
  beforeEntityExplorer?: string;
};

export type ContentVariationCta = {
  primaryLabel: string;
  midPageLabel: string;
  finalTitle: string;
  finalSubtitle: string;
  finalButtonLabel: string;
};

export type ContentVariationNavigation = {
  entityExplorerTitle: string;
  entityExplorerIntro: string;
  playersAlsoEnjoyTitle: string;
  playersAlsoEnjoyIntro: string;
  youMayAlsoLikeIntro: string;
  relatedPagesIntro: string;
  popularSearchesIntro: string;
};

export type LandingPageContentVariation = {
  layoutId: ContentLayoutId;
  sectionOrder: ReorderableSectionKey[];
  personalityHeroSubtitle: string;
  headings: ContentVariationHeadings;
  transitions: ContentVariationTransitions;
  cta: ContentVariationCta;
  navigation: ContentVariationNavigation;
};

const LAYOUT_ORDERS: Record<ContentLayoutId, ReorderableSectionKey[]> = {
  "social-default": [
    "bestFor",
    "goodFor",
    "entityExplorer",
    "entityAuthority",
    "intentSummary",
    "whenToUse",
    "whatMakesDifferent",
    "quickSetup",
    "howToPlay",
  ],
  "party-fast": [
    "quickSetup",
    "bestFor",
    "goodFor",
    "entityExplorer",
    "entityAuthority",
    "intentSummary",
    "whenToUse",
    "whatMakesDifferent",
    "howToPlay",
  ],
  "work-practical": [
    "bestFor",
    "entityExplorer",
    "entityAuthority",
    "intentSummary",
    "howToPlay",
    "quickSetup",
    "goodFor",
    "whenToUse",
    "whatMakesDifferent",
  ],
  "relationship-playful": [
    "goodFor",
    "entityExplorer",
    "entityAuthority",
    "intentSummary",
    "whenToUse",
    "quickSetup",
    "bestFor",
    "whatMakesDifferent",
    "howToPlay",
  ],
};

const APPROVED_GOOD_FOR_HEADINGS = new Set([
  "What this game is good for",
  "Why people enjoy this game",
  "Perfect for friend groups",
  "Great when you want a quick party game",
  "Why this format works for teams",
  "Perfect for playful couple moments",
  "Why this works as an icebreaker",
  "Perfect for question-driven hangouts",
]);

const APPROVED_WHEN_HEADINGS = new Set([
  "When to use it",
  "Best times to play",
  "When teams use this",
  "Moments that fit this game",
]);

const APPROVED_DIFFERENT_HEADINGS = new Set([
  "What makes it different",
  "Why FriendRank works here",
  "What sets this format apart",
]);

const APPROVED_QUICK_SETUP_HEADINGS = new Set([
  "Quick setup",
  "Get started in four steps",
  "Run it in under a minute",
]);

export function isApprovedLayoutId(value: string): value is ContentLayoutId {
  return APPROVED_LAYOUT_IDS.includes(value as ContentLayoutId);
}

export function isApprovedGoodForHeading(value: string): boolean {
  return APPROVED_GOOD_FOR_HEADINGS.has(value);
}

export function isApprovedWhenHeading(value: string): boolean {
  return APPROVED_WHEN_HEADINGS.has(value);
}

export function isApprovedDifferentHeading(value: string): boolean {
  return APPROVED_DIFFERENT_HEADINGS.has(value);
}

export function isApprovedQuickSetupHeading(value: string): boolean {
  return APPROVED_QUICK_SETUP_HEADINGS.has(value);
}

function resolveIntent(slug: string): IntentDefinition {
  const intent = getIntentBySlug(slug);
  if (intent) {
    return intent;
  }

  return {
    slug,
    title: slug.replace(/-/g, " "),
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent: "Play a quick group voting game with friends online.",
    audience: "Friend groups and casual hangouts",
    estimatedPriority: 0,
    status: "live",
  };
}

function audienceSnippet(intent: IntentDefinition): string {
  return intent.audience.split(",")[0]?.trim().toLowerCase() ?? "your group";
}

function titleLower(intent: IntentDefinition): string {
  return intent.title.toLowerCase();
}

function isQuestionPage(slug: string, intent: IntentDefinition): boolean {
  if (intent.intentCategory === INTENT_CATEGORIES.ENTERTAINMENT) {
    return true;
  }

  return getClustersBySlug(slug).some((cluster) => cluster.id === "questions");
}

function primaryHubTitle(slug: string): string | null {
  const hubId = getTopicHubIdsForSlug(slug)[0];
  if (!hubId) {
    return null;
  }

  return getHubDefinition(hubId)?.title ?? null;
}

function resolveLayoutId(intent: IntentDefinition): ContentLayoutId {
  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.PARTY:
      return "party-fast";
    case INTENT_CATEGORIES.TEAMS:
      return "work-practical";
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return "relationship-playful";
    case INTENT_CATEGORIES.ICEBREAKERS:
      return "social-default";
    default:
      return "social-default";
  }
}

function buildPersonalityHeroSubtitle(
  intent: IntentDefinition,
  slug: string,
  fallback: string,
): string {
  const game = titleLower(intent);
  const audience = audienceSnippet(intent);
  const hub = primaryHubTitle(slug);

  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.FRIENDSHIP:
      return hub
        ? `Bring your crew together for a ${game} that feels personal, playful, and easy to share from the ${hub.toLowerCase()} collection.`
        : `Bring your crew together for a ${game} that feels personal, playful, and made for the inside jokes you already share.`;
    case INTENT_CATEGORIES.PARTY:
      return `Turn up the energy with a ${game} your ${audience} can start in minutes, vote on from their phones, and react to together.`;
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return `Make date night or group hangouts more playful with a ${game} built for couples who want shared results, not solo quiz scores.`;
    case INTENT_CATEGORIES.TEAMS:
      return `Give your team a practical ${game} they can join from Slack, email, or a meeting chat without downloads or long setup.`;
    case INTENT_CATEGORIES.ICEBREAKERS:
      return `Welcome new groups with a ${game} that feels low-pressure, phone-friendly, and easy to run in the first five minutes together.`;
    case INTENT_CATEGORIES.ENTERTAINMENT:
      return isQuestionPage(slug, intent)
        ? `Turn curiosity into a live ${game} where your group votes on prompts and discovers funny picks together.`
        : fallback;
    case INTENT_CATEGORIES.SOCIAL_VOTING:
    default:
      return `Give ${audience} a ${game} with anonymous voting, one shareable link, and results worth dropping back into the chat.`;
  }
}

function buildHeadings(
  intent: IntentDefinition,
  slug: string,
): ContentVariationHeadings {
  const game = titleLower(intent);

  let goodFor = "What this game is good for";
  let whenToUse = "When to use it";
  let whatMakesDifferent = "What makes it different";
  let quickSetup = "Quick setup";

  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.FRIENDSHIP:
      goodFor = "Why people enjoy this game";
      whenToUse = "Moments that fit this game";
      whatMakesDifferent = "Why FriendRank works here";
      break;
    case INTENT_CATEGORIES.PARTY:
      goodFor = "Great when you want a quick party game";
      whenToUse = "Best times to play";
      whatMakesDifferent = "What sets this format apart";
      quickSetup = "Get started in four steps";
      break;
    case INTENT_CATEGORIES.TEAMS:
      goodFor = "Why this format works for teams";
      whenToUse = "When teams use this";
      whatMakesDifferent = "Why FriendRank works here";
      quickSetup = "Run it in under a minute";
      break;
    case INTENT_CATEGORIES.RELATIONSHIPS:
      goodFor = "Perfect for playful couple moments";
      whenToUse = "Moments that fit this game";
      whatMakesDifferent = "What sets this format apart";
      break;
    case INTENT_CATEGORIES.ICEBREAKERS:
      goodFor = "Why this works as an icebreaker";
      whenToUse = "When teams use this";
      break;
    case INTENT_CATEGORIES.ENTERTAINMENT:
      if (isQuestionPage(slug, intent)) {
        goodFor = "Perfect for question-driven hangouts";
        whenToUse = "Moments that fit this game";
      }
      break;
    default:
      break;
  }

  if (/questions?$/i.test(intent.title)) {
    goodFor = "Perfect for question-driven hangouts";
  }

  return { goodFor, whenToUse, whatMakesDifferent, quickSetup };
}

function buildTransitions(intent: IntentDefinition): ContentVariationTransitions {
  const base: ContentVariationTransitions = {
    beforeWhenToUse: "Here's where this game works best.",
    beforeQuickSetup: "Before you start, here's what to expect.",
  };

  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.PARTY:
      return {
        ...base,
        beforeGoodFor: "If you need something fast before the room gets going, start here.",
        beforeHowToPlay: "Ready to get everyone voting?",
      };
    case INTENT_CATEGORIES.TEAMS:
      return {
        ...base,
        beforeEntityExplorer: "Need a nearby team-friendly option? Browse from here.",
        beforeHowToPlay: "Here is the simplest way to run it with coworkers.",
        beforeWhenToUse: "These are the most common team use cases.",
      };
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return {
        ...base,
        beforeGoodFor: "If you want something playful instead of a static quiz, this is the fit.",
      };
    case INTENT_CATEGORIES.ICEBREAKERS:
      return {
        ...base,
        beforeEntityExplorer: "Explore related icebreaker paths from here.",
        beforeHowToPlay: "Ready to warm up the room?",
      };
    case INTENT_CATEGORIES.ENTERTAINMENT:
      return {
        ...base,
        beforeGoodFor: "If prompts are the main event, this section explains the fit.",
        beforeWhatMakesDifferent: "If you're deciding between formats, this may help.",
      };
    default:
      return {
        ...base,
        beforeEntityExplorer: "Explore related topics from here.",
        beforeWhatMakesDifferent: "If you're deciding between formats, this may help.",
        beforeHowToPlay: "Ready to run it with your group?",
      };
  }
}

function buildCtaCopy(intent: IntentDefinition): ContentVariationCta {
  const game = titleLower(intent);

  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.PARTY:
      return {
        primaryLabel: "Start your party game",
        midPageLabel: "Start your party game",
        finalTitle: "Ready to kick off the party?",
        finalSubtitle: `Launch a ${game}, share one link, and let everyone vote from their phones.`,
        finalButtonLabel: "Start your party game",
      };
    case INTENT_CATEGORIES.TEAMS:
      return {
        primaryLabel: "Launch your team game",
        midPageLabel: "Launch your team game",
        finalTitle: "Ready for a quick team activity?",
        finalSubtitle: `Create a ${game}, invite coworkers, and reveal the results together.`,
        finalButtonLabel: "Launch your team game",
      };
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return {
        primaryLabel: "Start your couple quiz",
        midPageLabel: "Start your couple quiz",
        finalTitle: "Ready for a playful relationship game?",
        finalSubtitle: `Create a ${game} and see how your group votes together.`,
        finalButtonLabel: "Start your couple quiz",
      };
    case INTENT_CATEGORIES.FRIENDSHIP:
      return {
        primaryLabel: "Create your first FriendRank",
        midPageLabel: "Create your first FriendRank",
        finalTitle: "Ready to play with your friends?",
        finalSubtitle: `Start a ${game}, share one link, and unlock your group's results together.`,
        finalButtonLabel: "Create your first FriendRank",
      };
    case INTENT_CATEGORIES.ICEBREAKERS:
      return {
        primaryLabel: "Launch your icebreaker game",
        midPageLabel: "Launch your icebreaker game",
        finalTitle: "Ready to break the ice?",
        finalSubtitle: `Create a ${game} and get everyone participating in minutes.`,
        finalButtonLabel: "Launch your icebreaker game",
      };
    case INTENT_CATEGORIES.ENTERTAINMENT:
      return {
        primaryLabel: "Start your question game",
        midPageLabel: "Start your question game",
        finalTitle: "Ready to turn prompts into a live game?",
        finalSubtitle: `Create a ${game}, share one link, and let the group vote together.`,
        finalButtonLabel: "Start your question game",
      };
    default:
      return {
        primaryLabel: "Create your FriendRank game",
        midPageLabel: "Create your FriendRank game",
        finalTitle: "Ready to create your game?",
        finalSubtitle: `Start a ${game}, share one link, and reveal the results with your group.`,
        finalButtonLabel: "Create your FriendRank game",
      };
  }
}

function buildNavigationCopy(
  intent: IntentDefinition,
  slug: string,
): ContentVariationNavigation {
  const hub = primaryHubTitle(slug);
  const { primaryEntities } = resolveLandingPageEntities(slug);
  const formatEntity = primaryEntities.find(
    (entity) => entity.entityType === ENTITY_TYPES.GAME_FORMAT,
  );

  const entityExplorerTitle = hub
    ? `Explore more from ${hub}`
    : "Explore related topics";

  let entityExplorerIntro =
    "Browse nearby audiences, occasions, and formats connected to this page.";
  if (intent.intentCategory === INTENT_CATEGORIES.PARTY) {
    entityExplorerIntro =
      "Jump to nearby party, audience, and format paths without leaving this topic.";
  } else if (intent.intentCategory === INTENT_CATEGORIES.TEAMS) {
    entityExplorerIntro =
      "Find related team, workplace, and icebreaker paths from the same registry.";
  } else if (intent.intentCategory === INTENT_CATEGORIES.RELATIONSHIPS) {
    entityExplorerIntro =
      "Browse couple, date-night, and relationship paths connected to this game.";
  }

  const formatName = formatEntity?.name.toLowerCase() ?? intent.title.toLowerCase();

  return {
    entityExplorerTitle,
    entityExplorerIntro,
    playersAlsoEnjoyTitle:
      intent.intentCategory === INTENT_CATEGORIES.PARTY
        ? "More games groups play next"
        : "Players also enjoy",
    playersAlsoEnjoyIntro: `Groups who try this ${formatName} often move to these live pages next.`,
    youMayAlsoLikeIntro:
      "These nearby pages cover similar intent without repeating the same format.",
    relatedPagesIntro:
      hub != null
        ? `More live pages from ${hub} and nearby clusters.`
        : "More live pages with a similar search intent.",
    popularSearchesIntro:
      "Popular searches that stay close to this topic and route to live pages.",
  };
}

/** Applies presentation headings to assembled content quality blocks. */
export function applyContentQualityHeadings(
  contentQuality: LandingPageContentQuality,
  headings: ContentVariationHeadings,
): LandingPageContentQuality {
  return {
    ...contentQuality,
    goodFor: { ...contentQuality.goodFor, title: headings.goodFor },
    whenToUse: { ...contentQuality.whenToUse, title: headings.whenToUse },
    whatMakesDifferent: {
      ...contentQuality.whatMakesDifferent,
      title: headings.whatMakesDifferent,
    },
    quickSetup: { ...contentQuality.quickSetup, title: headings.quickSetup },
  };
}

/** Registry-driven content variation for landing page presentation. */
export function buildLandingPageContentVariation(
  slug: string,
  contentQuality: LandingPageContentQuality,
): LandingPageContentVariation {
  const intent = resolveIntent(slug);
  const layoutId = resolveLayoutId(intent);

  return {
    layoutId,
    sectionOrder: [...LAYOUT_ORDERS[layoutId]],
    personalityHeroSubtitle: buildPersonalityHeroSubtitle(
      intent,
      slug,
      contentQuality.enhancedHeroSubtitle,
    ),
    headings: buildHeadings(intent, slug),
    transitions: buildTransitions(intent),
    cta: buildCtaCopy(intent),
    navigation: buildNavigationCopy(intent, slug),
  };
}
