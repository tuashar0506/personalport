import SectionHeading from "@/components/SectionHeading";
import { skillGroups, tools } from "@/data/portfolio";
import { Crosshair, Shield, Code2, Wrench } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  target: <Crosshair className="w-5 h-5 text-neon" />,
  shield: <Shield className="w-5 h-5 text-neon" />,
  code: <Code2 className="w-5 h-5 text-neon" />,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 bg-panel/40 border-y border-edge/60">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading index="02" tag="capabilities" title="Skills & Arsenal" />

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {skillGroups.map((g, gi) => (
            <div
              key={g.label}
              className="reveal trace-card border border-edge bg-panel p-6"
              style={{ transitionDelay: `${gi * 90}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                {icons[g.icon]}
                <h3 className="font-mono text-sm text-slate-100">{g.label}</h3>
              </div>
              <ul className="space-y-2.5">
                {g.items.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-[14px] text-muted2">
                    <span className="text-neon font-mono text-xs">▸</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-5 h-5 text-neon" />
            <h3 className="font-mono text-sm text-slate-100">tools_of_the_trade</h3>
            <div className="flex-1 h-px bg-edge" />
          </div>
          <div className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <span
                key={t}
                className="px-4 py-2 border border-edge bg-ink font-mono text-[13px] text-muted2 hover:text-neon hover:border-neon/50 hover:shadow-[0_0_16px_rgba(163,230,53,0.15)] transition-all cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
