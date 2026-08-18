import { canonicalEvidenceGraph } from "../data/graph/canonicalGraph";
import { validateCanonicalEvidenceGraph } from "../lib/graph/validator";
import { scanTextForSensitiveData, calculateShannonEntropy } from "../lib/security/dlpScanner";
import { validateAgentWriteOperation } from "../lib/security/agentGuard";
import type { CanonicalEvidenceGraph } from "../types/graph";

console.log("==================================================");
console.log("CAREEROS PHASE 3.1 ADVERSARIAL RE-VERIFICATION SUITE");
console.log("==================================================");

// --- 1. AGENT RUNTIME WRITE BOUNDARY TESTS (FINDING-AGT-01) ---
console.log("\n--- TEST 1: AGENT RUNTIME WRITE BOUNDARY INTERCEPTION ---");

const agentGuardCases = [
  {
    name: "AGT-GUARD-01: Agent attempts write to AGENTS.md",
    path: "AGENTS.md",
    actor: { id: "AGT-DEV", type: "AGENT" as const },
    expectedAllowed: false,
  },
  {
    name: "AGT-GUARD-02: Agent attempts write to SEOM/core-standards.md",
    path: "SEOM/core-standards.md",
    actor: { id: "AGT-SEC", type: "AGENT" as const },
    expectedAllowed: false,
  },
  {
    name: "AGT-GUARD-03: Agent attempts write to docs/GOVERNANCE.md",
    path: "docs/GOVERNANCE.md",
    actor: { id: "AGT-ARCH", type: "AGENT" as const },
    expectedAllowed: false,
  },
  {
    name: "AGT-GUARD-04: Agent attempts write to authorized project file (components/ProjectCard.tsx)",
    path: "components/ProjectCard.tsx",
    actor: { id: "AGT-DEV", type: "AGENT" as const },
    expectedAllowed: true,
  },
  {
    name: "AGT-GUARD-05: Human Owner performs write to AGENTS.md",
    path: "AGENTS.md",
    actor: { id: "HUMAN-OWNER", type: "HUMAN_OWNER" as const },
    expectedAllowed: true,
  },
];

let guardPass = 0;
for (const tc of agentGuardCases) {
  const res = validateAgentWriteOperation(tc.path, tc.actor);
  if (res.allowed === tc.expectedAllowed) {
    console.log(`[PASS] ${tc.name} -> ${res.allowed ? "ALLOWED" : "DENIED (AUDITED)"}`);
    guardPass++;
  } else {
    console.error(`[FAIL] ${tc.name} -> Unexpected disposition:`, res);
  }
}
console.log(`Agent Guard Results: ${guardPass}/${agentGuardCases.length} assertions passed.`);

// --- 2. EVIDENCE GRAPH MUTATION & SEMANTIC HARDENING (FINDING-GRA-01) ---
console.log("\n--- TEST 2: EVIDENCE GRAPH SEMANTIC MUTATION TESTING ---");

interface MutationTestCase {
  name: string;
  mutate: (graph: CanonicalEvidenceGraph) => CanonicalEvidenceGraph;
  expectedFailureSubstring: string;
}

