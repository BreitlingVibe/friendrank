import {
  CTR_META_MAX_LENGTH,
  CTR_META_MIN_LENGTH,
  CTR_TITLE_MAX_LENGTH,
  CTR_TITLE_MIN_LENGTH,
} from "@/lib/growth/ctr-optimization";
import type {
  SnippetCandidate,
  SnippetCandidateVariant,
  SnippetFitLabel,
  SnippetPageSnapshot,
} from "@/lib/growth/snippet-optimization/types";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import { SITE_NAME } from "@/lib/seo/site-metadata";

const VARIANT_LABELS: Record<SnippetCandidateVariant, string> = {
  "search-intent-first": "A. Search-intent-first",
  "benefit-first": "B. Benefit-first",
  "brand-balanced": "C. Brand-balanced",
};

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function capitalizeFirst(value: string): string {
  if (!value) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function fitMetaLength(text: string): string {
  let value = normalizeWhitespace(text);
  if (value.length > CTR_META_MAX_LENGTH) {
    value = value.slice(0, CTR_META_MAX_LENGTH - 1).replace(/\s+\S*$/, "").trim();
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
  return title.slice(0, CTR_TITLE_MAX_LENGTH - 1).replace(/\s+\S*$/, "").trim();
}

function audienceSnippet(audience: string): string {
  return audience.split(",")[0]?.trim().toLowerCase() ?? "your group";
}

function pickClaims(page: SnippetPageSnapshot, preferred: string[]): string[] {
  const allowed = new Set(page.allowedClaims.map((claim) => claim.toLowerCase()));
  return preferred.filter((claim) => allowed.has(claim.toLowerCase()));
}

function buildSearchIntentTitle(page: SnippetPageSnapshot, targetQuery?: string): string {
  if (targetQuery) {
    const queryTitle = capitalizeFirst(targetQuery);
    if (page.pageType === "evergreen-hub") {
      return fitTitleLength(`${queryTitle} – Guide for Groups`);
    }
    return fitTitleLength(`${queryTitle} for Groups`);
  }

  const intent = page.slug ? getIntentBySlug(page.slug) : null;
  const title = intent?.title ?? page.currentH1;
  return fitTitleLength(`${title} – Online Group Voting`);
}

function buildBenefitTitle(page: SnippetPageSnapshot): string {
  if (page.pageType === "evergreen-hub") {
    return fitTitleLength(`${page.currentH1} – Free Browser Guide`);
  }
  return fitTitleLength(`Free Online ${page.currentH1}`);
}

function buildBrandTitle(page: SnippetPageSnapshot, targetQuery?: string): string {
  const lead = targetQuery
    ? capitalizeFirst(targetQuery)
    : page.currentH1.replace(/ for friends$/i, "");
  return fitTitleLength(`${lead} | ${SITE_NAME}`);
}

function buildSearchIntentDescription(
  page: SnippetPageSnapshot,
  targetQuery: string | undefined,
  claims: string[],
): string {
  const audience = audienceSnippet(page.audience);
  const queryLead = targetQuery
    ? capitalizeFirst(targetQuery)
    : capitalizeFirst(page.searchIntent.replace(/\.$/, ""));

  const parts = [
    `${queryLead} for ${audience}.`,
    claims.includes("one shared link") ? "Share one link and vote from any phone." : "",
    claims.includes("anonymous voting") ? "Votes stay private until the group reveal." : "",
    claims.includes("no app download") ? "No app download required." : "",
  ].filter(Boolean);

  return fitMetaLength(parts.join(" "));
}

function buildBenefitDescription(
  page: SnippetPageSnapshot,
  claims: string[],
): string {
  const audience = audienceSnippet(page.audience);
  const parts = [
    `Run a quick browser voting game for ${audience}.`,
    claims.includes("anonymous voting") ? "Anonymous phone voting with a shared reveal." : "",
    claims.includes("one shared link") ? "One link is enough for the whole group." : "",
    claims.includes("free browser game") ? "Free to create and play in the browser." : "",
  ].filter(Boolean);

  return fitMetaLength(parts.join(" "));
}

function buildBrandDescription(
  page: SnippetPageSnapshot,
  claims: string[],
): string {
  const parts = [
    `${SITE_NAME} helps groups play together in the browser.`,
    claims.includes("anonymous voting")
      ? "Create a game, share one link, vote anonymously, and reveal results together."
      : "Create a game, share one link, and reveal results together.",
    claims.includes("no signup required") ? "No signup required for players." : "",
  ].filter(Boolean);

  return fitMetaLength(parts.join(" "));
}

function assessQualitativeFit(input: {
  variant: SnippetCandidateVariant;
  page: SnippetPageSnapshot;
  targetQuery?: string;
  titleLength: number;
  descriptionLength: number;
}): { fit: SnippetFitLabel; reason: string } {
  const titleOk =
    input.titleLength >= CTR_TITLE_MIN_LENGTH &&
    input.titleLength <= CTR_TITLE_MAX_LENGTH;
  const metaOk =
    input.descriptionLength >= CTR_META_MIN_LENGTH &&
    input.descriptionLength <= CTR_META_MAX_LENGTH;

  if (!titleOk || !metaOk) {
    return {
      fit: "weak fit",
      reason: "Length limits reduce snippet readability in search results.",
    };
  }

  if (input.variant === "search-intent-first" && input.targetQuery) {
    const includesQuery = input.page.currentTitle
      .toLowerCase()
      .includes(input.targetQuery.toLowerCase());
    return {
      fit: includesQuery ? "reasonable fit" : "strong fit",
      reason: includesQuery
        ? "Aligns with verified query while current title already partially matches."
        : "Directly aligns title and description with verified Search Console query.",
    };
  }

  if (input.variant === "benefit-first") {
    return {
      fit: "reasonable fit",
      reason: "Leads with product benefit and accurate browser-play claims.",
    };
  }

  return {
    fit: "reasonable fit",
    reason: "Balanced brand mention with clear product action.",
  };
}

function buildCandidate(
  variant: SnippetCandidateVariant,
  page: SnippetPageSnapshot,
  targetQuery?: string,
): SnippetCandidate {
  const preferredClaims = [
    "free browser game",
    "anonymous voting",
    "one shared link",
    "no app download",
    "no signup required",
    "vote from any phone",
    "shared results reveal",
  ];
  const claimsUsed = pickClaims(page, preferredClaims);

  let title = "";
  let metaDescription = "";
  let rationale = "";
  let possibleRisk = "";
  let targetIntent = page.primaryIntent;

  switch (variant) {
    case "search-intent-first":
      title = buildSearchIntentTitle(page, targetQuery);
      metaDescription = buildSearchIntentDescription(page, targetQuery, claimsUsed);
      rationale = targetQuery
        ? `Leads with verified query "${targetQuery}" while describing the existing page accurately.`
        : "Leads with registry search intent when no verified query is available.";
      possibleRisk = targetQuery
        ? "May overlap with sibling voting pages if query terms are too broad."
        : "Heuristic alignment only — lacks verified Search Console query evidence.";
      targetIntent = targetQuery ?? page.searchIntent;
      break;
    case "benefit-first":
      title = buildBenefitTitle(page);
      metaDescription = buildBenefitDescription(page, claimsUsed);
      rationale =
        "Prioritizes the user benefit (fast browser group voting) over exact query wording.";
      possibleRisk = "May under-index the verified query if Search Console shows strong query match potential.";
      break;
    case "brand-balanced":
      title = buildBrandTitle(page, targetQuery);
      metaDescription = buildBrandDescription(page, claimsUsed);
      rationale = "Keeps FriendRank branding visible while preserving accurate product claims.";
      possibleRisk = "Brand suffix uses title space that could otherwise carry query terms.";
      break;
  }

  const titleLength = title.length;
  const descriptionLength = metaDescription.length;
  const { fit, reason } = assessQualitativeFit({
    variant,
    page,
    targetQuery,
    titleLength,
    descriptionLength,
  });

  return {
    variant,
    variantLabel: VARIANT_LABELS[variant],
    title,
    metaDescription,
    rationale,
    targetIntent,
    claimsUsed,
    possibleRisk,
    titleLength,
    descriptionLength,
    qualitativeFit: fit,
    fitReason: reason,
  };
}

/** Generates three human-review snippet candidates for one page snapshot. */
export function generateSnippetCandidates(input: {
  page: SnippetPageSnapshot;
  targetQuery?: string;
}): SnippetCandidate[] {
  const variants: SnippetCandidateVariant[] = [
    "search-intent-first",
    "benefit-first",
    "brand-balanced",
  ];

  const candidates = variants.map((variant) =>
    buildCandidate(variant, input.page, input.targetQuery),
  );

  const normalizedTitles = new Set<string>();
  return candidates.filter((candidate) => {
    const key = candidate.title.toLowerCase();
    if (normalizedTitles.has(key)) {
      return false;
    }
    normalizedTitles.add(key);
    return true;
  });
}
