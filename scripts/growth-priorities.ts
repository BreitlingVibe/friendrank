import {
  formatGrowthPriorityReport,
  auditGrowthPriorities,
} from "../lib/growth/growth-priority";

const report = formatGrowthPriorityReport();
const audit = auditGrowthPriorities();

console.log(report);

if (!audit.valid) {
  process.exitCode = 1;
}
