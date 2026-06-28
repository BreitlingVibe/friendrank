import type { GeneratedGame } from "@/lib/game-build";

type GameSampleQuestionsProps = {
  game: GeneratedGame;
};

export function GameSampleQuestions({ game }: GameSampleQuestionsProps) {
  return (
    <details className="group mt-8 rounded-2xl border border-white/5 bg-slate-900/25 p-4 sm:p-5">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              FriendRank sample questions
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Preview what friends will vote on
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-xs font-medium text-slate-500 transition group-open:text-slate-400">
            {game.questions.length} questions
          </span>
        </div>
      </summary>

      <ol className="mt-4 space-y-2 border-t border-white/5 pt-4">
        {game.questions.map((question, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-lg border border-white/[0.03] bg-white/[0.02] p-3 sm:gap-4 sm:p-3.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-sm text-slate-500">
              {game.categories[index]?.emoji}
            </span>
            <p className="text-sm leading-relaxed text-slate-400">{question}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}
