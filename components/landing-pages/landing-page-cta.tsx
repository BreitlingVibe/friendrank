"use client";

import Link from "next/link";
import { trackCtaClicked, type CtaLocation } from "@/lib/analytics";

const primaryButtonClassName =
  "relative inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-xl shadow-violet-600/30 ring-1 ring-violet-400/35 transition duration-200 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/45 hover:ring-violet-400/55 active:scale-[0.99] motion-reduce:active:scale-100 sm:w-auto sm:min-w-[220px]";

const secondaryButtonClassName =
  "inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-8 py-3.5 text-sm font-medium text-slate-400 transition duration-200 hover:border-white/15 hover:bg-white/[0.03] hover:text-slate-200 sm:w-auto";

type LandingPageCtaProps = {
  label: string;
  href: string;
  location: CtaLocation;
  variant?: "primary" | "secondary";
  className?: string;
};

export function LandingPageCta({
  label,
  href,
  location,
  variant = "primary",
  className = "",
}: LandingPageCtaProps) {
  const isExternal = href.startsWith("http");
  const isHashLink = href.startsWith("#");
  const classes =
    variant === "primary"
      ? `${primaryButtonClassName} ${className}`.trim()
      : `${secondaryButtonClassName} ${className}`.trim();

  function handleClick() {
    if (!isHashLink) {
      trackCtaClicked({ location });
    }
  }

  if (isExternal) {
    return (
      <a href={href} onClick={handleClick} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={classes}>
      {label}
    </Link>
  );
}

export { primaryButtonClassName, secondaryButtonClassName };
