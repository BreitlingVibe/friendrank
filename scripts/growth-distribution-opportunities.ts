import {
  buildDistributionOpportunitiesReport,
  formatDistributionOpportunitiesReport,
  validateDistributionOpportunitiesRegistry,
} from "../lib/growth/distribution-opportunities";

const validation = validateDistributionOpportunitiesRegistry();
const report = buildDistributionOpportunitiesReport();

console.log(formatDistributionOpportunitiesReport(report));

if (!validation.valid) {
  process.exitCode = 1;
}
