import {
  getVoteProgressCountLabel,
  getVoteProgressHeadline,
  getVoteProgressSubline,
} from "@/lib/vote-progress-copy";

type FriendRankVoteProgressSnippetProps = {
  voteCount: number;
  votesRequired: number;
  isUnlocked?: boolean;
  className?: string;
};

export function FriendRankVoteProgressSnippet({
  voteCount,
  votesRequired,
  isUnlocked = false,
  className = "",
}: FriendRankVoteProgressSnippetProps) {
  const progressPercent = Math.min(100, (voteCount / votesRequired) * 100);
  const headline = getVoteProgressHeadline(voteCount, isUnlocked);
  const countLabel = getVoteProgressCountLabel(voteCount, votesRequired);
  const subline = getVoteProgressSubline(voteCount, votesRequired, isUnlocked);

  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/20 px-4 py-4 ${className}`.trim()}
    >
      <p className="text-sm font-semibold text-white">{headline}</p>
      <p className="mt-1 text-lg font-bold tracking-tight text-violet-200">
        {countLabel}
      </p>
      <p className="mt-1 text-sm text-slate-400">{subline}</p>
      {!isUnlocked && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 ease-out${
              voteCount > 0 ? " friendrank-progress-fill--active" : ""
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
