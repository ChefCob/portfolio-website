"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-muted hover:bg-white/10 hover:text-white transition-colors"
    >
      Print / Save PDF
    </button>
  );
}
