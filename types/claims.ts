import type { EvidenceVerificationLevel } from "./evidence";

export interface ProjectCapabilityClaim {
  id: string;
  name: string;
  description: string;
  securityDomain: string;       // Maps to Career Intelligence Column 1
  methodology: string;          // Maps to Career Intelligence Column 2
  status: EvidenceVerificationLevel;
  sourceLocation?: {
    module: string;             // e.g. "pi_sniffer.parser.frame_parser"
    sourceFile: string;         // e.g. "pi_sniffer/parser/frame_parser.py"
    keySymbols: string[];       // e.g. ["FrameParser.parse_frame", "extract_ie_tags"]
  };
  primaryEvidenceRef: string;   // Resolves to EvidenceArtifact.id in project.evidence
  supportingEvidenceRefs?: string[];
  limitations?: string;
}
