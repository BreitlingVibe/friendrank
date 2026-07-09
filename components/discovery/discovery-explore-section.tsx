import Link from "next/link";
import { getOrderedRecommendationsForSlug } from "@/lib/discovery/ordered-recommendations";
import type { DiscoveryLink } from "@/lib/discovery/types";
import { getLandingPageLinkLabel } from "@/lib/landing-pages/link-labels";

type DiscoveryLinkListProps = {
  title: string;
  links: DiscoveryLink[];
  headingId: string;
};

function getLinkLabel(link: DiscoveryLink): string {
  if (link.kind === "game-creation") {
    return link.title;
  }

  if (link.kind === "pillar") {
    return getLandingPageLinkLabel(link.title, link.slug, "browse");
  }

  if (link.kind === "category") {
    return link.title;
  }

  return getLandingPageLinkLabel(link.title, link.slug, "play");
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
            {link.available ? (
              <Link
                href={link.href}
                aria-label={link.description ?? getLinkLabel(link)}
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
              >
                {getLinkLabel(link)}
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-default rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-medium text-slate-600"
              >
                {getLinkLabel(link)}
                <span className="ml-2 text-[10px] uppercase tracking-wider text-slate-600">
                  Soon
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type DiscoveryExploreSectionProps = {
  slug: string;
  excludeSlugs?: readonly string[];
  /** Pillar pages use PillarExploreMoreSection for categories. */
  variant?: "default" | "pillar";
};

export function DiscoveryExploreSection({
  slug,
  excludeSlugs = [],
  variant = "default",
}: DiscoveryExploreSectionProps) {
  const recommendations = getOrderedRecommendationsForSlug(slug, { excludeSlugs });

  if (!recommendations) {
    return null;
  }

  const {
    relatedCategories,
    relatedGames,
    siblingPages,
    parentPillar,
    gameEntryPoint,
  } = recommendations;

  const categories =
    variant === "pillar"
      ? []
      : relatedCategories.filter((link) => link.available);

  const games = relatedGames.filter((link) => link.available);
  const pages = siblingPages.filter((link) => link.available);

  const hasContent =
    categories.length > 0 ||
    games.length > 0 ||
    pages.length > 0 ||
    parentPillar != null;

  if (!hasContent && !gameEntryPoint.available) {
    return null;
  }

  return (
    <section
      aria-labelledby="discovery-explore-heading"
      className="border-t border-white/5 bg-white/[0.02] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="discovery-explore-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Explore more
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          Continue through related categories, games, and guides — or start a new
          FriendRank game.
        </p>

        <nav aria-label="Related FriendRank pages" className="mt-8">
          {parentPillar && parentPillar.slug !== slug ? (
            <DiscoveryLinkList
              title="Parent pillar"
              links={[parentPillar]}
              headingId="discovery-parent-pillar"
            />
          ) : null}
          {categories.length > 0 ? (
            <DiscoveryLinkList
              title="Related categories"
              links={categories}
              headingId="discovery-related-categories"
            />
          ) : null}
          {games.length > 0 ? (
            <DiscoveryLinkList
              title="Related games"
              links={games}
              headingId="discovery-related-games"
            />
          ) : null}
          {pages.length > 0 ? (
            <DiscoveryLinkList
              title="Related pages"
              links={pages}
              headingId="discovery-related-pages"
            />
          ) : null}
        </nav>

        <div className="mt-10 text-center">
          <Link
            href={gameEntryPoint.href}
            className="inline-flex rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-500 hover:to-cyan-500"
          >
            {gameEntryPoint.title}
          </Link>
        </div>
      </div>
    </section>
  );
}
