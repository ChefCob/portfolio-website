export const profile = {
  name: "Saptarshi",
  role: "Penetration Tester & Security Researcher",
  headline: "Security built in.\nNot bolted on.",
  tagline:
    "Structured assessments. Clear findings. Actionable remediation.",
  bio: "I help organizations identify and fix security vulnerabilities before they become incidents. From web application testing to network assessments, I deliver findings that teams can actually act on.",
  email: "saptarshi@example.com",
  location: "India",
  availability: "Open to full-time and contract roles",
  highlights: [
    {
      title: "Web Application Testing",
      description: "OWASP-aligned assessments with reproducible proof-of-concept findings.",
    },
    {
      title: "Clear Reporting",
      description: "Executive summaries and technical details that bridge security and engineering.",
    },
    {
      title: "Remediation Support",
      description: "Practical guidance to help teams prioritize and fix what matters most.",
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
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
