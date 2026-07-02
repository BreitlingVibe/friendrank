import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { applyTopicHubExperience } from "@/lib/landing-pages/topic-hub-experience";
import { applyGeoFoundation } from "@/lib/geo/geo-foundation";
import {
  applyAiCitationLayer,
  CANONICAL_ANSWER_MAX_WORDS,
  CANONICAL_ANSWER_MIN_WORDS,
  CITATION_CONFIDENCE_LEVELS,
  CITATION_SUMMARY_MAX_CHARS,
  collectAiCitationPageRecords,
  countWords,
  KEY_TAKEAWAYS_COUNT,
  MIN_LIKELY_QUESTIONS,
  type AiCitationEvidence,
} from "@/lib/geo/ai-citation";
import { getAllHubs } from "@/lib/topic-hubs";
import { assembleTopicHubPage } from "@/lib/topic-hubs/hub-page-data";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function countByValue(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}

function buildTopicHubPagesWithAiCitation() {
  return getAllHubs().map((hub) =>
    applyAiCitationLayer(
      applyGeoFoundation(applyTopicHubExperience(assembleTopicHubPage(hub))),
    ),
  );
}

function evidencePopulated(evidence: AiCitationEvidence): boolean {
  return Object.values(evidence).every((value) => value.trim().length > 0);
}

function relatedKnowledgePopulated(
  relatedKnowledge: {
    relatedConcepts: string[];
    alternativeGameFormats: string[];
    complementaryPages: string[];
    parentTopic: string;
    siblingTopics: string[];
    knowledgeGraphConnections: string[];
  },
): boolean {
  return (
    relatedKnowledge.relatedConcepts.length > 0 &&
    relatedKnowledge.alternativeGameFormats.length > 0 &&
    relatedKnowledge.complementaryPages.length > 0 &&
    relatedKnowledge.parentTopic.trim().length > 0 &&
    relatedKnowledge.siblingTopics.length > 0 &&
    relatedKnowledge.knowledgeGraphConnections.length > 0
  );
}

/** Validates AI citation metadata across indexable pages. */
export function validateAiCitationLayer(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const landingPages = LANDING_PAGES;
  const topicHubPages = buildTopicHubPagesWithAiCitation();
  const records = collectAiCitationPageRecords({ landingPages, topicHubPages });

  for (const record of records) {
    const citation = record.aiCitation;
    const context = record.path;

    if (!citation.canonicalAnswer.trim()) {
      issues.push(
        issue(
          "ai_citation.missing_canonical_answer",
          "error",
          "AI citation canonical answer is missing.",
          context,
        ),
      );
    }

    const wordCount = countWords(citation.canonicalAnswer);
    if (wordCount < CANONICAL_ANSWER_MIN_WORDS) {
      issues.push(
        issue(
          "ai_citation.canonical_answer_too_short",
          "error",
          `Canonical answer has ${wordCount} words; minimum is ${CANONICAL_ANSWER_MIN_WORDS}.`,
          context,
        ),
      );
    }

    if (wordCount > CANONICAL_ANSWER_MAX_WORDS) {
      issues.push(
        issue(
          "ai_citation.canonical_answer_too_long",
          "error",
          `Canonical answer has ${wordCount} words; maximum is ${CANONICAL_ANSWER_MAX_WORDS}.`,
          context,
        ),
      );
    }

    if (!citation.citationSummary.trim()) {
      issues.push(
        issue(
          "ai_citation.missing_citation_summary",
          "error",
          "AI citation summary is missing.",
          context,
        ),
      );
    }

    if (citation.citationSummary.length > CITATION_SUMMARY_MAX_CHARS) {
      issues.push(
        issue(
          "ai_citation.summary_too_long",
          "error",
          `Citation summary exceeds ${CITATION_SUMMARY_MAX_CHARS} characters.`,
          context,
        ),
      );
    }

    if (citation.likelyQuestions.length < MIN_LIKELY_QUESTIONS) {
      issues.push(
        issue(
          "ai_citation.insufficient_questions",
          "error",
          `AI citation has ${citation.likelyQuestions.length} questions; minimum is ${MIN_LIKELY_QUESTIONS}.`,
          context,
        ),
      );
    }

    if (citation.keyTakeaways.length !== KEY_TAKEAWAYS_COUNT) {
      issues.push(
        issue(
          "ai_citation.invalid_takeaway_count",
          "error",
          `AI citation has ${citation.keyTakeaways.length} takeaways; expected exactly ${KEY_TAKEAWAYS_COUNT}.`,
          context,
        ),
      );
    }

    for (const takeaway of citation.keyTakeaways) {
      if (!takeaway.trim()) {
        issues.push(
          issue(
            "ai_citation.empty_takeaway",
            "error",
            "AI citation contains an empty takeaway.",
            context,
          ),
        );
      }
    }

    if (!evidencePopulated(citation.evidence)) {
      issues.push(
        issue(
          "ai_citation.incomplete_evidence",
          "error",
          "AI citation evidence block is incomplete.",
          context,
        ),
      );
    }

    if (!relatedKnowledgePopulated(citation.relatedKnowledge)) {
      issues.push(
        issue(
          "ai_citation.incomplete_related_knowledge",
          "error",
          "AI citation related knowledge graph is incomplete.",
          context,
        ),
      );
    }

    if (!CITATION_CONFIDENCE_LEVELS.includes(citation.citationConfidence)) {
      issues.push(
        issue(
          "ai_citation.invalid_confidence",
          "error",
          `AI citation confidence "${citation.citationConfidence}" is not approved.`,
          context,
        ),
      );
    }
  }

  for (const page of landingPages) {
    if (!page.aiCitation) {
      issues.push(
        issue(
          "ai_citation.missing_landing_citation",
          "error",
          "Landing page is missing AI citation metadata.",
          page.slug,
        ),
      );
    }
  }

  return createValidationResult(issues);
}

