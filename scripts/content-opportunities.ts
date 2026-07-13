import {
  buildContentOpportunityReport,
  formatContentOpportunityReport,
  validateContentOpportunityReport,
} from "@/lib/growth/content-opportunities";

const report = buildContentOpportunityReport();
const validation = validateContentOpportunityReport(report);

console.log(formatContentOpportunityReport(report));

if (!validation.valid) {
  console.error("");
  console.error("Validation issues:");
  for (const issue of validation.issues) {
    console.error(`- ${issue}`);
  }
  process.exitCode = 1;
}
