import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import { LandingPageStructuredData } from "@/components/landing-pages/landing-page-structured-data";
import { LandingPageExamples } from "@/components/landing-pages/landing-page-examples";
import { LandingPageFaq } from "@/components/landing-pages/landing-page-faq";
import { LandingPageHero } from "@/components/landing-pages/landing-page-hero";
import { LandingPageRelated } from "@/components/landing-pages/landing-page-related";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";
import { FriendRankBrand } from "@/components/friend-rank-brand";

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

        <section
          aria-labelledby="landing-intent-heading"
          className="border-t border-white/5 py-16 sm:py-20"
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
            <ul className="mt-10 space-y-5">
              {page.whyFriendRank.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 sm:p-6"
                >
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
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
          questions={page.exampleQuestions}
          resultsTitle={page.exampleResultsTitle}
          results={page.exampleResults}
        />

        <LandingPageFaq title={page.faqTitle} items={page.faq} />

        <LandingPageRelated
          title={page.relatedPagesTitle}
          pages={page.relatedPages}
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
