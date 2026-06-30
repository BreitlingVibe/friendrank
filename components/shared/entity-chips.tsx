import Link from "next/link";
import type { EntityNavigationChip } from "@/lib/entities/entity-navigation";

type EntityChipsProps = {
  entities: EntityNavigationChip[];
  labelledBy?: string;
  describedBy?: string;
  compact?: boolean;
};

function chipClassName(compact?: boolean, clickable?: boolean): string {
  const size = compact
    ? "px-2.5 py-1 text-xs"
    : "px-3 py-1.5 text-xs sm:text-sm";

  if (clickable) {
    return `inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 font-medium text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/15 hover:text-white ${size}`;
  }

  return `inline-flex rounded-full border border-white/10 bg-white/[0.03] font-medium text-slate-400 ${size}`;
}

function buildChipAriaLabel(entity: EntityNavigationChip): string {
  if (entity.clickable && entity.href) {
    const destination =
      entity.linkKind === "hub"
        ? `topic hub for ${entity.name}`
        : `${entity.name} games`;

    return `Explore ${entity.name}, ${entity.entityType.toLowerCase()}. Opens ${destination}.`;
  }

  return `${entity.name}, ${entity.entityType.toLowerCase()}. Browse topic without a dedicated page link.`;
}

export function EntityChips({
  entities,
  labelledBy,
  describedBy,
  compact = false,
}: EntityChipsProps) {
  if (entities.length === 0) {
    return null;
  }

  return (
    <ul
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`flex flex-wrap items-center justify-center gap-2 ${compact ? "" : "mx-auto mt-6 max-w-2xl"}`}
    >
      {entities.map((entity) => (
        <li key={entity.id}>
          {entity.clickable && entity.href ? (
            <Link
              href={entity.href}
              aria-label={buildChipAriaLabel(entity)}
              className={chipClassName(compact, true)}
            >
              {entity.name}
            </Link>
          ) : (
            <span
              aria-label={buildChipAriaLabel(entity)}
              className={chipClassName(compact, false)}
            >
              {entity.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
