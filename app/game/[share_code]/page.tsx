import Link from "next/link";
import { notFound } from "next/navigation";
import { GameVotingSection } from "@/components/game-voting-section";
import { GameSummary } from "@/components/game-summary";
import { buildGeneratedGameFromRecord } from "@/lib/game-build";
import { getGameShareUrl } from "@/lib/game-url";
import { getGameByShareCode } from "@/lib/games/repository";
import { getVoteProgress } from "@/lib/votes/repository";

export const dynamic = "force-dynamic";

type GamePageProps = {
  params: Promise<{ share_code: string }>;
};

export default async function GamePage({ params }: GamePageProps) {
  const { share_code: shareCode } = await params;
  const record = await getGameByShareCode(shareCode);

  if (!record) {
    notFound();
  }

  const game = buildGeneratedGameFromRecord(record);
  const initialProgress = await getVoteProgress(shareCode);
  const appOrigin =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  const shareUrl = getGameShareUrl(record.share_code, appOrigin);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-[100px]" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold">
              FR
            </span>
            <span className="font-semibold tracking-tight">FriendRank</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              FriendRank game
            </h1>
            <p className="mt-3 text-slate-400">
              Game ID:{" "}
              <span className="font-mono text-violet-300">{record.share_code}</span>
            </p>
          </div>

          <GameSummary
            game={game}
            shareUrl={shareUrl}
            createdAt={record.created_at}
          />

          <GameVotingSection
            game={game}
            gameId={record.id}
            shareCode={record.share_code}
            initialProgress={initialProgress}
          />

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold transition hover:bg-white/15"
            >
              Create your own FriendRank
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
