import type { DetailedProjectRecord } from "@/types/projectDetail";

export const organDonationDetailRecord: DetailedProjectRecord = {
  id: "proj-organ-donation",
  slug: "organ-donation-protocol",
  title: "Organ Donation Security Protocol",
  tagline: "Cryptographic Record Layer & Smart Contract Verification",
  headline:
    "Tamper-Resilient Medical Record Chaining via Symmetric Envelope Ciphers & EVM Event Receipts",
  summary:
    "Educational prototype integrating SHA-256 cryptographic block chaining, Fernet symmetric payload encryption, deterministic ABO and HLA compatibility scoring, and Ethereum EVM smart contract event receipts.",
  category: "cybersecurity",
  maturity: "prototype",
  featured: false,
  orderPriority: 2,
  gradient: "from-[#1a2a4a] via-[#2d4a7a] to-[#1a2a4a]",

  metrics: [
    {
      label: "Block Integrity",
      value: "SHA-256",
      baseline: "Continuous hash link verification",
      evidenceRef: "ev-organ-crypto",
    },
    {
      label: "Payload Cipher",
      value: "AES-128-CBC",
      baseline: "Fernet + HMAC-SHA256 auth",
      evidenceRef: "ev-organ-crypto",
    },
    {
      label: "Contract Test Suite",
      value: "3 Tests Passing",
      baseline: "Mocha/Chai assertions on Hardhat",
      evidenceRef: "ev-organ-tests",
    },
    {
      label: "EVM Compiler",
      value: "Solidity 0.8.28",
      baseline: "Hardhat toolchain compilation",
      evidenceRef: "ev-organ-contract",
    },
  ],

  problemStatement:
    "Organ allocation systems require transparent verification of medical allocation decisions and immutable tamper-evidence, without exposing sensitive genetic and protected health identifiers to unauthorized parties or public ledgers.",

  solutionOverview:
    "An educational multi-tier prototype that combines authenticated Fernet symmetric encryption for patient genotypes, local SHA-256 block hash chaining for tamper-evident data continuity, deterministic biological compatibility rules, and Solidity smart contract event logging for non-repudiable audit receipts on the EVM.",

  architecture: {
    summary:
      "Hybrid multi-tier security pipeline separating off-chain encrypted medical ingestion from on-chain EVM audit receipt logging.",
    components: [
      {
        name: "Cryptographic Chaining Engine",
        description:
          "Python state machine calculating SHA-256 block hashes with Proof-of-Work mining (difficulty: 4) linking successive donor and recipient transactions.",
        technologies: ["Python", "hashlib"],
      },
      {
        name: "Symmetric Encryption Layer",
        description:
          "Fernet-based envelope cipher (AES-128-CBC + HMAC-SHA256) safeguarding sensitive patient metadata and HLA genotypes.",
        technologies: ["Python", "cryptography (Fernet)"],
      },
      {
        name: "Solidity Verification Contract",
        description:
          "Ethereum smart contract (OrganDonation.sol) storing match records and emitting indexed MatchSaved events.",
        technologies: ["Solidity 0.8.28", "Hardhat", "EVM"],
      },
      {
        name: "REST Ingestion API",
        description:
          "Flask microservice handling donor/recipient registration endpoints and match dispatch orchestration on port 5000.",
        technologies: ["Python", "Flask", "Flask-CORS"],
      },
    ],
    deploymentModel: "hybrid",
  },

  technologies: [
    "Python 3.11",
    "Solidity 0.8.28",
    "Flask",
    "Flask-CORS",
    "Cryptography (Fernet)",
    "SHA-256 Hashing",
    "Hardhat",
    "Ethers.js",
    "EVM",
  ],
  platforms: ["Ethereum EVM", "Linux / POSIX"],

  capabilities: [
    {
      name: "Cryptographic Block Chaining & PoW Mining",
      description:
        "Calculates 256-bit SHA-256 hashes linking successive records with Proof-of-Work difficulty nonces.",
      securityDomain: "Application & Cryptographic Security",
      methodology: "Hash Chaining & Tamper Resistance",
    },
    {
      name: "Symmetric Fernet Envelope Encryption",
      description:
        "Encrypts patient metadata and HLA genotypes using authenticated AES-128-CBC ciphertexts with HMAC verification.",
      securityDomain: "Application & Cryptographic Security",
      methodology: "Symmetric Cipher Management",
    },
    {
      name: "Solidity Smart Contract Event Receipts",
      description:
        "Emits immutable MatchSaved event logs with block timestamps on the Ethereum EVM.",
      securityDomain: "Systems & Embedded Security",
      methodology: "Smart Contract Verification",
    },
    {
      name: "Deterministic Biological Compatibility Engine",
      description:
        "Enforces exact ABO/Rh blood type equality and calculates Jaccard similarity coefficient on HLA allele sets (threshold >= 0.8).",
      securityDomain: "Application & Cryptographic Security",
      methodology: "Secure Record Processing",
    },
  ],

  capabilityClaims: [
    {
      id: "claim-organ-chaining",
      name: "SHA-256 Cryptographic Block Chaining",
      description:
        "Calculates block hashes chaining previous block digests with sorted JSON payload strings.",
      status: "verified_implemented",
      sourceLocation: {
        module: "New_Text_Document_5",
        sourceFile: "New_Text_Document_5.py",
        keySymbols: ["Block.calculate_hash", "Block.mine_block", "Blockchain.add_block"],
      },
      primaryEvidenceRef: "ev-organ-crypto",
      securityDomain: "Application & Cryptographic Security",
      methodology: "Hash Chaining & Tamper Resistance",
    },
    {
      id: "claim-organ-encryption",
      name: "Symmetric Fernet Envelope Encryption",
      description:
        "Applies authenticated AES-128-CBC encryption with HMAC verification for patient genotype and medical records.",
      status: "verified_implemented",
      sourceLocation: {
        module: "New_Text_Document_5",
        sourceFile: "New_Text_Document_5.py",
        keySymbols: ["OrganMatchingContract.encrypt_data", "OrganMatchingContract.decrypt_data"],
      },
      primaryEvidenceRef: "ev-organ-crypto",
      securityDomain: "Application & Cryptographic Security",
      methodology: "Symmetric Cipher Management",
    },
    {
      id: "claim-organ-contract",
      name: "Smart Contract Match Receipt Logging",
      description:
        "Solidity smart contract emitting indexed MatchSaved events with immutable timestamps on the EVM.",
      status: "verified_implemented",
      sourceLocation: {
        module: "contracts",
        sourceFile: "contracts/OrganDonation.sol",
        keySymbols: ["OrganDonation.saveMatch", "OrganDonation.getMatches"],
      },
      primaryEvidenceRef: "ev-organ-contract",
      supportingEvidenceRefs: ["ev-organ-tests"],
      securityDomain: "Systems & Embedded Security",
      methodology: "Smart Contract Verification",
    },
    {
      id: "claim-organ-matching",
      name: "Deterministic ABO & Jaccard HLA Compatibility",
      description:
        "Multi-parameter compatibility engine enforcing blood typing equality and calculating HLA locus overlap ratio.",
      status: "verified_implemented",
      sourceLocation: {
        module: "New_Text_Document_5",
        sourceFile: "New_Text_Document_5.py",
        keySymbols: ["OrganMatchingContract._calculate_compatibility", "OrganMatchingContract._calculate_hla_compatibility"],
      },
      primaryEvidenceRef: "ev-organ-crypto",
      securityDomain: "Application & Cryptographic Security",
      methodology: "Secure Record Processing",
    },
    {
      id: "claim-organ-mlids",
      name: "Neural Network Anomaly Detection Gate",
      description:
        "Keras sequential neural network architecture intended as a request anomaly detection filter (Prototype).",
      status: "documented_only",
      sourceLocation: {
        module: "New_Text_Document_5",
        sourceFile: "New_Text_Document_5.py",
        keySymbols: ["MLIDS._build_model", "MLIDS.detect_anomaly"],
      },
      primaryEvidenceRef: "ev-organ-crypto",
      securityDomain: "Detection & Anomaly Evaluation",
      methodology: "Statistical Anomaly Modeling",
    },
  ],

  competencies: [
    "Cryptographic Hash Chaining",
    "Symmetric Cipher Implementations (Fernet)",
    "Solidity Smart Contract Authoring",
    "Hardhat EVM Testing & Deployment",
    "Secure Backend REST API Development",
  ],

  evidence: [
    {
      id: "ev-organ-contract",
      type: "code_snippet",
      title: "Solidity Smart Contract (OrganDonation.sol)",
      description:
        "Smart contract implementing on-chain match recording and event emissions for allocation audit trails.",
      filePath: "contracts/OrganDonation.sol",
      previewSnippet: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganDonation {
    struct Match {
        string donorId;
        string recipientId;
        string organType;
        uint timestamp;
    }

    Match[] public matches;

    event MatchSaved(string donorId, string recipientId, string organType, uint timestamp);

    function saveMatch(string memory _donorId, string memory _recipientId, string memory _organType) public {
        matches.push(Match(_donorId, _recipientId, _organType, block.timestamp));
        emit MatchSaved(_donorId, _recipientId, _organType, block.timestamp);
    }

    function getMatches() public view returns (Match[] memory) {
        return matches;
    }
}`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Verified Solidity contract compiling with Hardhat 0.8.28 and emitting MatchSaved events.",
      verifiedDate: "2026-08-16",
    },
    {
      id: "ev-organ-backend",
      type: "code_snippet",
      title: "Flask Ingestion API (app.py)",
      description:
        "REST API service providing donor and recipient registration and match execution endpoints.",
      filePath: "app.py",
      previewSnippet: `@app.route('/match', methods=['POST'])
def process_match():
    data = request.json
    try:
        recipient_data = data["recipient"]
        donor_data = data["donor"]
        result = network.process_donation_request(recipient_data, donor_data)

        if result:
            return jsonify({"message": "Match found", "match_data": result}), 200
        else:
            return jsonify({"message": "No match found or suspicious activity detected"}), 200
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Verified Flask HTTP route handlers and request payload validation logic on port 5000.",
      verifiedDate: "2026-08-16",
    },
    {
      id: "ev-organ-crypto",
      type: "code_snippet",
      title: "Block Hashing & Fernet Cipher Engine (New_Text_Document_5.py)",
      description:
        "Python cryptographic routines for SHA-256 block hash chaining, Proof-of-Work mining, and Fernet symmetric encryption.",
      filePath: "New_Text_Document_5.py",
      previewSnippet: `def calculate_hash(self) -> str:
    block_string = json.dumps({
        "timestamp": str(self.timestamp),
        "data": self.data,
        "previous_hash": self.previous_hash,
        "nonce": self.nonce
    }, sort_keys=True)
    return hashlib.sha256(block_string.encode()).hexdigest()

def mine_block(self, difficulty: int):
    while self.hash[:difficulty] != "0" * difficulty:
        self.nonce += 1
        self.hash = self.calculate_hash()`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Verified Block, Blockchain, and OrganMatchingContract classes in Python.",
      verifiedDate: "2026-08-16",
    },
    {
      id: "ev-organ-tests",
      type: "verification_doc",
      title: "Hardhat Automated Unit Test Suite (test/OrganDonation.js)",
      description:
        "Mocha/Chai automated contract test suite validating state mutation, event emissions, and match retrieval.",
      filePath: "test/OrganDonation.js",
      previewSnippet: `describe("OrganDonation", function () {
  it("should save a match with the correct details", async function () {
    await organDonation.saveMatch("donor1", "recipient1", "heart");
    const matches = await organDonation.getMatches();
    expect(matches.length).to.equal(1);
    expect(matches[0].donorId).to.equal("donor1");
  });

  it("should emit a MatchSaved event", async function () {
    await expect(organDonation.saveMatch("donor2", "recipient2", "liver"))
      .to.emit(organDonation, "MatchSaved");
  });
});`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "3 passing automated tests executed on Hardhat local Ethereum test network.",
      verifiedDate: "2026-08-16",
    },
  ],

  knownLimitations: [
    "Local blockchain implementation is a single-node in-process state machine without distributed P2P Byzantine consensus.",
    "Fernet symmetric encryption keys are generated in-memory on process start without persistent KMS backing.",
    "Solidity saveMatch() function currently lacks access control modifiers (onlyOwner / AccessControl).",
  ],

  subsystems: [
    {
      name: "Cryptographic Ledger Engine",
      tagline: "Sequential Hash Verification & PoW",
      description:
        "Maintains tamper-evident block headers linking successive donor registrations and match determinations using SHA-256 hashing and proof-of-work mining.",
      technologies: ["Python", "hashlib", "JSON"],
      executionTier: "host_python",
      sourcePath: "New_Text_Document_5.py",
      responsibilities: [
        "Sequential SHA-256 block hash computation with sorted JSON serialization",
        "Proof-of-Work mining enforcing difficulty = 4 leading zeros",
        "Genesis block initialization and chain linking",
      ],
    },
    {
      name: "EVM Verification Subsystem",
      tagline: "Immutable Match Receipts",
      description:
        "Solidity smart contract logging allocation determinations and emitting indexed MatchSaved events to the blockchain.",
      technologies: ["Solidity 0.8.28", "Hardhat", "EVM"],
      executionTier: "host_python",
      sourcePath: "contracts/OrganDonation.sol",
      responsibilities: [
        "On-chain match struct storage",
        "MatchSaved event log emission for external auditability",
        "Historical match query interface via getMatches()",
      ],
    },
    {
      name: "Ingestion & Compatibility Gateway",
      tagline: "Secure Ingestion & Biological Matching",
      description:
        "Flask backend providing donor/recipient registration endpoints and deterministic biological compatibility scoring.",
      technologies: ["Python", "Flask", "Flask-CORS", "Cryptography"],
      executionTier: "host_python",
      sourcePath: "app.py",
      responsibilities: [
        "HTTP JSON payload ingestion and schema sanitization",
        "ABO/Rh blood typing and Jaccard HLA allele overlap calculation",
        "Fernet AES-128-CBC symmetric payload encryption",
      ],
    },
  ],

  governedLimitations: [
    {
      area: "Consensus Architecture",
      currentLimitation:
        "The local blockchain component functions as an in-process cryptographic state machine without distributed P2P Byzantine consensus.",
      mitigationOrRoadmap:
        "Planned transition to a consortium validator network (Sepolia testnet or Hyperledger Besu / Raft).",
    },
    {
      area: "Key Custody & KMS",
      currentLimitation:
        "Fernet encryption keys are currently generated in-memory per process instance rather than stored in a dedicated Key Management Service.",
      mitigationOrRoadmap:
        "Integration of HashiCorp Vault or AWS KMS for automated envelope key rotation and secure persistence.",
    },
    {
      area: "Smart Contract Access Control",
      currentLimitation:
        "OrganDonation.sol exposes saveMatch() as a public function without caller authentication or role restrictions.",
      mitigationOrRoadmap:
        "Implementation of OpenZeppelin AccessControl with MATCH_OPERATOR_ROLE restricting write access to authorized backend signers.",
    },
  ],

  engineeringDecisions: [
    {
      decision: "Dual-Layer Cryptographic Model (Local Hash Chain + EVM Receipts)",
      rationale:
        "Separating large patient record storage from lightweight on-chain hash receipts minimizes public gas fees while preserving mathematical non-repudiation.",
      tradeoff:
        "Requires maintaining synchronization between off-chain encrypted store and on-chain event logs.",
    },
    {
      decision: "Fernet Symmetric Cryptography for Genotype Protection",
      rationale:
        "Ensures that even if database records or disk dumps are exfiltrated, patient identity and genotype records remain cryptographically protected with authenticated ciphertexts.",
      tradeoff:
        "Requires careful symmetric key lifecycle and backup management.",
    },
    {
      decision: "Deterministic Matching Algorithm over Black-Box ML",
      rationale:
        "Healthcare organ allocation demands 100% explainability and regulatory compliance (ABO/Rh compatibility rules cannot be probabilistic).",
      tradeoff:
        "Lacks adaptive learning from complex clinical immunological edge cases.",
    },
  ],

  links: {
    documentation: "/evidence/organ-donation/baseline-assessment.md",
  },

  targetRoles: [
    "Security Engineer",
    "DevSecOps Engineer",
    "Systems Engineer",
    "Smart Contract Auditor",
  ],

  applicableServices: [
    "service-cryptographic-architecture",
    "service-smartcontract-audit",
  ],

  governance: {
    repoPath: "CareerOS/Projects/OrganDonationApp",
    lastVerifiedDate: "2026-08-16",
    sourceOfTruth: "CareerOS Project Registry",
    humanApproved: true,
  },
};
