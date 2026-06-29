"use client";

import Link from "next/link";
import { useState } from "react";
import { GameSampleQuestions } from "@/components/game-sample-questions";
import { GameSummary } from "@/components/game-summary";
import { GameVotingSection } from "@/components/game-voting-section";
import type { GeneratedGame } from "@/lib/game-build";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";
import type { VoteProgress } from "@/lib/votes/types";

type GamePageBodyProps = {
  game: GeneratedGame;
  gameId: string;
  shareCode: string;
  shareUrl: string;
  createdAt: string;
  initialProgress: VoteProgress;
  initialAggregatedResults: AggregatedCategoryResult[] | null;
};

export function GamePageBody({
  game,
  gameId,
  shareCode,
  shareUrl,
  createdAt,
  initialProgress,
  initialAggregatedResults,
}: GamePageBodyProps) {
  const [progress, setProgress] = useState(initialProgress);

  return (
    <>
      <GameSummary
        game={game}
        shareUrl={shareUrl}
        createdAt={createdAt}
        progress={progress}
      />

      <GameVotingSection
        game={game}
        gameId={gameId}
        shareCode={shareCode}
        initialProgress={initialProgress}
        initialAggregatedResults={initialAggregatedResults}
        onProgressChange={setProgress}
      />

      <GameSampleQuestions game={game} />

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold transition hover:bg-white/15"
        >
          Create your own FriendRank
        </Link>
      </div>
    </>
  );
}
