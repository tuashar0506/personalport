export const profile = {
  name: "Tushar Pradhan",
  handle: "tuashar0506",
  title: "Cybersecurity Student | Ethical Hacker",
  tagline: "Securing systems. Breaking limits.",
  email: "hello@tusharpradhan.com.np",
  github: "https://github.com/tuashar0506",
  location: "Nepal",
  githubSince: "2024",
};

export const about = [
  "I'm Tushar Pradhan, a BSc Ethical Hacking and Cybersecurity student at Softwarica College of IT and E-Commerce. I spend most of my time in the lab — breaking things on purpose, then learning how to defend them.",
  "My focus is offensive security: penetration testing, network reconnaissance, and vulnerability assessment. I like understanding how attackers think, because that's the fastest way to learn how systems actually fail.",
  "Right now I'm sharpening my skills through hands-on labs, CTF-style challenges, and building my own security tools in Python. Every project on my GitHub is something I built to understand a real attack or defense technique.",
  "Goal: earn my place as a junior penetration tester and keep climbing toward red-team work.",
];

export interface SkillGroup {
  label: string;
  icon: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Offensive Security",
    icon: "target",
    items: ["Ethical Hacking", "Penetration Testing", "Vulnerability Assessment", "OSINT"],
  },
  {
    label: "Defensive & Network",
    icon: "shield",
    items: ["Network Security", "Web Security", "Threat Analysis", "Incident Basics"],
  },
  {
    label: "Programming",
    icon: "code",
    items: ["Python", "Bash", "JavaScript", "HTML/CSS", "SQL"],
  },
];

export const tools = [
  "Kali Linux",
  "Nmap",
  "Burp Suite",
  "Metasploit",
  "Wireshark",
  "John the Ripper",
  "Gobuster",
  "Git & GitHub",
];

export interface Project {
  name: string;
  repo: string;
  description: string;
  tech: string[];
  category: string;
}

export const projects: Project[] = [
  {
    name: "IDS_Guard",
    repo: "https://github.com/tuashar0506/IDS_Guard",
    description:
      "A Python-based intrusion detection system that monitors network traffic and flags suspicious activity — my deep dive into how defenders spot attackers in real time.",
    tech: ["Python", "Network Security", "IDS"],
    category: "defense",
  },
  {
    name: "PortScanX",
    repo: "https://github.com/tuashar0506/PortScanX",
    description:
      "A custom port scanner built from scratch in Python for reconnaissance practice — discovering open ports, services, and attack surfaces the way tools like Nmap do under the hood.",
    tech: ["Python", "Recon", "Sockets"],
    category: "offense",
  },
  {
    name: "Lifelink",
    repo: "https://github.com/tuashar0506/Web_coursework",
    description:
      "Full-stack healthcare platform for Nepal with JWT-based authentication, role-based access control, appointment booking, and medicine management — built with secure development practices.",
    tech: ["React", "Node.js", "MySQL", "JWT"],
    category: "dev",
  },
  {
    name: "SEM-III-OS",
    repo: "https://github.com/tuashar0506/SEM-III-OS",
    description:
      "Operating systems coursework in C — implementing core OS concepts like process scheduling and memory management to understand systems at the lowest level.",
    tech: ["C", "Operating Systems"],
    category: "dev",
  },
];

export const education = [
  {
    school: "Softwarica College of IT and E-Commerce",
    program: "BSc Ethical Hacking and Cybersecurity",
    period: "Undergraduate — In Progress",
    note: "Studying offensive security, digital forensics, network defense, and secure software development.",
  },
];

export const fallbackGithub = {
  publicRepos: 4,
  languages: [
    { name: "Python", share: 50, color: "#a3e635" },
    { name: "JavaScript", share: 25, color: "#4ade80" },
    { name: "C", share: 25, color: "#166534" },
  ],
};
