import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { fallbackGithub, profile } from "@/data/portfolio";
import { Github, GitFork, Star, ExternalLink } from "lucide-react";

interface RepoInfo {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
}

interface GhState {
  repos: number;
  languages: { name: string; share: number; color: string }[];
  latest: RepoInfo[];
  live: boolean;
}

const LANG_COLORS: Record<string, string> = {
  Python: "#a3e635",
  JavaScript: "#4ade80",
  TypeScript: "#34d399",
  C: "#166534",
  "C++": "#15803d",
  HTML: "#65a30d",
  CSS: "#3f6212",
};

export default function GithubActivity() {
  const [state, setState] = useState<GhState>({
    repos: fallbackGithub.publicRepos,
    languages: fallbackGithub.languages,
    latest: [],
    live: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/tuashar0506/repos?sort=pushed&per_page=100"
        );
        if (!res.ok) throw new Error("gh api");
        const repos: RepoInfo[] = await res.json();
        if (cancelled || !Array.isArray(repos) || repos.length === 0) return;

        const counts: Record<string, number> = {};
        repos.forEach((r) => {
          if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
        });
        const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
        const languages = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map(([name, n]) => ({
            name,
            share: Math.round((n / total) * 100),
            color: LANG_COLORS[name] ?? "#4d7c0f",
          }));

        setState({
          repos: repos.length,
          languages,
          latest: repos.slice(0, 3),
          live: true,
        });
      } catch {
        /* keep baked snapshot */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading index="05" tag="git_log" title="GitHub Activity" />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          {/* stats panel */}
          <div className="reveal border border-edge bg-panel p-7">
            <div className="flex items-center gap-3 mb-6">
              <Github className="w-5 h-5 text-neon" />
              <span className="font-mono text-sm text-slate-100">@{profile.handle}</span>
              {state.live && (
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-neon">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                  LIVE
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-7">
              <div className="border border-edge bg-ink p-4 text-center">
                <p className="font-display text-3xl font-bold text-neon">{state.repos}</p>
                <p className="font-mono text-[11px] text-muted2 mt-1">public_repos</p>
              </div>
              <div className="border border-edge bg-ink p-4 text-center">
                <p className="font-display text-3xl font-bold text-neon">{profile.githubSince}</p>
                <p className="font-mono text-[11px] text-muted2 mt-1">hacking_since</p>
              </div>
            </div>

            <p className="font-mono text-[11px] text-muted2 mb-2.5">// language_breakdown</p>
            <div className="flex h-2.5 w-full overflow-hidden border border-edge">
              {state.languages.map((l) => (
                <div
                  key={l.name}
                  style={{ width: `${l.share}%`, background: l.color }}
                  title={`${l.name} ${l.share}%`}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {state.languages.map((l) => (
                <span key={l.name} className="flex items-center gap-2 font-mono text-[12px] text-muted2">
                  <span className="w-2.5 h-2.5" style={{ background: l.color }} />
                  {l.name} <span className="text-slate-400">{l.share}%</span>
                </span>
              ))}
            </div>
          </div>

          {/* latest repos */}
          <div className="reveal border border-edge bg-panel p-7 flex flex-col">
            <p className="font-mono text-[11px] text-muted2 mb-4">// latest_commits</p>
            <div className="space-y-3 flex-1">
              {(state.latest.length
                ? state.latest
                : [
                    { name: "IDS_Guard", html_url: "https://github.com/tuashar0506/IDS_Guard", language: "Python", pushed_at: "2026-02-21" },
                    { name: "PortScanX", html_url: "https://github.com/tuashar0506/PortScanX", language: "Python", pushed_at: "2026-02-19" },
                    { name: "SEM-III-OS", html_url: "https://github.com/tuashar0506/SEM-III-OS", language: "C", pushed_at: "2026-02-14" },
                  ]
              ).map((r) => (
                <a
                  key={r.name}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 border border-edge bg-ink px-4 py-3.5 hover:border-neon/50 transition-colors group"
                >
                  <GitFork className="w-4 h-4 text-neon shrink-0" />
                  <span className="font-mono text-[13px] text-slate-200 group-hover:text-neon transition-colors">
                    {r.name}
                  </span>
                  {r.language && (
                    <span className="ml-auto font-mono text-[11px] text-muted2">{r.language}</span>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 text-muted2 group-hover:text-neon transition-colors" />
                </a>
              ))}
            </div>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-neon w-fit group"
            >
              <Star className="w-4 h-4" />
              follow_the_trail
              <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
