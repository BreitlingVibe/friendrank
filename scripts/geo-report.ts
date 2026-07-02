import {
  buildGeoAuditReport,
  formatGeoAuditReport,
} from "../lib/seo/validation/geo-validation";

const report = buildGeoAuditReport();

console.log(formatGeoAuditReport(report));

if (!report.valid) {
  process.exitCode = 1;
}
