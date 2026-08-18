import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isInternal = project.href.startsWith("/");

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#08090e]/90 backdrop-blur-2xl transition-all duration-300 hover:border-rose-500/50 hover:bg-[#0c0e16] hover:shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(225,29,72,0.12)] h-full">
      {/* Top Banner with Gradient Accent */}
      <div>
        <div
          className={`relative flex aspect-[16/9] items-end overflow-hidden bg-gradient-to-br p-6 sm:p-8 ${project.gradient}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.12)_0%,_transparent_60%)]" />

          {/* Telemetry Status Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/10">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_6px_rgba(244,63,94,1)]" />
            <span className="font-mono text-[10px] text-white/90">
              {project.slug === "pi-sniffer"
                ? "1,093 PACKETS VERIFIED"
                : project.slug === "agent-soc"
                  ? "LANGGRAPH REACT AGENT"
                  : "CRYPTOGRAPHIC PROTOCOL"}
            </span>
          </div>

          {/* Tech Stack Pills */}
          <ul className="relative flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] font-medium text-white/90 backdrop-blur-md ring-1 ring-white/10"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-8">
          <h3 className="text-[22px] font-bold tracking-tight text-foreground transition-colors group-hover:text-rose-400 sm:text-[26px] font-display">
            {project.title}
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        {isInternal ? (
          <Link
            href={project.href}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-rose-400 transition-colors hover:text-rose-300 hover:underline"
          >
            Inspect Evidence & Architecture →
          </Link>
        ) : (
          <a
            href={project.href}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-rose-400 transition-colors hover:text-rose-300 hover:underline"
          >
            View System Summary →
          </a>
        )}

        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {project.slug === "pi-sniffer" ? "DEMONSTRATED" : "PROTOTYPE"}
        </span>
      </div>
    </article>
  );
}
