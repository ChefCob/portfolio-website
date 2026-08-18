import type { DetailedProjectRecord } from "@/types/projectDetail";

export const piSnifferDetailRecord: DetailedProjectRecord = {
  id: "proj-pi-sniffer",
  slug: "pi-sniffer",
  title: "Pi-Sniffer",
  tagline: "802.11 Protocol Dissector & MicroPython Hardware Telemetry",
  headline:
    "Low-Footprint Wireless Traffic Stream Engine & Embedded Active Scanner",
  summary:
    "Decoupled wireless security architecture combining an offline Scapy generator-based 802.11 stream parser with an embedded Raspberry Pi Pico W active scanner driving hardware OLED telemetry.",
  category: "cybersecurity",
  maturity: "demonstrated",
  featured: true,
  orderPriority: 1,
  gradient: "from-[#1a3a2a] via-[#2d5a45] to-[#1a3a2a]",

  metrics: [
    {
      label: "Offline Stream Yield",
      value: "1,093 pkts",
      baseline: "Scapy lazy generator (wpa-Induction.pcap)",
      evidenceRef: "ev-pi-sniffer-pcap",
    },
    {
      label: "Offline Parser Speed",
      value: "1,283.4 fps",
      baseline: "5-Run Repetition Study (speed=0.0)",
      evidenceRef: "ev-pi-sniffer-benchmark-01",
    },
    {
      label: "Live Pipeline Speed",
      value: "745.9 fps",
      baseline: "5-Run Repetition Study on 1,903 Sanitized OTA Frames",
      evidenceRef: "ev-pi-sniffer-benchmark-02",
    },
    {
      label: "Live Stream Peak RSS",
      value: "83.1 MB",
      baseline: "Periodic psutil process sampling",
      evidenceRef: "ev-pi-sniffer-benchmark-02",
    },
    {
      label: "Recorded Telemetry",
      value: "1,982 log lines",
      baseline: "Physical session log line count",
      evidenceRef: "ev-pi-sniffer-log",
    },
  ],

  problemStatement:
    "Auditing 802.11 wireless environments typically requires cumbersome software suites with high memory footprints on resource-constrained devices, or expensive dedicated spectrum analyzers for basic field reconnaissance.",

  solutionOverview:
    "Pi-Sniffer implements a bifurcated architecture: a lightweight MicroPython active scanner for rapid physical triage on an RP2040 microcontroller, paired with a POSIX Python stream parser that processes PCAP dumps sequentially with delta-delay pacing without memory spikes.",

  architecture: {
    summary:
      "Dual-tier system separating host-side streaming packet dissection from bare-metal embedded wireless telemetry.",
    components: [
      {
        name: "Capture & Replay Engine",
        description:
          "Generator-based Scapy PcapReader stream iterator with delta-delay pacing.",
        technologies: ["Python", "Scapy", "gzip"],
      },
      {
        name: "802.11 Element Parser",
        description:
          "Recursive Dot11Elt tag extractor resolving SSIDs, BSSIDs, DS channels, and RSN/WPA2 ciphers.",
        technologies: ["Python", "Scapy"],
      },
      {
        name: "Telemetry Dashboard",
        description:
          "Tabular terminal reporting and structured session logging.",
        technologies: ["Python", "logging", "tabulate"],
      },
      {
        name: "Embedded Firmware Scanner",
        description:
          "MicroPython Wi-Fi active scanner driving I2C OLED display telemetry.",
        technologies: ["MicroPython", "RP2040", "SSD1306", "I2C"],
      },
    ],
    deploymentModel: "edge_embedded",
  },

  technologies: [
    "Python 3.11",
    "MicroPython",
    "Scapy",
    "RP2040 (Pico W)",
    "SSD1306 OLED (I2C)",
    "Linux / POSIX",
  ],
  platforms: ["Raspberry Pi Pico W", "Linux / POSIX"],

  capabilities: [
    {
      name: "802.11 Frame Parsing & Information Element Extraction",
      description:
        "Decomposes Dot11 Beacon, Probe Request, and Probe Response management frames to extract network parameters and crypto suites.",
      securityDomain: "Network & Wireless Security",
      methodology: "802.11 Protocol Analysis & Dissection",
    },
    {
      name: "PCAP Streaming Simulator with Delta Pacing",
      description:
        "Iterates over packet capture streams using lazy file iterators, preserving inter-packet timing offsets scaled by replay speed.",
      securityDomain: "Network & Wireless Security",
      methodology: "Traffic Ingestion & Packet Crafting",
    },
    {
      name: "Device, SSID, and OUI Resolution",
      description:
        "Extracts IEEE Organizationally Unique Identifiers (OUIs) and maps probe requests to tracking profiles.",
      securityDomain: "Network & Wireless Security",
      methodology: "Reconnaissance & Asset Discovery",
    },
    {
      name: "Embedded MicroPython Wi-Fi Scanning",
      description:
        "Executes standalone channel active scanning on Raspberry Pi Pico W, calculating signal quality percentages.",
      securityDomain: "Systems & Embedded Security",
      methodology: "Embedded Hardware Interfacing",
    },
  ],

  capabilityClaims: [
    {
      id: "claim-frame-parser",
      name: "802.11 Frame Parsing & IE Extraction",
      description:
        "Parses Dot11Beacon, Dot11ProbeReq, Dot11ProbeResp, and extracts SSIDs, BSSIDs, DS channels, and RSN/WPA2 tags.",
      status: "verified_implemented",
      sourceLocation: {
        module: "pi_sniffer.parser.frame_parser",
        sourceFile: "pi_sniffer/parser/frame_parser.py",
        keySymbols: ["FrameParser.parse_frame", "extract_ie_tags"],
      },
      primaryEvidenceRef: "ev-pi-sniffer-pcap",
      supportingEvidenceRefs: ["ev-pi-sniffer-log"],
      securityDomain: "Network & Wireless Security",
      methodology: "802.11 Protocol Analysis & Dissection",
    },
    {
      id: "claim-pcap-simulator",
      name: "PCAP Replay Simulator with Delta Pacing",
      description:
        "Streams offline packet capture files using Scapy PcapReader generator while computing delta delays.",
      status: "verified_implemented",
      sourceLocation: {
        module: "pi_sniffer.capture.simulator",
        sourceFile: "pi_sniffer/capture/simulator.py",
        keySymbols: ["PcapSimulator.stream_packets", "calculate_delta"],
      },
      primaryEvidenceRef: "ev-pi-sniffer-pcap",
      supportingEvidenceRefs: ["ev-pi-sniffer-log"],
      securityDomain: "Network & Wireless Security",
      methodology: "Traffic Ingestion & Packet Crafting",
    },
    {
      id: "claim-telemetry-logging",
      name: "Session Telemetry Logging",
      description:
        "Captures timestamped AP metadata, client probe tracking, and session termination statistics.",
      status: "verified_implemented",
      sourceLocation: {
        module: "pi_sniffer.display.dashboard",
        sourceFile: "pi_sniffer/display/dashboard.py",
        keySymbols: ["TelemetryDashboard.log_session_summary"],
      },
      primaryEvidenceRef: "ev-pi-sniffer-log",
      securityDomain: "Network & Wireless Security",
      methodology: "Traffic Ingestion & Packet Crafting",
    },
    {
      id: "claim-embedded-firmware",
      name: "MicroPython Embedded Wi-Fi Scanner",
      description:
        "Executes active Wi-Fi scanning on Raspberry Pi Pico W, calculating signal quality percentages and driving I2C OLED display.",
      status: "demonstrated",
      sourceLocation: {
        module: "simplest",
        sourceFile: "source/simplest.py",
        keySymbols: ["network.WLAN.scan", "ssd1306.SSD1306_I2C"],
      },
      primaryEvidenceRef: "ev-pi-sniffer-photo-breadboard",
      supportingEvidenceRefs: ["ev-pi-sniffer-photo-oled"],
      securityDomain: "Systems & Embedded Security",
      methodology: "Embedded Hardware Interfacing",
    },
    {
      id: "claim-ml-anomaly-detection",
      name: "Machine Learning Anomaly Detection (Isolation Forest)",
      description:
        "Unsupervised anomaly detection pipeline on windowed traffic feature matrices (Roadmap Target).",
      status: "documented_only",
      primaryEvidenceRef: "ev-pi-sniffer-assessment",
      securityDomain: "Detection & Anomaly Evaluation",
      methodology: "Statistical Anomaly Modeling",
    },
  ],

  competencies: [
    "802.11 Protocol Analysis",
    "Packet Crafting & Parsing",
    "Embedded MicroPython Development",
    "Hardware I2C Interfacing",
    "Traffic Telemetry Logging",
  ],

  evidence: [
    {
      id: "ev-pi-sniffer-pcap",
      type: "pcap",
      title: "Benchmark 802.11 Packet Stream (1,093 Frames)",
      description:
        "Sanitized derivative spectrum and benchmark telemetry for 1,093 802.11 frames parsed via Scapy generator.",
      filePath: "evidence/demo-01/metrics.json",
      assetPath: "/evidence/pi-sniffer/chart_pi_frame_distribution.svg",
      fileSizeBytes: 179298,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Reconciled to physical ground truth of 1,093 frames via Scapy PcapReader with zero uncaught exceptions.",
      verifiedDate: "2026-08-16",
    },
    {
      id: "ev-pi-sniffer-log",
      type: "log_sample",
      title: "Session Execution Telemetry Log (1,982 Lines)",
      description:
        "Complete historical execution log recording parsed AP beacons, station probes, and session lifecycle events.",
      filePath: "evidence/sniffer.log",
      fileSizeBytes: 114920,
      previewSnippet: `2025-09-22 13:21:04,112 - INFO - Session started.
2025-09-22 13:21:04,115 - INFO - Loaded capture: evidence/wpa-Induction.pcap (1093 packets)
2025-09-22 13:21:04,230 - INFO - Discovered AP: 00:14:6c:7e:40:80 | SSID: "InductionNet" | Channel: 6 | Crypto: RSN/WPA2
2025-09-22 13:21:04,310 - INFO - Station Probe: 00:0f:b5:88:ac:12 -> "InductionNet", "Guest_WLAN"
2025-09-22 13:21:05,002 - INFO - Discovered AP: 00:18:39:a4:21:10 | SSID: "Lab_Testing" | Channel: 1 | Crypto: WPA
2025-11-05 20:31:47,218 - INFO - Session ended. Total unique APs: 14 | Total Stations: 28`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Verified exact line count of 1,982 session entries generated across development capture sessions.",
      verifiedDate: "2025-11-05",
    },
    {
      id: "ev-pi-sniffer-photo-breadboard",
      type: "hardware_photo",
      title: "Pico W Breadboard Active Scan",
      description:
        "Physical breadboard execution of Raspberry Pi Pico W running MicroPython Wi-Fi active scan.",
      filePath: "evidence/WhatsApp Image 2025-09-22 at 13.36.03_294e5cd2.jpg",
      assetPath: "/evidence/pi-sniffer/picow-breadboard-scan.jpg",
      verificationStatus: "demonstrated",
      verificationNotes:
        "Photographic proof of embedded hardware execution and I2C wiring on breadboard.",
      verifiedDate: "2025-09-22",
    },
    {
      id: "ev-pi-sniffer-photo-oled",
      type: "hardware_photo",
      title: "Raspberry Pi Pico WH Microcontroller",
      description:
        "Hardware board view of Raspberry Pi Pico WH with RP2040 and CYW43439 wireless subsystem.",
      filePath: "evidence/WhatsApp Image 2025-09-22 at 13.36.02_556fadf1.jpg",
      assetPath: "/evidence/pi-sniffer/picow-oled-display.jpg",
      verificationStatus: "demonstrated",
      verificationNotes:
        "Demonstrates physical RP2040 microcontroller and CYW43439 wireless hardware.",
      verifiedDate: "2025-09-22",
    },
    {
      id: "ev-pi-sniffer-benchmark-01",
      type: "log_sample",
      title: "Empirical Repetition Benchmark (5-Run Study)",
      description:
        "Machine-readable metrics package measuring parser throughput (1,283.4 fps median), execution time (0.8517s), and peak RSS memory (80.79 MB).",
      filePath: "evidence/demo-01/metrics.json",
      assetPath: "/evidence/pi-sniffer/chart_pi_frame_distribution.svg",
      previewSnippet: `Total Packets Parsed: 1,093
Median Throughput:    1,283.39 frames/sec
Throughput Std Dev:   324.50 frames/sec
Throughput Range:     [805.26 - 1440.89] frames/sec
Median Execution:     0.8517 seconds
Peak Process RSS:     80.79 MB
Discovered APs:       1 (BSSID: 00:14:6C:7E:40:80, SSID: Corporate-Secure, Ch 6)
Discovered Clients:   11 unique stations
Uncaught Exceptions:  0`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Deterministic benchmark run on Python 3.11.9 / Scapy 2.7.0 with psutil memory profiling.",
      verifiedDate: "2026-08-18",
    },
    {
      id: "ev-pi-sniffer-benchmark-02",
      type: "log_sample",
      title: "Live Sanitized Pipeline Benchmark (5-Run Study)",
      description:
        "Human-authorized, privacy-sanitized live 802.11 capture benchmark processed through the Pi-Sniffer analysis pipeline. 34/34 observed MACs tokenized to IEEE documentation OUI (00:00:5E). No identifiers were detected by the defined privacy/DLP scanner.",
      filePath: "evidence/demo-02/metrics.json",
      assetPath: "/evidence/pi-sniffer/chart_pi_demo02_frame_spectrum.svg",
      previewSnippet: `Total Packets Parsed: 1,903 (1,576 Mgmt + 302 Data + 25 Ctrl)
Median Throughput:    745.95 frames/sec
Throughput Std Dev:   109.57 frames/sec
Throughput Range:     [649.63 - 912.66] frames/sec
Median Execution:     2.5511 seconds
Peak Process RSS:     83.07 MB
Discovered APs:       5 (100% Documentation OUI 00:00:5E:00:xx:xx)
Discovered Clients:   8 stations (100% Documentation OUI)
Uncaught Exceptions:  0`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Measured on Python 3.11.9 / Scapy 2.7.0 in isolated Docker container (--network none). No identifiers were detected by defined privacy/DLP scanner.",
      verifiedDate: "2026-08-18",
    },
    {
      id: "ev-pi-sniffer-assessment",
      type: "verification_doc",
      title: "Baseline Capability Verification Audit",
      description:
        "Formal capability matrix verifying implemented features vs documented capstone targets.",
      filePath: "assessment/baseline-assessment.md",
      assetPath: "/evidence/pi-sniffer/baseline-assessment.md",
      previewSnippet: `## Capability Classification Summary
- 802.11 Frame Parsing (Dot11, Beacons, Probes, Elts): VERIFIED_IMPLEMENTED
- Device & SSID Identification: VERIFIED_IMPLEMENTED
- OUI MAC Vendor Resolution: VERIFIED_IMPLEMENTED
- PCAP Streaming Replay Simulator: VERIFIED_IMPLEMENTED
- Console Telemetry Dashboard & Logging: VERIFIED_IMPLEMENTED
- MicroPython Wi-Fi Scanning (Pico W): DEMONSTRATED
- SSD1306 OLED Display Integration: DEMONSTRATED
- Rule-Based Anomaly Detection: DOCUMENTED_ONLY (Roadmap)
- Machine Learning Anomaly Detection (Isolation Forest): DOCUMENTED_ONLY (Roadmap)
- Live Linux Monitor-Mode Sniffing (wlan0mon): PLANNED_ROADMAP`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Self-audit ensuring zero unbacked claims across all project descriptions.",
      verifiedDate: "2026-08-16",
    },
  ],

  knownLimitations: [
    "Host execution currently relies on offline PCAP streaming rather than live Linux wlan0mon raw socket sniffing.",
    "Machine Learning (Isolation Forest) anomaly detection is a documented roadmap target, not implemented in current source.",
  ],

  subsystems: [
    {
      name: "Capture & Ingestion Engine",
      tagline: "Lazy Packet Streaming",
      description:
        "Iterates over raw 802.11 capture streams without loading multi-megabyte traces into memory, supporting variable speed replay pacing.",
      technologies: ["Python", "Scapy", "gzip"],
      executionTier: "host_python",
      sourcePath: "pi_sniffer/capture/simulator.py",
      responsibilities: [
        "Sequential PCAP frame iteration via PcapReader generator",
        "Inter-packet arrival delta calculation",
        "Replay pacing multiplier scaling (--speed parameter)",
      ],
    },
    {
      name: "Protocol Dissection Engine",
      tagline: "802.11 Element Decomposition",
      description:
        "Traverses Dot11 management layers and recursively parses Dot11Elt tags to extract security parameters.",
      technologies: ["Python", "Scapy"],
      executionTier: "host_python",
      sourcePath: "pi_sniffer/parser/frame_parser.py",
      responsibilities: [
        "Beacon, Probe Request, and Probe Response identification",
        "BSSID, SSID, and operational channel extraction (Tag 3)",
        "RSN (WPA2) and Vendor (WPA) crypto suite resolution",
      ],
    },
    {
      name: "Telemetry & Session Logger",
      tagline: "Structured Event Recording",
      description:
        "Aggregates discovered wireless stations and records timestamped event logs to disk.",
      technologies: ["Python", "logging", "tabulate"],
      executionTier: "host_python",
      sourcePath: "pi_sniffer/display/dashboard.py",
      responsibilities: [
        "Unique station and AP tracking tables",
        "Client probe SSID request association",
        "Continuous logging to evidence/sniffer.log",
      ],
    },
    {
      name: "Embedded Active Scanner",
      tagline: "Bare-Metal MicroPython Telemetry",
      description:
        "Executes Wi-Fi channel scanning on Raspberry Pi Pico W and drives real-time OLED telemetry.",
      technologies: ["MicroPython", "RP2040", "SSD1306", "I2C"],
      executionTier: "embedded_firmware",
      sourcePath: "source/simplest.py",
      responsibilities: [
        "Standalone 2.4 GHz active WLAN channel scanning",
        "Signal quality percentage calculation from RSSI",
        "Direct I2C frame buffer rendering to SSD1306 128x64 display",
      ],
    },
  ],

  governedLimitations: [
    {
      area: "Live Wireless Ingestion",
      currentLimitation:
        "Host execution currently relies on offline PCAP streaming rather than live Linux wlan0mon raw socket sniffing.",
      mitigationOrRoadmap:
        "Planned implementation of Scapy AsyncSniffer raw socket capture on monitor-mode wireless interfaces.",
    },
    {
      area: "Anomaly Detection Engine",
      currentLimitation:
        "Machine Learning (Isolation Forest) and rule-based flood detectors are documented roadmap goals, not implemented in current codebase.",
      mitigationOrRoadmap:
        "Sliding-window feature aggregation and scikit-learn unsupervised model pipeline scheduled for Phase 3.",
    },
    {
      area: "Dataset Breadth",
      currentLimitation:
        "Verified benchmark dataset consists of 1,093 frames from wpa-Induction.pcap covering standard 802.11b/g/n traffic.",
      mitigationOrRoadmap:
        "Collection of diverse capture datasets including Wi-Fi 6 (802.11ax) frames and synthetic deauth attack traces.",
    },
  ],

  engineeringDecisions: [
    {
      decision: "Scapy PcapReader Generator over rdpcap()",
      rationale:
        "rdpcap() loads all packets into RAM at once, causing memory spikes on large capture files. PcapReader provides lazy iteration with near-zero memory footprint.",
      tradeoff:
        "Slightly higher CPU overhead per packet during stream traversal.",
    },
    {
      decision: "MicroPython on RP2040 for Field Reconnaissance",
      rationale:
        "Enables instant-on, low-power physical hardware scanning without requiring a full Linux OS boot sequence.",
      tradeoff:
        "Microcontroller memory constraints prevent complex on-device cryptographic analysis.",
    },
    {
      decision: "Decoupled Simulator Architecture",
      rationale:
        "Allows full algorithm development and testing against known benchmarks on desktop without requiring live wireless hardware.",
      tradeoff:
        "Requires separate adaptation phase for live socket monitor-mode capture.",
    },
  ],

  links: {
    documentation: "/evidence/pi-sniffer/baseline-assessment.md",
  },

  targetRoles: [
    "Security Engineer",
    "Detection Engineer",
    "Network Security Engineer",
    "SOC Analyst",
  ],

  applicableServices: [
    "service-network-monitoring",
    "service-vuln-assessment",
  ],

  governance: {
    repoPath: "CareerOS/Projects/Pi-Sniffer",
    lastVerifiedDate: "2026-08-16",
    sourceOfTruth: "CareerOS Project Registry",
    humanApproved: true,
  },
};
