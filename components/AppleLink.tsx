type AppleLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  light?: boolean;
};

export function AppleLink({
  href,
  children,
  external,
  className = "",
  light,
}: AppleLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`apple-link inline-flex items-center gap-1 text-[17px] font-normal ${light ? "!text-[#2997ff] hover:!text-[#59aaff]" : ""} ${className}`}
    >
      {children}
      <span aria-hidden className="text-[14px]">
        ›
      </span>
    </a>
  );
}
