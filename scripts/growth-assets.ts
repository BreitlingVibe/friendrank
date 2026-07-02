import {
  buildGrowthAssetsReport,
  formatGrowthAssetsReport,
  validateGrowthAssetsReport,
} from "../lib/growth/growth-assets";

const validation = validateGrowthAssetsReport();
const report = buildGrowthAssetsReport();

console.log(formatGrowthAssetsReport(report));

if (!validation.valid) {
  process.exitCode = 1;
}
