"use server";

import { logVoteRepositoryError } from "@/lib/votes/errors";
import { getVoteProgress, submitVoteSession } from "@/lib/votes/repository";
import type { VoteProgress } from "@/lib/votes/types";

export type SubmitVoteResult =
  | { ok: true; progress: VoteProgress }
  | { ok: false; error: string };

export type VoteProgressResult =
  | { ok: true; progress: VoteProgress }
  | { ok: false; error: string };

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
