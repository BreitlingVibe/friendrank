import {
  formatIndexAuditReport,
  runIndexAudit,
} from "../lib/audit/run-index-audit";

const report = runIndexAudit();

console.log(formatIndexAuditReport(report));

if (!report.valid) {
  process.exitCode = 1;
}
