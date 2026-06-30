import Link from "next/link";
import { AUTHORITY_FOOTER_DESCRIPTION } from "@/lib/seo/trust-content";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import { getHubBrowseLabel } from "@/lib/landing-pages/link-labels";

export function SiteAuthorityFooter() {
  const hubs = getAllHubDefinitions();

  return (
    <footer
      role="contentinfo"
      className="relative z-10 border-t border-white/5 py-10 sm:py-12"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm leading-relaxed text-slate-500">
          {AUTHORITY_FOOTER_DESCRIPTION}
        </p>
        <nav
          aria-label="FriendRank game categories"
          className="mt-6"
        >
          <ul className="flex flex-wrap justify-center gap-3">
            {hubs.map((hub) => (
              <li key={hub.id}>
                <Link
                  href={`/${hub.slug}`}
                  aria-label={getHubBrowseLabel(hub.title, hub.slug)}
                  className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-violet-400/35 hover:text-slate-200 sm:text-sm"
                >
                  {hub.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-xs text-slate-600">
          <Link href="/" className="text-slate-500 transition hover:text-slate-300">
            FriendRank home
          </Link>
          {" · "}
          Free friend voting games in the browser
        </p>
      </div>
    </footer>
  );
}
