import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="rounded-3xl border border-white/10 bg-[#07090e]/95 p-10 shadow-[0_24px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl max-w-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-mono text-[11px] font-medium text-rose-400">
          <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
          404 // UNRESOLVED NODE
        </span>
        <h1 className="mt-4 text-[32px] font-bold text-foreground font-display">
          Artifact Not Found
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          The requested system node or telemetry record does not exist in the governed project registry.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-[13px] font-semibold text-background transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            ← Return to System Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
