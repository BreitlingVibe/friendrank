"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getVoteProgressAction,
  submitVoteAction,
} from "@/app/actions/votes";
import { VoteGame } from "@/components/vote-game";
import { VoteProgressCard } from "@/components/vote-progress-card";
import type { GeneratedGame } from "@/lib/game-build";
import { getOrCreateVoterToken } from "@/lib/voter-token";
import type { VoteProgress } from "@/lib/votes/types";

type GameVotingSectionProps = {
  game: GeneratedGame;
  gameId: string;
  shareCode: string;
  initialProgress: VoteProgress;
};

export function GameVotingSection({
  game,
  gameId,
  shareCode,
  initialProgress,
}: GameVotingSectionProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [voterToken, setVoterToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [progressError, setProgressError] = useState<string | null>(null);

  useEffect(() => {
    setVoterToken(getOrCreateVoterToken(shareCode));
  }, [shareCode]);

  const refreshProgress = useCallback(async () => {
    const token = getOrCreateVoterToken(shareCode);
    const result = await getVoteProgressAction({
      shareCode,
      voterToken: token,
    });

    if (result.ok) {
      setProgress(result.progress);
      setProgressError(null);
      return;
    }

    setProgressError(result.error);
  }, [shareCode]);

  useEffect(() => {
    if (!voterToken) return;

    void refreshProgress();
  }, [voterToken, refreshProgress]);

  async function handleVoteComplete(choices: string[]) {
    if (!voterToken || progress.hasVoted) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitVoteAction({
      gameId,
      shareCode,
      voterToken,
      choices,
      allowedFriends: game.friends,
      expectedChoiceCount: game.questions.length,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    setProgress(result.progress);
  }

  const hasVoted = progress.hasVoted;

  return (
    <div className="mt-8 space-y-6">
      <VoteProgressCard
        voteCount={progress.voteCount}
        votesRequired={progress.votesRequired}
        isUnlocked={progress.isUnlocked}
      />

      {progressError && (
        <p className="text-center text-sm text-red-400">{progressError}</p>
      )}

      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            You&apos;ve been invited to a FriendRank
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
            Vote honestly. FriendRank results unlock when enough friends vote.
          </p>
        </div>

        <div className="mx-auto max-w-sm">
          <VoteGame
            game={game}
            mode="live"
            disabled={hasVoted}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onVoteComplete={handleVoteComplete}
          />
        </div>
      </div>
    </div>
  );
}
