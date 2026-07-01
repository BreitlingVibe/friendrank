import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo/site-metadata";
import { buildTopicHubMetadata } from "@/lib/seo/page-metadata";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import type { TopicHubDefinition } from "@/lib/topic-hubs/hub-types";
import {
  getAllGrowthClassifications,
  type GrowthPageClassification,
  type GrowthTier,
} from "@/lib/growth/growth-priority";

export const CTR_PROFILE_IDS = [
  "homepage",
  "topic-hub",
  "quiz",
  "generator",
  "game",
  "questions",
  "voting",
] as const;

export type CtrProfileId = (typeof CTR_PROFILE_IDS)[number];

export type CtrMetadataProfile = {
  id: CtrProfileId;
  label: string;
  titlePatternDescription: string;
  metaPatternDescription: string;
  ctaEnding: string;
};

export const CTR_METADATA_PROFILES: Record<CtrProfileId, CtrMetadataProfile> = {
  homepage: {
    id: "homepage",
    label: "Homepage",
    titlePatternDescription:
      "{Brand} – {value proposition with group voting focus}",
    metaPatternDescription:
      "{Active benefit}. {Audience}. {CTA}",
    ctaEnding: "Create your free game on FriendRank today.",
  },
  "topic-hub": {
    id: "topic-hub",
    label: "Topic hub",
    titlePatternDescription:
      "{Hub title} – Free Online {primary keyword} & Group Voting",
    metaPatternDescription:
      "{Category benefit}. {Audience}. {CTA}",
    ctaEnding: "Browse live games and start playing in minutes.",
  },
  quiz: {
    id: "quiz",
    label: "Quiz",
    titlePatternDescription:
      "{Title} – {search-intent hook} OR {Title}? {hook}",
    metaPatternDescription:
      "{Quiz benefit in active voice}. {Audience}. {CTA}",
    ctaEnding: "Create your quiz free and share one link.",
  },
  generator: {
    id: "generator",
    label: "Generator",
    titlePatternDescription: "{Title} – Free {audience} Game Online",
    metaPatternDescription:
      "{Generator benefit}. {Audience}. {CTA}",
    ctaEnding: "Generate prompts and start voting in minutes.",
  },
  game: {
    id: "game",
    label: "Game",
    titlePatternDescription: "{Title} – Free Online Game for {audience}",
    metaPatternDescription:
      "{Game benefit}. {Audience}. {CTA}",
    ctaEnding: "Create your game free — no app download.",
  },
  questions: {
    id: "questions",
    label: "Questions",
    titlePatternDescription: "{Title} – {audience} Conversation Starters",
    metaPatternDescription:
      "{Question benefit}. {Audience}. {CTA}",
    ctaEnding: "Turn prompts into a live voting game today.",
  },
  voting: {
    id: "voting",
    label: "Voting",
    titlePatternDescription: "{Title} – Anonymous {audience} Voting Online",
    metaPatternDescription:
      "{Voting benefit}. {Audience}. {CTA}",
    ctaEnding: "Start anonymous voting with one shareable link.",
  },
};

export const CTR_TITLE_MIN_LENGTH = 30;
export const CTR_TITLE_MAX_LENGTH = 60;
export const CTR_META_MIN_LENGTH = 140;
export const CTR_META_MAX_LENGTH = 160;

export type CtrOptimizationCandidate = {
  url: string;
  path: string;
  pageType: GrowthPageClassification["pageType"];
  priorityTier: GrowthTier;
  profileId: CtrProfileId;
  hub: string | null;
  category: string | null;
  currentTitle: string;
  suggestedTitle: string;
  currentMeta: string;
  suggestedMeta: string;
  reason: string;
};

export type CtrValidationIssue = {
  code: string;
  severity: "error" | "warning";
  message: string;
  path?: string;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "for",
  "and",
  "or",
  "to",
  "with",
  "your",
  "on",
  "in",
  "of",
  "free",
  "online",
  "game",
  "games",
]);

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function capitalizeFirst(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function capitalizePhrase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => capitalizeFirst(word))
    .join(" ");
}

function shortAudience(audience: string): string {
  const primary = audience.split(",")[0]?.trim() ?? "your group";
  const cleaned = primary.replace(/\.$/, "").trim();
  if (cleaned.length > 48) {
    return cleaned.slice(0, 45).trim();
  }
  return cleaned;
}

