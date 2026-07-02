import {
  buildAiCitationAuditReport,
  formatAiCitationAuditReport,
} from "../lib/seo/validation/ai-citation-validation";

const report = buildAiCitationAuditReport();

console.log(formatAiCitationAuditReport(report));

if (!report.valid) {
  process.exitCode = 1;
}
