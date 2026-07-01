import type { ContentBlockPresentation } from "@/lib/landing-pages/content-experience";
import type {
  ContentQualityBlock,
  LandingPageContentQuality,
  QuickSetupContent,
} from "@/lib/landing-pages/content-quality";

type LandingPageContentQualitySectionsProps = {
  contentQuality: LandingPageContentQuality;
};

export function SectionTransition({ text }: { text?: string }) {
  if (!text?.trim()) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pt-2">
      <p className="text-sm leading-relaxed text-slate-500">{text}</p>
    </div>
  );
}

export function ContentQualityBlockSection({
  block,
  headingId,
  transition,
  presentation = "bullets",
}: {
  block: ContentQualityBlock;
  headingId: string;
  transition?: string;
  presentation?: ContentBlockPresentation;
}) {
  if (block.paragraphs.length === 0 && block.bullets.length === 0) {
    return null;
  }

  const compact = presentation === "compact-checklist";
  const sectionClass = compact
    ? "border-t border-white/5 py-8 sm:py-10"
    : "border-t border-white/5 py-12 sm:py-16";

  return (
    <>
      <SectionTransition text={transition} />
      <section aria-labelledby={headingId} className={sectionClass}>
        <div className="mx-auto max-w-3xl px-6">
          <h2
            id={headingId}
            className={
              compact
                ? "text-lg font-semibold tracking-tight text-slate-300 sm:text-xl"
                : "text-xl font-bold tracking-tight sm:text-2xl"
            }
          >
            {block.title}
          </h2>
          {block.paragraphs.length > 0 ? (
            <div className={`${compact ? "mt-3 space-y-2" : "mt-4 space-y-3"}`}>
              {block.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={
                    compact
                      ? "text-sm leading-relaxed text-slate-400"
                      : "text-base leading-relaxed text-slate-400"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
          {block.bullets.length > 0 ? (
            <ul className={compact ? "mt-4 space-y-2" : "mt-5 space-y-2.5"}>
              {block.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className={`flex gap-3 leading-relaxed ${compact ? "text-xs sm:text-sm" : "text-sm"}`}
                >
                  <span
                    className="mt-0.5 shrink-0 text-slate-500"
                    aria-hidden="true"
                  >
                    {compact ? "✓" : "•"}
                  </span>
                  <span className="text-slate-400">{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </>
  );
}

export function QuickSetupCallout({ content }: { content: QuickSetupContent }) {
  return (
    <aside
      aria-labelledby="landing-quick-setup-heading"
      className="border-y border-white/5 bg-white/[0.02] py-8 sm:py-10"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="landing-quick-setup-heading"
          className="text-lg font-semibold tracking-tight text-slate-300"
        >
          {content.title}
        </h2>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {content.steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-lg border border-white/5 bg-slate-950/40 px-3 py-2.5 text-sm text-slate-400"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-semibold text-slate-300"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

export function LandingPageContentQualitySections({
  contentQuality,
}: LandingPageContentQualitySectionsProps) {
  return (
    <>
      <ContentQualityBlockSection
        block={contentQuality.goodFor}
        headingId="landing-good-for-heading"
      />
      <ContentQualityBlockSection
        block={contentQuality.whenToUse}
        headingId="landing-when-to-use-heading"
      />
      <ContentQualityBlockSection
        block={contentQuality.whatMakesDifferent}
        headingId="landing-different-heading"
      />
      <QuickSetupCallout content={contentQuality.quickSetup} />
    </>
  );
}

export function LandingPageGoodForSection({
  contentQuality,
}: LandingPageContentQualitySectionsProps) {
  return (
    <ContentQualityBlockSection
      block={contentQuality.goodFor}
      headingId="landing-good-for-heading"
    />
  );
}

export function LandingPageWhenAndDifferentSections({
  contentQuality,
}: LandingPageContentQualitySectionsProps) {
  return (
    <>
      <ContentQualityBlockSection
        block={contentQuality.whenToUse}
        headingId="landing-when-to-use-heading"
      />
      <ContentQualityBlockSection
        block={contentQuality.whatMakesDifferent}
        headingId="landing-different-heading"
      />
      <QuickSetupCallout content={contentQuality.quickSetup} />
    </>
  );
}
