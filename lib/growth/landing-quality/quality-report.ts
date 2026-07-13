import fs from "node:fs";
import path from "node:path";

import {
  auditAllLandingPages,
  collectInternalLinkingGaps,
  collectMetadataFindingsRequiringScEvidence,
  collectVerifiedTechnicalIssues,
  findOverlapReviewPairs,
} from "@/lib/growth/landing-quality/quality-checks";
import { buildLandingPageAuditContext } from "@/lib/growth/landing-quality/page-source";
import {
  AUDIT_CADENCE_DAYS,
  AUDIT_EXCLUSIONS,
  AUDIT_SCOPE_NOTE,
  REPORT_DISCLAIMER,
  SCORE_LABEL,
  SCORING_REFERENCE,
} from "@/lib/growth/landing-quality/quality-scoring";
import type {
  LandingPageScorecard,
  LandingQualityAuditSummary,
  LandingQualityReport,
} from "@/lib/growth/landing-quality/types";

const SUMMARY_FILE = path.join(
  process.cwd(),
  "lib/growth/landing-quality/last-audit-summary.json",
);

function buildSummary(scorecards: LandingPageScorecard[]): LandingQualityReport["summary"] {
  const importantHumanReviewCount = scorecards.filter(
    (scorecard) => scorecard.reviewPriority === "high",
  ).length;
  const moderateReviewCount = scorecards.filter(
    (scorecard) => scorecard.reviewPriority === "moderate",
  ).length;
  const maintainCount = scorecards.filter(
    (scorecard) => scorecard.reviewPriority === "maintain",
  ).length;

  const topReviewCandidates = scorecards
    .filter((scorecard) => scorecard.reviewPriority === "high")
    .slice(0, 10)
    .map((scorecard) => ({
      slug: scorecard.slug,
      path: scorecard.path,
      score: scorecard.internalQualityScore,
      confidence: scorecard.confidence,
      reasons: scorecard.findings
        .filter(
          (entry) =>
            entry.severity !== "informational" &&
            entry.recommendation !== "Maintain",
        )
        .slice(0, 4)
        .map((entry) => entry.message),
      recommendation: scorecard.primaryRecommendation,
    }));

  const strongPagesToMaintain = scorecards
    .filter((scorecard) => scorecard.reviewPriority === "maintain")
    .slice(-10)
    .reverse()
    .map((scorecard) => scorecard.path);

  const verifiedIssueCount = collectVerifiedTechnicalIssues(scorecards).length;

  const nextAction =
    verifiedIssueCount > 0
      ? "Fix verified technical issues first, then run a human content review on the highest-priority pages."
      : importantHumanReviewCount > 0
        ? "Schedule human content and intent review for the highest-priority pages below."
        : "Portfolio quality signals are stable — maintain strong pages and re-run monthly or after landing-page batch changes.";

  return {
    verifiedIssueCount,
    importantHumanReviewCount,
    moderateReviewCount,
    maintainCount,
    topReviewCandidates,
    strongPagesToMaintain,
    nextAction,
  };
}

export function buildLandingQualityReport(): LandingQualityReport {
  const context = buildLandingPageAuditContext();
  const scorecards = auditAllLandingPages(context);
  const verifiedTechnicalIssues = collectVerifiedTechnicalIssues(scorecards);

  return {
    generatedAt: new Date().toISOString(),
    disclaimer: REPORT_DISCLAIMER,
    scoreLabel: SCORE_LABEL,
    pagesAnalyzed: scorecards.length,
    scopeNote: AUDIT_SCOPE_NOTE,
    exclusions: AUDIT_EXCLUSIONS,
    portfolioStats: context.portfolio,
    verifiedTechnicalIssues,
    scorecards,
    overlapReviewPairs: findOverlapReviewPairs(scorecards),
    internalLinkingGaps: collectInternalLinkingGaps(scorecards).slice(0, 20),
    metadataFindingsRequiringScEvidence:
      collectMetadataFindingsRequiringScEvidence(scorecards),
    scoringReference: SCORING_REFERENCE,
    summary: buildSummary(scorecards),
  };
}

export function buildLandingQualityAuditSummary(
  report: LandingQualityReport = buildLandingQualityReport(),
): LandingQualityAuditSummary {
  const generatedAt = new Date(report.generatedAt);
  const ageDays = Math.floor(
    (Date.now() - generatedAt.getTime()) / (1000 * 60 * 60 * 24),
  );
  const auditRecommended = ageDays >= AUDIT_CADENCE_DAYS;

  return {
    generatedAt: report.generatedAt,
    pagesAnalyzed: report.pagesAnalyzed,
    verifiedIssueCount: report.summary.verifiedIssueCount,
    importantHumanReviewCount: report.summary.importantHumanReviewCount,
    moderateReviewCount: report.summary.moderateReviewCount,
    maintainCount: report.summary.maintainCount,
    topReviewCandidates: report.summary.topReviewCandidates.slice(0, 3).map((entry) => ({
      slug: entry.slug,
      path: entry.path,
      score: entry.score,
      recommendation: entry.recommendation,
    })),
    auditRecommended,
    auditRecommendedReason: auditRecommended
      ? `Last audit is ${ageDays} days old — run npm run quality:landing before the next landing-page refresh sprint.`
      : "Recent audit on file — re-run monthly or after meaningful landing-page batch changes.",
  };
}

