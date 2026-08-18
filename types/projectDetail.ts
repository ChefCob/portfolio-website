import type { CanonicalProject } from "./registry";
import type { ProjectCapabilityClaim } from "./claims";

export interface SubsystemComponent {
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  executionTier: "host_python" | "embedded_firmware";
  sourcePath?: string;
  responsibilities: string[];
}

export interface HardwareSpecification {
  targetDevice: string;
  runtime: string;
  interfaces: string[];
  peripherals: string[];
}

export interface DetailedProjectRecord extends CanonicalProject {
  headline: string;
  problemStatement: string;
  solutionOverview: string;
  subsystems: SubsystemComponent[];
  hardwareSpec?: HardwareSpecification;
  capabilityClaims: ProjectCapabilityClaim[]; // Claims referencing project.evidence by ID
  engineeringDecisions: {
    decision: string;
    rationale: string;
    tradeoff: string;
  }[];
  governedLimitations: {
    area: string;
    currentLimitation: string;
    mitigationOrRoadmap: string;
  }[];
}
