# Pi-Sniffer Empirical Benchmark Telemetry

## 1. Overview
The Pi-Sniffer parser and stream dissector pipeline was subjected to rigorous empirical benchmark studies across two distinct workloads: an offline deterministic dataset (`DEMO-PI-SNIFFER-01`) and a privacy-sanitized live over-the-air capture (`DEMO-PI-SNIFFER-02`).

## 2. Empirical Benchmark Telemetry Table

| Metric Parameter | DEMO-PI-SNIFFER-01 (Offline Baseline) | DEMO-PI-SNIFFER-02 (Live Pipeline) |
|---|---|---|
| **Evidence Identifier** | `EVID-PI-BENCHMARK-01` | `EVID-PI-BENCHMARK-02` |
| **Workload Scope** | 1,093 IEEE 802.11 frames | 1,903 IEEE 802.11 frames |
| **Capture Duration** | 20.4 s trace playback | 60.4 s passive capture |
| **Repetitions ($N$)** | 5 benchmark iterations | 5 benchmark iterations |
| **Median Duration** | 0.8517 seconds | 2.5511 seconds |
| **Median Throughput** | 1,283.4 frames/sec | 745.95 frames/sec |
| **Throughput Variance** | $\sigma = 52.8\text{ fps}$ | $\sigma = 109.57\text{ fps}$ |
| **Peak Process RSS** | 80.79 MB | 83.07 MB |
| **Uncaught Exceptions**| 0 | 0 |
| **DLP Privacy Findings**| 0 | 0 |

## 3. Frame Spectrum Breakdown
* **DEMO-01 (1,093 Frames):** 448 Management (398 Beacons, 26 Probe Responses, 13 Probe Requests, 11 Auth/Assoc) + 356 Control + 286 Data + 3 Other = 1,093 Total Frames (100.0%).
* **DEMO-02 (1,903 Frames):** 1,576 Management (1,451 Beacons, 124 Probe Responses, 1 Probe Request) + 302 Data + 25 Control + 0 Other = 1,903 Total Frames (100.0%).
