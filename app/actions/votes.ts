"use server";

import { logVoteRepositoryError } from "@/lib/votes/errors";
import { getAggregatedResultsForShareCode } from "@/lib/votes/results";
import { getVoteProgress, submitVoteSession } from "@/lib/votes/repository";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";
import type { VoteProgress } from "@/lib/votes/types";

export type SubmitVoteResult =
  | { ok: true; progress: VoteProgress }
  | { ok: false; error: string };

export type VoteProgressResult =
  | { ok: true; progress: VoteProgress }
  | { ok: false; error: string };

export type GameResultsResult =
  | { ok: true; results: AggregatedCategoryResult[] }
  | { ok: false; error: string };

export async function getGameResultsAction(
  shareCode: string,
): Promise<GameResultsResult> {
  try {
    const results = await getAggregatedResultsForShareCode(shareCode);
    if (!results) {
      return {
        ok: false,
        error: "Results are locked until enough friends vote.",
      };
    }

    return { ok: true, results };
  } catch (error) {
    logVoteRepositoryError("getGameResultsAction", error, null, { shareCode });

    const message =
      error instanceof Error ? error.message : "Failed to load results.";

    return { ok: false, error: message };
  }
}

export async function submitVoteAction(input: {
  gameId: string;
  shareCode: string;
  voterToken: string;
  choices: string[];
  allowedFriends: string[];
  expectedChoiceCount: number;
}): Promise<SubmitVoteResult> {
  try {
    await submitVoteSession(input);
    const progress = await getVoteProgress(input.shareCode, input.voterToken);
    return { ok: true, progress };
  } catch (error) {
    logVoteRepositoryError("submitVoteAction", error, null, {
      shareCode: input.shareCode,
      gameId: input.gameId,
      choiceCount: input.choices.length,
    });

    const message =
      error instanceof Error ? error.message : "Failed to submit vote.";

    return { ok: false, error: message };
  }
}

export async function getVoteProgressAction(input: {
  shareCode: string;
  voterToken?: string;
}): Promise<VoteProgressResult> {
  try {
    const progress = await getVoteProgress(input.shareCode, input.voterToken);
    return { ok: true, progress };
  } catch (error) {
    logVoteRepositoryError("getVoteProgressAction", error, null, {
      shareCode: input.shareCode,
    });

    const message =
      error instanceof Error ? error.message : "Failed to load vote progress.";

    return { ok: false, error: message };
  }
}
