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
  subline?: string;
  compact?: boolean;
};

export function FriendRankVoteProgressSnippet({
  voteCount,
  votesRequired,
  isUnlocked = false,
  className = "",
  subline,
  compact = false,
}: FriendRankVoteProgressSnippetProps) {
  const progressPercent = Math.min(100, (voteCount / votesRequired) * 100);
  const headline = getVoteProgressHeadline(voteCount, isUnlocked);
  const countLabel = getVoteProgressCountLabel(voteCount, votesRequired);
  const sublineText =
    subline ?? getVoteProgressSubline(voteCount, votesRequired, isUnlocked);

  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/20 ${
        compact ? "px-3 py-3" : "px-4 py-4"
      } ${className}`.trim()}
    >
      <p className={`font-semibold text-white ${compact ? "text-xs" : "text-sm"}`}>
        {headline}
      </p>
      <p
        className={`mt-0.5 font-bold tracking-tight text-violet-200 ${
          compact ? "text-base" : "text-lg"
        }`}
      >
        {countLabel}
      </p>
      <p className={`mt-0.5 text-slate-400 ${compact ? "text-xs" : "text-sm"}`}>
        {sublineText}
      </p>
      {!isUnlocked && (
        <div
          className={`overflow-hidden rounded-full bg-white/10 ${
            compact ? "mt-2.5 h-1.5" : "mt-4 h-2"
          }`}
        >
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
