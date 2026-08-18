import { canonicalEvidenceGraph } from "@/data/graph/canonicalGraph";

export function StandardsMatrix() {
  const standards = canonicalEvidenceGraph.standards;

  return (
    <section className="rounded-2xl border border-white/10 bg-[#08090e]/90 p-6 md:p-8 backdrop-blur-xl">
      <div className="flex flex-col gap-2 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
              FRAMEWORK ALIGNMENT MAPPING
            </span>
          </div>
          <h3 className="mt-1 text-[20px] font-bold text-foreground md:text-[24px] font-display">
            Industry Standards & Security Baseline Alignment
          </h3>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 font-mono text-[11px] text-amber-300">
          DISCLAIMER: TECHNICAL ALIGNMENT ONLY (NON-CERTIFIED)
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-muted">
        This matrix documents architectural alignment with recognized security and development frameworks.
        Framework alignment demonstrates adherence to engineering best practices and does not imply formal
        regulatory certification or external accredited compliance.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-muted">
              <th className="pb-3 pr-4">Framework / Standard</th>
              <th className="pb-3 pr-4">Control Ref</th>
              <th className="pb-3 pr-4">Control Name</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Architectural Implementation Proof</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-foreground">
            {standards.map((std) => (
              <tr key={`${std.standardId}-${std.controlId}`} className="transition-colors hover:bg-white/[0.02]">
                <td className="py-3.5 pr-4 font-semibold text-rose-400">
                  {std.frameworkName} <span className="text-muted font-mono text-[11px]">({std.version})</span>
                </td>
                <td className="py-3.5 pr-4 font-mono text-[12px] text-muted">
                  {std.controlId}
                </td>
                <td className="py-3.5 pr-4 font-medium text-foreground">
                  {std.controlName}
                </td>
                <td className="py-3.5 pr-4">
                  <span
                    className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                      std.alignmentStatus === "ALIGNED"
                        ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                    }`}
                  >
                    {std.alignmentStatus}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-[12px] leading-relaxed text-muted">
                  {std.alignmentRationale}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
