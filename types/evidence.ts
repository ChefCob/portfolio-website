export type EvidenceArtifactType =
  | "pcap"              // Packet capture traces (.pcap, .pcap.gz)
  | "log_sample"        // Execution logs (sniffer.log, terminal transcripts)
  | "hardware_photo"    // Physical hardware execution test benches
  | "code_snippet"      // Specific implementation routines
  | "architecture_doc"  // Architecture and design specifications
  | "verification_doc"; // Formal capability verification matrices

export type EvidenceVerificationLevel =
  | "verified_implemented" // Tested, committed, and executable in source code
  | "demonstrated"         // Proven on physical hardware test bench
  | "documented_only"      // Specified in capstone/reports but omitted in code
  | "planned_roadmap";     // Explicitly scheduled future capability

export interface EvidenceArtifact {
  id: string;
  type: EvidenceArtifactType;
  title: string;
  description: string;
  filePath: string;             // Upstream repo relative path (e.g. "evidence/sniffer.log")
  assetPath?: string;           // Web-accessible static asset (e.g. "/evidence/pi-sniffer/sniffer.log")
  previewSnippet?: string;      // Curated authentic snippet for instant drawer viewing
  fileSizeBytes?: number;
  verificationStatus: EvidenceVerificationLevel;
  verificationNotes: string;
  verifiedDate: string;
}
