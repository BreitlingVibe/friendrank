import { VOTES_REQUIRED } from "@/lib/votes/constants";

type VoteProgressCardProps = {
  voteCount: number;
  votesRequired?: number;
  isUnlocked: boolean;
};

export function VoteProgressCard({
  voteCount,
  votesRequired = VOTES_REQUIRED,
  isUnlocked,
}: VoteProgressCardProps) {
  const progressPercent = Math.min(
    100,
    (voteCount / votesRequired) * 100,
  );

  if (isUnlocked) {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-violet-600/10 p-6 text-center sm:p-8">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl ring-4 ring-emerald-500/30">
          🔓
        </div>
        <p className="text-2xl font-bold text-emerald-300">Results Unlocked</p>
        <p className="mt-2 text-sm text-slate-400">
          {votesRequired} friend votes collected — full results view coming soon
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
      <div className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          Live
        </div>
        <h3 className="text-xl font-bold sm:text-2xl">
          Waiting for your friends...
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Results unlock after {votesRequired} friend votes.
        </p>
      </div>

      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
        <span>Votes collected</span>
        <span className="font-semibold text-violet-300">
          {voteCount} / {votesRequired} friend votes
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
