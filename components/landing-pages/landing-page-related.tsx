import type { LandingPageRelatedPage } from "@/lib/landing-pages/landing-page-types";
import { PRODUCTION_APP_URL } from "@/lib/app-url";

type LandingPageRelatedProps = {
  title: string;
  pages: LandingPageRelatedPage[];
};

export function LandingPageRelated({ title, pages }: LandingPageRelatedProps) {
  return (
    <section
      aria-labelledby="landing-related-heading"
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="landing-related-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {pages.map((page) =>
            page.available ? (
              <li key={page.slug}>
                <a
                  href={`${PRODUCTION_APP_URL}/${page.slug}`}
                  className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
                >
                  {page.title}
                </a>
              </li>
            ) : (
              <li key={page.slug}>
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-default rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-medium text-slate-600"
                  title="Coming soon"
                >
                  {page.title}
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-slate-600">
                    Coming Soon
                  </span>
                </span>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
