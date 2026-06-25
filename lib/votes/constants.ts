/** Fixed unlock threshold used before per-group friend-count unlock. */
export const LEGACY_VOTES_REQUIRED = 3;

/** Games created before this instant keep the legacy 3-vote unlock. */
export const DYNAMIC_VOTES_REQUIRED_SINCE = "2026-06-23T00:00:00.000Z";

export function getVotesRequired(friendCount: number): number {
  return Math.max(2, friendCount);
}

export function isResultsUnlocked(
  voteCount: number,
  friendCount: number,
  gameCreatedAt?: string,
): boolean {
  const required = getVotesRequired(friendCount);
  if (voteCount >= required) {
    return true;
  }

  if (
    gameCreatedAt &&
    new Date(gameCreatedAt) < new Date(DYNAMIC_VOTES_REQUIRED_SINCE) &&
    voteCount >= LEGACY_VOTES_REQUIRED
  ) {
    return true;
  }

  return false;
}
