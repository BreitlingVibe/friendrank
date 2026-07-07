import Link from "next/link";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";
import { LandingPageFaq } from "@/components/landing-pages/landing-page-faq";
import { FriendRankBrand } from "@/components/friend-rank-brand";
import { SemanticBreadcrumbs } from "@/components/shared/semantic-breadcrumbs";
import { SiteAuthorityFooter } from "@/components/shared/site-authority-footer";
import { EvergreenHubStructuredData } from "@/components/evergreen-hubs/evergreen-hub-structured-data";
import { CREATE_GAME_HREF } from "@/lib/landing-pages/content/cta-library";
import { buildHomeBreadcrumbItem } from "@/lib/seo/breadcrumbs";
import type {
  EvergreenHubPageData,
  EvergreenPillarPageData,
  EvergreenStandardHubPageData,
} from "@/lib/evergreen-hubs/types";

type EvergreenHubPageProps = {
  page: EvergreenHubPageData;
};

function isPillarPage(page: EvergreenHubPageData): page is EvergreenPillarPageData {
  return page.pageKind === "pillar";
}

function isStandardPage(
  page: EvergreenHubPageData,
): page is EvergreenStandardHubPageData {
  return page.pageKind !== "pillar";
}

function ComparisonSection({ page }: { page: EvergreenStandardHubPageData }) {
  const sectionId = page.comparisonSectionId ?? "evergreen-comparison";

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2
          id={`${sectionId}-heading`}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {page.comparisonTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
          {page.comparisonIntro}
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-slate-900/60">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-200">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-200">
                  Best for
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-200">
                  Setup
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-200">
                  Social payoff
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-200">
                  Browser-friendly
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/40">
              {page.comparisonRows.map((row) => (
                <tr key={row.type}>
                  <th scope="row" className="px-4 py-4 font-medium text-white">
                    {row.type}
                  </th>
                  <td className="px-4 py-4 text-slate-400">{row.bestFor}</td>
                  <td className="px-4 py-4 text-slate-400">{row.setup}</td>
                  <td className="px-4 py-4 text-slate-400">{row.socialPayoff}</td>
                  <td className="px-4 py-4 text-slate-400">{row.browserFriendly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FriendRankFitSection({ page }: { page: EvergreenHubPageData }) {
  return (
    <section
      id="where-friendrank-fits"
      aria-labelledby="where-friendrank-fits-heading"
      className="border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="where-friendrank-fits-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {page.friendRankFitTitle}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {page.friendRankFitParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ page }: { page: EvergreenStandardHubPageData }) {
  return (
    <section
      id="best-use-cases"
      aria-labelledby="best-use-cases-heading"
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="best-use-cases-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {page.useCasesTitle}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {page.useCases.map((useCase) => (
            <li
              key={useCase}
              className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-slate-300"
            >
              {useCase}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoryCardsSection({ page }: { page: EvergreenPillarPageData }) {
  const sectionId = page.categoryCardsSectionId ?? "browse-game-categories";

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2
          id={`${sectionId}-heading`}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {page.categoryCardsTitle}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.categoryCards.map((card) => {
            const cardContent = (
              <>
                <span aria-hidden="true" className="text-2xl">
                  {card.emoji}
                </span>
                <span className="mt-3 block text-base font-semibold text-white">
                  {card.title}
                </span>
                {card.comingSoon ? (
                  <span className="mt-2 inline-flex rounded-full border border-white/10 bg-slate-900/60 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                    Coming soon
                  </span>
                ) : null}
              </>
            );

            if (card.href && !card.comingSoon) {
              return (
                <li key={card.title}>
                  <Link
                    href={card.href}
                    className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-5 transition hover:border-violet-400/30 hover:bg-slate-900/60"
                  >
                    {cardContent}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={card.title}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/20 px-5 py-5 opacity-80"
              >
                {cardContent}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function FeaturedGuidesSection({ page }: { page: EvergreenPillarPageData }) {
  return (
    <section
      id="featured-guides"
      aria-labelledby="featured-guides-heading"
      className="border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2
          id="featured-guides-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {page.featuredGuidesTitle}
        </h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {page.featuredGuides.map((guide) => (
            <li
              key={guide.href}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-5"
            >
              <h3 className="text-lg font-semibold text-white">{guide.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {guide.description}
              </p>
              <Link
                href={guide.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition hover:text-violet-200"
              >
                Read guide
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HubSection({
  section,
}: {
  section: EvergreenHubPageData["sections"][number];
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id={`${section.id}-heading`}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {section.title}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {section.bullets && section.bullets.length > 0 ? (
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-400">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function EvergreenHubPage({ page }: EvergreenHubPageProps) {
  const breadcrumbs = [
    buildHomeBreadcrumbItem(),
    {
      name: page.title,
      path: `/${page.slug}`,
      position: 2,
    },
  ];

  const comparisonAfterUseCases =
    isStandardPage(page) && page.comparisonPlacement === "after-use-cases";
  const pillarPage = isPillarPage(page) ? page : null;
  const standardPage = isStandardPage(page) ? page : null;
  const [leadSection, ...remainingSections] = page.sections;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <EvergreenHubStructuredData page={page} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <FriendRankBrand href="/" />
        </div>
      </header>

      <SemanticBreadcrumbs items={breadcrumbs} />

      <main id="main-content" className="relative z-10">
        <section
          aria-labelledby="evergreen-hero-heading"
          className="mx-auto max-w-3xl px-6 pb-10 pt-16 text-center sm:pb-12 sm:pt-24"
        >
          <h1
            id="evergreen-hero-heading"
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            {page.title}
          </h1>
          <p
            id="evergreen-hero-lead"
            className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 sm:text-xl"
          >
            {page.heroLead}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LandingPageCta
              label={page.ctaLabel ?? "Create a free browser game"}
              href={CREATE_GAME_HREF}
              location="bottom_start"
              variant="primary"
              ariaLabel={
                page.ctaAriaLabel ?? "Create a free FriendRank browser party game"
              }
            />
            {page.secondaryCtaLabel && page.secondaryCtaHref ? (
              <LandingPageCta
                label={page.secondaryCtaLabel}
                href={page.secondaryCtaHref}
                location="bottom_start"
                variant="secondary"
                ariaLabel={page.secondaryCtaLabel}
              />
            ) : null}
          </div>
        </section>

        {pillarPage && leadSection ? <HubSection section={leadSection} /> : null}

        {pillarPage ? <CategoryCardsSection page={pillarPage} /> : null}

        {pillarPage
          ? remainingSections.map((section) => (
              <HubSection key={section.id} section={section} />
            ))
          : page.sections.map((section) => (
              <HubSection key={section.id} section={section} />
            ))}

        {pillarPage ? <FeaturedGuidesSection page={pillarPage} /> : null}

        {comparisonAfterUseCases || !standardPage ? null : (
          <ComparisonSection page={standardPage} />
        )}
        <FriendRankFitSection page={page} />
        {standardPage ? <UseCasesSection page={standardPage} /> : null}
        {comparisonAfterUseCases && standardPage ? (
          <ComparisonSection page={standardPage} />
        ) : null}

        <section
          id="related-friendrank-pages"
          aria-labelledby="related-friendrank-pages-heading"
          className="border-t border-white/5 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="related-friendrank-pages-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {page.internalLinksTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              {page.internalLinksIntro}
            </p>
            <ul className="mt-8 space-y-3">
              {page.internalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-base font-medium text-violet-300 transition hover:text-violet-200"
                  >
                    {link.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <LandingPageFaq title={page.faqTitle} items={page.faq} />
      </main>

      <SiteAuthorityFooter />
    </div>
  );
}
