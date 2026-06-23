import type { Tone, VibeTag } from "@/lib/game-build";

export type GameRecord = {
  id: string;
  share_code: string;
  created_at: string;
  friends: string[];
  vibe_tags: VibeTag[];
  custom_categories: string[];
  tone: Tone;
};

export type CreateGameInput = {
  friends: string[];
  vibeTags: VibeTag[];
  customCategories: string[];
  tone: Tone;
};
