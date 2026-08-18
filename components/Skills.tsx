import { skills } from "@/data/skills";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 bg-background px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0a0c12] px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-rose-400 backdrop-blur-md">
              CORE CAPABILITIES
            </span>
            <h2 className="mt-4 text-[36px] font-bold tracking-tight text-foreground md:text-[52px] font-display">
              Skills & Methodologies
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-muted">
              Engineering disciplines grounded in verified repository implementations.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={100 + i * 80} className="h-full flex flex-col">
              <div className="flex flex-col justify-between h-full rounded-3xl border border-white/10 bg-[#08090e]/90 p-8 shadow-xs backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-[#0c0e16]">
                <div>
                  <h3 className="text-[18px] font-semibold text-foreground font-display">
                    {group.category}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {group.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2.5 text-[14px] text-foreground/90 font-medium"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
