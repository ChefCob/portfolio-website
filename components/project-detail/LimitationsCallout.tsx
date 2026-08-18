import type { DetailedProjectRecord } from "@/types/projectDetail";

interface LimitationsCalloutProps {
  limitations: DetailedProjectRecord["governedLimitations"];
  engineeringDecisions: DetailedProjectRecord["engineeringDecisions"];
}

export function LimitationsCallout({
  limitations,
  engineeringDecisions,
}: LimitationsCalloutProps) {
  return (
    <section className="py-6 space-y-10">
      {/* Limitations Block */}
      <div className="rounded-3xl border border-amber-500/30 bg-amber-950/10 p-7 sm:p-8 backdrop-blur-xl shadow-xs">
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/40 font-mono text-[12px] font-bold text-amber-400">
            !
          </span>
          <h2 className="text-[20px] font-bold tracking-tight text-foreground md:text-[24px] font-display">
            Known Engineering Limitations & Roadmap Boundaries
          </h2>
        </div>

        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          In adherence to CareerOS governance standards, technical boundaries
          and current development stages are transparently declared.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {limitations.map((limitation) => (
            <div
              key={limitation.area}
              className="rounded-2xl border border-amber-500/20 bg-[#090b10] p-5"
            >
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-400">
                {limitation.area}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {limitation.currentLimitation}
              </p>
              <div className="mt-4 border-t border-white/[0.06] pt-3 text-[12px]">
                <span className="font-mono text-[10px] font-semibold uppercase text-amber-400">
                  Target Roadmap:
                </span>
                <span className="block mt-0.5 text-[12px] text-muted">
                  {limitation.mitigationOrRoadmap}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Decisions & Trade-offs */}
      <div>
        <h2 className="text-[20px] font-bold tracking-tight text-foreground md:text-[24px] font-display">
          Key Engineering Decisions & Architectural Trade-offs
        </h2>
        <p className="mt-1 text-[14px] text-muted">
          Deliberate system design choices balancing embedded constraints and
          developer ergonomics.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {engineeringDecisions.map((decision) => (
            <div
              key={decision.decision}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#08090e]/90 p-5 backdrop-blur-xl transition-colors hover:border-white/20"
            >
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Design Decision
                </span>
                <h3 className="mt-1 text-[15px] font-bold text-foreground font-display">
                  {decision.decision}
                </h3>

                <div className="mt-3 text-[13px]">
                  <span className="font-mono text-[11px] font-medium text-foreground">Rationale:</span>
                  <p className="mt-0.5 text-muted leading-relaxed">
                    {decision.rationale}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-white/[0.06] pt-3 text-[12px]">
                <span className="font-mono text-[10px] font-semibold uppercase text-rose-400">
                  Accepted Trade-off:
                </span>
                <p className="mt-0.5 text-muted leading-relaxed">
                  {decision.tradeoff}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
