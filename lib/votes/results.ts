import { buildGeneratedGameFromRecord } from "@/lib/game-build";
import {
  aggregateCategoryResults,
  type AggregatedCategoryResult,
} from "@/lib/votes/aggregate";
import { VOTES_REQUIRED } from "@/lib/votes/constants";
import {
  getVoteProgress,
  getVoteSessionsByGameId,
} from "@/lib/votes/repository";
import { getGameByShareCode } from "@/lib/games/repository";
import { VoteError } from "@/lib/votes/errors";

export async function getAggregatedResultsForShareCode(
  shareCode: string,
): Promise<AggregatedCategoryResult[] | null> {
  const game = await getGameByShareCode(shareCode);
  if (!game) {
    throw new VoteError("Game not found.");
  }

  const progress = await getVoteProgress(shareCode);
  if (progress.voteCount < VOTES_REQUIRED) {
    return null;
  }

  const sessions = await getVoteSessionsByGameId(game.id);
  const generatedGame = buildGeneratedGameFromRecord(game);

  return aggregateCategoryResults(
    sessions,
    generatedGame.categories.length,
    generatedGame.friends,
  );
}
