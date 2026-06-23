-- Anonymous vote sessions for FriendRank games.
-- One row = one person completing all category votes for a game.
-- Run in Supabase SQL Editor after 001_create_games.sql.

CREATE TABLE vote_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  voter_token TEXT NOT NULL,
  choices TEXT[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT vote_sessions_game_voter_unique UNIQUE (game_id, voter_token)
);

CREATE INDEX vote_sessions_game_id_idx ON vote_sessions (game_id);

ALTER TABLE vote_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert vote_sessions"
  ON vote_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public read vote_sessions"
  ON vote_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);
