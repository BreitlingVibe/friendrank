import {
  getVoteProgressCountLabel,
  getVoteProgressHeadline,
  getVoteProgressSubline,
} from "@/lib/vote-progress-copy";

type VoteProgressCardProps = {
  voteCount: number;
  votesRequired: number;
  isUnlocked: boolean;
};

export function VoteProgressCard({
  voteCount,
  votesRequired,
  isUnlocked,
}: VoteProgressCardProps) {
  const progressPercent = Math.min(
    100,
    (voteCount / votesRequired) * 100,
  );

  if (isUnlocked) {
    return (
      <div className="friendrank-vote-progress-card friendrank-vote-progress-card--unlocked rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-violet-600/10 p-6 text-center sm:p-8">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl ring-4 ring-emerald-500/30">
          🔓
        </div>
        <p className="text-2xl font-bold text-emerald-300">🏆 The Group Has Spoken</p>
        <p className="mt-2 text-sm text-slate-400">
          Based on {voteCount} friend votes.
        </p>
      </div>
    );
  }

  const headline = getVoteProgressHeadline(voteCount, false);
  const countLabel = getVoteProgressCountLabel(voteCount, votesRequired);
  const subline = getVoteProgressSubline(voteCount, votesRequired, false);

  return (
    <div className="friendrank-vote-progress-card rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
      <div className="mb-5 text-center">
        <p className="text-base font-semibold text-white sm:text-lg">{headline}</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-violet-200 sm:text-3xl">
          {countLabel}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{subline}</p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 ease-out${
            voteCount > 0 ? " friendrank-progress-fill--active" : ""
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
