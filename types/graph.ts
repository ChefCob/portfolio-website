export type SensitivityTier =
  | "RESTRICTED"
  | "CONFIDENTIAL"
  | "CONTROLLED"
  | "PUBLIC";

export type ClaimStatus =
  | "verified_implemented"
  | "demonstrated"
  | "measured"
  | "prototype"
  | "documented_only"
  | "planned_roadmap"
  | "unsupported"
  | "disputed"
  | "superseded"
  | "revoked";

export type StandardsAlignmentStatus =
  | "ALIGNED"
  | "PARTIALLY_ALIGNED"
  | "NOT_IMPLEMENTED"
  | "NOT_APPLICABLE"
  | "REQUIRES_VALIDATION";

export interface ProvenanceMetadata {
  contentHashSha256: string;
  byteSize: number;
  producer: string;
  recordedTimestamp: string;
  associatedGitCommit: string;
  verifier: string;
  sourceOfTruth: string;
}

export interface ProjectNode {
  id: string; // PROJ-xxx
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: string;
  maturity: string;
  repoPath: string;
  componentIds: string[];
  capabilityIds: string[];
  threatIds: string[];
  adrIds: string[];
  demoIds: string[];
  orderPriority: number;
}

export interface ComponentNode {
  id: string; // CMP-xxx
  projectId: string;
  name: string;
  tagline: string;
  description: string;
  executionTier: "host_python" | "embedded_firmware" | "cloud_service" | "evm_contract";
  sourcePath: string;
  keySymbols: string[];
  technologies: string[];
}

export interface CapabilityNode {
  id: string; // CAP-xxx
  projectId: string;
  name: string;
  description: string;
  securityDomain: string;
  methodology: string;
  claimIds: string[];
}

export interface ClaimNode {
  id: string; // CLM-xxx
  projectId: string;
  capabilityId: string;
  statement: string;
  status: ClaimStatus;
  sourceLocation: {
    sourceFile: string;
    lineRange?: [number, number];
    keySymbols: string[];
  };
  primaryEvidenceId: string; // EVID-xxx
  supportingEvidenceIds: string[];
  knownLimitations: string[];
  governedMaturity: string;
}

export interface EvidenceNode {
  id: string; // EVID-xxx
  projectId: string;
  title: string;
  category: "pcap_trace" | "execution_log" | "hardware_photo" | "code_snippet" | "test_receipt" | "assessment_doc";
  physicalPath: string;
  previewSnippet?: string;
  verificationNotes: string;
  verificationStatus: ClaimStatus;
  verifiedDate: string;
  sensitivityTier: SensitivityTier;
  provenance: ProvenanceMetadata;
}

export interface MetricNode {
  id: string; // MET-xxx
  projectId: string;
  claimId: string;
  label: string;
  value: string;
  baseline?: string;
  measurementMethod: string;
  environment: string;
  evidenceId: string;
  verificationStatus: ClaimStatus;
}

export interface ThreatNode {
  id: string; // THR-xxx
  projectId: string;
  title: string;
  category: string; // STRIDE category
  threatScenario: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  residualRisk: string;
  controlIds: string[];
  mitigated: boolean;
  publicDisclosureApproved: boolean;
}

export interface ControlNode {
  id: string; // CTRL-xxx
  projectId: string;
  threatId: string;
  name: string;
  description: string;
  implementationSource?: string;
  effectiveness: "HIGH" | "MEDIUM" | "PARTIAL" | "ROADMAP";
}

export interface AdrNode {
  id: string; // ADR-xxx
  projectId: string;
  title: string;
  context: string;
  decision: string;
  consequences: string[];
  status: "APPROVED" | "PROPOSED" | "SUPERSEDED";
  approvedDate: string;
}

export interface DemoNode {
  id: string; // DEMO-xxx
  projectId: string;
  claimId: string;
  title: string;
  executionModel: "docker_container" | "hardware_bench" | "local_cli" | "solidity_node";
  environmentFingerprint: {
    os: string;
    arch: string;
    runtimes: Record<string, string>;
  };
  exactCommand: string;
  expectedResult: string;
  verifier: string;
}

export interface StandardsAlignmentNode {
  standardId: string;
  frameworkName: string;
  version: string;
  controlId: string;
  controlName: string;
  alignmentStatus: StandardsAlignmentStatus;
  mappedProjectIds: string[];
  supportingEvidenceIds: string[];
  alignmentRationale: string;
  complianceDisclaimer: string;
}

export interface CanonicalEvidenceGraph {
  projects: Record<string, ProjectNode>;
  components: Record<string, ComponentNode>;
  capabilities: Record<string, CapabilityNode>;
  claims: Record<string, ClaimNode>;
  evidence: Record<string, EvidenceNode>;
  metrics: Record<string, MetricNode>;
  threats: Record<string, ThreatNode>;
  controls: Record<string, ControlNode>;
  adrs: Record<string, AdrNode>;
  demos: Record<string, DemoNode>;
  standards: StandardsAlignmentNode[];
}
