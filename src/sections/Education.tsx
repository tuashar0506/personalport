import SectionHeading from "@/components/SectionHeading";
import { education } from "@/data/portfolio";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="relative py-24 bg-panel/40 border-y border-edge/60">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading index="04" tag="education" title="Education" />

        <div className="space-y-6">
          {education.map((e) => (
            <div key={e.school} className="reveal trace-card border border-edge bg-panel p-7 grid sm:grid-cols-[auto_1fr] gap-6">
              <div className="w-14 h-14 border border-neon/40 bg-neon/5 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-neon" strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-slate-100">{e.school}</h3>
                  <span className="font-mono text-[12px] text-neon">{e.period}</span>
                </div>
                <p className="mt-1 font-mono text-[13px] text-slate-300">{e.program}</p>
                <p className="mt-3 text-muted2 text-[14px] leading-relaxed">{e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
