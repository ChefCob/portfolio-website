export const profile = {
  name: "Saptarshi",
  role: "Wireless Protocols & Embedded Security Systems Engineer",
  headline: "Security built in.\nNot bolted on.",
  tagline:
    "Structured assessments. Verifiable protocol proofs. Actionable engineering.",
  bio: "I design and evaluate high-integrity security systems, specializing in 802.11 wireless protocol dissection, embedded hardware reconnaissance, and cryptographic data integrity verification.",
  email: "saptarshi@example.com",
  location: "India",
  availability: "Open to full-time engineering and security roles",
  highlights: [
    {
      title: "Protocol & Traffic Analysis",
      description: "802.11 management frame dissection, Scapy generator streaming, and empirical packet benchmarks.",
    },
    {
      title: "Embedded Hardware Telemetry",
      description: "RP2040 MicroPython active WLAN channel scanning driving hardware I2C OLED displays.",
    },
    {
      title: "Cryptographic Architecture",
      description: "SHA-256 block hash chaining and Fernet symmetric cipher protection for sensitive records.",
    },
  ],
  links: {
    github: "https://github.com/saptarshi",
    linkedin: "https://linkedin.com/in/saptarshi",
    resume: "/resume.pdf",
  },
} as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Intelligence", href: "#career-intelligence" },
  { label: "Dossier", href: "/dossier" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
