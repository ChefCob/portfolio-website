import { getAllProjects, detailedProjectRecords } from "@/data/registry";

export type Project = {
  title: string;
  slug: string;
  description: string;
  stack: string[];
  gradient: string;
  href: string;
  github?: string;
  featured?: boolean;
  hasDetailView: boolean;
};

// Derived from Canonical Project Registry (CareerOS single source of truth)
export const projects: Project[] = getAllProjects().map((p) => ({
  title: p.title,
  slug: p.slug,
  description: p.summary,
  stack: p.technologies.slice(0, 4),
  gradient:
    p.gradient ||
    (p.category === "cybersecurity"
      ? "from-[#1a3a2a] via-[#2d5a45] to-[#1a3a2a]"
      : "from-[#1a2a4a] via-[#2d4a7a] to-[#1a2a4a]"),
  href: detailedProjectRecords[p.slug]
    ? `/projects/${p.slug}`
    : (p.links.liveDemo || "#projects"),
  github: p.links.github,
  featured: p.featured,
  hasDetailView: Boolean(detailedProjectRecords[p.slug]),
}));
