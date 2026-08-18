# CareerOS Privacy & Data Leakage Prevention Framework

## 1. Multi-Stage Privacy Air-Gap Pipeline
To guarantee that zero real personal network identifiers, private paths, or credentials enter public repositories, CareerOS enforces a 3-gate privacy boundary:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PRIVACY AIR-GAP PIPELINE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   [Isolated Capture VM] ───► [Sanitization Engine] ───► [Public Repository]│
│   (Gate A: Quarantine)        (Gate B: Tokenize)          (Gate C: DLP Scan)│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. Gate Verification Rules
* **Gate A (Quarantine):** Raw over-the-air packet captures and adapter logs remain quarantined inside isolated local testing environments.
* **Gate B (Sanitization):** All observed MAC addresses are mapped to IEEE RFC 7042 Documentation OUI (`00:00:5E:00:xx:xx`). SSIDs are normalized to `LAB-SSID-xxx`.
* **Gate C (Public Assets):** Multi-stage DLP scanning (`privacyScanner.ts`) verifies that zero real MACs, private IPs, usernames, or absolute filesystem paths exist in public JSON, SVG, or Markdown artifacts.
