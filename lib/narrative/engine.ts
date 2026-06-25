import type { GeneratedGame } from "@/lib/game-build";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";
import { buildNarrativeContext } from "@/lib/narrative/context";
import { generateDangerousCombo } from "@/lib/narrative/generators/dangerous-combo";
import { generateGroupReputation } from "@/lib/narrative/generators/group-reputation";
import { generateGroupVerdict } from "@/lib/narrative/generators/group-verdict";
import { generateEnding } from "@/lib/narrative/generators/ending";
import { generateSectionLabels } from "@/lib/narrative/generators/section-labels";
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
  const groupReputation = generateGroupReputation(context);
  const dangerousCombo = generateDangerousCombo(context);
  const labels = generateSectionLabels(context);
  const ending = generateEnding(context);

  return buildRealResultsPresentationImpl(game, aggregatedResults, {
    groupVerdict,
    groupReputation,
    dangerousCombo,
    labels,
    ending,
  });
}
