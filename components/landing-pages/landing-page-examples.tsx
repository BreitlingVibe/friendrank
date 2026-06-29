import type {
  LandingPageExampleQuestion,
  LandingPageExampleResult,
} from "@/lib/landing-pages/landing-page-types";

type LandingPageExamplesProps = {
  questionsTitle: string;
  questionsIntro: string;
  questions: LandingPageExampleQuestion[];
  resultsTitle: string;
  results: LandingPageExampleResult[];
};

export function LandingPageExamples({
  questionsTitle,
  questionsIntro,
  questions,
  resultsTitle,
  results,
}: LandingPageExamplesProps) {
  return (
    <>
      <section
        aria-labelledby="landing-example-results-heading"
        className="border-t border-white/5 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2
            id="landing-example-results-heading"
            className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {resultsTitle}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {results.map((result) => (
              <li
                key={result.title}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-5"
              >
                <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                  {result.emoji ? (
                    <span aria-hidden="true">{result.emoji}</span>
                  ) : null}
                  {result.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {result.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="example-questions"
        aria-labelledby="landing-example-questions-heading"
        className="scroll-mt-8 border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2
            id="landing-example-questions-heading"
            className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {questionsTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-slate-500">
            {questionsIntro}
          </p>
          <ul className="mt-10 space-y-3">
            {questions.map((question) => (
              <li
                key={question.text}
                className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3.5 text-sm text-slate-200 sm:text-base"
              >
                {question.text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
