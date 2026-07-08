"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FriendRankRevealPreview } from "@/components/friend-rank-reveal-preview";
import { FriendRankVoteProgressSnippet } from "@/components/friend-rank-vote-progress-snippet";
import { useLiveVoteProgress } from "@/hooks/use-live-vote-progress";
import { trackInviteCopied } from "@/lib/analytics";
import type { GeneratedGame } from "@/lib/game-build";
import { getGameShareUrl, getInviteLinkText } from "@/lib/game-url";
import { getVotesRequired } from "@/lib/votes/constants";

type HomepageGameCreatedPanelProps = {
  generatedGame: GeneratedGame;
  shareCode: string;
};

export function HomepageGameCreatedPanel({
  generatedGame,
  shareCode,
}: HomepageGameCreatedPanelProps) {
  const [inviteCopied, setInviteCopied] = useState(false);

  const inviteInitialProgress = useMemo(
    () => ({
      voteCount: 0,
      votesRequired: getVotesRequired(generatedGame.friends.length),
      isUnlocked: false,
      hasVoted: false,
    }),
    [generatedGame.friends.length],
  );

  const { progress: inviteProgress } = useLiveVoteProgress(
    shareCode,
    inviteInitialProgress,
  );

  async function handleCopyInviteLink() {
    try {
      await navigator.clipboard.writeText(
        getInviteLinkText(shareCode, window.location.origin),
      );
      trackInviteCopied({ game_id: shareCode });
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2000);
    } catch {
      setInviteCopied(false);
    }
  }

  if (!inviteProgress) {
    return null;
  }

  return (
    <>
      <div className="friendrank-invite-ready relative mt-8 overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-600/20 via-slate-900 to-cyan-600/15 p-6 shadow-xl shadow-violet-500/10 sm:p-8">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl" />

        <div className="relative">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-lg">
              👑
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
                Your game is ready
              </p>
              <h3 className="text-xl font-bold sm:text-2xl">
                Share the link with your group
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Everyone votes on their phone — results unlock when enough friends
                respond.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                No account or download needed for anyone.
              </p>
            </div>
          </div>

          <FriendRankVoteProgressSnippet
            voteCount={inviteProgress.voteCount}
            votesRequired={inviteProgress.votesRequired}
            isUnlocked={inviteProgress.isUnlocked}
            className="mb-5"
          />

          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-violet-500/40 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200">
              FriendRank
            </span>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              {generatedGame.tone}
            </span>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
              {inviteProgress.isUnlocked
                ? "🔓 Results unlocked"
                : "🔒 Locked until friends vote"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
              {generatedGame.friends.join(", ")}
            </span>
          </div>

          <p className="mb-5 break-all rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-400">
            {getGameShareUrl(shareCode, window.location.origin)}
          </p>

          <div className="space-y-2">
            <p className="text-center text-xs font-medium uppercase tracking-wider text-violet-300/80">
              Next step
            </p>
            <button
              type="button"
              onClick={handleCopyInviteLink}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 ring-1 ring-violet-400/30 transition duration-200 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/35"
            >
              {inviteCopied ? (
                <>
                  <span className="text-emerald-200">✓</span>
                  Invite copied — send it to your group
                </>
              ) : (
                <>📨 Share invite with your group</>
              )}
            </button>
            <Link
              href={`/game/${shareCode}`}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300 transition duration-200 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
            >
              Vote now
            </Link>
          </div>
        </div>
      </div>

      <FriendRankRevealPreview className="mt-4 friendrank-reveal-preview--enter" />

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm sm:p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
          Sample questions in your game
        </p>
        <ol className="space-y-3">
          {generatedGame.questions.map((question, index) => (
            <li
              key={index}
              className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3 sm:gap-4 sm:p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-500/20 text-sm font-bold text-violet-300">
                {generatedGame.categories[index]?.emoji}
              </span>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                {question}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
