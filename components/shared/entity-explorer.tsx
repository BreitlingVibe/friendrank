import type { EntityNavigation } from "@/lib/entities/entity-navigation";
import { EntityChips } from "@/components/shared/entity-chips";

type EntityExplorerProps = {
  navigation: EntityNavigation;
  headingId: string;
  intro?: string;
};

export function EntityExplorer({
  navigation,
  headingId,
  intro,
}: EntityExplorerProps) {
  if (navigation.groups.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-white/5 py-10 sm:py-12"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2
            id={headingId}
            className="text-lg font-semibold tracking-tight text-slate-300 sm:text-xl"
          >
            {navigation.title}
          </h2>
          {intro ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="mt-8 space-y-6">
          {navigation.groups.map((group) => (
            <div key={group.groupKey}>
              <h3 className="text-center text-sm font-medium text-slate-500">
                {group.label}
              </h3>
              <EntityChips
                entities={group.chips}
                labelledBy={headingId}
                compact
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
