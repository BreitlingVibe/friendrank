import type { BestForTag } from "@/lib/landing-pages/best-for-tags";

type LandingPageBestForProps = {
  title: string;
  tags: BestForTag[];
};

export function LandingPageBestFor({ title, tags }: LandingPageBestForProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="landing-best-for-heading"
      className="border-t border-white/5 py-10 sm:py-12"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2
          id="landing-best-for-heading"
          className="text-center text-lg font-semibold tracking-tight text-slate-300 sm:text-xl"
        >
          {title}
        </h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <li key={tag.id}>
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400 sm:text-sm">
                {tag.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
