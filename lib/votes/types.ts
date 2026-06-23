export type VoteSessionRecord = {
  id: string;
  game_id: string;
  voter_token: string;
  choices: string[];
  created_at: string;
};

export type SubmitVoteInput = {
  gameId: string;
  shareCode: string;
  voterToken: string;
  choices: string[];
  allowedFriends: string[];
  expectedChoiceCount: number;
};

export type VoteProgress = {
  voteCount: number;
  votesRequired: number;
  isUnlocked: boolean;
  hasVoted: boolean;
};
