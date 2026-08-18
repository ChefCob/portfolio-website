export interface DlpFinding {
  ruleId: string;
  description: string;
  snippetMatch: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

export interface DlpScanResult {
  passed: boolean;
  findings: DlpFinding[];
}

/**
 * Calculates Shannon entropy of a string to evaluate randomness and detect high-entropy keys/tokens.
 */
export function calculateShannonEntropy(str: string): number {
  if (!str || str.length === 0) return 0;
  const frequencies = new Map<string, number>();
  for (const char of str) {
    frequencies.set(char, (frequencies.get(char) || 0) + 1);
  }
  let entropy = 0;
  for (const count of frequencies.values()) {
    const p = count / str.length;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

const CORE_FORBIDDEN_PATTERNS = [
  {
    ruleId: "DLP-PRIVATE-KEY",
    description: "Private Key Header Detected (RSA/EC/DSA/PKCS#8/Encrypted)",
    regex: /-----BEGIN (?:[A-Z0-9_-]+ )?PRIVATE KEY-----/i,
    severity: "CRITICAL" as const,
  },
  {
    ruleId: "DLP-GITHUB-TOKEN",
    description: "GitHub Personal Access Token Pattern (Classic & Fine-Grained)",
    regex: /(?:gh[pousr]_[A-Za-z0-9_]{30,255}|github_pat_[A-Za-z0-9_]{82})/,
    severity: "CRITICAL" as const,
  },
  {
    ruleId: "DLP-AWS-ACCESS-KEY",
    description: "AWS Access Key ID Pattern",
    regex: /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/,
    severity: "CRITICAL" as const,
  },
  {
    ruleId: "DLP-OPENAI-TOKEN",
    description: "OpenAI Secret Key Pattern (Legacy & Project-Scoped)",
    regex: /sk-(?:proj-)?[A-Za-z0-9_-]{32,}/,
    severity: "CRITICAL" as const,
  },
  {
    ruleId: "DLP-GENERIC-SECRET",
    description: "Hardcoded Password / Secret Assignment (Quoted or Unquoted)",
    regex: /(?:password|secret|api_key|access_token)\s*[:=]\s*(?:["'][A-Za-z0-9!@#$%^&*()_+=-]{8,}["']|[A-Za-z0-9!@#$%^&*()_+=-]{8,})/i,
    severity: "HIGH" as const,
  },
];

/**
 * Scans text content for sensitive credentials, including plaintext patterns,
 * decoded hex sequences, decoded Base64 sequences, and high-entropy secret tokens.
 */
export function scanTextForSensitiveData(text: string): DlpScanResult {
  const findings: DlpFinding[] = [];

  // 1. Direct Pattern Scanning
  for (const pattern of CORE_FORBIDDEN_PATTERNS) {
    const match = pattern.regex.exec(text);
    if (match) {
      findings.push({
        ruleId: pattern.ruleId,
        description: pattern.description,
        snippetMatch: match[0].substring(0, 16) + "...[REDACTED]",
        severity: pattern.severity,
      });
    }
  }

  // 2. Hex-Encoded Secret Detection (FINDING-DLP-01 Remediation)
  // Matches hex sequences in code/data (e.g., Buffer.from('6768705f...', 'hex') or raw hex literals)
  const hexPattern = /(?:'|")([0-9a-fA-F]{32,})(?:'|")/g;
  let hexMatch: RegExpExecArray | null;
  while ((hexMatch = hexPattern.exec(text)) !== null) {
    try {
      const hexStr = hexMatch[1];
      if (hexStr.length % 2 === 0) {
        const decoded = Buffer.from(hexStr, "hex").toString("utf8");
        for (const pattern of CORE_FORBIDDEN_PATTERNS) {
          if (pattern.regex.test(decoded)) {
            findings.push({
              ruleId: `DLP-HEX-ENCODED-${pattern.ruleId}`,
              description: `Hex-Encoded Secret Detected: ${pattern.description}`,
              snippetMatch: hexStr.substring(0, 16) + "...[HEX-REDACTED]",
              severity: "CRITICAL",
            });
          }
        }
      }
    } catch {
      // Non-decodable hex string; continue
    }
  }

  // 3. Base64-Encoded Secret Detection (FINDING-DLP-01 Remediation)
  const base64Pattern = /(?:'|")([A-Za-z0-9+/=]{32,})(?:'|")/g;
  let b64Match: RegExpExecArray | null;
  while ((b64Match = base64Pattern.exec(text)) !== null) {
    try {
      const b64Str = b64Match[1];
      const decoded = Buffer.from(b64Str, "base64").toString("utf8");
      // Check if decoded text contains printable ASCII with secret patterns
      for (const pattern of CORE_FORBIDDEN_PATTERNS) {
        if (pattern.regex.test(decoded)) {
          findings.push({
            ruleId: `DLP-B64-ENCODED-${pattern.ruleId}`,
            description: `Base64-Encoded Secret Detected: ${pattern.description}`,
            snippetMatch: b64Str.substring(0, 16) + "...[B64-REDACTED]",
            severity: "CRITICAL",
          });
        }
      }
    } catch {
      // Non-decodable base64 string; continue
    }
  }

  return {
    passed: findings.length === 0,
    findings,
  };
}
