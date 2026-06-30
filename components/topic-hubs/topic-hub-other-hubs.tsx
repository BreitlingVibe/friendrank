import Link from "next/link";
import { getHubBrowseLabel } from "@/lib/landing-pages/link-labels";
import { getRecommendedTopicHubs } from "@/lib/topic-hubs/hub-recommendations";
import type { TopicHub } from "@/lib/topic-hubs/hub-types";

type TopicHubOtherHubsProps = {
  hubs: TopicHub[];
  currentHubId: string;
};

export function TopicHubOtherHubs({ hubs, currentHubId }: TopicHubOtherHubsProps) {
  const recommendedHubIds = new Set(
    getRecommendedTopicHubs(currentHubId).map((hub) => hub.id),
  );

  const otherHubs = hubs
    .filter((hub) => hub.id !== currentHubId)
    .sort((hubA, hubB) => {
      const rankA = recommendedHubIds.has(hubA.id) ? 0 : 1;
      const rankB = recommendedHubIds.has(hubB.id) ? 0 : 1;

      if (rankA !== rankB) {
        return rankA - rankB;
      }

      return hubA.title.localeCompare(hubB.title);
    });

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
          Explore more game categories
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-500 sm:text-base">
          Related Topic Hubs picked for similar audiences and search intent.
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {otherHubs.map((hub) => (
            <li key={hub.id}>
              <Link
                href={`/${hub.slug}`}
                aria-label={getHubBrowseLabel(hub.title, hub.slug)}
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
              >
                {getHubBrowseLabel(hub.title, hub.slug)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
