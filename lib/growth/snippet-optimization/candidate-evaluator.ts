import {
  CTR_META_MAX_LENGTH,
  CTR_META_MIN_LENGTH,
  CTR_TITLE_MAX_LENGTH,
  CTR_TITLE_MIN_LENGTH,
} from "@/lib/growth/ctr-optimization";
import type {
  EvaluatedSnippetCandidate,
  SnippetCandidate,
  SnippetFitLabel,
  SnippetPageSnapshot,
  SnippetQualityEvaluation,
} from "@/lib/growth/snippet-optimization/types";
import { SITE_NAME } from "@/lib/seo/site-metadata";

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function fitLabel(score: number): SnippetFitLabel {
  if (score >= 80) {
    return "strong fit";
  }
  if (score >= 60) {
    return "reasonable fit";
  }
  return "weak fit";
}

function titleLengthStatus(length: number): SnippetQualityEvaluation["titleLengthStatus"] {
  if (length >= CTR_TITLE_MIN_LENGTH && length <= CTR_TITLE_MAX_LENGTH) {
    return "ok";
  }
  return length < CTR_TITLE_MIN_LENGTH ? "short" : "long";
}

function descriptionLengthStatus(
  length: number,
): SnippetQualityEvaluation["descriptionLengthStatus"] {
  if (length >= CTR_META_MIN_LENGTH && length <= CTR_META_MAX_LENGTH) {
    return "ok";
  }
  return length < CTR_META_MIN_LENGTH ? "short" : "long";
}

function brandUsage(title: string): SnippetQualityEvaluation["brandUsage"] {
  const mentions = (title.match(/friendrank/gi) ?? []).length;
  if (mentions === 0) {
    return "none";
  }
  if (mentions === 1) {
    return "balanced";
  }
  return "heavy";
}

function queryAlignmentScore(
  candidate: SnippetCandidate,
  targetQuery?: string,
): { score: number; label: SnippetFitLabel; reason: string } {
  if (!targetQuery) {
    return {
      score: 50,
      label: "reasonable fit",
      reason: "No verified Search Console query — alignment is heuristic only.",
    };
  }

  const haystack = normalizeText(`${candidate.title} ${candidate.metaDescription}`);
  const queryTokens = normalizeText(targetQuery).split(" ").filter(Boolean);
  const matched = queryTokens.filter((token) => haystack.includes(token)).length;
  const ratio = queryTokens.length > 0 ? matched / queryTokens.length : 0;
  const score = Math.round(ratio * 100);

  return {
    score,
    label: fitLabel(score),
    reason:
      ratio >= 0.75
        ? `Candidate includes most tokens from verified query "${targetQuery}".`
        : `Candidate only partially reflects verified query "${targetQuery}".`,
  };
}

