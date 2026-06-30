import {
  formatEntityAuditReport,
  runEntityAudit,
} from "../lib/entities/validation/run-entity-audit";

const report = runEntityAudit();

console.log(formatEntityAuditReport(report));

if (!report.valid) {
  process.exitCode = 1;
}
