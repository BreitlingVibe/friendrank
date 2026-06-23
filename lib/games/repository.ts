import { generateShareCode } from "@/lib/share-code";
import { getSupabase } from "@/lib/supabase";
import type { CreateGameInput, GameRecord } from "@/lib/games/types";

const MAX_SHARE_CODE_COLLISION_RETRIES = 5;

export async function createGame(input: CreateGameInput): Promise<GameRecord> {
  const supabase = getSupabase();
  const customCategories = input.customCategories
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 3);

  for (let attempt = 0; attempt < MAX_SHARE_CODE_COLLISION_RETRIES; attempt += 1) {
    const shareCode = generateShareCode();
    const { data, error } = await supabase
      .from("games")
      .insert({
        share_code: shareCode,
        friends: input.friends,
        vibe_tags: input.vibeTags,
        custom_categories: customCategories,
        tone: input.tone,
      })
      .select("*")
      .single();

    if (!error && data) {
      return data as GameRecord;
    }

    if (error?.code !== "23505") {
      throw new Error(error?.message ?? "Failed to save game.");
    }
  }

  throw new Error("Failed to generate a unique share code.");
}

export async function getGameByShareCode(
  shareCode: string,
): Promise<GameRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("share_code", shareCode)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as GameRecord | null) ?? null;
}
