import Link from "next/link";
import type { Metadata } from "next";
import { FriendRankBrand } from "@/components/friend-rank-brand";
import { GamePageBody } from "@/components/game-page-body";
import { notFound } from "next/navigation";
import { buildGeneratedGameFromRecord } from "@/lib/game-build";
import { getGameShareUrlForRequest } from "@/lib/game-url-server";
import { getGameByShareCode } from "@/lib/games/repository";
import { buildGamePageMetadata } from "@/lib/seo/page-metadata";
import { getAggregatedResultsForShareCode } from "@/lib/votes/results";
import { getVoteProgress } from "@/lib/votes/repository";

export const dynamic = "force-dynamic";

type GamePageProps = {
  params: Promise<{ share_code: string }>;
};

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { share_code: shareCode } = await params;
  return buildGamePageMetadata(shareCode);
}

export default async function GamePage({ params }: GamePageProps) {
  const { share_code: shareCode } = await params;
  const record = await getGameByShareCode(shareCode);

  if (!record) {
    notFound();
  }

  const game = buildGeneratedGameFromRecord(record);
  const initialProgress = await getVoteProgress(shareCode);
  const initialAggregatedResults = initialProgress.isUnlocked
    ? await getAggregatedResultsForShareCode(shareCode)
    : null;
  const shareUrl = await getGameShareUrlForRequest(record.share_code);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-[100px]" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <FriendRankBrand href="/" />
        </div>
      </header>

      <main className="relative z-10 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              FriendRank game
            </h1>
            <p className="mt-3 text-slate-400">
              Game ID:{" "}
              <span className="font-mono text-violet-300">{record.share_code}</span>
            </p>
          </div>

          <GamePageBody
            game={game}
            gameId={record.id}
            shareCode={record.share_code}
            shareUrl={shareUrl}
            createdAt={record.created_at}
            initialProgress={initialProgress}
            initialAggregatedResults={initialAggregatedResults}
          />
        </div>
      </main>
    </div>
  );
}
