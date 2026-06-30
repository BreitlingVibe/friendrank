import type { HowToPlayContent } from "@/lib/landing-pages/content/how-to-play-library";

type LandingPageHowToPlayProps = {
  content: HowToPlayContent;
};

export function LandingPageHowToPlay({ content }: LandingPageHowToPlayProps) {
  return (
    <section
      aria-labelledby="landing-how-to-play-heading"
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="landing-how-to-play-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {content.title}
        </h2>
        <ol className="mt-8 space-y-6">
          {content.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-sm font-semibold text-violet-300"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
