import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import { buildLandingPageBreadcrumbItems } from "@/lib/seo/breadcrumbs";
import { LandingPageStructuredData } from "@/components/landing-pages/landing-page-structured-data";
import { LandingPageHero } from "@/components/landing-pages/landing-page-hero";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";
import { LandingPageTrustSection } from "@/components/landing-pages/landing-page-trust-section";
import {
  LandingPageMainSections,
  getLandingPageRecommendationCopy,
} from "@/components/landing-pages/landing-page-main-sections";
import { LandingPageTailSections } from "@/components/landing-pages/landing-page-tail-sections";
import { SemanticBreadcrumbs } from "@/components/shared/semantic-breadcrumbs";
import { SiteAuthorityFooter } from "@/components/shared/site-authority-footer";
import { FriendRankBrand } from "@/components/friend-rank-brand";

type IntentLandingPageProps = {
  page: LandingPageData;
};

export function IntentLandingPage({ page }: IntentLandingPageProps) {
  const breadcrumbs = buildLandingPageBreadcrumbItems(page.slug, page.title);
  const recommendationCopy = getLandingPageRecommendationCopy(page);

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

      <SemanticBreadcrumbs items={breadcrumbs} />

      <main id="main-content" className="relative z-10">
        <LandingPageHero page={page} />

        <LandingPageMainSections page={page} />

        <LandingPageTailSections
          page={page}
          recommendationCopy={recommendationCopy}
        />

        <LandingPageTrustSection />

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
                label={page.contentVariation.cta.finalButtonLabel}
                href={page.primaryCta.href}
                location={page.ctaLocation}
                variant="primary"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteAuthorityFooter />
    </div>
  );
}
