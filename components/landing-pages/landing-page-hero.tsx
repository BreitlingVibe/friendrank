import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";

type LandingPageHeroProps = {
  page: Pick<
    LandingPageData,
    "h1" | "heroSubtitle" | "primaryCta" | "secondaryCta" | "ctaLocation"
  >;
};

export function LandingPageHero({ page }: LandingPageHeroProps) {
  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center sm:pb-12 sm:pt-24"
    >
      <h1
        id="landing-hero-heading"
        className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
      >
        {page.h1}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
        {page.heroSubtitle}
      </p>
      <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        <LandingPageCta
          label={page.primaryCta.label}
          href={page.primaryCta.href}
          location={page.ctaLocation}
          variant="primary"
        />
        {page.secondaryCta ? (
          <LandingPageCta
            label={page.secondaryCta.label}
            href={page.secondaryCta.href}
            location={page.ctaLocation}
            variant="secondary"
          />
        ) : null}
      </div>
    </section>
  );
}
