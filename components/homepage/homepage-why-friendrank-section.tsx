const WHY_FRIENDRANK_CARDS = [
  {
    marker: "🎭",
    title: "Anonymous voting",
    description: "Everyone answers honestly without awkward moments.",
  },
  {
    marker: "⚡",
    title: "Instant play",
    description: "No downloads, no accounts — share one link and start.",
  },
  {
    marker: "👥",
    title: "Made for groups",
    description:
      "Friends, parties, teams, classrooms and couples all use the same simple flow.",
  },
  {
    marker: "✨",
    title: "Memorable reveals",
    description: "The best conversations happen after everyone votes.",
  },
] as const;

export function HomepageWhyFriendRankSection() {
  return (
    <section
      id="why-friendrank"
      aria-labelledby="why-friendrank-heading"
      className="border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center sm:mb-12">
          <h2
            id="why-friendrank-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Why FriendRank?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            A few reasons groups keep coming back.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_FRIENDRANK_CARDS.map((card) => (
            <li key={card.title}>
              <article className="h-full rounded-2xl border border-white/10 bg-slate-900/35 p-5 backdrop-blur-sm sm:p-6">
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-base leading-none"
                >
                  {card.marker}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {card.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
