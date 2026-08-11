import { skills } from "@/data/skills";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-12 bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <Reveal>
          <h2 className="text-center text-[32px] font-semibold tracking-tight text-foreground md:text-[48px]">
            Skills
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-[17px] text-muted">
            Core competencies across offensive security and reporting.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={100 + i * 80}>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="text-[19px] font-semibold text-foreground">
                  {group.category}
                </h3>
                <p className="mt-2 text-[14px] text-muted">{group.description}</p>
                <ul className="mt-6 space-y-3">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-[14px] text-foreground/80"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-link" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
