import {
  AGREEMENT_THREAT_PROFILE,
  CHAOS_CALM_PROFILE,
  CHRONICALLY_ONLINE_DELUSIONAL_PROFILE,
  DRAMA_MAGNETS_PROFILE,
  FALLBACK_COMBO_PROFILES,
  MAIN_CHARACTER_CHAOS_PROFILE,
  SECRET_VILLAIN_CHAOS_PROFILE,
  TITLE_COLLECTORS_PROFILE,
  type DangerousComboProfile,
} from "@/lib/narrative/templates/dangerous-combo-profiles";
import type { NarrativeContext } from "@/lib/narrative/types";
import { pickIndex } from "@/lib/narrative/utils/seed";

export type DangerousComboCard = {
  name1: string;
  name2: string;
  riskLevel: "Moderate" | "High" | "Extreme";
  outcomes: string[];
};

const CHAOS_CATEGORY_LABELS = new Set([
  "Chaos Agent",
  "Most Delusional",
  "Walking Red Flag",
  "Plot Twist Generator",
]);

const CALM_CATEGORY_LABELS = new Set([
  "Group Therapist",
  "Green Flag Award",
  "Main Character",
]);

const DRAMA_CATEGORY_LABELS = new Set([
  "Chaos Agent",
  "Secret Villain",
  "Walking Red Flag",
  "Most Likely To Get Cancelled",
  "Plot Twist Generator",
]);

type ComboSelection = {
  name1: string;
  name2: string;
  combinedWins: number;
  reason: "dominant_partner" | "max_combined" | "fallback";
};

function countWinsByFriend(context: NarrativeContext): Map<string, number> {
  const wins = new Map<string, number>();

  for (const friend of context.game.friends) {
    wins.set(friend, 0);
  }

  for (const { winner } of context.categories) {
    wins.set(winner, (wins.get(winner) ?? 0) + 1);
  }

  return wins;
}

function pickPartnerForDominant(
  friends: string[],
  dominantName: string,
  wins: Map<string, number>,
  seed: number,
): string {
  const candidates = friends.filter((friend) => friend !== dominantName);

  if (candidates.length === 0) {
    return "the group chat";
  }

  let bestCount = -1;
  let tied: string[] = [];

  for (const candidate of candidates) {
    const count = wins.get(candidate) ?? 0;
    if (count > bestCount) {
      bestCount = count;
      tied = [candidate];
    } else if (count === bestCount) {
      tied.push(candidate);
    }
  }

  tied.sort((a, b) => a.localeCompare(b));
  return tied[pickIndex(seed, 19, tied.length)] ?? candidates[0];
}

function selectComboPair(context: NarrativeContext): ComboSelection {
  const { game, categories, seed } = context;
  const friends = game.friends;
  const wins = countWinsByFriend(context);
  const totalCategories = categories.length;

  if (friends.length === 0) {
    return {
      name1: "Friend A",
      name2: "Friend B",
      combinedWins: 0,
      reason: "fallback",
    };
  }

  if (friends.length === 1) {
    return {
      name1: friends[0],
      name2: "the group chat",
      combinedWins: wins.get(friends[0]) ?? 0,
      reason: "fallback",
    };
  }

  const ranked = [...wins.entries()]
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const topName = ranked[0]?.[0];
  const topCount = ranked[0]?.[1] ?? 0;
  const secondName = ranked[1]?.[0];
  const secondCount = ranked[1]?.[1] ?? 0;

  const nearlyDominates =
    topName !== undefined &&
    (topCount >= Math.max(2, totalCategories - 1) ||
      (totalCategories >= 3 &&
        topCount >= Math.ceil(totalCategories * 0.7)));

  if (nearlyDominates) {
    const partner =
      secondCount > 0 && secondName
        ? secondName
        : pickPartnerForDominant(friends, topName, wins, seed);

    return {
      name1: topName,
      name2: partner,
      combinedWins: topCount + (wins.get(partner) ?? 0),
      reason: "dominant_partner",
    };
  }

  let bestCombined = -1;
  const tiedPairs: [string, string][] = [];

  for (let i = 0; i < friends.length; i += 1) {
    for (let j = i + 1; j < friends.length; j += 1) {
      const name1 = friends[i];
      const name2 = friends[j];
      const combined = (wins.get(name1) ?? 0) + (wins.get(name2) ?? 0);

      if (combined > bestCombined) {
        bestCombined = combined;
        tiedPairs.length = 0;
        tiedPairs.push([name1, name2]);
      } else if (combined === bestCombined) {
        tiedPairs.push([name1, name2]);
      }
    }
  }

  if (tiedPairs.length === 0) {
    return {
      name1: friends[0],
      name2: friends[1],
      combinedWins: 0,
      reason: "fallback",
    };
  }

  tiedPairs.sort(([pairA1, pairA2], [pairB1, pairB2]) => {
    const keyA = `${pairA1}|${pairA2}`;
    const keyB = `${pairB1}|${pairB2}`;
    return keyA.localeCompare(keyB);
  });

  const [name1, name2] = tiedPairs[pickIndex(seed, 11, tiedPairs.length)];

  return {
    name1,
    name2,
    combinedWins: bestCombined,
    reason: "max_combined",
  };
}