const mutations: MutationTestCase[] = [
  {
    name: "MUT-01: Orphan Claim (Invalid Project Reference)",
    mutate: (g) => {
      const clone: CanonicalEvidenceGraph = JSON.parse(JSON.stringify(g));
      clone.claims["CLM-MUT-01"] = {
        id: "CLM-MUT-01",
        projectId: "PROJ-NON-EXISTENT",
        capabilityId: "CAP-PI-PARSER",
        statement: "Malformed mutation claim",
        status: "verified_implemented",
        sourceLocation: { sourceFile: "test.py", keySymbols: ["test"] },
        primaryEvidenceId: "EVID-PI-PCAP",
        supportingEvidenceIds: [],
        knownLimitations: [],
        governedMaturity: "demonstrated",
      };
      return clone;
    },
    expectedFailureSubstring: "references invalid projectId",
  },
  {
    name: "MUT-02: Dangling Evidence Reference in Claim",
    mutate: (g) => {
      const clone: CanonicalEvidenceGraph = JSON.parse(JSON.stringify(g));
      clone.claims["CLM-PI-01"].primaryEvidenceId = "EVID-DOES-NOT-EXIST";
      return clone;
    },
    expectedFailureSubstring: "missing or invalid primaryEvidenceId",
  },
  {
    name: "MUT-03: Missing Evidence Provenance Hash (POL-EVID-001)",
    mutate: (g) => {
      const clone: CanonicalEvidenceGraph = JSON.parse(JSON.stringify(g));
      clone.evidence["EVID-PI-PCAP"].provenance.contentHashSha256 = "";
      return clone;
    },
    expectedFailureSubstring: "missing contentHashSha256 provenance",
  },
  {
    name: "MUT-04: Semantic Promotion Attack: verified_implemented backed only by assessment_doc",
    mutate: (g) => {
      const clone: CanonicalEvidenceGraph = JSON.parse(JSON.stringify(g));
      clone.claims["CLM-PI-01"].primaryEvidenceId = "EVID-PI-ASSESSMENT"; // assessment_doc category
      return clone;
    },
    expectedFailureSubstring: "must be code_snippet, test_receipt, execution_log, or pcap_trace",
  },
  {
    name: "MUT-05: Semantic Promotion Attack: documented_only asserting production maturity",
    mutate: (g) => {
      const clone: CanonicalEvidenceGraph = JSON.parse(JSON.stringify(g));
      clone.claims["CLM-MUT-DOC"] = {
        id: "CLM-MUT-DOC",
        projectId: "PROJ-PI-SNIFFER",
        capabilityId: "CAP-PI-PARSER",
        statement: "Paperware elevation attack",
        status: "documented_only",
        sourceLocation: { sourceFile: "doc.md", keySymbols: [] },
        primaryEvidenceId: "EVID-PI-ASSESSMENT",
        supportingEvidenceIds: [],
        knownLimitations: [],
        governedMaturity: "production", // Invalid combination
      };
      return clone;
    },
    expectedFailureSubstring: "asserts 'production' governed maturity",
  },
  {
    name: "MUT-06: Dangling Metric Pointer (Invalid Evidence Reference)",
    mutate: (g) => {
      const clone: CanonicalEvidenceGraph = JSON.parse(JSON.stringify(g));
      clone.metrics["MET-PI-FRAMES"].evidenceId = "EVID-INVALID";
      return clone;
    },
    expectedFailureSubstring: "invalid evidenceId",
  },
];

let mutationPassCount = 0;
for (const tc of mutations) {
  const mutatedGraph = tc.mutate(canonicalEvidenceGraph);
  const result = validateCanonicalEvidenceGraph(mutatedGraph);

  const serializedErrors = JSON.stringify(result);
  const matched = serializedErrors.includes(tc.expectedFailureSubstring);

  if (!result.passed && matched) {
    console.log(`[PASS] ${tc.name} -> Rejected by validator as expected.`);
    mutationPassCount++;
  } else {
    console.error(`[FAIL] ${tc.name} -> Unexpected validation pass:`, result);
  }
}
console.log(`Mutation Test Results: ${mutationPassCount}/${mutations.length} mutations successfully caught.`);

// --- 3. ENCODED SECRET EVASION FUZZING (FINDING-DLP-01) ---
console.log("\n--- TEST 3: DLP ENCODED SECRET & OBFUSCATION FUZZING ---");

interface DlpTestCase {
  name: string;
  input: string;
  expectedDetected: boolean;
  expectedRuleSubstring?: string;
}

