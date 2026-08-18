import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDetailedProjectBySlug, detailedProjectRecords } from "@/data/registry";
import { ProjectDetailView } from "@/components/project-detail/ProjectDetailView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(detailedProjectRecords).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getDetailedProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | CareerOS",
    };
  }

  return {
    title: `${project.title} — Evidence-Backed Technical Case Study | CareerOS`,
    description: project.headline,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getDetailedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