export type AiCitationAuditReport = {
  valid: boolean;
  pagesAnalyzed: number;
  canonicalAnswers: number;
  questionCoverage: number;
  evidenceCoverage: number;
  confidenceDistribution: Map<string, number>;
  validation: ValidationResult;
};

/** Builds an AI citation audit report for CLI output. */
export function buildAiCitationAuditReport(): AiCitationAuditReport {
  const landingPages = LANDING_PAGES;
  const topicHubPages = buildTopicHubPagesWithAiCitation();
  const records = collectAiCitationPageRecords({ landingPages, topicHubPages });
  const validation = validateAiCitationLayer();

  const canonicalAnswers = records.filter((record) =>
    record.aiCitation.canonicalAnswer.trim(),
  ).length;

  const questionCoverage = records.filter(
    (record) => record.aiCitation.likelyQuestions.length >= MIN_LIKELY_QUESTIONS,
  ).length;

  const evidenceCoverage = records.filter((record) =>
    evidencePopulated(record.aiCitation.evidence),
  ).length;

  return {
    valid: validation.valid,
    pagesAnalyzed: records.length,
    canonicalAnswers,
    questionCoverage,
    evidenceCoverage,
    confidenceDistribution: countByValue(
      records.map((record) => record.aiCitation.citationConfidence),
    ),
    validation,
  };
}

export function formatAiCitationAuditReport(report: AiCitationAuditReport): string {
  const lines: string[] = [
    "FriendRank AI citation report",
    `Status: ${report.valid ? "PASS" : "FAIL"}`,
    `Pages analyzed: ${report.pagesAnalyzed}`,
    `Canonical answers: ${report.canonicalAnswers}`,
    `Question coverage: ${report.questionCoverage}`,
    `Evidence coverage: ${report.evidenceCoverage}`,
    "",
    "Confidence distribution",
  ];

  for (const [level, count] of [...report.confidenceDistribution.entries()].sort()) {
    lines.push(`- ${level}: ${count}`);
  }

  if (report.validation.issues.length > 0) {
    lines.push("", "Validation issues");
    for (const entry of report.validation.issues) {
      const context = entry.context ? ` [${entry.context}]` : "";
      lines.push(
        `  - ${entry.severity.toUpperCase()} ${entry.code}${context}: ${entry.message}`,
      );
    }
  }

  return lines.join("\n").trimEnd();
}
