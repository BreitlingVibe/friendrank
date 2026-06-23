"use client";

import { useEffect, useState } from "react";
import type { GeneratedGame } from "@/lib/game-build";

type VoteGameProps = {
  game: GeneratedGame;
  mode?: "preview" | "live";
  disabled?: boolean;
  isSubmitting?: boolean;
  submitError?: string | null;
  onVoteComplete?: (votes: string[]) => void;
  onInviteMoreFriends?: () => void;
  onViewDemoResults?: () => void;
};

export function VoteGame({
  game,
  mode = "preview",
  disabled = false,
  isSubmitting = false,
  submitError = null,
  onVoteComplete,
  onInviteMoreFriends,
  onViewDemoResults,
}: VoteGameProps) {
  const friends = game.friends;
  const [votes, setVotes] = useState<string[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [hasNotifiedComplete, setHasNotifiedComplete] = useState(false);

  const totalQuestions = game.questions.length;
  const isComplete = votes.length >= totalQuestions;
  const currentQuestionNumber = votes.length + 1;
  const progressPercent = isComplete
    ? 100
    : (votes.length / totalQuestions) * 100;
  const isLive = mode === "live";

  useEffect(() => {
    if (isComplete && !hasNotifiedComplete && !disabled) {
      onVoteComplete?.(votes);
      setHasNotifiedComplete(true);
    }
  }, [isComplete, hasNotifiedComplete, votes, onVoteComplete, disabled]);

  function handleSelect(friend: string) {
    if (selectedFriend || isComplete || disabled || isSubmitting) return;

    const isLastQuestion = votes.length >= totalQuestions - 1;

    if (isLastQuestion) {
      setVotes((prev) => [...prev, friend]);
      return;
    }

    setSelectedFriend(friend);

    setTimeout(() => {
      setVotes((prev) => [...prev, friend]);
      setSelectedFriend(null);
    }, 450);
  }

  function handlePlayAgain() {
    setVotes([]);
    setSelectedFriend(null);
    setHasNotifiedComplete(false);
  }

  if (disabled && isLive) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-2xl shadow-violet-500/20">
        <div className="border-b border-white/10 bg-gradient-to-r from-emerald-600/25 to-cyan-600/20 px-5 py-8 text-center">
          <p className="text-4xl">✅</p>
          <h4 className="mt-3 text-2xl font-bold">Your vote is in.</h4>
          <p className="mt-2 text-sm text-slate-400">
            Thanks for ranking the group. Share the link so more friends can vote.
          </p>
        </div>
      </div>
    );
  }

  if (isComplete && (isSubmitting || isLive)) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-2xl shadow-violet-500/20">
        <div className="border-b border-white/10 bg-gradient-to-r from-emerald-600/25 to-cyan-600/20 px-5 py-8 text-center">
          <p className="text-4xl">{isSubmitting ? "⏳" : "✅"}</p>
          <h4 className="mt-3 text-2xl font-bold">
            {isSubmitting ? "Submitting your vote..." : "Your vote is in."}
          </h4>
          <p className="mt-2 text-sm text-slate-400">
            {isSubmitting
              ? "Saving your answers to FriendRank."
              : isLive
                ? "Thanks for ranking the group. Share the link so more friends can vote."
                : "Thanks for ranking the group in this FriendRank preview."}
          </p>
        </div>
        {submitError && (
          <p className="px-5 py-4 text-center text-sm text-red-400">{submitError}</p>
        )}
        {!isLive && (
          <div className="space-y-3 p-5 sm:p-6">
            <button
              type="button"
              onClick={onInviteMoreFriends}
              className="w-full rounded-full border border-white/15 bg-white/10 py-3.5 text-sm font-semibold transition hover:bg-white/15"
            >
              📨 Invite more friends
            </button>
            <button
              type="button"
              onClick={onViewDemoResults}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 py-3.5 text-sm font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500"
            >
              View unlocked FriendRank results
            </button>
            <button
              type="button"
              onClick={handlePlayAgain}
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/10"
            >
              Vote again
            </button>
          </div>
        )}
      </div>
    );
  }

  const currentQuestion = game.questions[votes.length];
  const currentCategory = game.categories[votes.length];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-2xl shadow-violet-500/20">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/80 px-5 py-3">
        <span className="text-xs font-medium text-slate-400">FriendRank</span>
        <span className="text-xs font-semibold text-violet-300">
          {currentQuestionNumber} / {totalQuestions}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {currentCategory && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <span>{currentCategory.emoji}</span>
            {currentCategory.label}
          </div>
        )}

        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-400">
          Vote now
        </p>
        <p className="mb-6 text-base font-medium leading-relaxed text-white sm:text-lg">
          {currentQuestion}
        </p>

        <div className="space-y-2.5">
          {friends.map((friend) => {
            const isSelected = selectedFriend === friend;

            return (
              <button
                key={friend}
                type="button"
                onClick={() => handleSelect(friend)}
                disabled={selectedFriend !== null || disabled || isSubmitting}
                className={`w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition active:scale-[0.98] disabled:cursor-default ${
                  isSelected
                    ? "border-violet-400 bg-violet-500/25 text-white shadow-lg shadow-violet-500/20"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-violet-500/40 hover:bg-violet-500/10 disabled:opacity-50"
                }`}
              >
                <span className="flex items-center justify-between">
                  {friend}
                  {isSelected && (
                    <span className="animate-pulse text-violet-300">✓</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Tap a friend to vote — next question loads automatically
        </p>
      </div>
    </div>
  );
}
