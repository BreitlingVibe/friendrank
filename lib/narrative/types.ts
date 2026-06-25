import type { FriendRankCategory, GeneratedGame } from "@/lib/game-build";
import type { ResultsPresentation } from "@/lib/results/presentation";

/** Narrative output consumed by results UI (Phase A: mirrors ResultsPresentation). */
export type NarrativeBundle = ResultsPresentation;

/** Vote outcome for one category — facts only, no generated copy. */
export type NarrativeCategoryOutcome = {
  category: FriendRankCategory;
  winner: string;
  voteCount: number;
  votePercent: number;
  totalSessions: number;
  isTie: boolean;
  tiedFriends?: string[];
};

/** Category + winner pair used for seeding and future generators. */
export type NarrativeCategoryResult = {
  category: FriendRankCategory;
  winner: string;
};

/** Inputs for narrative generators — derived from game + aggregated votes. */
export type NarrativeContext = {
  game: GeneratedGame;
  categories: NarrativeCategoryOutcome[];
  categoryResults: NarrativeCategoryResult[];
  seed: number;
};
