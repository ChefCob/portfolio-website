import type { CanonicalEvidenceGraph, EvidenceNode } from "@/types/graph";

export interface GraphValidationResult {
  passed: boolean;
  totalProjects: number;
  totalComponents: number;
  totalCapabilities: number;
  totalClaims: number;
  totalEvidenceNodes: number;
  totalMetrics: number;
  totalThreats: number;
  totalControls: number;
  totalAdrs: number;
  totalDemos: number;
  totalStandardsAlignments: number;
  orphanClaims: string[];
  danglingEvidence: string[];
  unreferencedEvidence: string[];
  missingSources: string[];
  orphanMetrics: string[];
  unmitigatedHighThreats: string[];
  semanticViolations: { claimId: string; violation: string }[];
  policyViolations: { policyId: string; description: string }[];
}

const IMPLEMENTED_EVIDENCE_CATEGORIES: EvidenceNode["category"][] = [
  "code_snippet",
  "test_receipt",
  "execution_log",
  "pcap_trace",
];

export function validateCanonicalEvidenceGraph(
  graph: CanonicalEvidenceGraph
): GraphValidationResult {
  const orphanClaims: string[] = [];
  const danglingEvidence: string[] = [];
  const unreferencedEvidence: string[] = [];
  const missingSources: string[] = [];
  const orphanMetrics: string[] = [];
  const unmitigatedHighThreats: string[] = [];
  const semanticViolations: { claimId: string; violation: string }[] = [];
  const policyViolations: { policyId: string; description: string }[] = [];

  const projectKeys = new Set(Object.keys(graph.projects));
  const capabilityKeys = new Set(Object.keys(graph.capabilities));
  const evidenceKeys = new Set(Object.keys(graph.evidence));
  const controlKeys = new Set(Object.keys(graph.controls));
  const referencedEvidence = new Set<string>();

  // 1. Validate Claims & Semantic Consistency (FINDING-GRA-01)
  for (const [claimId, claim] of Object.entries(graph.claims)) {
    if (!projectKeys.has(claim.projectId)) {
      orphanClaims.push(`${claimId}: references invalid projectId ${claim.projectId}`);
    }
    if (!capabilityKeys.has(claim.capabilityId)) {
      orphanClaims.push(`${claimId}: references invalid capabilityId ${claim.capabilityId}`);
    }
    if (!claim.primaryEvidenceId || !evidenceKeys.has(claim.primaryEvidenceId)) {
      orphanClaims.push(`${claimId}: missing or invalid primaryEvidenceId ${claim.primaryEvidenceId}`);
      policyViolations.push({
        policyId: "POL-CLM-001",
        description: `Claim ${claimId} lacks a valid backing evidence artifact.`,
      });
    } else {
      referencedEvidence.add(claim.primaryEvidenceId);
      const primaryEvid = graph.evidence[claim.primaryEvidenceId];

      // Semantic Check 1: verified_implemented requires implementation-grade evidence
      if (claim.status === "verified_implemented") {
        if (!IMPLEMENTED_EVIDENCE_CATEGORIES.includes(primaryEvid.category)) {
          semanticViolations.push({
            claimId,
            violation: `Claim is marked 'verified_implemented' but primary evidence '${primaryEvid.id}' is of category '${primaryEvid.category}' (must be code_snippet, test_receipt, execution_log, or pcap_trace).`,
          });
        }
      }

      // Semantic Check 2: documented_only cannot claim demonstrated or production maturity
      if (claim.status === "documented_only") {
        if (claim.governedMaturity === "production") {
          semanticViolations.push({
            claimId,
            violation: `Claim is 'documented_only' but asserts 'production' governed maturity.`,
          });
        }
      }

      // Semantic Check 3: planned_roadmap cannot be labeled as verified_implemented
      if (claim.status === "planned_roadmap") {
        semanticViolations.push({
          claimId,
          violation: `Claim is 'planned_roadmap' and cannot be published as an implemented capability.`,
        });
      }

      // Semantic Check 4: Flag unsupported, disputed, or revoked claims
      if (["unsupported", "disputed", "revoked"].includes(claim.status)) {
        semanticViolations.push({
          claimId,
          violation: `Claim has invalid public status '${claim.status}'.`,
        });
      }
    }

    claim.supportingEvidenceIds.forEach((supId) => {
      if (!evidenceKeys.has(supId)) {
        orphanClaims.push(`${claimId}: references invalid supportingEvidenceId ${supId}`);
      } else {
        referencedEvidence.add(supId);
      }
    });

    if (!claim.sourceLocation || !claim.sourceLocation.sourceFile || claim.sourceLocation.sourceFile.trim() === "") {
      missingSources.push(claimId);
    }
  }

  // 2. Validate Evidence Nodes (POL-EVID-001)
  for (const [evidId, evid] of Object.entries(graph.evidence)) {
    if (!projectKeys.has(evid.projectId)) {
      danglingEvidence.push(`${evidId}: references invalid projectId ${evid.projectId}`);
    }
    if (!evid.provenance || !evid.provenance.contentHashSha256 || evid.provenance.contentHashSha256.trim() === "") {
      policyViolations.push({
        policyId: "POL-EVID-001",
        description: `Evidence ${evidId} is missing contentHashSha256 provenance metadata.`,
      });
    }
  }

  // 3. Validate Metrics Nodes
  if (graph.metrics) {
    for (const [metricId, metric] of Object.entries(graph.metrics)) {
      if (!projectKeys.has(metric.projectId)) {
        orphanMetrics.push(`${metricId}: invalid projectId ${metric.projectId}`);
      }
      if (!graph.claims[metric.claimId]) {
        orphanMetrics.push(`${metricId}: invalid claimId ${metric.claimId}`);
      }
      if (!evidenceKeys.has(metric.evidenceId)) {
        orphanMetrics.push(`${metricId}: invalid evidenceId ${metric.evidenceId}`);
      }
      if (metric.verificationStatus === "measured" && (!metric.measurementMethod || metric.measurementMethod.trim() === "")) {
        orphanMetrics.push(`${metricId}: marked 'measured' but missing measurementMethod.`);
      }
    }
  }

  // 4. Validate Threat Models & High Risk Exceptions (POL-SEC-001)
  for (const [threatId, threat] of Object.entries(graph.threats)) {
    if (!projectKeys.has(threat.projectId)) {
      policyViolations.push({
        policyId: "POL-SEC-001",
        description: `Threat ${threatId} references invalid projectId ${threat.projectId}`,
      });
    }
    threat.controlIds.forEach((ctrlId) => {
      if (!controlKeys.has(ctrlId)) {
        policyViolations.push({
          policyId: "POL-SEC-001",
          description: `Threat ${threatId} references invalid controlId ${ctrlId}`,
        });
      }
    });

    if (
      (threat.severity === "HIGH" || threat.severity === "CRITICAL") &&
      !threat.mitigated &&
      !threat.publicDisclosureApproved
    ) {
      unmitigatedHighThreats.push(threatId);
      policyViolations.push({
        policyId: "POL-SEC-001",
        description: `Unmitigated ${threat.severity} threat ${threatId} has not been approved for public disclosure.`,
      });
    }
  }

  const passed =
    orphanClaims.length === 0 &&
    danglingEvidence.length === 0 &&
    missingSources.length === 0 &&
    orphanMetrics.length === 0 &&
    unmitigatedHighThreats.length === 0 &&
    semanticViolations.length === 0 &&
    policyViolations.length === 0;

  return {
    passed,
    totalProjects: Object.keys(graph.projects).length,
    totalComponents: Object.keys(graph.components).length,
    totalCapabilities: Object.keys(graph.capabilities).length,
    totalClaims: Object.keys(graph.claims).length,
    totalEvidenceNodes: Object.keys(graph.evidence).length,
    totalMetrics: Object.keys(graph.metrics).length,
    totalThreats: Object.keys(graph.threats).length,
    totalControls: Object.keys(graph.controls).length,
    totalAdrs: Object.keys(graph.adrs).length,
    totalDemos: Object.keys(graph.demos).length,
    totalStandardsAlignments: graph.standards.length,
    orphanClaims,
    danglingEvidence,
    unreferencedEvidence,
    missingSources,
    orphanMetrics,
    unmitigatedHighThreats,
    semanticViolations,
    policyViolations,
  };
}
