import type { FormatComparison } from "@/lib/landing-pages/format-comparison";
import Link from "next/link";

type LandingPageFormatComparisonProps = {
  comparison: FormatComparison;
};

export function LandingPageFormatComparison({
  comparison,
}: LandingPageFormatComparisonProps) {
  return (
    <section
      aria-labelledby="landing-format-comparison-heading"
      className="border-t border-white/5 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="landing-format-comparison-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          {comparison.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          {comparison.body}
        </p>
        <p className="mt-6">
          <Link
            href={`/${comparison.siblingSlug}`}
            aria-label={comparison.siblingLabel}
            className="inline-flex rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:border-violet-400/45 hover:text-white"
          >
            {comparison.siblingLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
