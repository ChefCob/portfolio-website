import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-background px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-[13px] text-muted font-mono">
          © {year} {profile.name}. CareerOS Presentation & Conversion Layer.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-[13px] text-muted transition-colors hover:text-foreground"
          >
            Email
          </a>
          <a
            href="#projects"
            className="text-[13px] text-muted transition-colors hover:text-foreground"
          >
            Projects
          </a>
        </div>
      </div>
    </footer>
  );
}
