import type { ProjectCapabilityClaim } from "@/types/claims";
import type { EvidenceArtifact } from "@/types/evidence";

interface CapabilityMatrixTableProps {
  claims: ProjectCapabilityClaim[];
  evidence: EvidenceArtifact[];
  onInspectEvidence: (artifact: EvidenceArtifact) => void;
}

export function CapabilityMatrixTable({
  claims,
  evidence,
  onInspectEvidence,
}: CapabilityMatrixTableProps) {
  const getStatusBadge = (status: ProjectCapabilityClaim["status"]) => {
    switch (status) {
      case "verified_implemented":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Verified in Source
          </span>
        );
      case "demonstrated":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 font-mono text-[10px] font-medium text-rose-400">
            <span className="size-1.5 rounded-full bg-rose-400" />
            Demonstrated
          </span>
        );
      case "documented_only":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-medium text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-400" />
            Documented Only
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-500/10 border border-neutral-500/20 px-2.5 py-0.5 font-mono text-[10px] font-medium text-neutral-400">
            <span className="size-1.5 rounded-full bg-neutral-400" />
            Roadmap Target
          </span>
        );
    }
  };

  const handleInspectClick = (evidenceRef: string) => {
    const matchedArtifact = evidence.find((a) => a.id === evidenceRef);
    if (matchedArtifact) {
      onInspectEvidence(matchedArtifact);
    }
  };

  return (
    <section className="py-6">
      <div className="mb-6">
        <h2 className="text-[24px] font-bold tracking-tight text-foreground md:text-[30px] font-display">
          Governed Capability & Verification Matrix
        </h2>
        <p className="mt-1 text-[14px] text-muted">
          Claims registered with explicit evidence classification and direct
          source code symbol mapping.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#07090e]/95 backdrop-blur-2xl shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-white/[0.08] bg-white/[0.02] font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Capability & Specification
                </th>
                <th scope="col" className="px-6 py-4">
                  Security Domain / Methodology
                </th>
                <th scope="col" className="px-6 py-4">
                  Governed Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Source Location
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Evidence Proof
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {claims.map((claim) => (
                <tr
                  key={claim.id}
                  className="transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-foreground font-display">
                      {claim.name}
                    </span>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted max-w-sm">
                      {claim.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">
                      {claim.securityDomain}
                    </span>
                    <span className="block font-mono text-[11px] text-muted">
                      {claim.methodology}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {getStatusBadge(claim.status)}
                  </td>
                  <td className="px-6 py-4">
                    {claim.sourceLocation ? (
                      <div className="space-y-0.5 font-mono text-[11px]">
                        <span className="text-muted">
                          {claim.sourceLocation.sourceFile}
                        </span>
                        {claim.sourceLocation.keySymbols.length > 0 && (
                          <span className="block font-semibold text-rose-400">
                            {claim.sourceLocation.keySymbols[0]}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted font-mono text-[11px]">—</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleInspectClick(claim.primaryEvidenceRef)}
                      aria-label={`Inspect evidence for ${claim.name}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 font-mono text-[11px] font-semibold text-rose-300 transition-colors hover:bg-rose-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                    >
                      Inspect Evidence ↗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
