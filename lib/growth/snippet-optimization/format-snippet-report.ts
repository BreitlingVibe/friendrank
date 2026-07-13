import { formatSearchConsoleEvidence } from "@/lib/growth/search-console-opportunities";
import { formatMeasurementWindow } from "@/lib/growth/snippet-optimization/experiment-registry";
import type {
  SnippetExperimentRecommendation,
  SnippetOptimizationReport,
} from "@/lib/growth/snippet-optimization/types";
import { buildSnippetOptimizationReport } from "@/lib/growth/snippet-optimization/run-snippet-report";

function formatOpportunitySection(
  label: string,
  opportunities: SnippetOptimizationReport["verifiedOpportunities"],
): string[] {
  const lines = [`${label} (${opportunities.length})`, ""];

  if (opportunities.length === 0) {
    lines.push("None.");
    lines.push("");
    return lines;
  }

  for (const opportunity of opportunities) {
    lines.push(`- /${opportunity.slug || "(home)"} [${opportunity.evidenceLevel.toUpperCase()}]`);
    if (opportunity.targetQuery) {
      lines.push(`  target query: ${opportunity.targetQuery}`);
    }
    if (opportunity.impressions != null && opportunity.clicks != null) {
      lines.push(
        `  evidence: ${formatSearchConsoleEvidence({
          targetQuery: opportunity.targetQuery ?? "",
          targetSlug: opportunity.slug,
          impressions: opportunity.impressions,
          clicks: opportunity.clicks,
          ctr: opportunity.ctr,
          averagePosition: opportunity.averagePosition ?? null,
          source: "manual-search-console",
          evidenceStatus: "verified",
          competingUrls: opportunity.competingUrls,
        })}`,
      );
    } else {
      lines.push(`  evidence: ${opportunity.source}`);
    }
    lines.push(`  current title: ${opportunity.page.currentTitle}`);
    lines.push(`  current description: ${opportunity.page.currentDescription}`);
    lines.push(`  current H1: ${opportunity.page.currentH1}`);
    lines.push("");
  }

  return lines;
}

function formatRecommendation(rec: SnippetExperimentRecommendation): string[] {
  const lines = [
    `Target: /${rec.opportunity.slug || "(home)"}`,
    `Evidence level: ${rec.opportunity.evidenceLevel.toUpperCase()}`,
    `Status: ${rec.status.replace(/_/g, " ")}`,
  ];

  if (rec.opportunity.targetQuery) {
    lines.push(`Target query: ${rec.opportunity.targetQuery}`);
  }

  lines.push(
    `Current title: ${rec.opportunity.page.currentTitle}`,
    `Current description: ${rec.opportunity.page.currentDescription}`,
  );

  if (rec.status === "blocked_active_experiment") {
    lines.push("", rec.recommendationRationale ?? "");
    if (rec.measurementWindow) {
      lines.push(`Measurement window: ${rec.measurementWindow}`);
    }
    lines.push("");
    return lines;
  }

  if (rec.status === "blocked_no_evidence") {
    lines.push("", rec.recommendationRationale ?? "");
    lines.push("");
    return lines;
  }

  for (const candidate of rec.candidates) {
    lines.push("");
    lines.push(candidate.variantLabel);
    lines.push(`  title (${candidate.titleLength}): ${candidate.title}`);
    lines.push(
      `  description (${candidate.descriptionLength}): ${candidate.metaDescription}`,
    );
    lines.push(`  rationale: ${candidate.rationale}`);
    lines.push(`  claims: ${candidate.claimsUsed.join(", ") || "—"}`);
    lines.push(`  possible risk: ${candidate.possibleRisk}`);
    lines.push(
      `  qualitative fit: ${candidate.qualitativeFit} — ${candidate.fitReason}`,
    );
    lines.push(
      `  internal quality: ${candidate.evaluation.internalQualityScore}/100 (${candidate.evaluation.scoreLabel})`,
    );
    if (candidate.evaluation.warnings.length > 0) {
      lines.push(`  warnings: ${candidate.evaluation.warnings.join(" | ")}`);
    }
  }

  if (rec.recommendedCandidate) {
    lines.push("");
    lines.push(
      `Recommended candidate: ${rec.recommendedCandidate.variantLabel} (${rec.recommendedCandidate.evaluation.internalQualityScore}/100 internal quality — not predicted CTR)`,
    );
    lines.push(`Rationale: ${rec.recommendationRationale ?? "—"}`);
  }

  if (rec.recommendationRisks && rec.recommendationRisks.length > 0) {
    lines.push(`Risks: ${rec.recommendationRisks.join(" | ")}`);
  }

  if (rec.cannibalizationWarnings.length > 0) {
    lines.push("", "Cannibalization warnings:");
    for (const warning of rec.cannibalizationWarnings) {
      lines.push(
        `- ${warning.severity.toUpperCase()} ${warning.code}${warning.relatedSlug ? ` [/${warning.relatedSlug}]` : ""}: ${warning.message}`,
      );
    }
  }

  if (rec.measurementWindow) {
    lines.push(`Measurement window: ${rec.measurementWindow}`);
  }

  lines.push("");
  return lines;
}

