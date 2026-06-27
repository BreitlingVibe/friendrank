import Image from "next/image";
import Link from "next/link";

type FriendRankBrandProps = {
  href?: string;
  className?: string;
};

export function FriendRankBrand({ href, className = "" }: FriendRankBrandProps) {
  const content = (
    <>
      <Image
        src="/icon-48.png"
        alt=""
        width={48}
        height={48}
        className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
        priority
      />
      <span className="font-semibold tracking-tight">FriendRank</span>
    </>
  );

  const classes = `flex items-center gap-2.5 ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