function deriveAudienceLabel(slug: string, audience: string): string {
  const tokens = new Set(slug.split("-"));

  if (tokens.has("couples") || tokens.has("couple")) {
    return "Couple";
  }

  if (tokens.has("friends") || tokens.has("friend")) {
    return "Friend Group";
  }

  if (
    tokens.has("team") ||
    tokens.has("teams") ||
    tokens.has("work") ||
    tokens.has("office")
  ) {
    return "Team";
  }

  if (tokens.has("party") || tokens.has("college")) {
    return "Party";
  }

  const primary = audience.split(",")[0]?.trim() ?? "Groups";
  return capitalizePhrase(primary.split(" ").slice(0, 2).join(" "));
}

function compressSearchIntent(searchIntent: string): string {
  let text = searchIntent.replace(/\.$/, "").trim();

  text = text
    .replace(/^Create a /i, "Create ")
    .replace(/^Run a fun /i, "Run a ")
    .replace(/^Turn /i, "Turn ")
    .replace(/^Find out /i, "Find out ")
    .replace(/^Make /i, "Make ")
    .replace(/^Browse /i, "Browse ")
    .replace(/^Play /i, "Play ");

  if (!/[.!?]$/.test(text)) {
    text = `${text}.`;
  }

  return capitalizeFirst(text);
}

function deriveQuizHook(searchIntent: string, audience: string): string {
  const intent = searchIntent.replace(/\.$/, "").trim();

  if (/^Find out/i.test(intent)) {
    const clause = intent
      .replace(/^Find out /i, "")
      .split(" through")[0]
      ?.split(" with")[0]
      ?.trim();
    return capitalizeFirst(clause ?? "Who Knows Your Group Best");
  }

  if (/^Run a fun/i.test(intent)) {
    return `Free ${deriveAudienceLabel("", audience)} Quiz Online`;
  }

  if (/^Turn .* into/i.test(intent)) {
    return "Playful Group Quiz Online";
  }

  return `Free ${deriveAudienceLabel("", audience)} Quiz Online`;
}

function deriveTitleHook(
  profileId: CtrProfileId,
  input: {
    title: string;
    slug: string;
    searchIntent: string;
    audience: string;
  },
): string {
  switch (profileId) {
    case "quiz":
      return deriveQuizHook(input.searchIntent, input.audience);
    case "generator":
      return `Free ${deriveAudienceLabel(input.slug, input.audience)} Game Online`;
    case "questions":
      return `${deriveAudienceLabel(input.slug, input.audience)} Conversation Starters`;
    case "voting":
      return `Anonymous ${deriveAudienceLabel(input.slug, input.audience)} Voting Online`;
    case "game":
      return `Free Online Game for ${deriveAudienceLabel(input.slug, input.audience)}`;
    default:
      return "";
  }
}

function buildLandingTitle(input: {
  title: string;
  slug: string;
  searchIntent: string;
  audience: string;
  profileId: CtrProfileId;
}): string {
  const hook = deriveTitleHook(input.profileId, input);

  if (input.profileId === "quiz" && /^Find out/i.test(input.searchIntent.trim())) {
    return fitTitleLength(`${input.title}? ${hook}`);
  }

  return fitTitleLength(`${input.title} – ${hook}`);
}

function buildHubTitle(hub: TopicHubDefinition): string {
  const titleTokens = new Set(normalizeText(hub.title).split(" "));
  const keywordTokens = hub.primaryKeyword
    .split(" ")
    .filter((token) => !titleTokens.has(token));

  let suffix: string;
  if (hub.primaryKeyword.includes("question")) {
    suffix = "Prompts & Group Voting";
  } else if (keywordTokens.length === 0) {
    suffix = "Quizzes & Group Voting";
  } else {
    suffix = `${capitalizePhrase(keywordTokens.join(" "))} & Group Voting`;
  }

  return fitTitleLength(`${hub.title} – Free Online ${suffix}`);
}

function buildHomepageTitle(): string {
  return `${SITE_NAME} – Create Free Group Voting Games Online`;
}

