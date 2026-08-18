import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-background px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a0c12] to-[#040508] p-10 md:p-16 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-rose-400 backdrop-blur-md">
              DIRECT INQUIRY
            </span>
            <h2 className="mt-4 text-[36px] font-bold tracking-tight text-foreground md:text-[52px] font-display">
              Initiate Contact.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-muted md:text-[18px]">
              Available for high-stakes cybersecurity & AI engineering roles, technical advisory, and specialized offensive security assessments.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[14px] font-semibold text-background transition-all hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.4)]"
              >
                Transmit Email →
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#06070a] px-6 py-3 text-[14px] font-semibold text-foreground backdrop-blur-md transition-all hover:border-rose-500/40 hover:bg-white/[0.04]"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
