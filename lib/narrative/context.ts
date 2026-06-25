import type { GeneratedGame } from "@/lib/game-build";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";
import type {
  NarrativeCategoryOutcome,
  NarrativeCategoryResult,
  NarrativeContext,
} from "@/lib/narrative/types";

function hashSeed(values: string[]): number {
  let hash = 0;
  for (const value of values) {
    for (let index = 0; index < value.length; index += 1) {
      hash = (hash * 31 + value.charCodeAt(index)) | 0;
    }
  }
  return Math.abs(hash);
}

function buildPresentationSeed(
  game: GeneratedGame,
  categoryResults: NarrativeCategoryResult[],
): number {
  return hashSeed([
    ...game.friends,
    ...game.vibeTags,
    game.extraContext,
    game.tone,
    ...categoryResults.map(
      (result) => `${result.category.label}:${result.winner}`,
    ),
  ]);
}

export function buildNarrativeContext(
  game: GeneratedGame,
  aggregatedResults: AggregatedCategoryResult[],
): NarrativeContext {
  const friends = game.friends;

  const categories: NarrativeCategoryOutcome[] = game.categories.map(
    (category, index) => {
      const aggregated = aggregatedResults[index];
      const winner =
        aggregated?.winner ?? friends[index % friends.length] ?? "Unknown";

      return {
        category,
        winner,
        voteCount: aggregated?.voteCount ?? 0,
        votePercent: aggregated?.votePercent ?? 0,
        totalSessions: aggregated?.totalSessions ?? 0,
        isTie: aggregated?.isTie ?? false,
        tiedFriends: aggregated?.tiedFriends,
      };
    },
  );

  const categoryResults: NarrativeCategoryResult[] = categories.map(
    ({ category, winner }) => ({ category, winner }),
  );

  const seed = buildPresentationSeed(game, categoryResults);

  return {
    game,
    categories,
    categoryResults,
    seed,
  };
}
