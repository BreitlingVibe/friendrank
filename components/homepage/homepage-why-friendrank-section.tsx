const WHY_FRIENDRANK_CARDS = [
  {
    title: "Anonymous voting",
    description: "Everyone answers honestly without awkward moments.",
  },
  {
    title: "Instant play",
    description: "No downloads, no accounts — share one link and start.",
  },
  {
    title: "Made for groups",
    description:
      "Friends, parties, teams, classrooms and couples all use the same simple flow.",
  },
  {
    title: "Memorable reveals",
    description: "The best conversations happen after everyone votes.",
  },
] as const;

export function HomepageWhyFriendRankSection() {
  return (
    <section
      id="why-friendrank"
      aria-labelledby="why-friendrank-heading"
      className="border-t border-white/5 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center sm:mb-14">
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
              <article className="h-full rounded-2xl border border-white/10 bg-slate-900/35 p-6 backdrop-blur-sm">
                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
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
