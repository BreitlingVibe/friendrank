import Link from "next/link";
import { CategoryHubStructuredData } from "@/components/discovery/category-hub-structured-data";
import { RelatedLinks } from "@/components/discovery/related-links";
import { SemanticBreadcrumbs } from "@/components/shared/semantic-breadcrumbs";
import { buildCategoryHubBreadcrumbItems } from "@/lib/discovery/category-hub-breadcrumbs";
import { buildCategoryHubDiscoverySections } from "@/lib/discovery/category-hub-discovery";
import type {
  CategoryHubContent,
  CategoryHubContentItem,
  CategoryHubContentSection,
  CategoryHubViewModel,
} from "@/lib/discovery/types";

type CategoryHubTemplateProps = {
  model: CategoryHubViewModel;
};

type ContentCardsProps = {
  section: CategoryHubContentSection;
  headingId: string;
  className?: string;
};

function ContentCards({ section, headingId, className = "" }: ContentCardsProps) {
  if (section.items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={headingId}
      className={`py-8 sm:py-10 ${className}`.trim()}
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 id={headingId} className="text-xl font-bold sm:text-2xl">
          {section.title}
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {section.items.map((item) => (
            <li key={item.title}>
              <ContentCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContentCard({ item }: { item: CategoryHubContentItem }) {
  return (
    <article className="h-full rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:p-5">
      <h3 className="font-semibold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {item.description}
      </p>
    </article>
  );
}

function CategoryHubIntro({
  content,
  hasStructuredSections,
}: {
  content: CategoryHubContent;
  hasStructuredSections: boolean;
}) {
  if (content.introduction.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={hasStructuredSections ? undefined : "category-hub-intro"}
      className="py-8 sm:py-10"
    >
      <div className="mx-auto max-w-3xl px-6">
        {hasStructuredSections ? null : (
          <h2 id="category-hub-intro" className="text-xl font-bold sm:text-2xl">
            Introduction
          </h2>
        )}
        <div
          className={`space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base ${
            hasStructuredSections ? "" : "mt-4"
          }`.trim()}
        >
          {content.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoryHubTemplate({ model }: CategoryHubTemplateProps) {
  const { category, content, related } = model;
  const breadcrumbs = buildCategoryHubBreadcrumbItems(model);
  const discovery = buildCategoryHubDiscoverySections(related);
  const hasStructuredSections = Boolean(content.useCases || content.benefits);

  const exploreTitle =
    content.exploreGamesTitle ??
    (discovery.showAdditionalPages
      ? "Related games"
      : `Explore ${category.title.toLowerCase()} games`);

  const additionalTitle =
    content.additionalPagesTitle ?? "More to explore";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <CategoryHubStructuredData model={model} />
      <SemanticBreadcrumbs items={breadcrumbs} className="max-w-3xl" />

      <header className="border-b border-white/5 bg-gradient-to-b from-violet-950/40 to-slate-950">
        <div className="mx-auto max-w-3xl px-6 py-10 text-center sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
            Category hub
          </p>
          <h1
            id="category-hub-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {category.title}
          </h1>
          <p
            id="category-hub-lead"
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-violet-100/90"
          >
            {category.description}
          </p>
        </div>
      </header>

      <CategoryHubIntro
        content={content}
        hasStructuredSections={hasStructuredSections}
      />

      {content.useCases ? (
        <ContentCards
          section={content.useCases}
          headingId="category-hub-use-cases"
          className="border-t border-white/5 bg-white/[0.02]"
        />
      ) : null}

      {content.benefits ? (
        <ContentCards
          section={content.benefits}
          headingId="category-hub-benefits"
          className="border-t border-white/5"
        />
      ) : null}

      {discovery.primaryGames.length > 0 ? (
        <RelatedLinks
          title={exploreTitle}
          links={discovery.primaryGames}
          explanation="Evergreen guides connected to this category."
          className="border-t border-white/5 bg-white/[0.02] py-8 sm:py-10"
        />
      ) : null}

      {discovery.showAdditionalPages ? (
        <RelatedLinks
          title={additionalTitle}
          links={discovery.additionalPages}
          explanation="Suggested next pages based on the discovery graph."
          className="border-t border-white/5 py-8 sm:py-10"
        />
      ) : null}

      {discovery.liveCategories.length > 0 ? (
        <RelatedLinks
          title="Related categories"
          links={discovery.liveCategories}
          className="border-t border-white/5 py-8 sm:py-10"
        />
      ) : null}

      {discovery.parentPillar ? (
        <RelatedLinks
          title="Parent pillar"
          links={[discovery.parentPillar]}
          className="border-t border-white/5 py-8 sm:py-10"
        />
      ) : null}

      <section
        aria-labelledby="category-hub-cta"
        className="border-t border-white/5 py-8 sm:py-10"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 id="category-hub-cta" className="text-xl font-bold sm:text-2xl">
            Ready to play?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Create a free FriendRank game and share one link with your group.
          </p>
          <div className="mt-6">
            <Link
              href={discovery.gameEntryPoint.href}
              className="inline-flex rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold shadow-lg shadow-violet-600/25 transition hover:from-violet-500 hover:to-cyan-500"
              aria-label={content.ctaAriaLabel ?? content.ctaLabel ?? "Create a free game"}
            >
              {content.ctaLabel ?? discovery.gameEntryPoint.title}
            </Link>
          </div>
        </div>
      </section>

      {content.faq.length > 0 ? (
        <section
          aria-labelledby="category-hub-faq"
          className="border-t border-white/5 py-8 sm:py-10"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2 id="category-hub-faq" className="text-xl font-bold sm:text-2xl">
              FAQ
            </h2>
            <dl className="mt-6 space-y-3">
              {content.faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-5"
                >
                  <dt className="font-semibold text-white">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}
    </div>
  );
}
