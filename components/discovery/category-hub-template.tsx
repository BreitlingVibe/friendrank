import Link from "next/link";
import { CategoryHubStructuredData } from "@/components/discovery/category-hub-structured-data";
import { RelatedLinks, RelatedLinksGroup } from "@/components/discovery/related-links";
import type { CategoryHubViewModel } from "@/lib/discovery/types";

type CategoryHubTemplateProps = {
  model: CategoryHubViewModel;
};

export function CategoryHubTemplate({ model }: CategoryHubTemplateProps) {
  const { category, content, related } = model;
  const ctaLabel = content.ctaLabel ?? "Create a free game";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <CategoryHubStructuredData model={model} />
      <header className="border-b border-white/5 bg-gradient-to-b from-violet-950/40 to-slate-950">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center sm:py-16">
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
          <div className="mt-8">
            <Link
              href={related.gameEntryPoint.href}
              className="inline-flex rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold shadow-lg shadow-violet-600/25 transition hover:from-violet-500 hover:to-cyan-500"
              aria-label={content.ctaAriaLabel ?? ctaLabel}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </header>

      <section aria-labelledby="category-hub-intro" className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 id="category-hub-intro" className="text-xl font-bold sm:text-2xl">
            Introduction
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            {content.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        title="Related games"
        links={related.relatedEvergreenPages}
        explanation="Evergreen guides connected to this category."
      />

      <RelatedLinks
        title="Related articles"
        links={related.recommendedNextPages}
        explanation="Suggested next pages based on the discovery graph."
      />

      <RelatedLinksGroup
        pillars={related.relatedPillar ? [related.relatedPillar] : []}
        categories={related.relatedCategories}
      />

      <section
        aria-labelledby="category-hub-cta"
        className="border-t border-white/5 py-12 sm:py-16"
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
              href={related.gameEntryPoint.href}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold transition hover:bg-white/10"
            >
              {related.gameEntryPoint.title}
            </Link>
          </div>
        </div>
      </section>

      {content.faq.length > 0 ? (
        <section
          aria-labelledby="category-hub-faq"
          className="border-t border-white/5 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-3xl px-6">
            <h2 id="category-hub-faq" className="text-xl font-bold sm:text-2xl">
              FAQ
            </h2>
            <dl className="mt-8 space-y-4">
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
