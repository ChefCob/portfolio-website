import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-background px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0a0c12] px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-rose-400 backdrop-blur-md">
              BACKGROUND & PHILOSOPHY
            </span>
            <h2 className="mt-4 text-[36px] font-bold tracking-tight text-foreground md:text-[52px] font-display">
              About
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[18px] leading-relaxed text-muted md:text-[21px]">
            {profile.bio}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {profile.highlights.map((item, i) => (
            <Reveal key={item.title} delay={150 + i * 80} className="h-full flex flex-col">
              <div className="flex flex-col justify-between h-full rounded-3xl border border-white/10 bg-[#08090e]/90 p-8 shadow-xs backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-[#0c0e16]">
                <div>
                  <div className="size-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-mono font-bold text-[13px]">
                    0{i + 1}
                  </div>
                  <h3 className="mt-5 text-[18px] font-semibold text-foreground font-display">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