/** Formats the snippet optimization report for CLI output. */
export function formatSnippetOptimizationReport(
  report?: SnippetOptimizationReport,
): string {
  const data = report ?? buildSnippetOptimizationReport();

  const lines: string[] = [
    "FriendRank Snippet Optimization Engine",
    "Recommendations for human review only — does not change production metadata.",
    "",
    "====================================",
    "1. Executive summary",
    "====================================",
    `Verified Search Console opportunities: ${data.executiveSummary.verifiedCount}`,
    `Partial evidence opportunities: ${data.executiveSummary.partialCount}`,
    `Heuristic-only candidates: ${data.executiveSummary.heuristicCount}`,
    `Active / pending experiments: ${data.executiveSummary.activeExperiments}`,
    `Blocked pages: ${data.executiveSummary.blockedPages}`,
  ];

  if (data.executiveSummary.recommendedNextExperiment) {
    lines.push(
      `Recommended next experiment (verified, not blocked): ${data.executiveSummary.recommendedNextExperiment}`,
    );
  } else {
    lines.push("Recommended next experiment: none — wait for active experiment measurement or add SC evidence");
  }

  if (data.executiveSummary.topVerifiedOpportunity) {
    const top = data.executiveSummary.topVerifiedOpportunity;
    lines.push("");
    lines.push("Best verified snippet opportunity:");
    lines.push(`  URL: ${top.slug}`);
    lines.push(`  Query: ${top.query}`);
    lines.push(`  Evidence: ${top.evidence}`);
    lines.push(`  Status: ${top.status}`);
  }

  lines.push(
    "",
    "====================================",
    "2. VERIFIED OPPORTUNITY",
    "====================================",
  );
  lines.push(...formatOpportunitySection("Verified", data.verifiedOpportunities));

  lines.push(
    "====================================",
    "3. PARTIAL EVIDENCE",
    "====================================",
  );
  lines.push(...formatOpportunitySection("Partial", data.partialOpportunities));

  lines.push(
    "====================================",
    "4. HEURISTIC ONLY",
    "====================================",
  );
  lines.push(...formatOpportunitySection("Heuristic", data.heuristicOpportunities));

  lines.push(
    "====================================",
    "5. Experiment recommendations",
    "====================================",
  );

  if (data.experimentRecommendations.length === 0) {
    lines.push("None.");
  } else {
    for (const recommendation of data.experimentRecommendations) {
      lines.push(...formatRecommendation(recommendation));
    }
  }

  lines.push(
    "====================================",
    "6. Active experiments",
    "====================================",
  );

  if (data.activeExperiments.length === 0) {
    lines.push("None.");
  } else {
    for (const experiment of data.activeExperiments) {
      lines.push(`- ${experiment.name} (/${experiment.targetSlug})`);
      lines.push(`  status: ${experiment.status.replace(/_/g, " ")}`);
      lines.push(`  query: ${experiment.targetQuery}`);
      lines.push(`  measurement window: ${formatMeasurementWindow(experiment)}`);
      if (experiment.notes) {
        lines.push(`  notes: ${experiment.notes}`);
      }
      lines.push("");
    }
  }

  lines.push(
    "====================================",
    "7. Pages that should not be changed yet",
    "====================================",
  );

  const blocked = [
    ...data.activeExperiments.map((experiment) => ({
      slug: experiment.targetSlug,
      reason: `Active experiment: ${experiment.status.replace(/_/g, " ")}`,
    })),
    ...data.pagesNotReady,
  ];

  if (blocked.length === 0) {
    lines.push("None beyond standard review discipline.");
  } else {
    for (const entry of blocked) {
      lines.push(`- /${entry.slug}: ${entry.reason}`);
    }
  }

  lines.push(
    "",
    "Rule: No production metadata change should be made solely because a page appears in an automated CTR-candidate list.",
  );

  return lines.join("\n").trimEnd();
}
