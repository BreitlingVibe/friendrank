"use client";

import { FriendRankResultsView } from "@/components/friend-rank-results";
import { FriendRankResultsWithReveal } from "@/components/friend-rank-results-with-reveal";
import type { GeneratedGame } from "@/lib/game-build";
import type { NarrativeContext } from "@/lib/narrative/types";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";

type GameResultsPanelProps = {
  game: GeneratedGame;
  aggregatedResults: AggregatedCategoryResult[];
  narrativeContext: NarrativeContext;
};

export function GameResultsPanel({
  game,
  aggregatedResults,
  narrativeContext,
}: GameResultsPanelProps) {
  return (
    <FriendRankResultsWithReveal narrativeContext={narrativeContext}>
      <FriendRankResultsView
        game={game}
        aggregatedResults={aggregatedResults}
        showPlayAgain={false}
      />
    </FriendRankResultsWithReveal>
  );
}
