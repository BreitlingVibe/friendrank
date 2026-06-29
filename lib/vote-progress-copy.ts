export function getVoteProgressHeadline(
  voteCount: number,
  isUnlocked: boolean,
): string {
  if (isUnlocked) {
    return "Results unlocked";
  }

  if (voteCount === 0) {
    return "🔒 Results are locked";
  }

  return "🟢 Votes coming in";
}

export function getVoteProgressCountLabel(
  voteCount: number,
  votesRequired: number,
): string {
  return `${voteCount} / ${votesRequired} votes collected`;
}

export function getVoteProgressSubline(
  voteCount: number,
  votesRequired: number,
  isUnlocked: boolean,
): string {
  if (isUnlocked) {
    return "Your group's lore is ready to reveal.";
  }

  const remaining = votesRequired - voteCount;

  if (voteCount === 0) {
    if (votesRequired === 1) {
      return "Your group's story unlocks after one friend votes.";
    }

    if (votesRequired === 2) {
      return "Your group's story unlocks after two friends vote.";
    }

    return `Your group's story unlocks after ${votesRequired} friends vote.`;
  }

  if (remaining === 1) {
    return "Only one more friend is needed.";
  }

  return `${remaining} more friends needed to unlock your group's lore.`;
}
