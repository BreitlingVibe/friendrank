"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getGameResultsAction,
  getVoteProgressAction,
  submitVoteAction,
} from "@/app/actions/votes";
import { FriendRankResultsView } from "@/components/friend-rank-results";
import { FriendRankResultsWithReveal } from "@/components/friend-rank-results-with-reveal";
import { VoteGame } from "@/components/vote-game";
import { VoteProgressCard } from "@/components/vote-progress-card";
import { buildNarrativeContext } from "@/lib/narrative/context";
import {
  trackResultsUnlocked,
  trackVoteSubmitted,
} from "@/lib/analytics";
import type { GeneratedGame } from "@/lib/game-build";
import { getOrCreateVoterToken } from "@/lib/voter-token";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";
import type { VoteProgress } from "@/lib/votes/types";

type GameVotingSectionProps = {
  game: GeneratedGame;
  gameId: string;
  shareCode: string;
  initialProgress: VoteProgress;
  initialAggregatedResults: AggregatedCategoryResult[] | null;
  onProgressChange?: (progress: VoteProgress) => void;
};

export function GameVotingSection({
  game,
  gameId,
  shareCode,
  initialProgress,
  initialAggregatedResults,
  onProgressChange,
}: GameVotingSectionProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [aggregatedResults, setAggregatedResults] = useState(
    initialAggregatedResults,
  );
  const [voterToken, setVoterToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [progressError, setProgressError] = useState<string | null>(null);
  const [resultsError, setResultsError] = useState<string | null>(null);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const resultsUnlockedTrackedRef = useRef(false);

  useEffect(() => {
    setVoterToken(getOrCreateVoterToken(shareCode));
  }, [shareCode]);

  useEffect(() => {
    onProgressChange?.(progress);
  }, [onProgressChange, progress]);

  const loadResults = useCallback(async () => {
    setIsLoadingResults(true);
    setResultsError(null);

    const result = await getGameResultsAction(shareCode);

    setIsLoadingResults(false);

    if (result.ok) {
      setAggregatedResults(result.results);
      return;
    }

    if (result.error !== "Results are locked until enough friends vote.") {
      setResultsError(result.error);
    }
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

  useEffect(() => {
    if (!progress.isUnlocked) {
      setAggregatedResults(null);
      return;
    }

    if (aggregatedResults) return;

    void loadResults();
  }, [progress.isUnlocked, aggregatedResults, loadResults]);

  useEffect(() => {
    if (resultsUnlockedTrackedRef.current || !progress.isUnlocked) {
      return;
    }

    if (!aggregatedResults) {
      return;
    }

    resultsUnlockedTrackedRef.current = true;
    trackResultsUnlocked({
      friend_count: game.friends.length,
      vote_count: progress.voteCount,
    });
  }, [
    aggregatedResults,
    game.friends.length,
    progress.isUnlocked,
    progress.voteCount,
  ]);

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

    trackVoteSubmitted({
      question_index: game.questions.length - 1,
      question_count: game.questions.length,
    });

    if (result.progress.isUnlocked) {
      await loadResults();
    }
  }

  const hasVoted = progress.hasVoted;

  const narrativeContext = useMemo(() => {
    if (!aggregatedResults) {
      return null;
    }

    return buildNarrativeContext(game, aggregatedResults);
  }, [aggregatedResults, game]);

  return (
    <div className="mt-6 space-y-6">
      {!progress.isUnlocked && (
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
      )}

      <VoteProgressCard
        voteCount={progress.voteCount}
        votesRequired={progress.votesRequired}
        isUnlocked={progress.isUnlocked}
      />

      {progressError && (
        <p className="text-center text-sm text-red-400">{progressError}</p>
      )}

      {progress.isUnlocked && (
        <>
          {isLoadingResults && !aggregatedResults && (
            <p className="text-center text-sm text-slate-400">
              Loading FriendRank results...
            </p>
          )}

          {resultsError && (
            <p className="text-center text-sm text-red-400">{resultsError}</p>
          )}

          {aggregatedResults && narrativeContext && (
            <FriendRankResultsWithReveal narrativeContext={narrativeContext}>
              <FriendRankResultsView
                game={game}
                aggregatedResults={aggregatedResults}
                showPlayAgain={false}
              />
            </FriendRankResultsWithReveal>
          )}
        </>
      )}
    </div>
  );
}