/** Deterministic internal quality evaluation — not predicted CTR. */
export function evaluateSnippetCandidate(input: {
  candidate: SnippetCandidate;
  page: SnippetPageSnapshot;
  targetQuery?: string;
  duplicationRisk: SnippetQualityEvaluation["duplicationRisk"];
  cannibalizationRisk: SnippetQualityEvaluation["cannibalizationRisk"];
}): SnippetQualityEvaluation {
  const { candidate, page, targetQuery, duplicationRisk, cannibalizationRisk } = input;
  const reasons: string[] = [];
  const warnings: string[] = [];

  const query = queryAlignmentScore(candidate, targetQuery);
  reasons.push(`Query alignment: ${query.reason}`);

  const titleStatus = titleLengthStatus(candidate.titleLength);
  const descriptionStatus = descriptionLengthStatus(candidate.descriptionLength);
  if (titleStatus !== "ok") {
    warnings.push(`Title length is ${titleStatus} (${candidate.titleLength} chars).`);
  }
  if (descriptionStatus !== "ok") {
    warnings.push(
      `Description length is ${descriptionStatus} (${candidate.descriptionLength} chars).`,
    );
  }

  const intentScore =
    normalizeText(candidate.targetIntent).length > 20 ? 85 : 65;
  const intentClarity = fitLabel(intentScore);
  reasons.push("Intent clarity reflects the page's existing primary intent.");

  const unsupportedClaims = candidate.claimsUsed.filter(
    (claim) =>
      !page.allowedClaims.some(
        (allowed) => allowed.toLowerCase() === claim.toLowerCase(),
      ),
  );
  const productScore = unsupportedClaims.length === 0 ? 90 : 40;
  const productAccuracy = fitLabel(productScore);
  if (unsupportedClaims.length > 0) {
    warnings.push(`Unsupported claims: ${unsupportedClaims.join(", ")}`);
  } else {
    reasons.push("All claims used are allowed for this page type.");
  }

  const differentiationScore =
    cannibalizationRisk === "high" ? 35 : cannibalizationRisk === "medium" ? 65 : 90;
  const differentiation = fitLabel(differentiationScore);

  const titleReadability =
    candidate.title.includes("  ") || candidate.title.split("|").length > 2
      ? "weak fit"
      : "strong fit";

  const descriptionReadability =
    candidate.metaDescription.split(".").filter(Boolean).length >= 2
      ? "strong fit"
      : "reasonable fit";

  const brand = brandUsage(candidate.title);
  if (brand === "heavy") {
    warnings.push("Title mentions FriendRank more than once.");
  }

  const ctaClarity = candidate.metaDescription.match(
    /create|start|share one link|vote|play/i,
  )
    ? "strong fit"
    : "reasonable fit";

  if (duplicationRisk !== "low") {
    warnings.push(`Duplication risk is ${duplicationRisk}.`);
  }
  if (cannibalizationRisk !== "low") {
    warnings.push(`Cannibalization risk is ${cannibalizationRisk}.`);
  }

  let internalQualityScore = Math.round(
    (query.score +
      intentScore +
      productScore +
      differentiationScore +
      (titleStatus === "ok" ? 90 : 50) +
      (descriptionStatus === "ok" ? 90 : 50) +
      (brand === "balanced" ? 80 : brand === "none" ? 75 : 40) +
      (ctaClarity === "strong fit" ? 85 : 65)) /
      8,
  );

  if (cannibalizationRisk === "high") {
    internalQualityScore = Math.min(internalQualityScore, 55);
  }

  return {
    internalQualityScore,
    scoreLabel: "Internal quality score — not predicted CTR.",
    queryAlignment: query.label,
    intentClarity,
    productAccuracy,
    differentiation,
    titleReadability,
    descriptionReadability,
    duplicationRisk,
    cannibalizationRisk,
    titleLengthStatus: titleStatus,
    descriptionLengthStatus: descriptionStatus,
    brandUsage: brand,
    ctaClarity,
    reasons,
    warnings,
  };
}

export function evaluateSnippetCandidates(input: {
  candidates: SnippetCandidate[];
  page: SnippetPageSnapshot;
  targetQuery?: string;
  duplicationRisk: SnippetQualityEvaluation["duplicationRisk"];
  cannibalizationRisk: SnippetQualityEvaluation["cannibalizationRisk"];
}): EvaluatedSnippetCandidate[] {
  return input.candidates.map((candidate) => ({
    ...candidate,
    evaluation: evaluateSnippetCandidate({
      candidate,
      page: input.page,
      targetQuery: input.targetQuery,
      duplicationRisk: input.duplicationRisk,
      cannibalizationRisk: input.cannibalizationRisk,
    }),
  }));
}

export function pickRecommendedCandidate(
  candidates: EvaluatedSnippetCandidate[],
): EvaluatedSnippetCandidate | undefined {
  if (candidates.length === 0) {
    return undefined;
  }

  return [...candidates].sort((left, right) => {
    const scoreDelta =
      right.evaluation.internalQualityScore - left.evaluation.internalQualityScore;
    if (scoreDelta !== 0) {
      return scoreDelta;
    }
    const variantOrder = {
      "search-intent-first": 3,
      "benefit-first": 2,
      "brand-balanced": 1,
    } as const;
    return variantOrder[right.variant] - variantOrder[left.variant];
  })[0];
}
