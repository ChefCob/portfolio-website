import Link from "next/link";
import type { DetailedProjectRecord } from "@/types/projectDetail";

interface ProjectDetailHeroProps {
  project: DetailedProjectRecord;
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  return (
    <div className="border-b border-white/[0.08] bg-[#06070a] pb-16 pt-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-muted transition-colors hover:text-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            ← Back to System Overview
          </Link>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-muted">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 font-mono text-[11px] font-medium text-rose-400">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
            DEMONSTRATED PROTOTYPE
          </span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 font-mono text-[11px] font-medium text-emerald-400">
            100% EVIDENCE-BACKED
          </span>
        </div>

        {/* Title & Tagline */}
        <h1 className="mt-6 text-[38px] font-bold tracking-tight text-foreground md:text-[54px] font-display">
          {project.title}
        </h1>

        <p className="mt-3 text-[20px] font-medium leading-snug text-muted md:text-[24px]">
          {project.headline}
        </p>

        <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Target Roles Alignment */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted">
            Target Competency Alignment:
          </span>
          {project.targetRoles.map((role) => (
            <span
              key={role}
              className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-[12px] font-medium text-foreground"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Empirical Metrics Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.metrics?.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-white/10 bg-[#0a0c12]/90 p-5 shadow-xs backdrop-blur-xl transition-colors hover:border-rose-500/40"
            >
              <span className="block font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
                {m.label}
              </span>
              <span className="mt-1 block text-[28px] font-bold text-foreground font-display">
                {m.value}
              </span>
              {m.baseline && (
                <span className="block font-mono text-[11px] text-rose-400/80">
                  {m.baseline}
                </span>
              )}
            </div>
          ))}

          <div className="rounded-2xl border border-white/10 bg-[#0a0c12]/90 p-5 shadow-xs backdrop-blur-xl transition-colors hover:border-rose-500/40">
            <span className="block font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
              Execution Architecture
            </span>
            <span className="mt-1 block text-[28px] font-bold text-foreground font-display">
              {project.subsystems.length} Tiers
            </span>
            <span className="block font-mono text-[11px] text-muted">
              {project.architecture.deploymentModel.replace("_", " ")}
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0c12]/90 p-5 shadow-xs backdrop-blur-xl transition-colors hover:border-rose-500/40">
            <span className="block font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
              Linked Artifacts
            </span>
            <span className="mt-1 block text-[28px] font-bold text-foreground font-display">
              {project.evidence.length}
            </span>
            <span className="block font-mono text-[11px] text-emerald-400">verified proofs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
