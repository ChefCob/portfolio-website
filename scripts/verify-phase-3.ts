import { canonicalEvidenceGraph } from "../data/graph/canonicalGraph";
import { validateCanonicalEvidenceGraph } from "../lib/graph/validator";
import { scanTextForSensitiveData } from "../lib/security/dlpScanner";

console.log("==================================================");
console.log("CAREEROS PHASE 3 GRAPH & POLICY INTEGRITY AUDIT");
console.log("==================================================");

// 1. Validate Evidence Graph DAG
const graphResult = validateCanonicalEvidenceGraph(canonicalEvidenceGraph);
console.log(`- Total Projects: ${graphResult.totalProjects}`);
console.log(`- Total Components: ${graphResult.totalComponents}`);
console.log(`- Total Capabilities: ${graphResult.totalCapabilities}`);
console.log(`- Total Claims: ${graphResult.totalClaims}`);
console.log(`- Total Evidence Nodes: ${graphResult.totalEvidenceNodes}`);
console.log(`- Total Metrics: ${graphResult.totalMetrics}`);
console.log(`- Total Threats: ${graphResult.totalThreats}`);
console.log(`- Total Controls: ${graphResult.totalControls}`);
console.log(`- Total ADRs: ${graphResult.totalAdrs}`);
console.log(`- Total Demos: ${graphResult.totalDemos}`);
console.log(`- Total Standards Alignments: ${graphResult.totalStandardsAlignments}`);

console.log("\nReferential Integrity Checks:");
console.log(`- Orphan Claims: ${graphResult.orphanClaims.length}`);
console.log(`- Dangling Evidence: ${graphResult.danglingEvidence.length}`);
console.log(`- Missing Sources: ${graphResult.missingSources.length}`);
console.log(`- Policy Violations: ${graphResult.policyViolations.length}`);

if (!graphResult.passed) {
  console.error("❌ GRAPH INTEGRITY AUDIT FAILED:", graphResult);
  process.exit(1);
} else {
  console.log("✅ GRAPH REFERENTIAL INTEGRITY: 100% PASS");
}

// 2. Run Pre-Publication DLP Scan on Public Evidence Snippets
let dlpPassed = true;
for (const [evidId, node] of Object.entries(canonicalEvidenceGraph.evidence)) {
  if (node.previewSnippet) {
    const scan = scanTextForSensitiveData(node.previewSnippet);
    if (!scan.passed) {
      console.error(`❌ DLP VIOLATION in ${evidId}:`, scan.findings);
      dlpPassed = false;
    }
  }
}

if (dlpPassed) {
  console.log("✅ DLP & SECRET SCANNING GATE (POL-DATA-001): 100% PASS (0 LEAKS)");
} else {
  process.exit(1);
}

console.log("\n==================================================");
console.log("PHASE 3 CONTROL PLANE VERIFICATION COMPLETE: PASS");
console.log("==================================================");