function buildOptimizedMeta(input: {
  searchIntent: string;
  audience: string;
  profileId: CtrProfileId;
  primaryKeyword?: string;
}): string {
  const profile = CTR_METADATA_PROFILES[input.profileId];
  const benefit = compressSearchIntent(input.searchIntent);
  const audience = shortAudience(input.audience);

  let draft = `${benefit} Built for ${audience.toLowerCase()}. ${profile.ctaEnding}`;

  if (input.profileId === "topic-hub" && input.primaryKeyword) {
    draft = `Discover free ${input.primaryKeyword} with anonymous phone voting in the browser. Ideal for groups and hangouts. ${profile.ctaEnding}`;
  }

  if (input.profileId === "homepage") {
    draft =
      "Create a free FriendRank voting game for your group. Vote on funny roles from any phone, unlock results together, and share one link. Start free today.";
  }

  if (draft.length < CTR_META_MIN_LENGTH) {
    draft = `${draft} Works on any phone with one shareable link.`;
  }

  return fitMetaLength(draft);
}

function fitMetaLength(text: string): string {
  let value = text.replace(/\s+/g, " ").trim();

  if (value.length > CTR_META_MAX_LENGTH) {
    const sentences = value.match(/[^.!?]+[.!?]+/g) ?? [value];
    value = "";
    for (const sentence of sentences) {
      if ((value + sentence).trim().length <= CTR_META_MAX_LENGTH) {
        value = `${value}${sentence}`.trim();
      } else {
        break;
      }
    }

    if (!value) {
      value = text.slice(0, CTR_META_MAX_LENGTH - 1).replace(/\s+\S*$/, "").trim();
      if (!/[.!?]$/.test(value)) {
        value = `${value}.`;
      }
    }
  }

  if (value.length < CTR_META_MIN_LENGTH) {
    const padding = " Works on any phone with one shareable link.";
    value = `${value.replace(/[.!?]$/, "")}.${padding.trim()}`;
  }

  if (value.length < CTR_META_MIN_LENGTH) {
    value = `${value} Start free in your browser today.`;
  }

  if (value.length > CTR_META_MAX_LENGTH) {
    value = value.slice(0, CTR_META_MAX_LENGTH).replace(/\s+\S*$/, "").trim();
    if (!/[.!?]$/.test(value)) {
      value = `${value}.`;
    }
  }

  return value;
}

function fitTitleLength(title: string): string {
  if (title.length <= CTR_TITLE_MAX_LENGTH) {
    return title;
  }

  const segments = title.split(" – ");
  if (segments.length === 2 && segments[0].length <= CTR_TITLE_MAX_LENGTH) {
    const hookBudget = CTR_TITLE_MAX_LENGTH - segments[0].length - 3;
    const trimmedHook = segments[1].slice(0, hookBudget).replace(/\s+\S*$/, "");
    return `${segments[0]} – ${trimmedHook}`;
  }

  return title.slice(0, CTR_TITLE_MAX_LENGTH - 1).replace(/\s+\S*$/, "");
}

function resolveLandingProfile(slug: string): CtrProfileId {
  if (slug.includes("generator")) {
    return "generator";
  }

  if (slug.includes("quiz")) {
    return "quiz";
  }

  if (slug.includes("questions")) {
    return "questions";
  }

  if (slug.includes("voting")) {
    return "voting";
  }

  return "game";
}

function isGenericCurrentTitle(title: string, pageTitle: string): boolean {
  const normalized = normalizeText(title);
  const simple = normalizeText(`${pageTitle} | ${SITE_NAME}`);
  const pipeSegments = title.split("|").map((segment) => segment.trim());

  if (normalized === simple) {
    return true;
  }

  if (
    pipeSegments.length <= 2 &&
    normalizeText(pipeSegments[0] ?? "") === normalizeText(pageTitle) &&
    normalizeText(pipeSegments.at(-1) ?? "") === normalizeText(SITE_NAME)
  ) {
    return true;
  }

  if (title.includes("| FriendRank") && !title.includes("–") && !title.includes("—")) {
    return true;
  }

  return false;
}

function isGenericCurrentMeta(meta: string): boolean {
  return meta.trim().length < CTR_META_MIN_LENGTH;
}

