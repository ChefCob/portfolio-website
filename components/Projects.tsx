import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 bg-background px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0a0c12] px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-rose-400 backdrop-blur-md">
              EVIDENCE-BACKED SYSTEMS
            </span>
            <h2 className="mt-4 text-[36px] font-bold tracking-tight text-foreground md:text-[52px] font-display">
              Projects & Prototypes
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-muted">
              Embedded scanners, protocol analyzers, and cryptographic security systems.
            </p>
          </div>
        </Reveal>

        {/* Balanced Equal-Height 2-Column Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={100 + i * 80}
              className="h-full flex flex-col"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
