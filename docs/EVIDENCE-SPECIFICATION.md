# CareerOS Demonstration & Evidence Specification (SEOM-DEC-001)

## 1. Scope & Objective
This specification defines the universal demonstration contract and evidence lifecycle for CareerOS engineering projects. Every empirical measurement must be reproducible, isolated, and verifiably mapped to the Canonical Evidence Graph DAG.

## 2. Universal Adapter Interface (`IExecutionAdapter`)
Demonstrations are decoupled from host execution through standard interface adapters:

```typescript
export interface IExecutionAdapter {
  readonly projectId: string;
  readonly supportedDemos: string[];
  validatePrerequisites(): Promise<AdapterValidationResult>;
  executeScenario(scenarioId: string): Promise<DemonstrationExecutionResult>;
  collectTelemetry(runId: string): Promise<DemonstrationTelemetry>;
}
```

## 3. Evidence Categories & AST Nodes
Evidence artifacts are categorized into explicit sensitivity tiers and verification states:
* **`code_snippet`:** Source AST symbols anchored to repository relative paths.
* **`pcap_trace`:** Sanitized derivative trace metrics and frame spectrum vectors.
* **`log_sample`:** Pseudonymized execution session logs (`sniffer.log`).
* **`hardware_photo`:** Authentic component setup photographs.
* **`benchmark_run`:** Multi-run empirical statistics with variance, peak RSS, and throughput distributions.
