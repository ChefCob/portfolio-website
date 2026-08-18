import fs from "fs";
import path from "path";

export interface PrivacyFinding {
  ruleId: string;
  category: "IP_ADDRESS" | "MAC_ADDRESS" | "FILESYSTEM_PATH" | "USERNAME" | "HOSTNAME" | "SECRET" | "UNREDACTED_SSID";
  description: string;
  matchSnippet: string;
  filePath: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
}

export interface PrivacyScanResult {
  passed: boolean;
  totalFilesScanned: number;
  totalFindings: number;
  realPersonalIdentifierFindings: number;
  findings: PrivacyFinding[];
}

// RFC 5737 / RFC 3849 / IEEE Documentation subnets and pseudonyms permitted in public benchmarks
const ALLOWED_DOC_PREFIXES = [
  "192.0.2.",    // TEST-NET-1 (RFC 5737)
  "198.51.100.", // TEST-NET-2 (RFC 5737)
  "203.0.113.",  // TEST-NET-3 (RFC 5737)
  "127.0.0.1",   // Localhost
  "0.0.0.0",     // Unspecified
  "00:00:5e:",   // IEEE Documentation OUI (RFC 7042 / IANA)
  "00:00:5E:",
  "ff:ff:ff:ff:ff:ff",
  "FF:FF:FF:FF:FF:FF",
];

const FORBIDDEN_IDENTITY_PATTERNS = [
  {
    ruleId: "PRIV-WIN-USER-PATH",
    category: "FILESYSTEM_PATH" as const,
    description: "Absolute Windows user directory path detected (C:\\Users\\...)",
    regex: /(?:[A-Za-z]:\\Users\\[A-Za-z0-9_.-]+|\/Users\/[A-Za-z0-9_.-]+)/i,
    severity: "CRITICAL" as const,
  },
  {
    ruleId: "PRIV-LINUX-HOME-PATH",
    category: "FILESYSTEM_PATH" as const,
    description: "Absolute Linux user home directory path detected (/home/...)",
    regex: /\/home\/(?!appuser|operator|node|runner)[A-Za-z0-9_.-]+/i,
    severity: "CRITICAL" as const,
  },
  {
    ruleId: "PRIV-SPECIFIC-USERNAME",
    category: "USERNAME" as const,
    description: "Specific workstation username literal detected",
    regex: /\bSAPTARSHI\b/i,
    severity: "CRITICAL" as const,
  },
  {
    ruleId: "PRIV-REAL-MAC",
    category: "MAC_ADDRESS" as const,
    description: "Un-pseudonymized hardware MAC address detected (Non-documentation OUI)",
    regex: /\b(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})\b/,
    severity: "HIGH" as const,
  },
  {
    ruleId: "PRIV-NON-DOC-IPV4",
    category: "IP_ADDRESS" as const,
    description: "Non-documentation IPv4 address detected",
    regex: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
    severity: "HIGH" as const,
  },
  {
    ruleId: "PRIV-PRIVATE-KEY",
    category: "SECRET" as const,
    description: "Private cryptographic key header detected",
    regex: /-----BEGIN (?:[A-Z0-9_-]+ )?PRIVATE KEY-----/i,
    severity: "CRITICAL" as const,
  },
  {
    ruleId: "PRIV-API-TOKEN",
    category: "SECRET" as const,
    description: "API key or personal access token pattern detected",
    regex: /(?:gh[pousr]_[A-Za-z0-9_]{30,255}|sk-(?:proj-)?[A-Za-z0-9_-]{32,}|AKIA[A-Z0-9]{16})/,
    severity: "CRITICAL" as const,
  },
];

/**
 * Scans a single text string / file content for real personal identifiers and credentials.
 */
export function scanContentForPrivacyViolations(
  content: string,
  filePath: string = "in-memory"
): PrivacyFinding[] {
  const findings: PrivacyFinding[] = [];

  for (const pattern of FORBIDDEN_IDENTITY_PATTERNS) {
    const matches = content.match(new RegExp(pattern.regex, "g"));
    if (matches) {
      for (const m of matches) {
        // Exclude allowed documentation prefixes
        const isAllowedDoc = ALLOWED_DOC_PREFIXES.some((prefix) =>
          m.toLowerCase().startsWith(prefix.toLowerCase())
        );

        // Exclude generic SVG viewBox attributes, version numbers, or font sizes resembling IPs
        if (pattern.category === "IP_ADDRESS") {
          if (m === "0.0.0.0" || m === "127.0.0.1" || isAllowedDoc) continue;
          // Ignore semver / sub-decimal version strings like "16.2.11" or "0.85.17"
          if (content.includes(`version: "${m}"`) || content.includes(`v${m}`)) continue;
        }

        // Exclude documentation MACs
        if (pattern.category === "MAC_ADDRESS") {
          if (isAllowedDoc) continue;
        }

        // Exclude development implementation log references if strictly quarantined
        if (pattern.category === "FILESYSTEM_PATH") {
          // Allow Relative Markdown links in docs/
          if (filePath.endsWith(".md") && !filePath.includes("public/")) {
            // Note: internal docs are scanned, but public artifacts must be 100% free
          }
        }

        if (!isAllowedDoc) {
          findings.push({
            ruleId: pattern.ruleId,
            category: pattern.category,
            description: pattern.description,
            matchSnippet: m.substring(0, 16) + "...[REDACTED]",
            filePath,
            severity: pattern.severity,
          });
        }
      }
    }
  }

  return findings;
}

/**
 * Recursively scans all public static assets, evidence files, SVGs, and JSON outputs in a directory.
 */
export function scanDirectoryForPrivacy(dirPath: string): PrivacyScanResult {
  const allFindings: PrivacyFinding[] = [];
  let fileCount = 0;

  function traverse(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules" && entry.name !== ".git" && entry.name !== ".next") {
          traverse(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if ([".json", ".svg", ".log", ".txt", ".ts", ".tsx", ".md", ".html"].includes(ext)) {
          fileCount++;
          try {
            const text = fs.readFileSync(fullPath, "utf8");
            const findings = scanContentForPrivacyViolations(text, fullPath);
            allFindings.push(...findings);
          } catch {
            // Binary or unreadable; skip
          }
        }
      }
    }
  }

  if (fs.existsSync(dirPath)) {
    traverse(dirPath);
  }

  const realPersonalFindings = allFindings.filter(
    (f) => f.category === "FILESYSTEM_PATH" || f.category === "USERNAME" || f.category === "SECRET"
  ).length;

  return {
    passed: realPersonalFindings === 0,
    totalFilesScanned: fileCount,
    totalFindings: allFindings.length,
    realPersonalIdentifierFindings: realPersonalFindings,
    findings: allFindings,
  };
}
