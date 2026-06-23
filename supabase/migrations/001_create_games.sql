-- GroupLore / FriendRank: store created game configurations.
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query).
--
-- If you already created the old game_id-based table, drop it first:
--   DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  friends TEXT[] NOT NULL,
  vibe_tags TEXT[] NOT NULL DEFAULT '{}',
  custom_categories TEXT[] NOT NULL DEFAULT '{}',
  tone TEXT NOT NULL
);

CREATE INDEX games_created_at_idx ON games (created_at DESC);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert games"
  ON games
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public read games"
  ON games
  FOR SELECT
  TO anon, authenticated
  USING (true);
