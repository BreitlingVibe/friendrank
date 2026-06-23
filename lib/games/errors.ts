type SupabaseErrorLike = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
};

function serializeError(error: unknown): unknown {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    };
  }

  return error;
}

export function logGameRepositoryError(
  operation: string,
  error: unknown,
  supabaseError?: SupabaseErrorLike | null,
  context?: Record<string, unknown>,
): void {
  console.error(`[games:${operation}]`, {
    ...context,
    supabase: supabaseError
      ? {
          code: supabaseError.code,
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint,
        }
      : undefined,
    error: serializeError(error),
  });
}

export function logCreateGameActionError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  console.error("[createGameAction]", {
    ...context,
    error: serializeError(error),
  });
}

function isFetchFailedError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();
  return (
    error.name === "TypeError" &&
    (message.includes("fetch failed") || message.includes("failed to fetch"))
  );
}

function isMissingSupabaseConfigError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes("Missing Supabase environment variables")
  );
}

function isMissingGamesTableError(supabaseError?: SupabaseErrorLike | null): boolean {
  if (!supabaseError) return false;

  const message = supabaseError.message?.toLowerCase() ?? "";
  return (
    supabaseError.code === "42P01" ||
    supabaseError.code === "PGRST205" ||
    message.includes("could not find the table") ||
    message.includes("relation") && message.includes("games") && message.includes("does not exist")
  );
}

export function toUserFacingCreateGameError(
  error: unknown,
  supabaseError?: SupabaseErrorLike | null,
): string {
  if (isMissingSupabaseConfigError(error)) {
    return "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.";
  }

  if (isFetchFailedError(error)) {
    return "Could not reach Supabase (network error). Check NEXT_PUBLIC_SUPABASE_URL in production and that your Supabase project is active.";
  }

  if (isMissingGamesTableError(supabaseError)) {
    return "The games table does not exist yet. Run supabase/migrations/001_create_games.sql in the Supabase SQL Editor.";
  }

  if (supabaseError?.code === "42501") {
    return "Supabase rejected the insert (permission denied). Check Row Level Security policies on the games table.";
  }

  if (supabaseError?.code === "23505") {
    return "Could not generate a unique share code. Please try again.";
  }

  if (supabaseError?.message) {
    const hint = supabaseError.hint ? ` Hint: ${supabaseError.hint}` : "";
    return `Supabase error (${supabaseError.code ?? "unknown"}): ${supabaseError.message}.${hint}`;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to save game. Check server logs for details.";
}

export class CreateGameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CreateGameError";
  }
}

export function createGameFailureError(
  operation: string,
  error: unknown,
  supabaseError?: SupabaseErrorLike | null,
  context?: Record<string, unknown>,
): CreateGameError {
  logGameRepositoryError(operation, error, supabaseError, context);
  return new CreateGameError(toUserFacingCreateGameError(error, supabaseError));
}
