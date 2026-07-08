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

const WHAT_HAPPENS_NEXT_STEPS = [
  "Friends open the link",
  "Everyone votes anonymously",
  "Results unlock when voting is done",
] as const;

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

  const voteProgressSubline =
    !inviteProgress.isUnlocked && inviteProgress.voteCount === 0
      ? "Progress updates automatically as friends vote."
      : undefined;

  const shareUrl = getGameShareUrl(shareCode, window.location.origin);

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
              <h3 className="text-xl font-bold sm:text-2xl">
                Your game is ready — share the link
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Send this link to your group. Everyone votes on their own phone.
              </p>
            </div>
          </div>

          <div className="mb-4 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-3 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
              Your invite link
            </p>
            <p className="mt-1 break-all font-mono text-xs leading-relaxed text-slate-400">
              {shareUrl}
            </p>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handleCopyInviteLink}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 ring-1 ring-violet-400/30 transition duration-200 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/35"
            >
              {inviteCopied ? (
                <>
                  <span className="text-emerald-200">✓</span>
                  Copied — send it to your group
                </>
              ) : (
                "Copy invite link"
              )}
            </button>
            <Link
              href={`/game/${shareCode}`}
              className="flex w-full items-center justify-center rounded-full px-5 py-2 text-xs font-medium text-slate-500 transition duration-200 hover:text-slate-400"
            >
              Vote now
            </Link>
          </div>

          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
              What happens next?
            </p>
            <ol className="mt-2 space-y-1.5">
              {WHAT_HAPPENS_NEXT_STEPS.map((step, index) => (
                <li key={step} className="flex gap-2.5 text-xs text-slate-500">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/5 text-[10px] font-semibold text-violet-300/90">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <FriendRankVoteProgressSnippet
            voteCount={inviteProgress.voteCount}
            votesRequired={inviteProgress.votesRequired}
            isUnlocked={inviteProgress.isUnlocked}
            subline={voteProgressSubline}
            compact
            className="mt-4"
          />

          <div className="mt-5 flex flex-wrap gap-2">
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
