export type SkillGroup = {
  category: string;
  description: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Offensive Security",
    description: "Authorized testing tools and techniques.",
    items: ["Burp Suite", "Metasploit", "Nmap", "Wireshark"],
  },
  {
    category: "Web Security",
    description: "Application-layer vulnerability assessment.",
    items: ["SQL Injection", "XSS / CSRF", "SSRF / IDOR", "API Testing"],
  },
  {
    category: "Scripting & Ops",
    description: "Automation, environments, and workflows.",
    items: ["Python", "Bash", "Kali Linux", "Docker"],
  },
];
