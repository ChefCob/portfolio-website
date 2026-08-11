import { navItems, profile } from "@/data/profile";

export function Header() {
  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-black/[0.08]">
      <div className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-6">
        <a
          href="#"
          className="text-[14px] font-medium text-foreground/90 transition-opacity hover:opacity-70"
        >
          {profile.name}
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[12px] text-foreground/80 transition-opacity hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-[12px] text-link transition-opacity hover:opacity-70"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
