import type { EvidenceArtifact } from "@/types/evidence";

interface ArtifactCardProps {
  artifact: EvidenceArtifact;
  onInspect: (artifact: EvidenceArtifact) => void;
}

export function ArtifactCard({ artifact, onInspect }: ArtifactCardProps) {
  const getStatusBadge = (status: EvidenceArtifact["verificationStatus"]) => {
    switch (status) {
      case "verified_implemented":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Verified
          </span>
        );
      case "demonstrated":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 font-mono text-[10px] font-medium text-rose-400">
            <span className="size-1.5 rounded-full bg-rose-400" />
            Demonstrated
          </span>
        );
      case "documented_only":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-medium text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-400" />
            Documented
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-500/10 border border-neutral-500/20 px-2 py-0.5 font-mono text-[10px] font-medium text-neutral-400">
            <span className="size-1.5 rounded-full bg-neutral-400" />
            Roadmap
          </span>
        );
    }
  };

  const getTypeLabel = (type: EvidenceArtifact["type"]) => {
    switch (type) {
      case "pcap":
        return "Packet Capture";
      case "log_sample":
        return "Execution Log";
      case "hardware_photo":
        return "Hardware Photo";
      case "code_snippet":
        return "Source Routine";
      case "verification_doc":
        return "Audit Matrix";
      case "architecture_doc":
        return "Architecture Spec";
      default:
        return "Evidence Artifact";
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#08090e]/90 p-5 backdrop-blur-xl transition-all hover:border-rose-500/40 hover:bg-[#0c0e16]">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
            {getTypeLabel(artifact.type)}
          </span>
          {getStatusBadge(artifact.verificationStatus)}
        </div>

        <h4 className="mt-3 text-[15px] font-bold text-foreground group-hover:text-rose-400 transition-colors font-display">
          {artifact.title}
        </h4>

        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
          {artifact.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3 text-[12px]">
        <span className="font-mono text-[11px] text-muted">
          {artifact.fileSizeBytes
            ? `${(artifact.fileSizeBytes / 1024).toFixed(1)} KB`
            : artifact.filePath}
        </span>
        <button
          type="button"
          onClick={() => onInspect(artifact)}
          aria-label={`Inspect artifact ${artifact.title}`}
          className="font-mono text-[11px] font-semibold text-rose-400 hover:text-rose-300 hover:underline focus:outline-none focus:ring-1 focus:ring-rose-500 rounded"
        >
          Inspect Artifact →
        </button>
      </div>
    </div>
  );
}