function resolveOptimizationReason(input: {
  currentTitle: string;
  currentMeta: string;
  suggestedTitle: string;
  suggestedMeta: string;
  pageTitle: string;
  profileId: CtrProfileId;
}): string {
  const reasons: string[] = [];

  if (isGenericCurrentTitle(input.currentTitle, input.pageTitle)) {
    reasons.push("title uses a generic FriendRank pipe template");
  }

  if (normalizeText(input.currentTitle) === normalizeText(input.suggestedTitle)) {
    reasons.push("title missing search-intent hook");
  }

  if (isGenericCurrentMeta(input.currentMeta)) {
    reasons.push(`meta description under ${CTR_META_MIN_LENGTH} characters`);
  }

  if (input.profileId === "topic-hub" && input.currentTitle.endsWith(`| ${SITE_NAME}`)) {
    reasons.push("hub title relies on default category suffix only");
  }

  if (reasons.length === 0) {
    reasons.push("optimized profile produces a stronger CTR-focused snippet");
  }

  return reasons.join("; ");
}

function getCurrentMetadata(
  page: GrowthPageClassification,
): { title: string; meta: string } | null {
  if (page.pageType === "homepage") {
    return {
      title: SITE_TITLE,
      meta: SITE_DESCRIPTION,
    };
  }

  if (page.pageType === "landing-page") {
    const landingPage = LANDING_PAGES.find((entry) => entry.slug === page.path.slice(1));
    if (!landingPage) {
      return null;
    }

    return {
      title: landingPage.metaTitle,
      meta: landingPage.metaDescription,
    };
  }

  if (page.pageType === "topic-hub" && page.topicHubId) {
    const hub = getAllHubDefinitions().find((entry) => entry.id === page.topicHubId);
    if (!hub) {
      return null;
    }

    const meta = getHubPageContent(hub.id)?.metaDescription ?? hub.description;
    const metadata = buildTopicHubMetadata({
      title: hub.title,
      description: meta,
      slug: hub.slug,
    });
    const resolvedTitle =
      typeof metadata.title === "string"
        ? metadata.title
        : metadata.title &&
            typeof metadata.title === "object" &&
            "absolute" in metadata.title
          ? String(metadata.title.absolute)
          : `${hub.title} | ${SITE_NAME}`;

    return {
      title: resolvedTitle,
      meta,
    };
  }

  return null;
}

function generateSuggestion(
  page: GrowthPageClassification,
): Omit<CtrOptimizationCandidate, "reason"> | null {
  const current = getCurrentMetadata(page);
  if (!current) {
    return null;
  }

  if (page.pageType === "homepage") {
    const profileId: CtrProfileId = "homepage";
    const suggestedTitle = buildHomepageTitle();
    const suggestedMeta = buildOptimizedMeta({
      searchIntent: "Create a FriendRank group voting game and share one link.",
      audience: "Friend groups, parties, and teams",
      profileId,
    });

    return {
      url: page.url,
      path: page.path,
      pageType: page.pageType,
      priorityTier: page.growthTier,
      profileId,
      hub: null,
      category: null,
      currentTitle: current.title,
      suggestedTitle,
      currentMeta: current.meta,
      suggestedMeta,
    };
  }

  if (page.pageType === "topic-hub" && page.topicHubId) {
    const hub = getAllHubDefinitions().find((entry) => entry.id === page.topicHubId);
    if (!hub) {
      return null;
    }

    const profileId: CtrProfileId = "topic-hub";
    const suggestedTitle = buildHubTitle(hub);
    const suggestedMeta = buildOptimizedMeta({
      searchIntent: hub.hero,
      audience: "groups and hangouts",
      profileId,
      primaryKeyword: hub.primaryKeyword,
    });

    return {
      url: page.url,
      path: page.path,
      pageType: page.pageType,
      priorityTier: page.growthTier,
      profileId,
      hub: page.topicHubSlug,
      category: null,
      currentTitle: current.title,
      suggestedTitle,
      currentMeta: current.meta,
      suggestedMeta,
    };
  }

  if (page.pageType === "landing-page") {
    const slug = page.path.slice(1);
    const intent = getIntentBySlug(slug);
    if (!intent) {
      return null;
    }

    const profileId = resolveLandingProfile(slug);
    const suggestedTitle = buildLandingTitle({
      title: intent.title,
      slug,
      searchIntent: intent.searchIntent,
      audience: intent.audience,
      profileId,
    });
    const suggestedMeta = buildOptimizedMeta({
      searchIntent: intent.searchIntent,
      audience: intent.audience,
      profileId,
    });

    return {
      url: page.url,
      path: page.path,
      pageType: page.pageType,
      priorityTier: page.growthTier,
      profileId,
      hub: page.topicHubSlug,
      category: page.categoryGroup,
      currentTitle: current.title,
      suggestedTitle,
      currentMeta: current.meta,
      suggestedMeta,
    };
  }

  return null;
}

