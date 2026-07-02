import {
  buildAuthorityRoadmapReport,
  formatAuthorityRoadmapReport,
  validateAuthorityRoadmap,
} from "../lib/growth/authority-roadmap";

const validation = validateAuthorityRoadmap();
const report = buildAuthorityRoadmapReport();

console.log(formatAuthorityRoadmapReport(report));

if (!validation.valid) {
  console.error("");
  console.error("Validation issues:");
  for (const issue of validation.issues) {
    console.error(`- ${issue}`);
  }
  process.exitCode = 1;
}
