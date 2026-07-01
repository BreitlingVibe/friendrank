import type { LandingPageRelatedPage } from "@/lib/landing-pages/landing-page-types";
import { getLandingPageLinkLabel } from "@/lib/landing-pages/link-labels";
import { PRODUCTION_APP_URL } from "@/lib/app-url";

type LandingPageRelatedProps = {
  title: string;
  pages: LandingPageRelatedPage[];
  headingId?: string;
  explanation?: string;
  sectionClassName?: string;
};

export function LandingPageRelated({
  title,
  pages,
  headingId = "landing-related-heading",
  explanation,
  sectionClassName = "border-t border-white/5 bg-white/[0.02] py-16 sm:py-20",
}: LandingPageRelatedProps) {
  if (pages.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={headingId} className={sectionClassName}>
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id={headingId}
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
          {pages.map((page) =>
            page.available ? (
              <li key={page.slug}>
                <a
                  href={`${PRODUCTION_APP_URL}/${page.slug}`}
                  aria-label={
                    page.linkLabel ??
                    getLandingPageLinkLabel(page.title, page.slug, "view")
                  }
                  className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
                >
                  {page.linkLabel ??
                    getLandingPageLinkLabel(page.title, page.slug, "view")}
                </a>
              </li>
            ) : (
              <li key={page.slug}>
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-default rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-medium text-slate-600"
                  title="Coming soon"
                >
                  {page.linkLabel ?? page.title}
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
