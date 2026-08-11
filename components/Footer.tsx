import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.08] bg-surface px-6 py-5">
      <div className="mx-auto flex max-w-[980px] flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-[12px] text-muted">
          Copyright © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-muted transition-opacity hover:opacity-70"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-muted transition-opacity hover:opacity-70"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-[12px] text-muted transition-opacity hover:opacity-70"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
