import type { VoteProgress } from "@/lib/votes/types";

export function isSameVoteProgress(
  left: VoteProgress | null | undefined,
  right: VoteProgress | null | undefined,
): boolean {
  if (left === right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  return (
    left.voteCount === right.voteCount &&
    left.votesRequired === right.votesRequired &&
    left.isUnlocked === right.isUnlocked &&
    left.hasVoted === right.hasVoted
  );
}

export function mergeVoteProgressIfChanged(
  current: VoteProgress | null,
  next: VoteProgress,
): VoteProgress {
  return isSameVoteProgress(current, next) ? (current ?? next) : next;
}
