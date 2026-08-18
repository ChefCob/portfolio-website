import Link from "next/link";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24 text-center">
      {/* Top Subtle Tactical Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-[radial-gradient(circle,_rgba(225,29,72,0.12)_0%,_rgba(245,158,11,0.04)_40%,_transparent_70%)] blur-3xl"
      />

      {/* Security Status Pill */}
      <div className="animate-stealth-1 relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0c12]/80 px-3.5 py-1.5 backdrop-blur-md">
        <span className="size-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
        <span className="font-mono text-[11px] font-medium tracking-wider text-muted uppercase">
          WIRELESS PROTOCOLS, PACKET DISSECTION & CRYPTOGRAPHIC SYSTEMS
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="animate-stealth-2 relative mt-6 max-w-4xl text-[44px] font-bold leading-[1.06] text-foreground sm:text-[64px] md:text-[80px] font-display">
        {profile.headline.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>

      {/* Tagline */}
      <p className="animate-stealth-3 relative mt-6 max-w-2xl text-[18px] font-normal leading-relaxed text-muted md:text-[21px]">
        {profile.tagline}
      </p>

      {/* Action Buttons */}
      <div className="animate-stealth-3 relative mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[14px] font-semibold text-background transition-all hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
        >
          Explore Verified Projects →
        </a>
        <a
          href="#career-intelligence"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#08090e] px-6 py-3 text-[14px] font-semibold text-foreground backdrop-blur-md transition-all hover:border-rose-500/50 hover:bg-white/[0.04] hover:scale-[1.02]"
        >
          Intelligence Tree
        </a>
      </div>

      {/* Tactical Live Evidence & Ingestion HUD (Replaces Mac window) */}
      <div className="animate-stealth-3 relative mt-14 w-full max-w-5xl rounded-3xl border border-white/10 bg-[#07090e]/95 p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-left">
        {/* Top HUD Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground">
              CAREEROS LIVE EVIDENCE FEED
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-muted">
            <span>STREAMS: <strong className="text-foreground">802.11 / PCAP</strong></span>
            <span>HARDWARE: <strong className="text-foreground">RP2040 PICO W</strong></span>
            <span>STATUS: <strong className="text-emerald-400">VERIFIED</strong></span>
          </div>
        </div>

        {/* HUD Capability Cards Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Card 1: Pi-Sniffer */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#0b0d14] p-5 transition-all hover:border-rose-500/40">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-rose-400 uppercase">
                  DEMONSTRATED PROTOTYPE
                </span>
                <span className="font-mono text-[10px] text-muted">
                  EVIDENCE_ID: EV-PI-SNIFFER-PCAP
                </span>
              </div>

              <h3 className="mt-2 text-[17px] font-bold text-foreground font-display">
                Pi-Sniffer 802.11 Analyzer
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">
                Generator-based offline 802.11 stream dissector with delta-delay pacing and MicroPython OLED telemetry.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
              <span className="font-mono text-[12px] font-bold text-rose-400">
                1,093 packets parsed
              </span>
              <Link
                href="/projects/pi-sniffer"
                className="font-mono text-[11px] font-semibold text-foreground hover:text-rose-400 transition-colors"
              >
                Inspect Case Study ↗
              </Link>
            </div>
          </div>

          {/* Card 2: Organ Donation Security Protocol */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#0b0d14] p-5 transition-all hover:border-rose-500/40">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-amber-400 uppercase">
                  CRYPTOGRAPHIC PROTOCOL
                </span>
                <span className="font-mono text-[10px] text-muted">
                  EVIDENCE_ID: EV-ORGAN-CRYPTO
                </span>
              </div>

              <h3 className="mt-2 text-[17px] font-bold text-foreground font-display">
                Tamper-Resilient Record Chaining
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">
                SHA-256 block hash chaining and Fernet payload encryption integrated with Solidity smart contract event receipts.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
              <span className="font-mono text-[12px] font-bold text-amber-400">
                AES/Fernet + SHA-256
              </span>
              <a
                href="#projects"
                className="font-mono text-[11px] font-semibold text-foreground hover:text-amber-400 transition-colors"
              >
                View Protocol Specs ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Availability & Location */}
      <p className="relative mt-8 font-mono text-[12px] text-muted">
        STATUS: {profile.availability.toUpperCase()} // REGION: {profile.location.toUpperCase()}
      </p>
    </section>
  );
}
