import { Github, Mail, ChevronDown, ShieldCheck, Bug, Network } from "lucide-react";
import GlitchText from "@/components/GlitchText";
import Terminal from "@/components/Terminal";
import MatrixRain from "@/components/MatrixRain";
import avatar from "@/assets/avatar.jpg";
import { profile } from "@/data/portfolio";

const termLines = [
  {
    cmd: "whoami",
    output: ["tushar_pradhan — cybersecurity student | ethical hacker"],
  },
  {
    cmd: "nmap -sS --top-ports 100 target.lab",
    output: ["22/tcp open  ssh", "80/tcp open  http", "443/tcp open  https"],
  },
  {
    cmd: "./exploit --mode=learning --ethics=always",
    output: ["[+] access granted: knowledge", "[*] securing systems. breaking limits."],
  },
];

/** Avatar framed by an SVG gradient border whose gradient rotates via SMIL. */
function AvatarFrame() {
  return (
    <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] animate-flicker">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="rotate-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="50%" stopColor="#166534" />
            <stop offset="100%" stopColor="#a3e635" />
            <animate
              attributeName="x1"
              dur="8s"
              repeatCount="indefinite"
              values="0%;0%;50%;100%;100%;100%;50%;0%;0%"
            />
            <animate
              attributeName="x2"
              dur="8s"
              repeatCount="indefinite"
              values="100%;100%;50%;0%;0%;0%;50%;100%;100%"
            />
            <animate
              attributeName="y1"
              dur="8s"
              repeatCount="indefinite"
              values="50%;0%;0%;0%;50%;100%;100%;100%;50%"
            />
            <animate
              attributeName="y2"
              dur="8s"
              repeatCount="indefinite"
              values="50%;100%;100%;100%;50%;0%;0%;0%;50%"
            />
          </linearGradient>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width="97"
          height="97"
          fill="none"
          stroke="url(#rotate-gradient)"
          strokeWidth="1"
        />
      </svg>

      {/* corner brackets */}
      <div className="absolute -top-2 -left-2 w-7 h-7 border-t-2 border-l-2 border-neon" />
      <div className="absolute -top-2 -right-2 w-7 h-7 border-t-2 border-r-2 border-neon" />
      <div className="absolute -bottom-2 -left-2 w-7 h-7 border-b-2 border-l-2 border-neon" />
      <div className="absolute -bottom-2 -right-2 w-7 h-7 border-b-2 border-r-2 border-neon" />

      <div className="absolute inset-3 overflow-hidden scanlines relative bg-panel">
        <img
          src={avatar}
          alt="Cyber avatar of Tushar Pradhan"
          className="w-full h-full object-cover"
        />
      </div>

      {/* status chip */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-panel border border-edge px-4 py-1.5 font-mono text-[11px] whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
        <span className="text-muted2">status:</span>
        <span className="text-neon">online · open_to_work</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-cyber-grid">
      <MatrixRain className="absolute inset-0 w-full h-full opacity-[0.16] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col justify-center pt-28 pb-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
          {/* left — type */}
          <div>
            <p className="font-mono text-neon text-sm mb-5">
              <span className="text-muted2">$</span> init portfolio --user=tushar
            </p>
            <h1 className="font-display font-bold leading-[0.95] tracking-tight text-[52px] sm:text-[76px] lg:text-[88px]">
              <GlitchText text="TUSHAR" className="block text-slate-100" />
              <GlitchText
                text="PRADHAN"
                className="block text-neon text-glow"
                interval={4600}
              />
            </h1>
            <p className="mt-6 font-mono text-[15px] sm:text-base text-slate-300">
              <span className="text-neon">&gt;</span> {profile.title}
            </p>
            <p className="mt-2 font-mono text-sm text-muted2">
              <span className="text-neon">&gt;</span> {profile.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-neon text-ink font-mono text-sm font-bold hover:shadow-[0_0_28px_rgba(163,230,53,0.45)] transition-shadow"
              >
                view_projects -&gt;
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-edge text-slate-200 font-mono text-sm hover:border-neon/60 hover:text-neon transition-colors"
              >
                contact_me
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-edge text-muted2 hover:text-neon hover:border-neon/60 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-3 border border-edge text-muted2 hover:text-neon hover:border-neon/60 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] text-muted2">
              <span className="flex items-center gap-2">
                <Bug className="w-4 h-4 text-neon" /> offensive security
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neon" /> defense mindset
              </span>
              <span className="flex items-center gap-2">
                <Network className="w-4 h-4 text-neon" /> network recon
              </span>
            </div>
          </div>

          {/* right — avatar */}
          <div className="flex justify-center lg:justify-end pb-6">
            <AvatarFrame />
          </div>
        </div>

        {/* terminal strip */}
        <div className="mt-16 border border-edge bg-panel/80 backdrop-blur terminal-sheen">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-edge">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-muted2">tushar@kali: ~/portfolio</span>
          </div>
          <Terminal lines={termLines} className="p-5 min-h-[190px]" />
        </div>
      </div>

      <a
        href="#about"
        className="relative mx-auto mb-6 text-muted2 hover:text-neon transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
}
