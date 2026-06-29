type FriendRankRevealPreviewProps = {
  className?: string;
};

const REVEAL_ITEMS = [
  { emoji: "👑", label: "Main Character" },
  { emoji: "🔥", label: "Chaos Agent" },
  { emoji: "💀", label: "Secret Villain" },
  { emoji: "✨", label: "Final Story" },
] as const;

export function FriendRankRevealPreview({
  className = "",
}: FriendRankRevealPreviewProps) {
  return (
    <section
      className={`rounded-2xl border border-white/8 bg-slate-900/40 p-4 sm:p-5 ${className}`.trim()}
    >
      <h4 className="text-sm font-semibold text-white">
        What&apos;s waiting to be revealed
      </h4>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {REVEAL_ITEMS.map((item) => (
          <li
            key={item.label}
            className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 text-center text-sm text-slate-300 transition duration-200"
          >
            <span aria-hidden className="block text-lg">
              {item.emoji}
            </span>
            <span className="mt-1 block text-xs font-medium leading-snug text-slate-400">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
        Everyone votes.
        <br />
        Then FriendRank reveals your group&apos;s lore.
      </p>
    </section>
  );
}
