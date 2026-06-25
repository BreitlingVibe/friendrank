import {
  countTiedCategories,
  getVibeReputationBucket,
  hasCategoryWinner,
  hasCustomCategories,
  isChaosDominant,
  isMainCharacterOrbit,
  isMessyDemocracy,
  isOnlineStrong,
} from "@/lib/narrative/helpers/group-stats";
import {
  GROUP_REPUTATION_PROFILES,
  type ReputationBucket,
} from "@/lib/narrative/templates/group-reputation-profiles";
import type { NarrativeContext } from "@/lib/narrative/types";
import { pickIndex } from "@/lib/narrative/utils/seed";
import { pickLegacyGroupReputation } from "@/lib/results/presentation";

function pickReputationFromBucket(
  bucket: ReputationBucket,
  seed: number,
  offset: number,
): string {
  const options = GROUP_REPUTATION_PROFILES[bucket];
  return options[pickIndex(seed, offset, options.length)];
}

function pickReputationBucket(context: NarrativeContext): ReputationBucket {
  const { game } = context;
  const tieCount = countTiedCategories(context);
  const vibeBucket = getVibeReputationBucket(game.vibeTags);

  if (isMainCharacterOrbit(context)) {
    return "mainCharacterOrbit";
  }

  if (vibeBucket) {
    return vibeBucket;
  }

  if (isOnlineStrong(context)) {
    return "online";
  }

  if (isChaosDominant(context)) {
    return "chaos";
  }

  if (isMessyDemocracy(context)) {
    return "democracy";
  }

  if (tieCount >= 2 || game.vibeTags.includes("Soft drama")) {
    return "drama";
  }

  if (hasCategoryWinner(context, "Group Therapist")) {
    return "therapists";
  }

  if (hasCustomCategories(context)) {
    return "custom";
  }

  if (game.tone === "Wholesome") {
    return "democracy";
  }

  if (game.tone === "Chaotic") {
    return "chaos";
  }

  return "fallback";
}

export function generateGroupReputation(context: NarrativeContext): string {
  const bucket = pickReputationBucket(context);

  if (bucket === "fallback") {
    return pickLegacyGroupReputation(context.seed);
  }

  return pickReputationFromBucket(bucket, context.seed, 2);
}
