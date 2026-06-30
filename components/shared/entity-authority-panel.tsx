import type { EntityAuthorityPanel } from "@/lib/entities/entity-authority";

type EntityAuthorityPanelProps = {
  panel: EntityAuthorityPanel;
  headingId: string;
  summary?: string | null;
  summaryId?: string;
};

export function EntityAuthorityPanelSection({
  panel,
  headingId,
  summary,
  summaryId,
}: EntityAuthorityPanelProps) {
  if (panel.bullets.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-white/5 bg-white/[0.02] py-10 sm:py-12"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id={headingId}
          className="text-center text-lg font-semibold tracking-tight text-slate-300 sm:text-xl"
        >
          {panel.title}
        </h2>

        {summary ? (
          <p
            id={summaryId}
            className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-500 sm:text-base"
          >
            {summary}
          </p>
        ) : null}

        <ul
          aria-describedby={summary ? summaryId : undefined}
          className="mx-auto mt-6 max-w-2xl space-y-3"
        >
          {panel.bullets.map((bullet) => (
            <li key={bullet.text} className="flex gap-3">
              <span
                className="mt-0.5 shrink-0 text-sm text-emerald-500/80"
                aria-hidden="true"
              >
                ✓
              </span>
              <p className="text-sm leading-relaxed text-slate-400">
                {bullet.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
