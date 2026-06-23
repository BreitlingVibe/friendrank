import {
  CreateGameError,
  createGameFailureError,
  logGameRepositoryError,
} from "@/lib/games/errors";
import { generateShareCode } from "@/lib/share-code";
import { getSupabase } from "@/lib/supabase";
import type { CreateGameInput, GameRecord } from "@/lib/games/types";

const MAX_SHARE_CODE_COLLISION_RETRIES = 5;

export async function createGame(input: CreateGameInput): Promise<GameRecord> {
  let supabase;

  try {
    supabase = getSupabase();
  } catch (error) {
    throw createGameFailureError("createGame:init", error, null, {
      step: "getSupabase",
    });
  }

  const customCategories = input.customCategories
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 3);

  for (let attempt = 0; attempt < MAX_SHARE_CODE_COLLISION_RETRIES; attempt += 1) {
    const shareCode = generateShareCode();

    try {
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

      if (error?.code === "23505") {
        logGameRepositoryError(
          "createGame:insert",
          null,
          error,
          { shareCode, attempt, note: "share_code collision, retrying" },
        );
        continue;
      }

      throw createGameFailureError("createGame:insert", null, error, {
        shareCode,
        attempt,
        friendCount: input.friends.length,
        vibeTagCount: input.vibeTags.length,
        customCategoryCount: customCategories.length,
        tone: input.tone,
      });
    } catch (error) {
      if (error instanceof CreateGameError) {
        throw error;
      }

      throw createGameFailureError("createGame:insert", error, null, {
        shareCode,
        attempt,
        friendCount: input.friends.length,
        vibeTagCount: input.vibeTags.length,
        customCategoryCount: customCategories.length,
        tone: input.tone,
      });
    }
  }

  throw createGameFailureError(
    "createGame:share_code",
    new Error("Exceeded share code collision retries."),
    null,
    { attempts: MAX_SHARE_CODE_COLLISION_RETRIES },
  );
}

export async function getGameByShareCode(
  shareCode: string,
): Promise<GameRecord | null> {
  let supabase;

  try {
    supabase = getSupabase();
  } catch (error) {
    throw createGameFailureError("getGameByShareCode:init", error, null, {
      shareCode,
    });
  }

  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("share_code", shareCode)
      .maybeSingle();

    if (error) {
      throw createGameFailureError("getGameByShareCode:select", null, error, {
        shareCode,
      });
    }

    return (data as GameRecord | null) ?? null;
  } catch (error) {
    if (error instanceof CreateGameError) {
      throw error;
    }

    throw createGameFailureError("getGameByShareCode:select", error, null, {
      shareCode,
    });
  }
}
