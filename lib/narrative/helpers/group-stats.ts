import type { NarrativeContext } from "@/lib/narrative/types";
import type { VibeTag } from "@/lib/game-build";

const ONLINE_CATEGORY_LABELS = new Set([
  "Chronically Online",
  "Future Influencer",
  "Most Likely To Go Viral",
]);

const CHAOS_CATEGORY_LABELS = new Set([
  "Chaos Agent",
  "Most Delusional",
  "Walking Red Flag",
  "Plot Twist Generator",
]);

const ONLINE_VIBE_TAGS = new Set<VibeTag>([
  "Meme-heavy",
  "Discord",
  "Gaming",
]);

export function countWinsByFriend(context: NarrativeContext): Map<string, number> {
  const wins = new Map<string, number>();

  for (const friend of context.game.friends) {
    wins.set(friend, 0);
  }

  for (const { winner } of context.categories) {
    wins.set(winner, (wins.get(winner) ?? 0) + 1);
  }

  return wins;
}

export function getDominantFriend(
  wins: Map<string, number>,
): { name: string; count: number } | null {
  let topName = "";
  let topCount = 0;

  for (const [name, count] of wins) {
    if (count > topCount) {
      topName = name;
      topCount = count;
    }
  }

  if (topCount === 0) {
    return null;
  }

  return { name: topName, count: topCount };
}

export function countUniqueWinners(context: NarrativeContext): number {
  return new Set(context.categories.map(({ winner }) => winner)).size;
}

export function countTiedCategories(context: NarrativeContext): number {
  return context.categories.filter(({ isTie }) => isTie).length;
}

export function countCategoriesWithLabels(
  context: NarrativeContext,
  labels: Set<string>,
): number {
  return context.categories.filter(({ category }) => labels.has(category.label))
    .length;
}

export function hasCategoryWinner(
  context: NarrativeContext,
  label: string,
): boolean {
  return context.categories.some(({ category }) => category.label === label);
}

export function isOnlineStrong(context: NarrativeContext): boolean {
  const onlineCategoryCount = countCategoriesWithLabels(
    context,
    ONLINE_CATEGORY_LABELS,
  );
  const hasOnlineVibe = context.game.vibeTags.some((tag) =>
    ONLINE_VIBE_TAGS.has(tag),
  );
  const hasChronicallyOnlineWinner = hasCategoryWinner(
    context,
    "Chronically Online",
  );

  return (
    onlineCategoryCount >= 2 ||
    (hasChronicallyOnlineWinner && hasOnlineVibe) ||
    (hasOnlineVibe && onlineCategoryCount >= 1)
  );
}

export function isChaosDominant(context: NarrativeContext): boolean {
  const chaosCategoryCount = countCategoriesWithLabels(
    context,
    CHAOS_CATEGORY_LABELS,
  );
  const chaosAgentWinner = context.categories.find(
    ({ category }) => category.label === "Chaos Agent",
  )?.winner;
  const delusionalWinner = context.categories.find(
    ({ category }) => category.label === "Most Delusional",
  )?.winner;

  return (
    chaosCategoryCount >= 2 ||
    Boolean(
      chaosAgentWinner &&
        delusionalWinner &&
        chaosAgentWinner === delusionalWinner,
    ) ||
    (hasCategoryWinner(context, "Chaos Agent") &&
      hasCategoryWinner(context, "Most Delusional"))
  );
}

export function isMessyDemocracy(context: NarrativeContext): boolean {
  const wins = countWinsByFriend(context);
  const dominant = getDominantFriend(wins);
  const uniqueWinners = countUniqueWinners(context);
  const categoryCount = context.categories.length;

  if (categoryCount < 2) {
    return false;
  }

  return (
    uniqueWinners >= Math.min(3, categoryCount) &&
    (dominant?.count ?? 0) <= 2 &&
    uniqueWinners >= Math.ceil(categoryCount * 0.6)
  );
}

export function isMainCharacterOrbit(context: NarrativeContext): boolean {
  const wins = countWinsByFriend(context);
  const dominant = getDominantFriend(wins);

  if (!dominant) {
    return false;
  }

  const ranked = [...wins.values()].sort((a, b) => b - a);
  const secondCount = ranked[1] ?? 0;

  return (
    dominant.count >= 3 ||
    (dominant.count >= 2 &&
      context.categories.length >= 4 &&
      dominant.count > secondCount)
  );
}

export function hasCustomCategories(context: NarrativeContext): boolean {
  return context.categories.some(({ category }) => category.isCustom);
}

export function getVibeReputationBucket(
  vibeTags: VibeTag[],
): "family" | "office" | "school" | "gaming" | null {
  if (vibeTags.includes("Family")) {
    return "family";
  }

  if (vibeTags.includes("Office")) {
    return "office";
  }

  if (vibeTags.includes("School") || vibeTags.includes("College")) {
    return "school";
  }

  if (vibeTags.includes("Gaming") || vibeTags.includes("Discord")) {
    return "gaming";
  }

  return null;
}