function countBrandMentions(title: string): number {
  return (title.match(/friendrank/gi) ?? []).length;
}

function repeatedKeywords(text: string, title: string): string[] {
  const counts = new Map<string, number>();
  const titleWords = new Set(normalizeText(title).split(" "));

  for (const word of normalizeText(text).split(" ")) {
    if (word.length < 4 || STOP_WORDS.has(word) || titleWords.has(word)) {
      continue;
    }

    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= 3)
    .map(([word]) => word);
}

/** Validates CTR suggestion quality across the generated candidate set. */
export function validateCtrOptimizations(
  candidates: CtrOptimizationCandidate[],
): {
  valid: boolean;
  issues: CtrValidationIssue[];
} {
  const issues: CtrValidationIssue[] = [];
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();

  for (const candidate of candidates) {
    if (!candidate.suggestedTitle.trim()) {
      issues.push({
        code: "ctr.empty_title",
        severity: "error",
        message: "Suggested title is empty.",
        path: candidate.path,
      });
    }

    if (!candidate.suggestedMeta.trim()) {
      issues.push({
        code: "ctr.empty_meta",
        severity: "error",
        message: "Suggested meta description is empty.",
        path: candidate.path,
      });
    }

    const titleLength = candidate.suggestedTitle.length;
    if (titleLength < CTR_TITLE_MIN_LENGTH || titleLength > CTR_TITLE_MAX_LENGTH) {
      issues.push({
        code: "ctr.title_length",
        severity: "warning",
        message: `Suggested title length ${titleLength} is outside ${CTR_TITLE_MIN_LENGTH}-${CTR_TITLE_MAX_LENGTH} characters.`,
        path: candidate.path,
      });
    }

    const metaLength = candidate.suggestedMeta.length;
    if (metaLength < CTR_META_MIN_LENGTH || metaLength > CTR_META_MAX_LENGTH) {
      issues.push({
        code: "ctr.meta_length",
        severity: "error",
        message: `Suggested meta length ${metaLength} is outside ${CTR_META_MIN_LENGTH}-${CTR_META_MAX_LENGTH} characters.`,
        path: candidate.path,
      });
    }

    if (countBrandMentions(candidate.suggestedTitle) > 1) {
      issues.push({
        code: "ctr.brand_repeated",
        severity: "error",
        message: "Suggested title mentions FriendRank more than once.",
        path: candidate.path,
      });
    }

    const repeats = repeatedKeywords(
      `${candidate.suggestedTitle} ${candidate.suggestedMeta}`,
      candidate.suggestedTitle,
    );
    if (repeats.length > 0) {
      issues.push({
        code: "ctr.repeated_keywords",
        severity: "warning",
        message: `Repeated keywords detected: ${repeats.join(", ")}.`,
        path: candidate.path,
      });
    }

    const normalizedTitle = normalizeText(candidate.suggestedTitle);
    const previousTitle = titles.get(normalizedTitle);
    if (previousTitle && previousTitle !== candidate.path) {
      issues.push({
        code: "ctr.duplicate_title",
        severity: "error",
        message: `Suggested title duplicates ${previousTitle}.`,
        path: candidate.path,
      });
    } else {
      titles.set(normalizedTitle, candidate.path);
    }

    const normalizedMeta = normalizeText(candidate.suggestedMeta);
    const previousMeta = descriptions.get(normalizedMeta);
    if (previousMeta && previousMeta !== candidate.path) {
      issues.push({
        code: "ctr.duplicate_description",
        severity: "error",
        message: `Suggested meta duplicates ${previousMeta}.`,
        path: candidate.path,
      });
    } else {
      descriptions.set(normalizedMeta, candidate.path);
    }
  }

  return {
    valid: issues.every((entry) => entry.severity !== "error"),
    issues,
  };
}

