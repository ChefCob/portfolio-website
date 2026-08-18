# Saptarshi — Security & Systems Engineering Portfolio

> **Verifiable engineering portfolio showcasing wireless protocol analysis, cryptographic architectures, and autonomous security operations.**

---

## Overview

This repository contains the source code, project architectures, and verification suites for **Saptarshi's Engineering Portfolio**.

Rather than relying on unverified claims, this portfolio emphasizes **evidence-backed project validation**: technical capabilities, empirical measurements, and system designs are anchored to repository source code, reproducible test harnesses, and sanitized public demonstrations.

---

## Featured Projects

### 1. Pi-Sniffer — Wireless Protocol Analysis & Hardware Reconnaissance
* **Domain:** Wireless Network Protocols (802.11 b/g/n, RP2040, Scapy)
* **Architecture:** Active/passive reconnaissance system combining a portable microcontroller hardware scanner driving an OLED display with a host-based packet stream dissector.
* **Demonstrated Capabilities:**
  - Microsecond inter-frame arrival delta pacing using streaming generators to prevent memory exhaustion during trace processing.
  - Information Element (IE) extraction covering SSIDs, BSSIDs, channel allocation, and cryptographic security suites.
* **Empirical Benchmarks:**
  - Evaluated on controlled benchmark streams achieving high-throughput parsing with zero uncaught exceptions and stable memory footprint.

### 2. Organ Donation Protocol — Cryptographic Integrity & Verification Layer
* **Domain:** Applied Cryptography & Distributed Systems (Python, Flask, Solidity, EVM)
* **Architecture:** Healthcare data integrity prototype utilizing symmetric envelope encryption for sensitive metadata, SHA-256 block hash chaining, and an Ethereum EVM smart contract logging immutable verification event receipts.
* **Scope & Boundaries:** Educational research prototype demonstrating tamper-evident record chaining without distributed consensus.

### 3. Agent SOC — Autonomous Incident Triage Testbed
* **Domain:** Security Operations & AI Guardrails (LangGraph, Python, Pydantic, Local LLMs)
* **Architecture:** Autonomous incident triage state machine executing ReAct loops for alert classification, MITRE ATT&CK mapping, and containment command synthesis.
* **Security Controls:** Strict input validation schemas and private local model execution for data sovereignty.

---

## Engineering & Security Principles

* **Evidence-Backed Validation:** Project capabilities resolve deterministically to repository source implementations, unit tests, and reproducible benchmarks.
* **Static Architecture:** Built with Next.js (App Router) and pre-rendered statically for high performance and a minimal operational attack surface.
* **Responsible Data Minimization:** Public demonstrations use sanitized derivatives. Raw network captures, private paths, and credentials are strictly excluded from the public repository.
* **Automated Quality & Security Testing:** Continuous validation suites enforce referential integrity, automated data loss prevention checks, and regression testing.

---

## Technology Stack

* **Web Application:** Next.js (App Router, Static Prerendering), React, TypeScript, Tailwind CSS
* **Systems & Protocol Analysis:** Python, Scapy, MicroPython
* **Applied Cryptography & AI:** Solidity (EVM), LangGraph, Pydantic

---

## Local Development & Testing

### Setup & Build
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Run production static build
npm run build
```

### Running Validation Suites
```bash
# Run security and integrity test suite
npx tsx scripts/adversarial-suite.ts

# Run protocol verification test suite
npx tsx scripts/adversarial-pi-01.ts
```

---

## Author & Contact

* **Author:** Saptarshi
* **Specialization:** Wireless Protocols & Embedded Security Systems
* **Email:** saptarshi@example.com
* **LinkedIn:** [linkedin.com/in/saptarshi-das-vitbrown](https://www.linkedin.com/in/saptarshi-das-vitbrown/)


