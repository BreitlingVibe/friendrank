import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import {
  getIntentBySlug,
  type IntentDefinition,
} from "@/lib/landing-pages/planning/intent-registry";
import type { LandingPageContentQuality } from "@/lib/landing-pages/content-quality";
import type {
  ContentVariationTransitions,
  ReorderableSectionKey,
} from "@/lib/landing-pages/content-variation";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";

export const PACING_PROFILES = [
  "party-play-first",
  "relationship-conversation",
  "team-benefits-first",
  "social-explore",
] as const;

export type PacingProfileId = (typeof PACING_PROFILES)[number];

export const TAIL_SECTIONS = [
  "whyFriendRank",
  "playImmediately",
  "examples",
  "formatComparison",
  "faq",
  "relatedPages",
  "youMayAlsoLike",
  "playersAlsoEnjoy",
  "popularSearches",
] as const;

export type TailSectionKey = (typeof TAIL_SECTIONS)[number];

export type ContentBlockPresentation =
  | "paragraph"
  | "bullets"
  | "compact-checklist"
  | "lead-and-bullets";

export type RecommendationExperience = {
  relatedPagesTitle: string;
  relatedPagesIntro: string;
  youMayAlsoLikeTitle: string;
  youMayAlsoLikeIntro: string;
  popularSearchesTitle: string;
  popularSearchesIntro: string;
  playersAlsoEnjoyTitle: string;
  playersAlsoEnjoyIntro: string;
  youMayAlsoLikeCompact: boolean;
  showPlayersAlsoEnjoy: boolean;
  showYouMayAlsoLike: boolean;
};

export type LandingPageContentExperience = {
  pacingProfile: PacingProfileId;
  sectionOrder: ReorderableSectionKey[];
  suppressedSections: ReorderableSectionKey[];
  tailSectionOrder: TailSectionKey[];
  suppressedTailSections: TailSectionKey[];
  blockPresentation: {
    goodFor: ContentBlockPresentation;
    whenToUse: ContentBlockPresentation;
    whatMakesDifferent: ContentBlockPresentation;
  };
  recommendations: RecommendationExperience;
  transitions: ContentVariationTransitions;
  compactIntentSummary: boolean;
};

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function significantWords(text: string): string[] {
  return normalizeText(text)
    .split(" ")
    .filter((word) => word.length > 3);
}

export function introOverlapRatio(left: string, right: string): number {
  const rightWords = significantWords(right);
  if (rightWords.length === 0) {
    return 0;
  }

  const leftWords = new Set(significantWords(left));
  const overlap = rightWords.filter((word) => leftWords.has(word)).length;
  return overlap / rightWords.length;
}

function firstSentence(text: string): string {
  const sentence = text.split(".")[0]?.trim();
  return sentence ? `${sentence}.` : text.trim();
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

function resolvePacingProfile(intent: IntentDefinition): PacingProfileId {
  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.PARTY:
      return "party-play-first";
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return "relationship-conversation";
    case INTENT_CATEGORIES.TEAMS:
      return "team-benefits-first";
    default:
      return "social-explore";
  }
}

function slugOverlap(left: string[], right: string[]): number {
  if (left.length === 0 || right.length === 0) {
    return 0;
  }

  const rightSet = new Set(right);
  const overlap = left.filter((slug) => rightSet.has(slug)).length;
  return overlap / Math.min(left.length, right.length);
}

function buildExpansionLead(intent: IntentDefinition): string {
  const audience = intent.audience.split(",")[0]?.trim().toLowerCase() ?? "your group";
  const titleLower = intent.title.toLowerCase();

  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.PARTY:
      return `In practice, this works when ${audience} want a fast ${titleLower} before the main hangout gets going.`;
    case INTENT_CATEGORIES.TEAMS:
      return `In practice, teams use this when ${audience} need a light activity without a long facilitator setup.`;
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return `In practice, couples and friend groups use this when they want shared results instead of solo quiz scores.`;
    case INTENT_CATEGORIES.ICEBREAKERS:
      return `In practice, this helps ${audience} warm up quickly without awkward introductions.`;
    default:
      return `In practice, ${audience} use this when they want quick phone voting and shared results in one link.`;
  }
}

