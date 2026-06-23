import type { GeneratedGame } from "@/lib/game-build";

type GameSummaryProps = {
  game: GeneratedGame;
  shareUrl?: string;
  createdAt?: string;
};

export function GameSummary({
  game,
  shareUrl,
  createdAt,
}: GameSummaryProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-600/20 via-slate-900 to-cyan-600/15 p-6 shadow-xl shadow-violet-500/10 sm:p-8">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-lg">
              👑
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
                FriendRank invite ready
              </p>
              <h3 className="text-xl font-bold sm:text-2xl">
                Your FriendRank game is ready
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Share it with your group. Results unlock after 3 votes.
              </p>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-violet-500/40 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200">
              FriendRank
            </span>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              {game.tone}
            </span>
            {game.vibeTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-200"
              >
                {tag}
              </span>
            ))}
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
              🔒 Results locked
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
              {game.friends.join(", ")}
            </span>
          </div>

          {shareUrl && (
            <p className="mb-4 break-all rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
              {shareUrl}
            </p>
          )}

          {formattedDate && (
            <p className="mb-4 text-xs text-slate-500">Created {formattedDate}</p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm sm:p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
          FriendRank sample questions
        </p>
        <ol className="space-y-3">
          {game.questions.map((question, index) => (
            <li
              key={index}
              className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3 sm:gap-4 sm:p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-500/20 text-sm font-bold text-violet-300">
                {game.categories[index]?.emoji}
              </span>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                {question}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
