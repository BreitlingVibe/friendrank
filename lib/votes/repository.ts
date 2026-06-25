import { getGameByShareCode } from "@/lib/games/repository";
import {
  VoteError,
  createVoteFailureError,
} from "@/lib/votes/errors";
import {
  getVotesRequired,
  isResultsUnlocked,
} from "@/lib/votes/constants";
import type {
  SubmitVoteInput,
  VoteProgress,
  VoteSessionRecord,
} from "@/lib/votes/types";
import { getSupabase } from "@/lib/supabase";

function validateSubmitInput(input: SubmitVoteInput): void {
  if (!input.voterToken.trim()) {
    throw new VoteError("Missing voter session token.");
  }

  if (input.choices.length !== input.expectedChoiceCount) {
    throw new VoteError("Complete every category before submitting your vote.");
  }

  const allowed = new Set(input.allowedFriends);
  for (const choice of input.choices) {
    if (!allowed.has(choice)) {
      throw new VoteError("Each vote must pick a friend from this game.");
    }
  }
}

export async function submitVoteSession(
  input: SubmitVoteInput,
): Promise<VoteSessionRecord> {
  validateSubmitInput(input);

  const game = await getGameByShareCode(input.shareCode);
  if (!game) {
    throw new VoteError("Game not found.");
  }

  if (game.id !== input.gameId) {
    throw new VoteError("Game mismatch. Refresh the page and try again.");
  }

  let supabase;

  try {
    supabase = getSupabase();
  } catch (error) {
    throw createVoteFailureError("submitVoteSession:init", error, null, {
      shareCode: input.shareCode,
    });
  }

  try {
    const { data, error } = await supabase
      .from("vote_sessions")
      .insert({
        game_id: input.gameId,
        voter_token: input.voterToken.trim(),
        choices: input.choices,
      })
      .select("*")
      .single();

    if (error || !data) {
      throw createVoteFailureError("submitVoteSession:insert", null, error, {
        shareCode: input.shareCode,
        gameId: input.gameId,
        choiceCount: input.choices.length,
      });
    }

    return data as VoteSessionRecord;
  } catch (error) {
    if (error instanceof VoteError) {
      throw error;
    }

    throw createVoteFailureError("submitVoteSession:insert", error, null, {
      shareCode: input.shareCode,
      gameId: input.gameId,
      choiceCount: input.choices.length,
    });
  }
}

export async function getVoteSessionsByGameId(
  gameId: string,
): Promise<VoteSessionRecord[]> {
  let supabase;

  try {
    supabase = getSupabase();
  } catch (error) {
    throw createVoteFailureError("getVoteSessionsByGameId:init", error, null, {
      gameId,
    });
  }

  try {
    const { data, error } = await supabase
      .from("vote_sessions")
      .select("*")
      .eq("game_id", gameId)
      .order("created_at", { ascending: true });

    if (error) {
      throw createVoteFailureError("getVoteSessionsByGameId:select", null, error, {
        gameId,
      });
    }

    return (data as VoteSessionRecord[]) ?? [];
  } catch (error) {
    if (error instanceof VoteError) {
      throw error;
    }

    throw createVoteFailureError("getVoteSessionsByGameId:select", error, null, {
      gameId,
    });
  }
}

export async function getVoteProgress(
  shareCode: string,
  voterToken?: string,
): Promise<VoteProgress> {
  const game = await getGameByShareCode(shareCode);
  if (!game) {
    throw new VoteError("Game not found.");
  }

  let supabase;

  try {
    supabase = getSupabase();
  } catch (error) {
    throw createVoteFailureError("getVoteProgress:init", error, null, {
      shareCode,
    });
  }

  try {
    const { count, error: countError } = await supabase
      .from("vote_sessions")
      .select("*", { count: "exact", head: true })
      .eq("game_id", game.id);

    if (countError) {
      throw createVoteFailureError("getVoteProgress:count", null, countError, {
        shareCode,
        gameId: game.id,
      });
    }

    let hasVoted = false;

    if (voterToken?.trim()) {
      const { data, error: votedError } = await supabase
        .from("vote_sessions")
        .select("id")
        .eq("game_id", game.id)
        .eq("voter_token", voterToken.trim())
        .maybeSingle();

      if (votedError) {
        throw createVoteFailureError("getVoteProgress:hasVoted", null, votedError, {
          shareCode,
          gameId: game.id,
        });
      }

      hasVoted = Boolean(data);
    }

    const voteCount = count ?? 0;
    const votesRequired = getVotesRequired(game.friends.length);

    return {
      voteCount,
      votesRequired,
      isUnlocked: isResultsUnlocked(
        voteCount,
        game.friends.length,
        game.created_at,
      ),
      hasVoted,
    };
  } catch (error) {
    if (error instanceof VoteError) {
      throw error;
    }

    throw createVoteFailureError("getVoteProgress", error, null, { shareCode });
  }
}
