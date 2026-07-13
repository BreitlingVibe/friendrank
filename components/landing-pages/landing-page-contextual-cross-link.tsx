import Link from "next/link";
import type { ContextualCrossLink } from "@/lib/landing-pages/contextual-cross-links";

type LandingPageContextualCrossLinkProps = {
  crossLink: ContextualCrossLink;
};

export function LandingPageContextualCrossLink({
  crossLink,
}: LandingPageContextualCrossLinkProps) {
  return (
    <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
      {crossLink.prefix}{" "}
      <Link
        href={crossLink.href}
        className="font-medium text-violet-300 underline decoration-violet-400/40 underline-offset-2 transition hover:text-violet-200"
      >
        {crossLink.label}
      </Link>
      .
    </p>
  );
}
