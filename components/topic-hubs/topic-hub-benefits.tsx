import type { HubBenefit } from "@/lib/topic-hubs/hub-content-types";

type TopicHubBenefitsProps = {
  title: string;
  benefits: HubBenefit[];
};

export function TopicHubBenefits({ title, benefits }: TopicHubBenefitsProps) {
  return (
    <section
      aria-labelledby="topic-hub-benefits-heading"
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="topic-hub-benefits-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 sm:p-6"
            >
              <h3 className="text-base font-semibold text-white">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
