import type { NarrativeContext } from "@/lib/narrative/types";
import { pickLegacyGroupVerdict } from "@/lib/results/presentation";

function countWinsByFriend(context: NarrativeContext): Map<string, number> {
  const wins = new Map<string, number>();

  for (const { winner } of context.categories) {
    wins.set(winner, (wins.get(winner) ?? 0) + 1);
  }

  return wins;
}

function getDominantFriend(
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

function getWinnerByCategoryLabel(
  context: NarrativeContext,
  label: string,
): string | undefined {
  return context.categories.find(({ category }) => category.label === label)
    ?.winner;
}

function countTiedCategories(context: NarrativeContext): number {
  return context.categories.filter(({ isTie }) => isTie).length;
}

function allWinnersAreUnique(context: NarrativeContext): boolean {
  const winners = context.categories.map(({ winner }) => winner);
  return winners.length > 0 && new Set(winners).size === winners.length;
}

function isSecretVillainUnanimous(context: NarrativeContext): boolean {
  const secretVillain = context.categories.find(
    ({ category }) => category.label === "Secret Villain",
  );

  if (!secretVillain || secretVillain.totalSessions === 0) {
    return false;
  }

  return secretVillain.votePercent === 100;
}

/**
 * Rule-based group verdict from vote patterns. Falls back to legacy seeded templates.
 */
export function generateGroupVerdict(context: NarrativeContext): string {
  const mainCharacter = getWinnerByCategoryLabel(context, "Main Character");
  const chaosAgent = getWinnerByCategoryLabel(context, "Chaos Agent");

  if (
    mainCharacter &&
    chaosAgent &&
    mainCharacter === chaosAgent
  ) {
    return `${mainCharacter} somehow became both the hero and the problem.`;
  }

  if (isSecretVillainUnanimous(context)) {
    return "The verdict was unanimous. Apparently everyone already knew.";
  }

  const wins = countWinsByFriend(context);
  const dominant = getDominantFriend(wins);

  if (dominant && dominant.count >= 3) {
    const titleWord = dominant.count === 1 ? "title" : "titles";
    return `${dominant.name} walked away with ${dominant.count} ${titleWord}. The group clearly has a favorite... for better or worse.`;
  }

  if (allWinnersAreUnique(context) && context.categories.length >= 2) {
    return "Every category crowned someone different. Democracy survived.";
  }

  if (countTiedCategories(context) >= 2) {
    return "Nobody could agree on everything. Debate appears to be your group's favorite hobby.";
  }

  return pickLegacyGroupVerdict(context.seed);
}
