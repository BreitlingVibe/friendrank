type FriendRankSectionAnnotationProps = {
  text: string;
  className?: string;
};

export function FriendRankSectionAnnotation({
  text,
  className = "",
}: FriendRankSectionAnnotationProps) {
  return (
    <p
      className={`mt-0.5 text-[10px] font-normal normal-case tracking-normal text-slate-500/70 ${className}`.trim()}
    >
      ✓ {text}
    </p>
  );
}
