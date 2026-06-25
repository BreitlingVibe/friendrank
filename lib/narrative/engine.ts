import type { GeneratedGame } from "@/lib/game-build";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";
import { buildNarrativeContext } from "@/lib/narrative/context";
import { generateGroupVerdict } from "@/lib/narrative/generators/group-verdict";
import type { NarrativeBundle } from "@/lib/narrative/types";
import { buildRealResultsPresentationImpl } from "@/lib/results/presentation";

/**
 * Narrative Engine entry point.
 */
export function buildNarrative(
  game: GeneratedGame,
  aggregatedResults: AggregatedCategoryResult[],
): NarrativeBundle {
  const context = buildNarrativeContext(game, aggregatedResults);
  const groupVerdict = generateGroupVerdict(context);

  return buildRealResultsPresentationImpl(game, aggregatedResults, {
    groupVerdict,
  });
}
