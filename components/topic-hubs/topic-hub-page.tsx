import { applyTopicHubExperience } from "@/lib/landing-pages/topic-hub-experience";
import { assembleTopicHubPage } from "@/lib/topic-hubs/hub-page-data";
import type { TopicHub } from "@/lib/topic-hubs/hub-types";
import { CREATE_GAME_HREF } from "@/lib/landing-pages/content/cta-library";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";
import { FriendRankBrand } from "@/components/friend-rank-brand";
import { SemanticBreadcrumbs } from "@/components/shared/semantic-breadcrumbs";
import { SiteAuthorityFooter } from "@/components/shared/site-authority-footer";
import { TopicHubMainSections } from "@/components/topic-hubs/topic-hub-main-sections";
import { TopicHubStructuredData } from "@/components/topic-hubs/topic-hub-structured-data";

type TopicHubPageProps = {
  hub: TopicHub;
};

export function TopicHubPage({ hub }: TopicHubPageProps) {
  const page = applyTopicHubExperience(assembleTopicHubPage(hub));

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {page.content ? (
        <TopicHubStructuredData
          title={page.hub.title}
          slug={page.hub.slug}
          schemaDescription={page.content.schemaDescription}
          faq={page.faq}
          entityNavigation={page.entityNavigation}
        />
      ) : null}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <FriendRankBrand href="/" />
        </div>
      </header>

      <SemanticBreadcrumbs items={page.breadcrumbs} />

      <main id="main-content" className="relative z-10">
        <section
          aria-labelledby="topic-hub-hero-heading"
          className="mx-auto max-w-3xl px-6 pb-10 pt-16 text-center sm:pb-12 sm:pt-24"
        >
          <h1
            id="topic-hub-hero-heading"
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            {page.hub.title}
          </h1>
          <p
            id="topic-hub-hero-lead"
            className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 sm:text-xl"
          >
            {page.heroCopy.lead}
          </p>
          {page.heroCopy.paragraphs.length > 0 ? (
            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-left sm:text-center">
              {page.heroCopy.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-slate-400 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
          <div className="mt-10 flex justify-center">
            <LandingPageCta
              label="Create your game on FriendRank"
              href={CREATE_GAME_HREF}
              location={page.ctaLocation}
              variant="primary"
              ariaLabel="Create your game on FriendRank — start a free browser voting game"
            />
          </div>
        </section>

        <TopicHubMainSections page={page} />
      </main>

      <SiteAuthorityFooter />
    </div>
  );
}
