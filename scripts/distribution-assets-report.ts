import {
  buildDistributionAssetsReport,
  formatDistributionAssetsReport,
} from "../lib/growth/distribution-assets";
import { validateDistributionAssets } from "../lib/seo/validation/distribution-assets-validation";

const result = validateDistributionAssets();
const report = buildDistributionAssetsReport({ valid: result.valid });

console.log(formatDistributionAssetsReport(report));

if (result.issues.length > 0) {
  console.log("");
  for (const entry of result.issues) {
    const context = entry.context ? ` [${entry.context}]` : "";
    console.log(
      `  - ${entry.severity.toUpperCase()} ${entry.code}${context}: ${entry.message}`,
    );
  }
}

if (!result.valid) {
  process.exitCode = 1;
}