/** Generates CTR optimization candidates where suggestions differ from current metadata. */
export function getCtrImprovementCandidates(options?: {
  includeTiers?: GrowthTier[];
}): CtrOptimizationCandidate[] {
  const includeTiers = options?.includeTiers ?? ["P0", "P1", "P2"];
  const tierSet = new Set(includeTiers);
  const candidates: CtrOptimizationCandidate[] = [];

  for (const page of getAllGrowthClassifications()) {
    if (!tierSet.has(page.growthTier)) {
      continue;
    }

    const suggestion = generateSuggestion(page);
    if (!suggestion) {
      continue;
    }

    const titleChanged =
      normalizeText(suggestion.currentTitle) !==
      normalizeText(suggestion.suggestedTitle);
    const metaChanged =
      normalizeText(suggestion.currentMeta) !==
      normalizeText(suggestion.suggestedMeta);

    if (!titleChanged && !metaChanged) {
      continue;
    }

    candidates.push({
      ...suggestion,
      reason: resolveOptimizationReason({
        currentTitle: suggestion.currentTitle,
        currentMeta: suggestion.currentMeta,
        suggestedTitle: suggestion.suggestedTitle,
        suggestedMeta: suggestion.suggestedMeta,
        pageTitle: page.title,
        profileId: suggestion.profileId,
      }),
    });
  }

  return candidates.sort((candidateA, candidateB) => {
    const tierScore = (tier: GrowthTier) =>
      tier === "P0" ? 4 : tier === "P1" ? 3 : tier === "P2" ? 2 : 1;
    const tierDelta =
      tierScore(candidateB.priorityTier) - tierScore(candidateA.priorityTier);
    if (tierDelta !== 0) {
      return tierDelta;
    }

    return candidateA.path.localeCompare(candidateB.path);
  });
}

/** Resolves the CTR metadata profile for a landing page slug. */
export function resolveCtrProfileForSlug(slug: string): CtrProfileId {
  return resolveLandingProfile(slug);
}

/** Resolves CTR profile from intent category when slug tokens are ambiguous. */
export function resolveCtrProfileFromIntent(slug: string): CtrProfileId {
  const profile = resolveLandingProfile(slug);
  if (profile !== "game") {
    return profile;
  }

  const intent = getIntentBySlug(slug);
  if (!intent) {
    return profile;
  }

  if (intent.intentCategory === INTENT_CATEGORIES.SOCIAL_VOTING) {
    return "voting";
  }

  if (intent.intentCategory === INTENT_CATEGORIES.ENTERTAINMENT) {
    return "questions";
  }

  return profile;
}

export function formatCtrOptimizationReport(limit = 20): string {
  const candidates = getCtrImprovementCandidates();
  const validation = validateCtrOptimizations(
    candidates.map((candidate) => ({
      ...candidate,
    })),
  );

  const lines: string[] = [
    "FriendRank CTR optimization report",
    `Candidates with suggested changes: ${candidates.length}`,
    `Validation: ${validation.valid ? "PASS" : "FAIL"}`,
    "",
    "Metadata profiles",
  ];

  for (const profileId of CTR_PROFILE_IDS) {
    const profile = CTR_METADATA_PROFILES[profileId];
    lines.push(`- ${profile.label}: ${profile.titlePatternDescription}`);
    lines.push(`  meta: ${profile.metaPatternDescription}`);
    lines.push(`  CTA ending: ${profile.ctaEnding}`);
  }

  lines.push("", `Top CTR improvement candidates (${Math.min(limit, candidates.length)} shown)`);

  for (const candidate of candidates.slice(0, limit)) {
    lines.push(
      `- ${candidate.path} | tier ${candidate.priorityTier} | profile ${candidate.profileId}`,
    );
    lines.push(`  reason: ${candidate.reason}`);
    lines.push(`  current title: ${candidate.currentTitle}`);
    lines.push(`  suggested title: ${candidate.suggestedTitle}`);
    lines.push(`  current meta: ${candidate.currentMeta}`);
    lines.push(`  suggested meta: ${candidate.suggestedMeta}`);
  }

  if (validation.issues.length > 0) {
    lines.push("", "Validation issues");
    for (const entry of validation.issues.slice(0, 20)) {
      lines.push(
        `- ${entry.severity.toUpperCase()} ${entry.code}${entry.path ? ` [${entry.path}]` : ""}: ${entry.message}`,
      );
    }
  }

  return lines.join("\n").trimEnd();
}
