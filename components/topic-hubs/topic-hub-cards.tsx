import Link from "next/link";
import type { HubLandingPageRef } from "@/lib/topic-hubs/hub-types";

type TopicHubLiveCardProps = {
  page: HubLandingPageRef;
  ctaLabel?: string;
};

export function TopicHubLiveCard({
  page,
  ctaLabel = "View game",
}: TopicHubLiveCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-400/35 hover:bg-white/[0.05]">
      <h3 className="text-lg font-semibold text-white">{page.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
        {page.searchIntent}
      </p>
      <div className="mt-6">
        <Link
          href={`/${page.slug}`}
          className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}

type TopicHubComingSoonCardProps = {
  page: HubLandingPageRef;
};

export function TopicHubComingSoonCard({ page }: TopicHubComingSoonCardProps) {
  return (
    <article
      aria-disabled="true"
      className="flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-600">{page.title}</h3>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-slate-600">
          Coming Soon
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {page.searchIntent}
      </p>
      <div className="mt-6">
        <span className="inline-flex cursor-default rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-medium text-slate-600">
          Coming Soon
        </span>
      </div>
    </article>
  );
}
