import type { GeneratedGame } from "@/lib/game-build";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";
import { buildNarrativeContext } from "@/lib/narrative/context";
import type { NarrativeBundle } from "@/lib/narrative/types";
import { buildRealResultsPresentationImpl } from "@/lib/results/presentation";

/**
 * Narrative Engine entry point (Phase A: facade over existing presentation logic).
 */
export function buildNarrative(
  game: GeneratedGame,
  aggregatedResults: AggregatedCategoryResult[],
): NarrativeBundle {
  const context = buildNarrativeContext(game, aggregatedResults);

  // Phase A: context is assembled for future generators; output stays identical.
  void context;

  return buildRealResultsPresentationImpl(game, aggregatedResults);
}
