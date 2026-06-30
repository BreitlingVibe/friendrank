import Link from "next/link";
import { getLandingPageLinkLabel } from "@/lib/landing-pages/link-labels";
import type { HubLandingPageRef } from "@/lib/topic-hubs/hub-types";

type TopicHubLiveCardProps = {
  page: HubLandingPageRef;
  ctaLabel?: string;
  linkStyle?: "play" | "view" | "create";
};

export function TopicHubLiveCard({
  page,
  ctaLabel,
  linkStyle = "view",
}: TopicHubLiveCardProps) {
  const label =
    ctaLabel ?? getLandingPageLinkLabel(page.title, page.slug, linkStyle);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-400/35 hover:bg-white/[0.05]">
      <h3 className="text-lg font-semibold text-white">{page.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
        {page.searchIntent}
      </p>
      <div className="mt-6">
        <Link
          href={`/${page.slug}`}
          aria-label={`${label}: ${page.title}`}
          className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
        >
          {label}
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
      aria-label={`${page.title} coming soon`}
      className="flex h-full flex-col rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-400">{page.title}</h3>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Soon
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
        A new {page.title.toLowerCase()} is on the way for your group.
      </p>
    </article>
  );
}
