import { canonicalProjects } from "./projects";
import { piSnifferDetailRecord } from "./piSnifferDetail";
import { organDonationDetailRecord } from "./organDonationDetail";
import { agentSocDetailRecord } from "./agentSocDetail";
import type {
  CanonicalProject,
  ProjectCategory,
  ProjectMaturity,
  TargetRole,
  ServiceOfferingId,
} from "@/types/registry";
import type { DetailedProjectRecord } from "@/types/projectDetail";

export { canonicalProjects };

export const detailedProjectRecords: Record<string, DetailedProjectRecord> = {
  "pi-sniffer": piSnifferDetailRecord,
  "organ-donation-protocol": organDonationDetailRecord,
  "agent-soc": agentSocDetailRecord,
};

export function getAllProjects(): CanonicalProject[] {
  return [...canonicalProjects].sort(
    (a, b) => a.orderPriority - b.orderPriority
  );
}

export function getFeaturedProjects(): CanonicalProject[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): CanonicalProject | undefined {
  return canonicalProjects.find((p) => p.slug === slug);
}

export function getDetailedProjectBySlug(
  slug: string
): DetailedProjectRecord | undefined {
  return detailedProjectRecords[slug];
}

export function getProjectsByRole(role: TargetRole): CanonicalProject[] {
  return canonicalProjects.filter((p) => p.targetRoles.includes(role));
}

export function getProjectsByService(
  serviceId: ServiceOfferingId
): CanonicalProject[] {
  return canonicalProjects.filter((p) =>
    p.applicableServices.includes(serviceId)
  );
}

export function getProjectsByCategory(
  category: ProjectCategory
): CanonicalProject[] {
  return canonicalProjects.filter((p) => p.category === category);
}

export function getProjectsByMaturity(
  maturity: ProjectMaturity
): CanonicalProject[] {
  return canonicalProjects.filter((p) => p.maturity === maturity);
}
