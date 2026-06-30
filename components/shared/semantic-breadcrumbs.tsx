import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

type SemanticBreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function SemanticBreadcrumbs({
  items,
  className = "",
}: SemanticBreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`mx-auto max-w-6xl px-6 py-3 ${className}`.trim()}
    >
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500 sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.path}-${item.position}`} className="flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-1.5 text-slate-600">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-slate-400">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="transition hover:text-slate-300"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
