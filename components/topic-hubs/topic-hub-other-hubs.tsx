import Link from "next/link";
import type { TopicHub } from "@/lib/topic-hubs/hub-types";

type TopicHubOtherHubsProps = {
  hubs: TopicHub[];
  currentHubId: string;
};

export function TopicHubOtherHubs({ hubs, currentHubId }: TopicHubOtherHubsProps) {
  const otherHubs = hubs.filter((hub) => hub.id !== currentHubId);

  if (otherHubs.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="topic-hub-other-heading"
      className="border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="topic-hub-other-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Other Topic Hubs
        </h2>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {otherHubs.map((hub) => (
            <li key={hub.id}>
              <Link
                href={`/${hub.slug}`}
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
              >
                {hub.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
