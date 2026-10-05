import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/portfolio";
import { Github, FolderGit2, ShieldAlert, Swords, Braces } from "lucide-react";

const catIcon: Record<string, React.ReactNode> = {
  offense: <Swords className="w-4 h-4" />,
  defense: <ShieldAlert className="w-4 h-4" />,
  dev: <Braces className="w-4 h-4" />,
};
const catLabel: Record<string, string> = {
  offense: "offensive",
  defense: "defensive",
  dev: "dev",
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading index="03" tag="deployments" title="Projects" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className="reveal trace-card border border-edge bg-panel p-6 flex flex-col"
              style={{ transitionDelay: `${(i % 2) * 90}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <FolderGit2 className="w-8 h-8 text-neon" strokeWidth={1.5} />
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-neon border border-neon/30 bg-neon/5 px-2.5 py-1">
                  {catIcon[p.category]}
                  {catLabel[p.category]}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-100 mb-2.5">
                {p.name}
              </h3>
              <p className="text-muted2 text-[14px] leading-relaxed flex-1">{p.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="font-mono text-[11px] text-muted2 bg-ink border border-edge px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-neon hover:text-glow group w-fit"
              >
                <Github className="w-4 h-4" />
                view_source
                <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
              </a>
            </article>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <a
            href="https://github.com/tuashar0506?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neon/50 text-neon font-mono text-sm hover:bg-neon hover:text-ink transition-all"
          >
            <Github className="w-4 h-4" />
            all_repositories -&gt;
          </a>
        </div>
      </div>
    </section>
  );
}
