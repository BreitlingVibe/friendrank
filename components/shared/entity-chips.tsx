import Link from "next/link";
import type { LandingPageEntityRef } from "@/lib/entities/entity-utils";

type EntityChipsProps = {
  entities: LandingPageEntityRef[];
  labelledBy?: string;
};

export function EntityChips({ entities, labelledBy }: EntityChipsProps) {
  if (entities.length === 0) {
    return null;
  }

  return (
    <ul
      aria-labelledby={labelledBy}
      className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2"
    >
      {entities.map((entity) => (
        <li key={entity.id}>
          <Link
            href={entity.href}
            aria-label={`Explore ${entity.name} — ${entity.entityType}`}
            className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/15 hover:text-white sm:text-sm"
          >
            {entity.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
