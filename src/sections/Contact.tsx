import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/portfolio";
import { Github, Mail, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-panel/40 border-t border-edge/60">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="reveal">
          <SectionHeading index="06" tag="establish_connection" title="Let's Talk" />
        </div>

        <p className="reveal text-muted2 leading-relaxed text-[15px] max-w-xl mx-auto -mt-4">
          I'm open to internships, junior security roles, CTF teams, and collaborations on
          security projects. Whether you have an opportunity or just want to talk offensive
          security — my inbox is always listening on port 443.
        </p>

        <div className="reveal mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-neon text-ink font-mono text-sm font-bold hover:shadow-[0_0_28px_rgba(163,230,53,0.45)] transition-shadow"
          >
            <Send className="w-4 h-4" />
            send_message
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-edge text-slate-200 font-mono text-sm hover:border-neon/60 hover:text-neon transition-colors"
          >
            <Github className="w-4 h-4" />
            github.com/{profile.handle}
          </a>
        </div>

        <div className="reveal mt-10 font-mono text-[13px] text-muted2">
          <span className="text-neon">mail:</span> {profile.email}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-edge bg-ink">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[12px] text-muted2">
        <p>
          <span className="text-neon">root@portfolio</span>:~$ echo "© 2026 Tushar Pradhan"
        </p>
        <p className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5" />
          {profile.email}
        </p>
        <p>
          built_with <span className="text-neon">react + caffeine</span> · exit 0
        </p>
      </div>
    </footer>
  );
}
