# Pi-Sniffer Baseline Capability Assessment & Verification Matrix

## 1. Capability Classification Matrix

Every capability recorded in the project registry and capstone documentation is classified under one of the five governed statuses:

| Capability / Component | Governed Status | Implementation Evidence & Verification Notes |
|---|---|---|
| **802.11 Frame Parsing (Dot11, Beacons, Probes, Elts)** | `VERIFIED_IMPLEMENTED` | Implemented in `wifi2.py`–`wifi7.py`. Accurately parses SSID, BSSID, DS Parameter Set channel (Tag 3), and Crypto (RSN/Tag 48, WPA/Tag 221, Open). |
| **Device & SSID Identification** | `VERIFIED_IMPLEMENTED` | Tracks unique station MAC addresses (`addr2`), BSSIDs (`addr3`), advertised SSIDs, and client-to-SSID probe requests. |
| **OUI MAC Vendor Resolution** | `VERIFIED_IMPLEMENTED` | Extracts OUI (first 3 octets / 8 characters) from BSSID/MAC addresses across `wifi3.py`–`wifi7.py`. |
| **PCAP Streaming Replay Simulator** | `VERIFIED_IMPLEMENTED` | Implemented in `wifi7.py` using `scapy.utils.PcapReader` generator streaming, maintaining inter-packet delta delays scaled by `--speed`. |
| **Console Telemetry Dashboard & Logging** | `VERIFIED_IMPLEMENTED` | Formatted console tables and file logging to `sniffer.log` tracking runtime statistics and session summaries. |
| **MicroPython Wi-Fi Scanning (Pico W)** | `DEMONSTRATED` | Source code in `simplest.py`; demonstrated on physical hardware in `picow-breadboard-scan.jpg` scanning active APs and RSSI. |
| **SSD1306 OLED Display Integration** | `DEMONSTRATED` | Verified on physical Pico W breadboard via MicroPython I2C driver; software driver present in `wifi6.py`/`wifi7.py` using `luma.oled`. |
| **Rule-Based Anomaly Detection (Probe / Deauth Flood)** | `DOCUMENTED_ONLY` | Documented as planned capabilities in `project.yaml` and capstone review notes; 0 lines of detection heuristics exist in source. |
| **Threshold-Based Anomaly Detection** | `DOCUMENTED_ONLY` | Documented in `project.yaml`; no threshold evaluation logic exists in any script. |
| **Machine Learning Anomaly Detection (Isolation Forest)** | `DOCUMENTED_ONLY` | Listed in technologies and capabilities; no scikit-learn imports, feature matrices, or training/inference pipelines exist. |
| **Detection Metrics (94–96% Accuracy, <1s Latency)** | `DOCUMENTED_ONLY` | Listed in `project.yaml` metrics; completely unsubstantiated by any test harness or evaluation scripts. |
| **Live Linux Monitor-Mode Sniffing (wlan0mon)** | `PLANNED` | Replaced by offline PCAP replay simulator in current code. Documented in capstone PDF: "Current phase: Simulation. Future phase: Real hardware sniffing". |
| **PyShark Packet Engine** | `DOCUMENTED_ONLY` | Listed in `project.yaml` technologies; Scapy is exclusively used across all Python scripts. |
| **Statistical Traffic Feature Extraction** | `UNVERIFIED` | Basic packet counter exists in `wifi4.py`, but no windowed multi-dimensional feature vector extraction is implemented. |

---

## 2. Technical Findings Summary

1. **Actually Implemented in Source:**
   * MicroPython Embedded Active Scanner (`simplest.py`): RP2040 Wi-Fi active scan with I2C SSD1306 OLED display driver.
   * PCAP Streaming Replay Simulator (`wifi7.py`): Scapy `PcapReader` generator streaming against `wpa-Induction.pcap` (1,093 packets).
   * 802.11 Element Extraction: Recursively parses `Dot11Elt` tags to extract SSIDs, BSSIDs, operational channels, and RSN/WPA2 ciphers.
   * Telemetry File Logging: Structured logging to `sniffer.log` recording 1,982 session entries.

2. **Roadmap Items (Not Implemented):**
   * Machine Learning / Isolation Forest intrusion detection.
   * 94–96% detection accuracy claims.
   * Live Linux monitor mode (`wlan0mon`) raw socket sniffing.
