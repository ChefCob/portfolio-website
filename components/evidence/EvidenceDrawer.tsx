"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { EvidenceArtifact } from "@/types/evidence";

interface EvidenceDrawerProps {
  artifact: EvidenceArtifact | null;
  onClose: () => void;
}

export function EvidenceDrawer({ artifact, onClose }: EvidenceDrawerProps) {
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      // Focus trapping
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (artifact) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [artifact, onClose]);

  if (!artifact) return null;

  const handleCopySnippet = () => {
    if (artifact.previewSnippet) {
      navigator.clipboard.writeText(artifact.previewSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status: EvidenceArtifact["verificationStatus"]) => {
    switch (status) {
      case "verified_implemented":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            VERIFIED IN SOURCE
          </span>
        );
      case "demonstrated":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 font-mono text-[11px] font-medium text-rose-400">
            <span className="size-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
            DEMONSTRATED ON HARDWARE
          </span>
        );
      case "documented_only":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 font-mono text-[11px] font-medium text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-500" />
            DOCUMENTED (UNVERIFIED)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-500/10 border border-neutral-500/30 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-400">
            <span className="size-1.5 rounded-full bg-neutral-400" />
            ROADMAP TARGET
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="relative flex h-full w-full max-w-2xl flex-col bg-[#07080c] border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.95)] transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] p-6 bg-[#0a0c12]/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                EVIDENCE TELEMETRY
              </span>
              {getStatusBadge(artifact.verificationStatus)}
            </div>
            <h3
              id="drawer-title"
              className="text-[22px] font-bold text-foreground font-display"
            >
              {artifact.title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close evidence inspection drawer"
            className="flex size-10 items-center justify-center rounded-xl text-muted hover:bg-white/5 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Metadata Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e16] p-5 text-[13px]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block font-mono text-[10px] font-medium text-muted uppercase">
                  Repository Artifact Path
                </span>
                <span className="font-mono text-[12px] text-rose-400">
                  {artifact.filePath}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] font-medium text-muted uppercase">
                  Verification Date
                </span>
                <span className="font-mono text-foreground">{artifact.verifiedDate}</span>
              </div>
              {artifact.fileSizeBytes && (
                <div>
                  <span className="block font-mono text-[10px] font-medium text-muted uppercase">
                    Payload Size
                  </span>
                  <span className="font-mono text-foreground">
                    {(artifact.fileSizeBytes / 1024).toFixed(1)} KB (
                    {artifact.fileSizeBytes.toLocaleString()} bytes)
                  </span>
                </div>
              )}
              <div>
                <span className="block font-mono text-[10px] font-medium text-muted uppercase">
                  Classification
                </span>
                <span className="capitalize text-foreground font-mono">
                  {artifact.type.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Notes */}
          <div className="space-y-2">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
              Governance & Verification Assessment
            </h4>
            <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-5 text-[13px] leading-relaxed text-foreground">
              {artifact.verificationNotes}
            </div>
          </div>

          {/* Viewer: Hardware Photo (No priority anti-pattern on modal) */}
          {artifact.type === "hardware_photo" && artifact.assetPath && (
            <div className="space-y-2">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                Physical Hardware Execution Proof
              </h4>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-black">
                <Image
                  src={artifact.assetPath}
                  alt={artifact.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
              <p className="text-[12px] text-muted">{artifact.description}</p>
            </div>
          )}

          {/* Viewer: Preview Snippet / Log / Code */}
          {artifact.previewSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Recorded Stream Output
                </h4>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  aria-label="Copy snippet to clipboard"
                  className="font-mono text-[11px] font-medium text-rose-400 hover:underline focus:outline-none"
                >
                  <span aria-live="polite">{copied ? "✓ COPIED" : "COPY SNIPPET"}</span>
                </button>
              </div>
              <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#040508] p-5 font-mono text-[12px] leading-relaxed text-[#c9d1d9]">
                <code>{artifact.previewSnippet}</code>
              </pre>
            </div>
          )}

          {/* Viewer: PCAP Packet Trace Summary */}
          {artifact.type === "pcap" && (
            <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0c0e16] p-5">
              <h4 className="text-[15px] font-bold text-foreground font-display">
                802.11 Packet Capture Specification
              </h4>
              <ul className="space-y-2 text-[13px] text-muted">
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>Verified Stream Count:</span>
                  <span className="font-mono font-bold text-rose-400">
                    1,093 packets
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>Frame Anatomy:</span>
                  <span className="font-mono text-foreground text-[12px]">
                    Dot11Beacon, Dot11ProbeReq, Dot11ProbeResp, WPA Handshake
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <span>Replay Ingestion Model:</span>
                  <span className="font-mono text-emerald-400">
                    PcapReader generator (Streaming, Zero memory spike)
                  </span>
                </li>
              </ul>
              {artifact.assetPath && (
                <div className="pt-3">
                  <a
                    href={artifact.assetPath}
                    download
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-[13px] font-medium text-foreground hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 transition-colors"
                  >
                    ⬇ Download Sanitized Derivative Asset
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.08] bg-[#050608] p-4 text-center font-mono text-[11px] text-muted">
          GOVERNED VIA CAREEROS CANONICAL REGISTRY • PROVEN VIA UPSTREAM REPOSITORY
        </div>
      </div>
    </div>
  );
}
