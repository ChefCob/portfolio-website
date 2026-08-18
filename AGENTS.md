# CareerOS Agent Operating Contract (Local Baseline)

**Scope:** `portfolio-website` & CareerOS Multi-Agent Runtime  
**Classification:** Normative Agent Governance  
**Governance Invariant:** Single Source of Truth ($\text{Repository Evidence} \longrightarrow \text{Canonical Registry} \longrightarrow \text{Detailed Record} \longrightarrow \text{Presentation Layer}$)  

---

## 1. Non-Negotiable Agent Invariants

1. **AI Agents Remain Strictly Non-Authoritative:**
   - Agents may inspect, analyze, draft, test, measure, and recommend.
   - Agents **MUST NOT**:
     - Approve their own work
     - Accept security risks or suppress threat findings
     - Approve evidence artifacts or claim upgrades
     - Authorize software releases
     - Mutate normative governance (`AGENTS.md`, `SEOM/`, `docs/GOVERNANCE.md`)
2. **Zero-Hallucination Evidence Rule:**
   - $\text{NO PHYSICAL SOURCE / EVIDENCE} \equiv \text{NO PUBLIC TECHNICAL CLAIM}$.
   - Every claim must resolve unambiguously to an AST key symbol, source path, and content-hashed evidence artifact.
3. **Maturity & Claim Boundaries:**
   - $\text{documented\_only} \neq \text{verified\_implemented}$
   - $\text{planned\_roadmap} \neq \text{verified\_implemented}$
   - $\text{prototype} \neq \text{production}$
   - $\text{observation} \neq \text{measured}$
4. **Safety & Defensive Testing Boundary:**
   - All testing must remain strictly local, defensive, and isolated.
   - Zero creation, execution, distribution, or persistence of offensive tooling, malware, or credential stealers.
   - Real credentials, live tokens, or external targets are strictly prohibited.

---

## 2. Agent Registry & Permission Matrix

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

*For complete governance specifications, refer to `docs/GOVERNANCE.md`.*
