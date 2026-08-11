import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-12 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <Reveal>
          <h2 className="text-center text-[32px] font-semibold tracking-tight text-foreground md:text-[48px]">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-[17px] text-muted">
            Tools and platforms built for real-world security work.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={100 + i * 80}
              className={project.featured ? "md:col-span-2" : undefined}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