export function refineIntroCopy(input: {
  heroSubtitle: string;
  intentLead?: string;
  intentSummary: string;
  searchIntent: string;
  intentCategory: IntentDefinition["intentCategory"];
  audience: string;
  title: string;
}): {
  intentLead?: string;
  intentSummary: string;
} {
  const { heroSubtitle, intentSummary, searchIntent, intentCategory, audience, title } =
    input;
  const intentForLead: IntentDefinition = {
    slug: "",
    title,
    intentCategory,
    searchIntent,
    audience,
    estimatedPriority: 0,
    status: "live",
  };

  let intentLead = input.intentLead?.trim();

  if (intentLead && introOverlapRatio(heroSubtitle, intentLead) >= 0.42) {
    const searchSentence = firstSentence(searchIntent);
    if (
      searchSentence &&
      introOverlapRatio(heroSubtitle, searchSentence) < 0.42
    ) {
      intentLead = searchSentence;
    } else {
      intentLead = buildExpansionLead(intentForLead);
    }
  }

  if (intentLead && introOverlapRatio(heroSubtitle, intentLead) >= 0.42) {
    const summarySentence = firstSentence(intentSummary);
    if (
      summarySentence &&
      introOverlapRatio(heroSubtitle, summarySentence) < 0.42
    ) {
      intentLead = summarySentence;
    } else {
      intentLead = buildExpansionLead(intentForLead);
    }
  }

  if (intentLead) {
    intentLead = firstSentence(intentLead);
  }

  if (intentLead && introOverlapRatio(heroSubtitle, intentLead) >= 0.42) {
    intentLead = undefined;
  }

  let summary = intentSummary.trim();
  if (intentLead && introOverlapRatio(intentLead, summary) >= 0.55) {
    const sentences = summary
      .split(".")
      .map((entry) => entry.trim())
      .filter(Boolean);
    summary =
      sentences.length > 1
        ? `${sentences.slice(1).join(". ")}.`
        : firstSentence(searchIntent);
  }

  return {
    intentLead,
    intentSummary: summary,
  };
}

function applyBlockPresentation(
  quality: LandingPageContentQuality,
  presentation: LandingPageContentExperience["blockPresentation"],
): LandingPageContentQuality {
  const goodForParagraphs =
    presentation.goodFor === "paragraph"
      ? quality.goodFor.paragraphs.slice(0, 1)
      : presentation.goodFor === "lead-and-bullets"
        ? quality.goodFor.paragraphs.slice(0, 1)
        : quality.goodFor.paragraphs;

  const whenToUseBullets =
    presentation.whenToUse === "compact-checklist"
      ? quality.whenToUse.bullets.slice(0, 4)
      : quality.whenToUse.bullets;

  const differentBullets =
    presentation.whatMakesDifferent === "compact-checklist"
      ? quality.whatMakesDifferent.bullets.slice(0, 3)
      : quality.whatMakesDifferent.bullets.slice(0, 4);

  return {
    ...quality,
    goodFor: {
      ...quality.goodFor,
      paragraphs: goodForParagraphs,
      bullets: [],
    },
    whenToUse: {
      ...quality.whenToUse,
      paragraphs: [],
      bullets: whenToUseBullets,
    },
    whatMakesDifferent: {
      ...quality.whatMakesDifferent,
      paragraphs: [],
      bullets: differentBullets,
    },
  };
}

function resolveSuppressedSections(
  page: Omit<LandingPageData, "contentExperience" | "geoFoundation" | "aiCitation">,
): ReorderableSectionKey[] {
  const suppressed: ReorderableSectionKey[] = [];

  if (page.formatComparison) {
    suppressed.push("whatMakesDifferent");
  }

  return suppressed;
}

function resolveTailSuppression(
  page: Omit<LandingPageData, "contentExperience" | "geoFoundation" | "aiCitation">,
  overlapRelatedEnjoy: number,
  overlapRelatedYouMay: number,
): TailSectionKey[] {
  const suppressed: TailSectionKey[] = [];

  if (overlapRelatedEnjoy >= 0.5) {
    suppressed.push("playersAlsoEnjoy");
  }

  if (overlapRelatedYouMay >= 0.7) {
    suppressed.push("youMayAlsoLike");
  }

  if (!page.formatComparison) {
    suppressed.push("formatComparison");
  }

  return suppressed;
}

function resolveBlockPresentation(
  profile: PacingProfileId,
): LandingPageContentExperience["blockPresentation"] {
  switch (profile) {
    case "party-play-first":
      return {
        goodFor: "paragraph",
        whenToUse: "compact-checklist",
        whatMakesDifferent: "compact-checklist",
      };
    case "relationship-conversation":
      return {
        goodFor: "lead-and-bullets",
        whenToUse: "compact-checklist",
        whatMakesDifferent: "bullets",
      };
    case "team-benefits-first":
      return {
        goodFor: "paragraph",
        whenToUse: "bullets",
        whatMakesDifferent: "compact-checklist",
      };
    default:
      return {
        goodFor: "paragraph",
        whenToUse: "compact-checklist",
        whatMakesDifferent: "bullets",
      };
  }
}

