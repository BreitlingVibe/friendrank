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

export function logVoteRepositoryError(
  operation: string,
  error: unknown,
  supabaseError?: SupabaseErrorLike | null,
  context?: Record<string, unknown>,
): void {
  console.error(`[votes:${operation}]`, {
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

export class VoteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VoteError";
  }
}

function isMissingVoteSessionsTableError(
  supabaseError?: SupabaseErrorLike | null,
): boolean {
  if (!supabaseError) return false;

  const message = supabaseError.message?.toLowerCase() ?? "";
  return (
    supabaseError.code === "42P01" ||
    supabaseError.code === "PGRST205" ||
    message.includes("could not find the table") ||
    (message.includes("relation") &&
      message.includes("vote_sessions") &&
      message.includes("does not exist"))
  );
}

export function toUserFacingVoteError(
  error: unknown,
  supabaseError?: SupabaseErrorLike | null,
): string {
  if (supabaseError?.code === "23505") {
    return "You have already voted in this game.";
  }

  if (isMissingVoteSessionsTableError(supabaseError)) {
    return "Voting is not set up yet. Run supabase/migrations/002_create_vote_sessions.sql in the Supabase SQL Editor.";
  }

  if (supabaseError?.code === "42501") {
    return "Supabase rejected the vote (permission denied). Check Row Level Security on vote_sessions.";
  }

  if (supabaseError?.message) {
    const hint = supabaseError.hint ? ` Hint: ${supabaseError.hint}` : "";
    return `Could not save vote (${supabaseError.code ?? "unknown"}): ${supabaseError.message}.${hint}`;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to save vote. Check server logs for details.";
}

export function createVoteFailureError(
  operation: string,
  error: unknown,
  supabaseError?: SupabaseErrorLike | null,
  context?: Record<string, unknown>,
): VoteError {
  logVoteRepositoryError(operation, error, supabaseError, context);
  return new VoteError(toUserFacingVoteError(error, supabaseError));
}
