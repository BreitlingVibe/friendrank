import type { VoteSessionRecord } from "@/lib/votes/types";

export type AggregatedCategoryResult = {
  winner: string;
  voteCount: number;
  votePercent: number;
  totalSessions: number;
  isTie: boolean;
  tiedFriends?: string[];
};

export function aggregateCategoryResults(
  sessions: VoteSessionRecord[],
  categoryCount: number,
  friends: string[],
): AggregatedCategoryResult[] {
  const totalSessions = sessions.length;

  return Array.from({ length: categoryCount }, (_, categoryIndex) => {
    const counts = new Map<string, number>();
    for (const friend of friends) {
      counts.set(friend, 0);
    }

    for (const session of sessions) {
      const choice = session.choices[categoryIndex];
      if (choice && counts.has(choice)) {
        counts.set(choice, (counts.get(choice) ?? 0) + 1);
      }
    }

    let maxCount = 0;
    const leaders: string[] = [];

    for (const friend of friends) {
      const count = counts.get(friend) ?? 0;
      if (count > maxCount) {
        maxCount = count;
        leaders.length = 0;
        leaders.push(friend);
      } else if (count === maxCount && count > 0) {
        leaders.push(friend);
      }
    }

    const fallbackWinner = friends[categoryIndex % friends.length] ?? "Unknown";
    const winner = leaders[0] ?? fallbackWinner;
    const votePercent =
      totalSessions > 0 ? Math.round((maxCount / totalSessions) * 100) : 0;

    return {
      winner,
      voteCount: maxCount,
      votePercent,
      totalSessions,
      isTie: leaders.length > 1,
      tiedFriends: leaders.length > 1 ? leaders : undefined,
    };
  });
}
