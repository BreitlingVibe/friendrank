type LandingPageTrustStripProps = {
  points: string[];
};

export function LandingPageTrustStrip({ points }: LandingPageTrustStripProps) {
  return (
    <div className="border-b border-white/5 py-4">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 text-xs text-slate-500 sm:text-sm">
        {points.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
    </div>
  );
}
