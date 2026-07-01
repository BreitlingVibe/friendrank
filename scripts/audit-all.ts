import {
  formatFullAuditReport,
  runFullAudit,
} from "../lib/audit/run-full-audit";

const report = runFullAudit();

console.log(formatFullAuditReport(report));

if (!report.valid) {
  process.exitCode = 1;
}
