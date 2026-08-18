import type { CanonicalProject } from "@/types/registry";
import { detailedProjectRecords } from "@/data/registry";

export interface OsintLeafDeliverable {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  maturity: string;
  technologies: string[];
  metrics?: { label: string; value: string };
  caseStudyUrl: string;
  hasDetailView: boolean;
}

export interface OsintMethodologyNode {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  deliverables: OsintLeafDeliverable[];
}

export interface OsintDomainBranch {
  id: string;
  title: string;
  tagline: string;
  iconType: "network" | "crypto" | "embedded" | "soc";
  methodologies: OsintMethodologyNode[];
}

export function deriveOsintTree(projects: CanonicalProject[]): OsintDomainBranch[] {
  const domainMap = new Map<string, OsintDomainBranch>();

  for (const project of projects) {
    const hasDetail = Boolean(detailedProjectRecords[project.slug]);

    const deliverable: OsintLeafDeliverable = {
      id: project.id,
      slug: project.slug,
      title: project.title,
      tagline: project.tagline,
      maturity: project.maturity === "demonstrated" ? "Demonstrated Prototype" : "Prototype",
      technologies: project.technologies.slice(0, 3),
      metrics: project.metrics?.[0]
        ? { label: project.metrics[0].label, value: project.metrics[0].value }
        : project.slug === "pi-sniffer"
          ? { label: "Verified Frames", value: "1,093 pkts" }
          : undefined,
      caseStudyUrl: hasDetail
        ? `/projects/${project.slug}`
        : (project.links.liveDemo || "#projects"),
      hasDetailView: hasDetail,
    };

    for (const capability of project.capabilities) {
      const domainName = capability.securityDomain;
      let iconType: OsintDomainBranch["iconType"] = "network";
      let domainTagline = "Network & Protocol Dissection";

      if (domainName.includes("Cryptographic") || domainName.includes("Application")) {
        iconType = "crypto";
        domainTagline = "Tamper Resistance & Cipher Architecture";
      } else if (domainName.includes("Systems") || domainName.includes("Embedded")) {
        iconType = "embedded";
        domainTagline = "Hardware Telemetry & Smart Contracts";
      }

      if (!domainMap.has(domainName)) {
        domainMap.set(domainName, {
          id: `domain-${domainName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          title: domainName,
          tagline: domainTagline,
          iconType,
          methodologies: [],
        });
      }

      const domain = domainMap.get(domainName)!;
      let existingMethod = domain.methodologies.find(
        (m) => m.title === capability.methodology
      );

      if (!existingMethod) {
        existingMethod = {
          id: `method-${capability.methodology.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          title: capability.methodology,
          description: capability.description,
          technologies: project.technologies.slice(0, 3),
          deliverables: [],
        };
        domain.methodologies.push(existingMethod);
      }

      if (!existingMethod.deliverables.some((d) => d.id === deliverable.id)) {
        existingMethod.deliverables.push(deliverable);
      }
    }
  }

  return Array.from(domainMap.values());
}
