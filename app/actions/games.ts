"use server";

import { createGame } from "@/lib/games/repository";
import type { CreateGameInput } from "@/lib/games/types";

export type CreateGameResult =
  | { ok: true; shareCode: string }
  | { ok: false; error: string };

export async function createGameAction(
  input: CreateGameInput,
): Promise<CreateGameResult> {
  if (input.friends.length === 0) {
    return { ok: false, error: "Add at least one friend to create a game." };
  }

  if (!input.tone) {
    return { ok: false, error: "Choose a tone for your game." };
  }

  try {
    const record = await createGame(input);
    return { ok: true, shareCode: record.share_code };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save game.";
    return { ok: false, error: message };
  }
}
