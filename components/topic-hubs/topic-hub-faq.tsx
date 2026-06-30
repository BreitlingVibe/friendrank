import type { HubFaqItem } from "@/lib/topic-hubs/hub-content-types";

type TopicHubFaqProps = {
  title: string;
  items: HubFaqItem[];
};

export function TopicHubFaq({ title, items }: TopicHubFaqProps) {
  return (
    <section
      aria-labelledby="topic-hub-faq-heading"
      className="border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="topic-hub-faq-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        <dl className="mt-10 space-y-6">
          {items.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 sm:p-6"
            >
              <dt className="text-base font-semibold text-white">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
