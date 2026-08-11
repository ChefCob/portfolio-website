import type { Project } from "@/data/projects";
import { AppleLink } from "./AppleLink";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const link = project.href ?? project.github;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-surface">
      <div
        className={`relative flex aspect-[16/10] items-end bg-gradient-to-br p-8 ${project.gradient}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.12)_0%,_transparent_50%)]" />
        <ul className="relative flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <h3 className="text-[24px] font-semibold tracking-tight text-foreground md:text-[28px]">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
          {project.description}
        </p>
        {link && (
          <div className="mt-6">
            <AppleLink href={link} external={link.startsWith("http")}>
              Learn more
            </AppleLink>
          </div>
        )}
      </div>
    </article>
  );
}
