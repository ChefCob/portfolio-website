import type {
  EvidenceArtifact,
  EvidenceArtifactType,
  EvidenceVerificationLevel,
} from "./evidence";

export type {
  EvidenceArtifact,
  EvidenceArtifactType,
  EvidenceVerificationLevel,
};

export type ProjectMaturity =
  | "concept"
  | "prototype"
  | "demonstrated"
  | "production"
  | "archived";

export type ProjectCategory =
  | "cybersecurity"
  | "ai_security"
  | "fullstack_web3"
  | "autonomous_systems"
  | "embedded_systems";

export type TargetRole =
  | "Security Engineer"
  | "Detection Engineer"
  | "Network Security Engineer"
  | "SOC Analyst"
  | "Penetration Tester"
  | "AI Security Researcher"
  | "DevSecOps Engineer"
  | "Systems Engineer"
  | "Smart Contract Auditor";

export type ServiceOfferingId =
  | "service-vuln-assessment"
  | "service-network-monitoring"
  | "service-ai-redteaming"
  | "service-smartcontract-audit"
  | "service-custom-tooling"
  | "service-cryptographic-architecture";

export interface MetricProof {
  label: string;
  value: string;
  baseline?: string;
  evidenceRef: string;
}

export interface TechnicalArchitecture {
  summary: string;
  components: {
    name: string;
    description: string;
    technologies: string[];
  }[];
  dataFlow?: string;
  deploymentModel: "edge_embedded" | "cloud_native" | "hybrid" | "local_app";
}

export interface ProjectCapability {
  name: string;
  description: string;
  securityDomain: string;
  methodology: string;
}

export interface CanonicalProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: ProjectCategory;
  maturity: ProjectMaturity;
  featured: boolean;
  orderPriority: number;
  gradient?: string;

  architecture: TechnicalArchitecture;
  technologies: string[];
  platforms: string[];

  capabilities: ProjectCapability[];
  competencies: string[];

  evidence: EvidenceArtifact[];
  metrics?: MetricProof[];
  knownLimitations: string[];

  links: {
    github?: string;
    documentation?: string;
    liveDemo?: string;
    videoWalkthrough?: string;
  };

  targetRoles: TargetRole[];
  applicableServices: ServiceOfferingId[];

  governance: {
    repoPath: string;
    lastAnalyzedCommit?: string;
    lastVerifiedDate: string;
    sourceOfTruth: string;
    humanApproved: boolean;
  };
}
