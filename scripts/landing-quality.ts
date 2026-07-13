import {
  buildLandingQualityAuditSummary,
  buildLandingQualityReport,
  formatLandingQualityReport,
  persistLandingQualitySummary,
  validateLandingQualityReport,
} from "@/lib/growth/landing-quality";

const report = buildLandingQualityReport();
const validation = validateLandingQualityReport(report);
const summary = buildLandingQualityAuditSummary(report);

persistLandingQualitySummary(summary);

console.log(formatLandingQualityReport(report));

if (!validation.valid) {
  console.error("");
  console.error("Validation issues:");
  for (const issue of validation.issues) {
    console.error(`- ${issue}`);
  }
  process.exitCode = 1;
}
