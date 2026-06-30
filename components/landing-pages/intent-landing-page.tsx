import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import { LandingPageStructuredData } from "@/components/landing-pages/landing-page-structured-data";
import { LandingPageExamples } from "@/components/landing-pages/landing-page-examples";
import { LandingPageFaq } from "@/components/landing-pages/landing-page-faq";
import { LandingPageHero } from "@/components/landing-pages/landing-page-hero";
import { LandingPageRelated } from "@/components/landing-pages/landing-page-related";
import { LandingPagePopularSearches } from "@/components/landing-pages/landing-page-popular-searches";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";
import { LandingPageTrustStrip } from "@/components/landing-pages/landing-page-trust-strip";
import { FriendRankBrand } from "@/components/friend-rank-brand";

const TRUST_POINTS = [
  "✓ Anonymous voting",
  "✓ No signup required",
  "✓ Ready in under a minute",
] as const;

type IntentLandingPageProps = {
  page: LandingPageData;
};

export function IntentLandingPage({ page }: IntentLandingPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <LandingPageStructuredData page={page} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <FriendRankBrand href="/" />
        </div>
      </header>

      <main className="relative z-10">
        <LandingPageHero page={page} />
        <LandingPageTrustStrip points={[...TRUST_POINTS]} />

        <section
          aria-labelledby="landing-intent-heading"
          className="py-16 sm:py-20"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="landing-intent-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {page.intentSummaryTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              {page.intentSummary}
            </p>
          </div>
        </section>

        <section
          aria-labelledby="landing-why-heading"
          className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2
              id="landing-why-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {page.whyFriendRankTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {page.whyFriendRank.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span
                    className="mt-0.5 shrink-0 text-sm text-slate-500"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="landing-play-heading"
          className="border-t border-white/5 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2
              id="landing-play-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {page.playImmediatelyTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
              {page.playImmediatelyBody}
            </p>
            <div className="mt-8">
              <LandingPageCta
                label={page.primaryCta.label}
                href={page.primaryCta.href}
                location={page.ctaLocation}
                variant="primary"
              />
            </div>
          </div>
        </section>

        <LandingPageExamples
          questionsTitle={page.exampleQuestionsTitle}
          questionsIntro={page.exampleQuestionsIntro}
          questions={page.exampleQuestions}
          resultsTitle={page.exampleResultsTitle}
          results={page.exampleResults}
        />

        <LandingPageFaq title={page.faqTitle} items={page.faq} />

        <LandingPageRelated
          title={page.youMayAlsoLikeTitle}
          pages={page.youMayAlsoLike}
          headingId="landing-you-may-also-like-heading"
        />

        <LandingPageRelated
          title={page.relatedPagesTitle}
          pages={page.relatedPages}
        />

        <LandingPagePopularSearches
          title={page.popularSearchesTitle}
          links={page.popularSearches}
        />

        <section
          aria-labelledby="landing-final-cta-heading"
          className="border-t border-white/5 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2
              id="landing-final-cta-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {page.finalCtaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              {page.finalCtaSubtitle}
            </p>
            <div className="mt-8">
              <LandingPageCta
                label={page.primaryCta.label}
                href={page.primaryCta.href}
                location={page.ctaLocation}
                variant="primary"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-600">
          <p>
            <a href="/" className="text-slate-500 transition hover:text-slate-300">
              FriendRank
            </a>
            {" · "}
            Free friend voting games in the browser
          </p>
        </div>
      </footer>
    </div>
  );
}
