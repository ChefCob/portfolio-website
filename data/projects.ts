export type Project = {
  title: string;
  description: string;
  stack: string[];
  gradient: string;
  href?: string;
  github?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Web App Pentest Toolkit",
    description:
      "Burp Suite extensions and automation scripts for structured OWASP Top 10 assessments.",
    stack: ["Python", "Burp Suite", "OWASP"],
    gradient: "from-[#1a3a2a] via-[#2d5a45] to-[#1a3a2a]",
    github: "https://github.com/saptarshi",
    featured: true,
  },
  {
    title: "Network Recon Dashboard",
    description:
      "Visualizing scan results, service fingerprints, and CVE correlations with exportable reports.",
    stack: ["Node.js", "Nmap", "Chart.js"],
    gradient: "from-[#1a2a4a] via-[#2d4a7a] to-[#1a2a4a]",
    href: "#",
    github: "https://github.com/saptarshi",
  },
  {
    title: "CTF Challenge Platform",
    description:
      "Self-hosted training environment with isolated lab boxes for security practice.",
    stack: ["Docker", "Linux", "Bash"],
    gradient: "from-[#3a2a1a] via-[#5a4a2d] to-[#3a2a1a]",
    href: "#",
    github: "https://github.com/saptarshi/portfolio-website",
  },
];
