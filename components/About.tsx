import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-12 bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <Reveal>
          <h2 className="text-center text-[32px] font-semibold tracking-tight text-foreground md:text-[48px]">
            About
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[19px] leading-relaxed text-muted md:text-[21px]">
            {profile.bio}
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {profile.highlights.map((item, i) => (
            <Reveal key={item.title} delay={150 + i * 80}>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="text-[19px] font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