function categoriesForFriend(context: NarrativeContext, friend: string) {
  return context.categories.filter(({ winner }) => winner === friend);
}

function getCategoryLabels(
  categories: NarrativeContext["categories"],
): Set<string> {
  return new Set(categories.map(({ category }) => category.label));
}

function pairHasCategoryLabels(
  labels1: Set<string>,
  labels2: Set<string>,
  labelA: string,
  labelB: string,
): boolean {
  return (
    (labels1.has(labelA) && labels2.has(labelB)) ||
    (labels1.has(labelB) && labels2.has(labelA))
  );
}

function hasCategoryInSet(
  categories: NarrativeContext["categories"],
  labels: Set<string>,
): boolean {
  return categories.some(({ category }) => labels.has(category.label));
}

function hasChaosCalmSplit(
  name1Categories: NarrativeContext["categories"],
  name2Categories: NarrativeContext["categories"],
): boolean {
  return (
    (hasCategoryInSet(name1Categories, CHAOS_CATEGORY_LABELS) &&
      hasCategoryInSet(name2Categories, CALM_CATEGORY_LABELS)) ||
    (hasCategoryInSet(name2Categories, CHAOS_CATEGORY_LABELS) &&
      hasCategoryInSet(name1Categories, CALM_CATEGORY_LABELS))
  );
}

function withTitleCollectorRisk(
  profile: DangerousComboProfile,
  combinedWins: number,
  totalCategories: number,
): DangerousComboProfile {
  if (totalCategories === 0) {
    return profile;
  }

  const ratio = combinedWins / totalCategories;

  if (ratio < 0.5 && combinedWins < 4) {
    return { ...profile, riskLevel: "High" };
  }

  return profile;
}

function pickComboProfile(
  context: NarrativeContext,
  selection: ComboSelection,
  name1Categories: NarrativeContext["categories"],
  name2Categories: NarrativeContext["categories"],
): DangerousComboProfile {
  const labels1 = getCategoryLabels(name1Categories);
  const labels2 = getCategoryLabels(name2Categories);
  const totalCategories = context.categories.length;
  const sharedTitleThreshold = Math.max(2, Math.ceil(totalCategories * 0.45));

  if (pairHasCategoryLabels(labels1, labels2, "Main Character", "Chaos Agent")) {
    return MAIN_CHARACTER_CHAOS_PROFILE;
  }

  if (pairHasCategoryLabels(labels1, labels2, "Secret Villain", "Chaos Agent")) {
    return SECRET_VILLAIN_CHAOS_PROFILE;
  }

  if (
    pairHasCategoryLabels(labels1, labels2, "Chronically Online", "Most Delusional")
  ) {
    return CHRONICALLY_ONLINE_DELUSIONAL_PROFILE;
  }

  if (hasChaosCalmSplit(name1Categories, name2Categories)) {
    return CHAOS_CALM_PROFILE;
  }

  if (
    selection.reason === "dominant_partner" ||
    selection.combinedWins >= sharedTitleThreshold
  ) {
    return withTitleCollectorRisk(
      TITLE_COLLECTORS_PROFILE,
      selection.combinedWins,
      totalCategories,
    );
  }

  if (name1Categories.length >= 2 && name2Categories.length >= 2) {
    return AGREEMENT_THREAT_PROFILE;
  }

  if (
    hasCategoryInSet(name1Categories, DRAMA_CATEGORY_LABELS) &&
    hasCategoryInSet(name2Categories, DRAMA_CATEGORY_LABELS)
  ) {
    return DRAMA_MAGNETS_PROFILE;
  }

  return FALLBACK_COMBO_PROFILES[
    pickIndex(context.seed, 13, FALLBACK_COMBO_PROFILES.length)
  ];
}

function buildOutcomesFromProfile(profile: DangerousComboProfile): string[] {
  return [profile.headline, ...profile.outcomes];
}

export function generateDangerousCombo(
  context: NarrativeContext,
): DangerousComboCard {
  const selection = selectComboPair(context);
  const name1Categories = categoriesForFriend(context, selection.name1);
  const name2Categories = categoriesForFriend(context, selection.name2);
  const profile = pickComboProfile(
    context,
    selection,
    name1Categories,
    name2Categories,
  );

  return {
    name1: selection.name1,
    name2: selection.name2,
    riskLevel: profile.riskLevel,
    outcomes: buildOutcomesFromProfile(profile),
  };
}
