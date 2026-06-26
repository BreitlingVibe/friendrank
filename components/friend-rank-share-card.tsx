import type { CSSProperties, ReactNode } from "react";
import type {
  ShareCardFormat,
  ShareCardPresentation,
  ShareCardRoleBlock,
} from "@/lib/share/share-card-presentation";
import { SHARE_CARD_DIMENSIONS } from "@/lib/share/share-card-presentation";

export type FriendRankShareCardProps = {
  data: ShareCardPresentation;
  format?: ShareCardFormat;
  className?: string;
  style?: CSSProperties;
};

function ShareCardBrand() {
  return (
    <header className="friendrank-share-card__brand">
      <div className="friendrank-share-card__logo-mark" aria-hidden>
        FR
      </div>
      <p className="friendrank-share-card__wordmark">FriendRank</p>
    </header>
  );
}

function ShareCardHero({
  emoji,
  label,
  winner,
  compact,
}: ShareCardPresentation["hero"] & { compact: boolean }) {
  return (
    <section className="friendrank-share-card__hero" aria-label={label}>
      <p className="friendrank-share-card__hero-emoji" aria-hidden>
        {emoji}
      </p>
      <h1
        className={`friendrank-share-card__hero-winner${compact ? " friendrank-share-card__hero-winner--compact" : ""}`}
      >
        {winner}
      </h1>
      <p className="friendrank-share-card__hero-label">{label}</p>
    </section>
  );
}

function ShareCardRoleBlock({
  role,
  compact,
}: {
  role: ShareCardRoleBlock;
  compact: boolean;
}) {
  return (
    <article className="friendrank-share-card__role">
      <p className="friendrank-share-card__role-emoji" aria-hidden>
        {role.emoji}
      </p>
      <p
        className={`friendrank-share-card__role-winner${compact ? " friendrank-share-card__role-winner--compact" : ""}`}
      >
        {role.winner}
      </p>
      <p className="friendrank-share-card__role-label">{role.label}</p>
    </article>
  );
}

function ShareCardSection({
  label,
  children,
  align = "left",
}: {
  label: string;
  children: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section
      className={`friendrank-share-card__section${align === "center" ? " friendrank-share-card__section--center" : ""}`}
    >
      <p className="friendrank-share-card__section-label">{label}</p>
      {children}
    </section>
  );
}

function ShareCardCta({ compact }: { compact: boolean }) {
  return (
    <footer className="friendrank-share-card__cta">
      <p className="friendrank-share-card__cta-rule" aria-hidden>
        ━━━━━━━━━━━━━━━━━━
      </p>
      <p
        className={`friendrank-share-card__cta-lead${compact ? " friendrank-share-card__cta-lead--compact" : ""}`}
      >
        Think your group would survive?
      </p>
      <p className="friendrank-share-card__cta-action">
        Create your own FriendRank.
      </p>
      <p className="friendrank-share-card__cta-url">friendrank.app</p>
      <p className="friendrank-share-card__cta-rule" aria-hidden>
        ━━━━━━━━━━━━━━━━━━
      </p>
    </footer>
  );
}

/**
 * Premium social share artifact — independent from the in-app results UI.
 * Fixed 1080px canvas; scale via parent transform for preview or export.
 */
export function FriendRankShareCard({
  data,
  format = "story",
  className = "",
  style,
}: FriendRankShareCardProps) {
  const { width, height } = SHARE_CARD_DIMENSIONS[format];
  const compact = format === "square";

  return (
    <article
      className={`friendrank-share-card friendrank-share-card--${format} ${className}`.trim()}
      style={{ width, height, ...style }}
      data-share-card-format={format}
      aria-label="FriendRank share card"
    >
      <div className="friendrank-share-card__backdrop" aria-hidden />
      <div className="friendrank-share-card__glow friendrank-share-card__glow--violet" aria-hidden />
      <div className="friendrank-share-card__glow friendrank-share-card__glow--cyan" aria-hidden />

      <div className="friendrank-share-card__content">
        <ShareCardBrand />
        <ShareCardHero {...data.hero} compact={compact} />

        {data.secondaryRoles.length > 0 && (
          <div className="friendrank-share-card__roles">
            {data.secondaryRoles.map((role) => (
              <ShareCardRoleBlock
                key={role.label}
                role={role}
                compact={compact}
              />
            ))}
          </div>
        )}

        <ShareCardSection label={data.dangerousCombo.sectionLabel}>
          <p
            className={`friendrank-share-card__combo-names${compact ? " friendrank-share-card__combo-names--compact" : ""}`}
          >
            {data.dangerousCombo.names}
          </p>
        </ShareCardSection>

        <ShareCardSection label={data.reputation.sectionLabel} align="center">
          <p
            className={`friendrank-share-card__reputation${compact ? " friendrank-share-card__reputation--compact" : ""}`}
          >
            {data.reputation.value}
          </p>
        </ShareCardSection>

        <ShareCardSection label={data.diagnosis.sectionLabel} align="center">
          <p
            className={`friendrank-share-card__diagnosis${compact ? " friendrank-share-card__diagnosis--compact" : ""}`}
          >
            {data.diagnosis.value}
          </p>
        </ShareCardSection>

        <ShareCardCta compact={compact} />
      </div>
    </article>
  );
}

export { buildShareCardPresentation } from "@/lib/share/share-card-presentation";
export type {
  ShareCardFormat,
  ShareCardPresentation,
} from "@/lib/share/share-card-presentation";