export function persistLandingQualitySummary(
  summary: LandingQualityAuditSummary,
): void {
  fs.writeFileSync(SUMMARY_FILE, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
}

export function loadLandingQualitySummary(): LandingQualityAuditSummary | null {
  if (!fs.existsSync(SUMMARY_FILE)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(SUMMARY_FILE, "utf8");
    return JSON.parse(raw) as LandingQualityAuditSummary;
  } catch {
    return null;
  }
}

export function shouldRecommendLandingQualityAudit(
  summary: LandingQualityAuditSummary | null = loadLandingQualitySummary(),
): { recommended: boolean; reason: string } {
  if (!summary) {
    return {
      recommended: true,
      reason:
        "No landing-quality audit summary stored — run npm run quality:landing before a landing-page refresh sprint.",
    };
  }

  const generatedAt = new Date(summary.generatedAt);
  const ageDays = Math.floor(
    (Date.now() - generatedAt.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (ageDays >= AUDIT_CADENCE_DAYS) {
    return {
      recommended: true,
      reason: `Latest landing-quality audit is ${ageDays} days old (monthly cadence recommended).`,
    };
  }

  return {
    recommended: false,
    reason: `Latest landing-quality audit is ${ageDays} day(s) old.`,
  };
}

function formatScorecard(
  scorecard: LandingPageScorecard,
  rank: number,
  introLengthMedian: number,
): string[] {
  const lines = [
    `${rank}. ${scorecard.path}`,
    `   Internal quality score: ${scorecard.internalQualityScore}/100`,
    `   Human review urgency: ${scorecard.humanReviewUrgency}`,
    `   Review priority: ${scorecard.reviewPriority}`,
    `   Confidence: ${scorecard.confidence}`,
    `   Recommendation: ${scorecard.primaryRecommendation}`,
  ];

  if (scorecard.activeExperimentProtected) {
    lines.push(
      "   Active experiment — do not modify relevant metadata or experimental copy.",
    );
  }

  const reasons = scorecard.findings.filter(
    (entry) =>
      entry.severity !== "informational" &&
      entry.recommendation !== "Maintain" &&
      !entry.message.startsWith("Active experiment"),
  );

  if (reasons.length > 0) {
    lines.push("", "   Reasons:");
    for (const entry of reasons.slice(0, 6)) {
      lines.push(
        `   - [${entry.severity}/${entry.confidence}] ${entry.message}`,
      );
    }
  }

  lines.push(
    "",
    "   Portfolio-relative stats:",
    `   - intro length: ${scorecard.stats.introLength} (median ${introLengthMedian})`,
    `   - FAQ count: ${scorecard.stats.faqCount}`,
    `   - visible sections: ${scorecard.stats.visibleSectionCount}`,
    `   - internal links: ${scorecard.stats.internalLinkCount}`,
    `   - category relationships: ${scorecard.stats.categoryRelationships}`,
    `   - inbound landing links: ${scorecard.stats.inboundLinkCount}`,
    "",
  );

  return lines;
}

export function formatLandingQualityReport(
  report: LandingQualityReport = buildLandingQualityReport(),
): string {
  const lines: string[] = [
    "LANDING PAGE QUALITY AUDIT",
    "",
    report.disclaimer,
    "",
    `Generated: ${report.generatedAt}`,
    `Pages analyzed: ${report.pagesAnalyzed}`,
    SCORE_LABEL,
    "",
    "Scope:",
    report.scopeNote,
    "",
    "Excluded from this audit:",
    ...report.exclusions.map((entry) => `- ${entry}`),
    "",
    "====================================",
    "1. Executive Summary",
    "====================================",
    `Verified technical issues: ${report.summary.verifiedIssueCount}`,
    `Important human-review candidates: ${report.summary.importantHumanReviewCount}`,
    `Moderate candidates: ${report.summary.moderateReviewCount}`,
    `Maintain: ${report.summary.maintainCount}`,
    "",
    "Portfolio medians:",
    `- Introduction length: ${report.portfolioStats.introLengthMedian} characters`,
    `- FAQ count: ${report.portfolioStats.faqCountMedian}`,
    `- Visible sections: ${report.portfolioStats.visibleSectionCountMedian}`,
    `- Internal links: ${report.portfolioStats.internalLinkCountMedian}`,
    `- Content field completeness: ${report.portfolioStats.contentFieldCompletenessMedian}%`,
    "",
    "Next action:",
    report.summary.nextAction,
    "",
    "====================================",
    "2. Pages Analyzed",
    "====================================",
    `${report.pagesAnalyzed} live landing pages from LANDING_PAGES`,
    "",
    "====================================",
    "3. Verified Technical Issues",
    "====================================",
  ];

  if (report.verifiedTechnicalIssues.length === 0) {
    lines.push("None detected.");
  } else {
    for (const issue of report.verifiedTechnicalIssues.slice(0, 20)) {
      lines.push(`- [${issue.severity}] ${issue.message}`);
    }
    if (report.verifiedTechnicalIssues.length > 20) {
      lines.push(`… and ${report.verifiedTechnicalIssues.length - 20} more`);
    }
  }

  lines.push(
    "",
    "====================================",
    "4. Highest-Priority Human-Review Pages",
    "====================================",
  );

  if (report.summary.topReviewCandidates.length === 0) {
    lines.push("None — portfolio signals are within expected ranges.");
  } else {
    for (const [index, candidate] of report.summary.topReviewCandidates.entries()) {
      lines.push(`${index + 1}. ${candidate.path}`);
      lines.push(`   Internal quality score: ${candidate.score}/100`);
      lines.push(`   Confidence: ${candidate.confidence}`);
      lines.push("", "   Reasons:");
      for (const reason of candidate.reasons) {
        lines.push(`   - ${reason}`);
      }
      lines.push("", `   Recommendation: ${candidate.recommendation}`, "");
    }
  }

  lines.push(
    "====================================",
    "5. Strong Pages to Maintain",
    "====================================",
  );

  if (report.summary.strongPagesToMaintain.length === 0) {
    lines.push("No maintain-tier pages recorded.");
  } else {
    for (const pagePath of report.summary.strongPagesToMaintain) {
      lines.push(`- ${pagePath}`);
    }
  }

  lines.push(
    "",
    "====================================",
    "6. Possible Overlap / Cannibalization Review",
    "====================================",
  );

  if (report.overlapReviewPairs.length === 0) {
    lines.push("No conservative overlap pairs flagged.");
  } else {
    for (const pair of report.overlapReviewPairs.slice(0, 15)) {
      lines.push(
        `- /${pair.slugA} ↔ /${pair.slugB} (${pair.label}, ${pair.confidence})`,
      );
      lines.push(`  ${pair.overlapType}`);
    }
  }

  lines.push(
    "",
    "====================================",
    "7. Internal-Linking Gaps",
    "====================================",
  );

  if (report.internalLinkingGaps.length === 0) {
    lines.push("No linking gaps flagged beyond portfolio norms.");
  } else {
    for (const gap of report.internalLinkingGaps.slice(0, 15)) {
      lines.push(`- /${gap.slug} (${gap.confidence}): ${gap.message}`);
    }
  }

  lines.push(
    "",
    "====================================",
    "8. Metadata Findings Requiring Search Console Evidence",
    "====================================",
  );

  if (report.metadataFindingsRequiringScEvidence.length === 0) {
    lines.push("None flagged.");
  } else {
    for (const entry of report.metadataFindingsRequiringScEvidence.slice(0, 15)) {
      lines.push(`- ${entry.message}`);
    }
  }

  lines.push(
    "",
    "====================================",
    "9. Full Ranked Scorecards",
    "====================================",
    "",
  );

  report.scorecards.forEach((scorecard, index) => {
    lines.push(
      ...formatScorecard(
        scorecard,
        index + 1,
        report.portfolioStats.introLengthMedian,
      ),
    );
  });

  lines.push(
    "====================================",
    "10. Scoring Reference",
    "====================================",
  );

  for (const entry of report.scoringReference) {
    lines.push(`- ${entry.label}: ${entry.weightPercent}%`);
  }

  lines.push(
    "",
    "====================================",
    "11. Clear Next-Action Recommendation",
    "====================================",
    report.summary.nextAction,
    "",
    "Human approval required before any production content, metadata, or experiment change.",
  );

  return lines.join("\n").trimEnd();
}

export function validateLandingQualityReport(
  report: LandingQualityReport = buildLandingQualityReport(),
): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (report.pagesAnalyzed === 0) {
    issues.push("No eligible landing pages were analyzed.");
  }

  if (report.scorecards.length !== report.pagesAnalyzed) {
    issues.push("Scorecard count does not match pages analyzed.");
  }

  for (const scorecard of report.scorecards) {
    if (
      scorecard.internalQualityScore < 0 ||
      scorecard.internalQualityScore > 100
    ) {
      issues.push(`Score out of range for /${scorecard.slug}.`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
