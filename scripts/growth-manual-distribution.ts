import {
  buildManualDistributionWorkflow,
  formatManualDistributionWorkflow,
  validateManualDistributionWorkflow,
} from "../lib/growth/manual-distribution-workflow";

const validation = validateManualDistributionWorkflow();
const workflow = buildManualDistributionWorkflow();

console.log(formatManualDistributionWorkflow(workflow));

if (!validation.valid) {
  process.exitCode = 1;
}
