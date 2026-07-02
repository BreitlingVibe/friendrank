import {
  buildGrowthAssistantReport,
  formatGrowthAssistantReport,
  validateGrowthAssistantReport,
} from "../lib/growth/growth-assistant";

const validation = validateGrowthAssistantReport();
const report = buildGrowthAssistantReport();

console.log(formatGrowthAssistantReport(report));

if (!validation.valid) {
  console.error("");
  console.error("Validation issues:");
  for (const issue of validation.issues) {
    console.error(`- ${issue}`);
  }
  process.exitCode = 1;
}
