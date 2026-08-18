export type SkillGroup = {
  category: string;
  description: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Network & Wireless Security",
    description: "Protocol dissection, packet parsing, and traffic analysis.",
    items: ["802.11 Protocol Analysis", "Scapy", "PCAP Parsing", "Wireshark"],
  },
  {
    category: "Application & Cryptography",
    description: "Tamper resistance, payload encryption, and smart contract verification.",
    items: ["SHA-256 Chaining", "Fernet / AES Encryption", "REST APIs", "Solidity"],
  },
  {
    category: "Embedded & Systems Ops",
    description: "Resource-constrained hardware telemetry and environments.",
    items: ["MicroPython", "Raspberry Pi Pico W", "Linux / POSIX", "I2C Interfacing"],
  },
];
