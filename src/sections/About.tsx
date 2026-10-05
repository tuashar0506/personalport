import SectionHeading from "@/components/SectionHeading";
import { about, profile } from "@/data/portfolio";
import { GraduationCap, MapPin, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading index="01" tag="whoami" title="About Me" />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div className="reveal space-y-5 text-muted2 leading-relaxed text-[15px]">
            {about.map((p, i) => (
              <p key={i}>
                <span className="font-mono text-neon/70 mr-2">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </p>
            ))}
          </div>

          <div className="reveal space-y-4">
            <div className="border border-edge bg-panel p-5 font-mono text-[13px] space-y-3">
              <div className="flex items-center gap-3 text-muted2">
                <GraduationCap className="w-4 h-4 text-neon shrink-0" />
                <span>BSc Ethical Hacking & Cybersecurity</span>
              </div>
              <div className="flex items-center gap-3 text-muted2">
                <MapPin className="w-4 h-4 text-neon shrink-0" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-muted2">
                <Target className="w-4 h-4 text-neon shrink-0" />
                <span>Target: junior penetration tester</span>
              </div>
            </div>

            <div className="border border-neon/25 bg-neon/5 p-5 font-mono text-[13px]">
              <p className="text-neon mb-2">// currently</p>
              <ul className="space-y-1.5 text-muted2">
                <li>- grinding hands-on security labs</li>
                <li>- building security tools in Python</li>
                <li>- documenting everything on GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