const dlpTestCases: DlpTestCase[] = [
  {
    name: "DLP-01: Standard GitHub Classic PAT Token",
    input: "const token = 'ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';",
    expectedDetected: true,
    expectedRuleSubstring: "DLP-GITHUB-TOKEN",
  },
  {
    name: "DLP-02: Modern Fine-Grained GitHub PAT",
    input: "const token = 'github_pat_11AABCDEF0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_xyz';",
    expectedDetected: true,
    expectedRuleSubstring: "DLP-GITHUB-TOKEN",
  },
  {
    name: "DLP-03: Modern Project-Scoped OpenAI Key",
    input: "export OPENAI_KEY='sk-proj-abc1234567890abcdef1234567890abcdef-XYZ';",
    expectedDetected: true,
    expectedRuleSubstring: "DLP-OPENAI-TOKEN",
  },
  {
    name: "DLP-04: Generic PKCS#8 Private Key Header",
    input: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASC...",
    expectedDetected: true,
    expectedRuleSubstring: "DLP-PRIVATE-KEY",
  },
  {
    name: "DLP-05: Unquoted YAML Password Assignment",
    input: "auth:\n  admin_user: admin\n  password: SuperSecretAdminPassword123!\n",
    expectedDetected: true,
    expectedRuleSubstring: "DLP-GENERIC-SECRET",
  },
  {
    name: "DLP-06: Hex-Encoded GitHub Token Evasion (FINDING-DLP-01 Remediation)",
    // 'ghp_SECRETTOKEN1234567890abcdefghijk' in hex
    input: "const raw = Buffer.from('6768705f534543524554544f4b454e313233343536373839306162636465666768696a6b', 'hex');",
    expectedDetected: true,
    expectedRuleSubstring: "DLP-HEX-ENCODED",
  },
  {
    name: "DLP-07: Base64-Encoded OpenAI Token Evasion (FINDING-DLP-01 Remediation)",
    // 'sk-proj-1234567890abcdef1234567890abcdef' in base64
    input: "const payload = 'c2stcHJvai0xMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZg==';",
    expectedDetected: true,
    expectedRuleSubstring: "DLP-B64-ENCODED",
  },
  {
    name: "DLP-08: Benign Python Cryptographic Function Code",
    input: "def calculate_hash(data: str) -> str:\n    return hashlib.sha256(data.encode()).hexdigest()",
    expectedDetected: false,
  },
];

let dlpTp = 0;
let dlpTn = 0;
let dlpFp = 0;
let dlpFn = 0;

for (const tc of dlpTestCases) {
  const result = scanTextForSensitiveData(tc.input);
  const detected = !result.passed;

  if (detected && tc.expectedDetected) {
    const matchedRule = result.findings.some(f => tc.expectedRuleSubstring ? f.ruleId.includes(tc.expectedRuleSubstring) : true);
    if (matchedRule) {
      console.log(`[PASS (TP)] ${tc.name} -> Correctly detected (${result.findings[0]?.ruleId})`);
      dlpTp++;
    } else {
      console.warn(`[PARTIAL TP] ${tc.name} -> Detected but wrong rule:`, result.findings);
      dlpTp++;
    }
  } else if (!detected && !tc.expectedDetected) {
    console.log(`[PASS (TN)] ${tc.name} -> Correctly allowed clean code.`);
    dlpTn++;
  } else if (detected && !tc.expectedDetected) {
    console.warn(`[FALSE POSITIVE] ${tc.name} -> Flagged benign code.`);
    dlpFp++;
  } else {
    console.warn(`[FALSE NEGATIVE / BYPASS] ${tc.name} -> Evaded detection.`);
    dlpFn++;
  }
}

console.log(`\nDLP Encoded Fuzzing Metrics: TP=${dlpTp}, TN=${dlpTn}, FP=${dlpFp}, FN=${dlpFn}`);
console.log(`Detection Coverage: ${((dlpTp + dlpTn) / dlpTestCases.length * 100).toFixed(1)}%`);

// --- 4. PRODUCTION GRAPH SANITY AUDIT ---
console.log("\n--- TEST 4: PRODUCTION CANONICAL GRAPH HEALTH ---");
const prodResult = validateCanonicalEvidenceGraph(canonicalEvidenceGraph);
if (prodResult.passed) {
  console.log("✅ PRODUCTION CANONICAL GRAPH: 100% PASS (Zero Defects)");
} else {
  console.error("❌ PRODUCTION GRAPH FAILED VALIDATION:", prodResult);
  process.exit(1);
}

console.log("\n==================================================");
console.log("CAREEROS PHASE 3.1 RE-VERIFICATION SUITE COMPLETE");
console.log("==================================================");
