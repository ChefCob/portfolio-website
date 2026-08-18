export interface AgentWriteValidationResult {
  allowed: boolean;
  targetPath: string;
  actor: string;
  reason?: string;
  auditEvent?: {
    eventId: string;
    timestamp: string;
    action: string;
    targetPath: string;
    actor: string;
    disposition: "ALLOWED" | "DENIED";
  };
}

const PROTECTED_GOVERNANCE_PATTERNS = [
  /^AGENTS\.md$/i,
  /^docs\/GOVERNANCE\.md$/i,
  /^SEOM\//i,
  /SEOM/i,
  /HUMAN-DECISIONS\.md/i,
  /PHASE-\d+-HUMAN-DECISIONS\.md/i,
];

/**
 * Validates whether an agent or automated actor is permitted to perform a write operation on a target file path.
 * Strictly blocks unauthorized mutations targeting normative governance files and human decision registers.
 */
export function validateAgentWriteOperation(
  targetPath: string,
  actor: { id: string; type: "HUMAN_OWNER" | "AGENT" | "AUTOMATION" }
): AgentWriteValidationResult {
  // Normalize path separators
  const normalizedPath = targetPath.replace(/\\/g, "/").replace(/^\.\//, "");

  const isProtected = PROTECTED_GOVERNANCE_PATTERNS.some((pattern) =>
    pattern.test(normalizedPath)
  );

  const eventId = `AUD-AGT-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const timestamp = new Date().toISOString();

  if (isProtected && actor.type !== "HUMAN_OWNER") {
    return {
      allowed: false,
      targetPath: normalizedPath,
      actor: actor.id,
      reason: `DENIED (POL-AI-003): Agent ${actor.id} attempted unauthorized write to protected governance path '${normalizedPath}'.`,
      auditEvent: {
        eventId,
        timestamp,
        action: "WRITE_FILE",
        targetPath: normalizedPath,
        actor: actor.id,
        disposition: "DENIED",
      },
    };
  }

  return {
    allowed: true,
    targetPath: normalizedPath,
    actor: actor.id,
    auditEvent: {
      eventId,
      timestamp,
      action: "WRITE_FILE",
      targetPath: normalizedPath,
      actor: actor.id,
      disposition: "ALLOWED",
    },
  };
}