function resolveTailOrder(profile: PacingProfileId): TailSectionKey[] {
  switch (profile) {
    case "party-play-first":
      return [
        "playImmediately",
        "examples",
        "formatComparison",
        "faq",
        "relatedPages",
        "popularSearches",
        "youMayAlsoLike",
        "playersAlsoEnjoy",
        "whyFriendRank",
      ];
    case "relationship-conversation":
      return [
        "examples",
        "playImmediately",
        "formatComparison",
        "faq",
        "relatedPages",
        "youMayAlsoLike",
        "popularSearches",
        "playersAlsoEnjoy",
        "whyFriendRank",
      ];
    case "team-benefits-first":
      return [
        "whyFriendRank",
        "playImmediately",
        "examples",
        "formatComparison",
        "faq",
        "relatedPages",
        "popularSearches",
        "youMayAlsoLike",
        "playersAlsoEnjoy",
      ];
    default:
      return [
        "whyFriendRank",
        "playImmediately",
        "examples",
        "formatComparison",
        "faq",
        "relatedPages",
        "youMayAlsoLike",
        "popularSearches",
        "playersAlsoEnjoy",
      ];
  }
}

function buildRecommendationExperience(
  intent: IntentDefinition,
  page: Omit<LandingPageData, "contentExperience" | "geoFoundation" | "aiCitation">,
  overlapRelatedEnjoy: number,
): RecommendationExperience {
  const titleLower = intent.title.toLowerCase();

  const base: RecommendationExperience = {
    relatedPagesTitle: "Similar game mechanics",
    relatedPagesIntro:
      "Here are a few similar games people often enjoy when they want the same voting flow.",
    youMayAlsoLikeTitle: "Explore similar categories",
    youMayAlsoLikeIntro:
      "Prefer a nearby topic instead of the same format? Browse these related paths.",
    popularSearchesTitle: "Popular searches",
    popularSearchesIntro:
      "Common search paths that stay close to this intent and route to live pages.",
    playersAlsoEnjoyTitle: "More games groups play next",
    playersAlsoEnjoyIntro:
      "Groups who start here often jump to these live pages next.",
    youMayAlsoLikeCompact: overlapRelatedEnjoy >= 0.35,
    showPlayersAlsoEnjoy: overlapRelatedEnjoy < 0.5,
    showYouMayAlsoLike: page.youMayAlsoLike.length > 0,
  };

  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.PARTY:
      return {
        ...base,
        relatedPagesIntro:
          "Looking for something with the same party energy? These games use a similar voting flow.",
        youMayAlsoLikeIntro:
          "Prefer quick party games or a different hangout angle? Explore these nearby categories.",
        playersAlsoEnjoyIntro:
          "Party groups that start here often move to these pages next.",
      };
    case INTENT_CATEGORIES.TEAMS:
      return {
        ...base,
        relatedPagesTitle: "Similar team game mechanics",
        relatedPagesIntro:
          "Need another low-friction team activity with the same setup pattern? Start here.",
        youMayAlsoLikeIntro:
          "Want games for larger groups or a different workplace moment? Browse these paths.",
        playersAlsoEnjoyIntro:
          "Teams that use this page often continue with these coworker-friendly games.",
      };
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return {
        ...base,
        relatedPagesTitle: "Similar couple and group quizzes",
        relatedPagesIntro:
          "Want another playful relationship format with the same reveal flow? Try these next.",
        youMayAlsoLikeIntro:
          "Prefer date-night, couple, or mixed-group angles? Explore these related categories.",
        youMayAlsoLikeCompact: true,
      };
    case INTENT_CATEGORIES.FRIENDSHIP:
      return {
        ...base,
        relatedPagesIntro:
          "Here are a few similar friend games people often enjoy after this one.",
        youMayAlsoLikeIntro:
          "Want games for larger groups or a different friend-group vibe? Browse these topics.",
        playersAlsoEnjoyIntro:
          "Friend groups that start with this page often continue with these games.",
      };
    case INTENT_CATEGORIES.ENTERTAINMENT:
      return {
        ...base,
        relatedPagesIntro:
          "Looking for another question-driven format with the same live voting flow?",
        youMayAlsoLikeIntro:
          "Prefer a different prompt style or audience? Explore these related categories.",
      };
    default:
      return {
        ...base,
        relatedPagesIntro: `Here are nearby ${titleLower} options with a similar FriendRank flow.`,
      };
  }
}

