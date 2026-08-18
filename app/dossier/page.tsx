import type { Metadata } from "next";
import Link from "next/link";
import { canonicalEvidenceGraph } from "@/data/graph/canonicalGraph";
import { StandardsMatrix } from "@/components/standards/StandardsMatrix";
import { PrintButton } from "@/components/dossier/PrintButton";

export const metadata: Metadata = {
  title: "Executive & Technical Dossier — Saptarshi",
  description:
    "Evidence-backed executive dossier and technical competency matrix projected from the CareerOS canonical registry.",
};

export default function DossierPage() {
  const { projects, metrics, capabilities, adrs } = canonicalEvidenceGraph;
  const projectList = Object.values(projects).sort((a, b) => a.orderPriority - b.orderPriority);
  const metricList = Object.values(metrics);

  return (
    <div className="min-h-screen bg-[#030305] text-foreground print:bg-white print:text-black">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#030305]/80 backdrop-blur-xl px-6 py-4 print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[12px] font-semibold uppercase tracking-wider text-rose-400 hover:text-rose-300"
          >
            ← Return to Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 font-mono text-[11px] font-bold text-rose-400">
              EXECUTIVE DOSSIER PROJECTION
            </span>
            <PrintButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16 space-y-16">
        {/* Executive Header */}
        <section className="space-y-4 border-b border-white/[0.08] pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-400">
              CAREEROS CANONICAL PROJECTION
            </span>
            <span className="text-muted">•</span>
            <span className="font-mono text-[11px] text-muted">
              TARGET ROLES: SECURITY ENGINEER / PROTOCOL & EMBEDDED SYSTEMS
            </span>
          </div>

          <h1 className="text-[36px] font-bold tracking-tight md:text-[48px] font-display">
            Saptarshi — Executive Engineering Dossier
          </h1>

          <p className="max-w-3xl text-[16px] leading-relaxed text-muted">
            Evidence-backed technical dossier synthesizing wireless protocol engineering, low-footprint
            embedded firmware, cryptographic record layers, and autonomous AI security architectures.
            100% of capabilities listed below are verifiable against physical repository source code.
          </p>
        </section>

        {/* Empirical Benchmarks Summary */}
        <section className="space-y-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-400">
              VERIFIED TELEMETRY
            </span>
            <h2 className="text-[24px] font-bold tracking-tight md:text-[28px] font-display">
              Empirical Performance & Verification Metrics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricList.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-white/10 bg-[#08090e]/90 p-5 backdrop-blur-xl"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {m.label}
                </span>
                <p className="mt-2 text-[22px] font-bold text-foreground font-display">
                  {m.value}
                </p>
                <p className="mt-1 text-[12px] text-muted leading-relaxed">
                  {m.baseline}
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-400">
                    {m.verificationStatus.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {m.environment.split(" ")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Canonical Projects & Architectural Focus */}
        <section className="space-y-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-400">
              SYSTEMS PORTFOLIO
            </span>
            <h2 className="text-[24px] font-bold tracking-tight md:text-[28px] font-display">
              Core Systems & Demonstrated Competencies
            </h2>
          </div>

          <div className="space-y-6">
            {projectList.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-white/10 bg-[#08090e]/90 p-6 md:p-8 backdrop-blur-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      {proj.id} • {proj.maturity.toUpperCase()}
                    </span>
                    <h3 className="text-[20px] font-bold text-foreground md:text-[22px] font-display">
                      {proj.title}
                    </h3>
                  </div>

                  <Link
                    href={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-[12px] font-semibold text-rose-400 hover:text-rose-300 print:hidden"
                  >
                    Inspect Full Case Study ↗
                  </Link>
                </div>

                <p className="mt-4 text-[14px] leading-relaxed text-muted">
                  {proj.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {proj.componentIds.map((cId) => (
                    <span
                      key={cId}
                      className="rounded bg-white/5 border border-white/5 px-2.5 py-1 font-mono text-[11px] text-foreground"
                    >
                      {canonicalEvidenceGraph.components[cId]?.name || cId}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architectural Decisions (ADR) Summary */}
        <section className="space-y-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-400">
              ENGINEERING RIGOR
            </span>
            <h2 className="text-[24px] font-bold tracking-tight md:text-[28px] font-display">
              Architectural Decision Records (ADRs)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(adrs).map((adr) => (
              <div
                key={adr.id}
                className="rounded-2xl border border-white/10 bg-[#08090e]/90 p-5 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-rose-400 font-bold">
                      {adr.id}
                    </span>
                    <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                      {adr.status}
                    </span>
                  </div>

                  <h4 className="mt-2 text-[14px] font-bold text-foreground font-display">
                    {adr.title}
                  </h4>

                  <p className="mt-2 text-[12px] text-muted leading-relaxed">
                    {adr.decision}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <span className="font-mono text-[10px] text-muted block">
                    Approved Date: {adr.approvedDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Standards Alignment Matrix */}
        <StandardsMatrix />
      </main>
    </div>
  );
}
