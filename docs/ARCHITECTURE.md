# CareerOS System Architecture

## 1. Overview
CareerOS is an evidence-anchored engineering portfolio and multi-agent verification system. It implements a strict **Single Source of Truth** architecture where every public claim is deterministically backed by an Abstract Syntax Tree (AST) evidence graph node, cryptographic hash, and physical artifact.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CAREEROS ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [Repository Evidence] ───► [Canonical Graph] ───► [Presentation Layer]   │
│   (Code, Logs, SVGs)         (AST DAG Nodes)        (Next.js SSG & Dossier) │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. Core Architecture Principles
1. **Zero-Hallucination Evidence Contract:** No public technical claim may exist without a direct AST pointer to an existing, content-hashed evidence artifact.
2. **Deterministic Graph Validation:** Referential integrity between projects, claims, evidence, metrics, threats, and architectural decision records is verified at build time via `lib/graph/validator.ts`.
3. **Static Generation & Air-Gap Build:** The web layer uses Next.js 16 App Router with Turbopack, pre-rendering all routes statically (`SSG`) without runtime backend databases or external identity queries.
4. **Separation of Concerns:**
   - **`data/graph/canonicalGraph.ts`:** Master DAG holding all entities, claims, and metrics.
   - **`data/registry/`:** Project-specific presentation records consumed by UI route handlers.
   - **`lib/security/`:** Runtime defense hooks (`agentGuard`, `dlpScanner`, `privacyScanner`).
   - **`lib/adapters/`:** Universal demonstration harnesses implementing `SEOM-DEC-001`.
