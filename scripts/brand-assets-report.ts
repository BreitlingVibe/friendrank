import {
  buildBrandAssetsAuditReport,
  formatBrandAssetsAuditReport,
} from "../lib/seo/validation/brand-assets-validation";

const report = buildBrandAssetsAuditReport();

console.log(formatBrandAssetsAuditReport(report));

if (!report.valid) {
  process.exitCode = 1;
}
