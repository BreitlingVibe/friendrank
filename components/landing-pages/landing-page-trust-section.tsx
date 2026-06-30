import {
  TRUST_SECTION_ITEMS,
  TRUST_SECTION_TITLE,
} from "@/lib/seo/trust-content";

export function LandingPageTrustSection() {
  return (
    <section
      aria-labelledby="landing-trust-heading"
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="landing-trust-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {TRUST_SECTION_TITLE}
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {TRUST_SECTION_ITEMS.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 sm:p-6"
            >
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
