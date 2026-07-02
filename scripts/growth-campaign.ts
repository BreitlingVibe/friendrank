import {
  buildWeeklyCampaignPlan,
  formatWeeklyCampaignPlan,
  validateWeeklyCampaignPlan,
} from "../lib/growth/campaign-planner";

const validation = validateWeeklyCampaignPlan();
const plan = buildWeeklyCampaignPlan();

console.log(formatWeeklyCampaignPlan(plan));

if (!validation.valid) {
  process.exitCode = 1;
}
