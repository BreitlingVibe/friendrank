import type { DiscoveryLink } from "@/lib/discovery/types";
import { getLandingPageLinkLabel } from "@/lib/landing-pages/link-labels";

type RelatedLinksProps = {
  title: string;
  links: DiscoveryLink[];
  headingId?: string;
  explanation?: string;
  className?: string;
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

  if (link.kind === "profile") {
    return link.title;
  }

  return getLandingPageLinkLabel(link.title, link.slug, "play");
}

export function RelatedLinks({
  title,
  links,
  headingId,
  explanation,
  className = "border-t border-white/5 bg-white/[0.02] py-12 sm:py-16",
}: RelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  const sectionHeadingId =
    headingId ?? `related-links-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section aria-labelledby={sectionHeadingId} className={className}>
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id={sectionHeadingId}
          className="text-center text-xl font-bold tracking-tight sm:text-2xl"
        >
          {title}
        </h2>
        {explanation ? (
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            {explanation}
          </p>
        ) : null}
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <li key={`${link.kind}-${link.slug}`}>
              {link.available ? (
                <a
                  href={link.href}
                  aria-label={link.description ?? getLinkLabel(link)}
                  className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
                >
                  {getLinkLabel(link)}
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-default rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-medium text-slate-600"
                  title={
                    link.kind === "profile"
                      ? "Coming in a future release"
                      : "Coming soon"
                  }
                >
                  {getLinkLabel(link)}
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-slate-600">
                    {link.kind === "profile" ? "Future" : "Soon"}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type RelatedLinksGroupProps = {
  pillars?: DiscoveryLink[];
  categories?: DiscoveryLink[];
  evergreenPages?: DiscoveryLink[];
  gameCreation?: DiscoveryLink | null;
  profilePages?: DiscoveryLink[];
};

/** Renders multiple related-link sections from grouped discovery arrays. */
export function RelatedLinksGroup({
  pillars = [],
  categories = [],
  evergreenPages = [],
  gameCreation = null,
  profilePages = [],
}: RelatedLinksGroupProps) {
  return (
    <>
      {pillars.length > 0 ? (
        <RelatedLinks title="Related pillars" links={pillars} />
      ) : null}
      {categories.length > 0 ? (
        <RelatedLinks title="Related categories" links={categories} />
      ) : null}
      {evergreenPages.length > 0 ? (
        <RelatedLinks title="Related guides" links={evergreenPages} />
      ) : null}
      {gameCreation ? (
        <RelatedLinks title="Start playing" links={[gameCreation]} />
      ) : null}
      {profilePages.length > 0 ? (
        <RelatedLinks title="Profiles" links={profilePages} />
      ) : null}
    </>
  );
}
