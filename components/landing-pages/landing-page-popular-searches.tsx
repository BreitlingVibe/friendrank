import type { PopularSearchLink } from "@/lib/landing-pages/landing-page-types";
import { PRODUCTION_APP_URL } from "@/lib/app-url";

type LandingPagePopularSearchesProps = {
  title: string;
  links: PopularSearchLink[];
  explanation?: string;
};

export function LandingPagePopularSearches({
  title,
  links,
  explanation,
}: LandingPagePopularSearchesProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="landing-popular-searches-heading"
      className="border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="landing-popular-searches-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        {explanation ? (
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            {explanation}
          </p>
        ) : null}
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <li key={`${link.kind}-${link.slug}`}>
              <a
                href={`${PRODUCTION_APP_URL}/${link.slug}`}
                aria-label={link.linkLabel}
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
              >
                {link.linkLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
