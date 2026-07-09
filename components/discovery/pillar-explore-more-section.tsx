import Link from "next/link";
import { getLiveCategoriesForPillar } from "@/lib/discovery/ordered-recommendations";
import type { DiscoveryLink } from "@/lib/discovery/types";

type DiscoveryLinkListProps = {
  title: string;
  links: DiscoveryLink[];
  headingId: string;
};

function getLinkLabel(link: DiscoveryLink): string {
  return link.title;
}

function DiscoveryLinkList({ title, links, headingId }: DiscoveryLinkListProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 first:mt-0">
      <h3 id={headingId} className="text-lg font-semibold tracking-tight text-white">
        {title}
      </h3>
      <ul
        aria-labelledby={headingId}
        className="mt-4 flex flex-wrap justify-center gap-3"
      >
        {links.map((link) => (
          <li key={`${link.kind}-${link.slug}`}>
            <Link
              href={link.href}
              aria-label={link.description ?? link.title}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
            >
              {getLinkLabel(link)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type PillarExploreMoreSectionProps = {
  pillarSlug: string;
};

/** Lightweight live-category links for pillar pages. */
export function PillarExploreMoreSection({ pillarSlug }: PillarExploreMoreSectionProps) {
  const categories = getLiveCategoriesForPillar(pillarSlug);

  if (categories.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="pillar-explore-more-heading"
      className="border-t border-white/5 py-12 sm:py-14"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="pillar-explore-more-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Explore more
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
          Browse live category hubs connected to this pillar.
        </p>
        <nav aria-label="Live category hubs" className="mt-6">
          <DiscoveryLinkList
            title="Live categories"
            links={categories}
            headingId="pillar-live-categories"
          />
        </nav>
      </div>
    </section>
  );
}
