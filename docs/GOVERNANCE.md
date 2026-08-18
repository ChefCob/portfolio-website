# CareerOS Multi-Agent Governance Framework

## 1. Non-Negotiable Agent Invariants
AI agents operating within the CareerOS workspace remain strictly non-authoritative:
1. **No Self-Approval:** Agents may analyze, measure, draft, and test, but cannot approve their own work or authorize releases.
2. **Zero-Hallucination Evidence Rule:** Public technical claims require content-hashed source code or derivative benchmark artifacts.
3. **Maturity Boundaries:** Prototype implementations and planned roadmap features are explicitly distinguished from verified production capabilities.
4. **Defensive Testing Only:** All test routines are defensive, localized, and executed in isolated container sandboxes without external network calls (`--network none`).

## 2. Agent Permission Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AGENT REGISTRY & PERMISSIONS                        │
├──────────────┬──────────────────┬──────────────┬──────────────┬─────────────┤
│ Agent ID     │ Logical Role     │ Repo Read    │ Repo Write   │ Release Auth│
├──────────────┼──────────────────┼──────────────┼──────────────┼─────────────┤
│ AGT-ARCH     │ Architecture     │ ALLOWED      │ FORBIDDEN    │ FORBIDDEN   │
│              │ Auditor          │ (All scopes) │ (Read-only)  │             │
├──────────────┼──────────────────┼──────────────┼──────────────┼─────────────┤
│ AGT-EVID     │ Evidence Auditor │ ALLOWED      │ FORBIDDEN    │ FORBIDDEN   │
│              │ & Graph Mapper   │ (Evidence)   │ (Read-only)  │             │
├──────────────┼──────────────────┼──────────────┼──────────────┼─────────────┤
│ AGT-SEC      │ Security Auditor │ ALLOWED      │ FORBIDDEN    │ FORBIDDEN   │
│              │ & Threat Modeler │ (All scopes) │ (Read-only)  │             │
├──────────────┼──────────────────┼──────────────┼──────────────┼─────────────┤
│ AGT-DEV      │ Implementation   │ ALLOWED      │ ALLOWED      │ FORBIDDEN   │
│              │ Engineer         │ (Workspace)  │ (Non-gov)    │             │
├──────────────┼──────────────────┼──────────────┼──────────────┼─────────────┤
│ HUMAN-OWNER  │ Portfolio Owner  │ FULL         │ FULL         │ FULL        │
│              │ (Root Admin)     │ (Unrestricted│ (Unrestricted│ (Sole Auth) │
└──────────────┴──────────────────┴──────────────┴──────────────┴─────────────┘
```