function refineTransitions(
  profile: PacingProfileId,
  transitions: ContentVariationTransitions,
): ContentVariationTransitions {
  const shared = {
    beforeWhenToUse:
      transitions.beforeWhenToUse ?? "Here's where this game works best.",
    beforeQuickSetup:
      transitions.beforeQuickSetup ?? "Before you start, here's what to expect.",
  };

  switch (profile) {
    case "party-play-first":
      return {
        ...shared,
        beforeGoodFor:
          transitions.beforeGoodFor ??
          "Need a fast option before the room gets going?",
        beforeHowToPlay:
          transitions.beforeHowToPlay ?? "Ready to get everyone voting?",
      };
    case "relationship-conversation":
      return {
        ...shared,
        beforeGoodFor:
          transitions.beforeGoodFor ??
          "If you want playful conversation instead of a solo quiz, start here.",
      };
    case "team-benefits-first":
      return {
        ...shared,
        beforeHowToPlay:
          transitions.beforeHowToPlay ??
          "Here is the simplest way to run it with your group.",
        beforeEntityExplorer:
          transitions.beforeEntityExplorer ??
          "Need a nearby team-friendly option? Browse from here.",
      };
    default:
      return {
        ...transitions,
        ...shared,
      };
  }
}

/** Builds registry-driven reading experience metadata for a landing page. */
export function buildLandingPageContentExperience(
  page: Omit<LandingPageData, "contentExperience" | "geoFoundation" | "aiCitation">,
): LandingPageContentExperience {
  const intent = resolveIntent(page.slug);
  const pacingProfile = resolvePacingProfile(intent);

  const relatedSlugs = page.relatedPages.map((entry) => entry.slug);
  const enjoySlugs = page.playersAlsoEnjoy.map((entry) => entry.slug);
  const youMaySlugs = page.youMayAlsoLike.map((entry) => entry.slug);
  const overlapRelatedEnjoy = slugOverlap(relatedSlugs, enjoySlugs);
  const overlapRelatedYouMay = slugOverlap(relatedSlugs, youMaySlugs);

  const suppressedSections = resolveSuppressedSections(page);
  const suppressedTailSections = resolveTailSuppression(
    page,
    overlapRelatedEnjoy,
    overlapRelatedYouMay,
  );

  const sectionOrder = page.contentVariation.sectionOrder.filter(
    (section) => !suppressedSections.includes(section),
  );

  const tailSectionOrder = resolveTailOrder(pacingProfile).filter(
    (section) => !suppressedTailSections.includes(section),
  );

  return {
    pacingProfile,
    sectionOrder,
    suppressedSections,
    tailSectionOrder,
    suppressedTailSections,
    blockPresentation: resolveBlockPresentation(pacingProfile),
    recommendations: buildRecommendationExperience(
      intent,
      page,
      overlapRelatedEnjoy,
    ),
    transitions: refineTransitions(
      pacingProfile,
      page.contentVariation.transitions,
    ),
    compactIntentSummary: pacingProfile !== "team-benefits-first",
  };
}

/** Transforms assembled landing page data for reading experience quality. */
export function applyContentExperience(
  page: Omit<LandingPageData, "contentExperience" | "geoFoundation" | "aiCitation">,
): Omit<LandingPageData, "geoFoundation" | "aiCitation"> {
  const intent = resolveIntent(page.slug);
  const intro = refineIntroCopy({
    heroSubtitle: page.heroSubtitle,
    intentLead: page.intentLead,
    intentSummary: page.intentSummary,
    searchIntent: intent.searchIntent,
    intentCategory: intent.intentCategory,
    audience: intent.audience,
    title: intent.title,
  });

  const experience = buildLandingPageContentExperience({
    ...page,
    intentLead: intro.intentLead,
    intentSummary: intro.intentSummary,
  });

  const contentQuality = applyBlockPresentation(
    page.contentQuality,
    experience.blockPresentation,
  );

  const recommendations = experience.recommendations;

  return {
    ...page,
    intentLead: intro.intentLead,
    intentSummary: intro.intentSummary,
    contentQuality,
    contentVariation: {
      ...page.contentVariation,
      sectionOrder: experience.sectionOrder,
      transitions: experience.transitions,
      navigation: {
        ...page.contentVariation.navigation,
        playersAlsoEnjoyTitle: recommendations.playersAlsoEnjoyTitle,
        playersAlsoEnjoyIntro: recommendations.playersAlsoEnjoyIntro,
        youMayAlsoLikeIntro: recommendations.youMayAlsoLikeIntro,
        relatedPagesIntro: recommendations.relatedPagesIntro,
        popularSearchesIntro: recommendations.popularSearchesIntro,
      },
    },
    relatedPagesTitle: recommendations.relatedPagesTitle,
    youMayAlsoLikeTitle: recommendations.youMayAlsoLikeTitle,
    popularSearchesTitle: recommendations.popularSearchesTitle,
    playersAlsoEnjoyTitle: recommendations.playersAlsoEnjoyTitle,
    relatedSectionExplanations: {
      ...page.relatedSectionExplanations,
      relatedPages: recommendations.relatedPagesIntro,
      youMayAlsoLike: recommendations.youMayAlsoLikeIntro,
      popularSearches: recommendations.popularSearchesIntro,
      playersAlsoEnjoy: recommendations.playersAlsoEnjoyIntro,
    },
    contentExperience: experience,
  };
}
