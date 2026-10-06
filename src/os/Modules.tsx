import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  TerminalSquare,
  Copy,
  Check,
  Mail,
  FileText,
  LockKeyhole,
  Code2,
  GraduationCap,
  Search,
  Github,
  Star,
  GitCommitHorizontal,
  Download,
  Fingerprint,
  FolderOpen,
  Info,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { about, profile, projects, education } from "@/data/portfolio";
import { arsenal } from "./catalog";
import { certificates, socials } from "@/data/credentials";
import type { AppId, Preferences } from "./catalog";
export function Heading({
  code,
  title,
  children,
}: {
  code: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="module-heading">
      <span>{code}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
function Tags({ items }: { items: string[] }) {
  return (
    <div className="os-tags">
      {items.map((i) => (
        <span key={i}>{i}</span>
      ))}
    </div>
  );
}
export function About({ open }: { open: (id: AppId) => void }) {
  return (
    <div className="module-pad">
      <Heading
        code="$ cat identity.txt"
        title="Curiosity is the starting point."
      >
        Tushar Pradhan / Ethical Hacking & Cybersecurity Student
      </Heading>
      <div className="identity-profile">
        <div className="identity-stamp">
          <Fingerprint size={54} />
          <span>TP / 001</span>
        </div>
        <div>
          <h3>
            Understand the attack.
            <br />
            Build a better defense.
          </h3>
          <p>
            Based in Nepal. Learning through security labs, CTF practice, and
            building tools that turn theory into something testable.
          </p>
        </div>
      </div>
      {about.slice(0, 3).map((p) => (
        <p className="body-copy" key={p}>
          {p}
        </p>
      ))}
      <div className="info-grid">
        <div>
          <small>EDUCATION</small>
          <strong>BSc Ethical Hacking & Cybersecurity</strong>
        </div>
        <div>
          <small>COLLEGE</small>
          <strong>Softwarica College of IT and E-Commerce</strong>
        </div>
        <div>
          <small>FOCUS</small>
          <strong>Security + development</strong>
        </div>
        <div>
          <small>WORKING TOWARD</small>
          <strong>Penetration testing & red-team work</strong>
        </div>
      </div>
      <div className="module-actions">
        <button className="os-button primary" onClick={() => open("projects")}>
          Explore projects
        </button>
        <button className="os-button" onClick={() => open("contact")}>
          Start a conversation
        </button>
      </div>
    </div>
  );
}
const projectFocus = [
  [
    "Network visibility",
    "Python detection logic",
    "Readable investigation context",
  ],
  ["Python sockets", "Port and service discovery", "Authorized reconnaissance"],
  ["JWT authentication", "Role-based access", "React / Node.js / MySQL"],
  ["Process scheduling", "Memory management", "Low-level C fundamentals"],
];
export function Projects() {
  const [filter, setFilter] = useState("all"),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState<number | null>(null);
  if (selected !== null) {
    const p = projects[selected];
    return (
      <div className="module-pad">
        <button className="back-button" onClick={() => setSelected(null)}>
          <ArrowLeft size={15} /> Back to vault
        </button>
        <Heading code={`CASE FILE / 00${selected + 1}`} title={p.name}>
          Public project / Source available
        </Heading>
        <div className="case-cover">
          <FolderOpen size={44} />
          <code>
            {p.name}
            <br />
            <span>{p.tech.join(" / ")}</span>
          </code>
        </div>
        <h3 className="subheading">Overview & purpose</h3>
        <p className="body-copy">{p.description}</p>
        <h3 className="subheading">Engineering focus</h3>
        <div className="focus-list">
          {projectFocus[selected].map((f, i) => (
            <div key={f}>
              <span>0{i + 1}</span>
              <p>{f}</p>
            </div>
          ))}
        </div>
        <h3 className="subheading">Implementation & documentation</h3>
        <p className="body-copy">
          Explore the repository for implementation details, setup instructions,
          and available project documentation.
        </p>
        <Tags items={p.tech} />
        <a
          className="os-button primary"
          href={p.repo}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} /> Open repository <ExternalLink size={14} />
        </a>
      </div>
    );
  }
  return (
    <div className="module-pad">
      <Heading code="/classified/projects" title="The project vault.">
        Four builds. One goal: understand systems from the inside.
      </Heading>
      <div className="module-toolbar">
        <div className="filter-pills">
          {["all", "defense", "offense", "dev"].map((f) => (
            <button
              key={f}
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f === "dev" ? "Development" : f}
            </button>
          ))}
        </div>
        <label className="os-search">
          <Search size={16} />
          <input
            aria-label="Search projects"
            placeholder="Search vault…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="vault-grid">
        {projects.map(
          (p, i) =>
            (filter === "all" || p.category === filter) &&
            (p.name + " " + p.description + " " + p.tech.join(" "))
              .toLowerCase()
              .includes(query.toLowerCase()) && (
              <button
                data-tilt
                data-cursor="ACCESS"
                className="vault-card"
                key={p.name}
                onClick={() => setSelected(i)}
              >
                <div className="vault-card-top">
                  <span>CASE / 00{i + 1}</span>
                  <LockKeyhole size={17} />
                </div>
                <div className="vault-emblem">
                  <Code2 size={35} />
                  <span>{p.category.toUpperCase()}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <Tags items={p.tech} />
                <footer>
                  <span>PUBLIC CLEARANCE</span>
                  <strong>Open case file +</strong>
                </footer>
              </button>
            ),
        )}
      </div>
      {!projects.some(
        (p) =>
          (filter === "all" || p.category === filter) &&
          (p.name + " " + p.description + " " + p.tech.join(" "))
            .toLowerCase()
            .includes(query.toLowerCase()),
      ) && (
        <div className="empty-module">
          <Search />
          <h3>No matching files</h3>
          <p>Try a different keyword or category.</p>
          <button
            className="os-button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
export function Skills() {
  const [category, setCategory] = useState(0),
    [q, setQ] = useState("");
  const group = arsenal[category];
  return (
    <div className="module-pad">
      <Heading code="/usr/share/arsenal" title="The cyber arsenal.">
        A map of my tools and learning areas. Depth grows with practice.
      </Heading>
      <div className="arsenal-layout">
        <nav className="arsenal-nav" aria-label="Skill categories">
          {arsenal.map((g, i) => (
            <button
              key={g.name}
              aria-pressed={category === i}
              onClick={() => setCategory(i)}
            >
              <span>{g.code}</span>
              {g.name}
              <small>{g.items.length}</small>
            </button>
          ))}
        </nav>
        <div>
          <div className="arsenal-banner">
            <span>{group.code}</span>
            <div>
              <h3>{group.name}</h3>
              <p>Learning through coursework, labs, and projects.</p>
            </div>
          </div>
          <label className="os-search">
            <Search size={16} />
            <input
              aria-label="Search skills"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a tool…"
            />
          </label>
          <div className="skill-chips">
            {group.items
              .filter((i) => i.toLowerCase().includes(q.toLowerCase()))
              .map((i, n) => (
                <article data-tilt key={i}>
                  <div>
                    <TerminalSquare size={20} />
                    <span>0{n + 1}</span>
                  </div>
                  <h4>{i}</h4>
                  <small>LEARNING MODULE</small>
                </article>
              ))}
          </div>
          {!group.items.some((i) =>
            i.toLowerCase().includes(q.toLowerCase()),
          ) && <p className="body-copy">No matching tools in this category.</p>}
        </div>
      </div>
    </div>
  );
}
const missions = [
  {
    name: "Hidden in plain sight",
    type: "FILE FORENSICS",
    tools: ["ExifTool", "Binwalk", "Steganography"],
    steps: [
      "Inspect the supplied file type and metadata.",
      "Check for embedded archives or unexpected file signatures.",
      "Extract challenge artifacts inside an isolated lab folder.",
      "Document the evidence and the flag location.",
    ],
    note: "Practice workflow for an authorized file-analysis challenge.",
  },
  {
    name: "Follow the conversation",
    type: "NETWORK FORENSICS",
    tools: ["Wireshark", "PCAP analysis"],
    steps: [
      "Open the challenge capture and identify relevant protocols.",
      "Filter traffic to narrow the conversation.",
      "Inspect a relevant TCP stream for application content.",
      "Record the stream and evidence that support the result.",
    ],
    note: "Practice workflow for a provided CTF packet capture.",
  },
  {
    name: "Map the network",
    type: "NETWORK LAB",
    tools: ["Cisco", "Packet Tracer", "RIP", "OSPF"],
    steps: [
      "Plan the address space and router links.",
      "Configure interfaces and the selected routing protocol.",
      "Check neighbors, routes, and end-to-end connectivity.",
      "Record failures, fixes, and a final topology.",
    ],
    note: "Practice workflow for a simulated routing environment.",
  },
];
export function CTF() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="module-pad">
      <Heading code="/labs/capture-the-flag" title="Follow the evidence.">
        Practice notes for controlled challenges. These are learning workflows,
        not a leaderboard or verified completion record.
      </Heading>
      <div className="training-links">
        <a href={socials.tryhackme} target="_blank" rel="noreferrer">
          <ShieldCheck size={24} />
          <div>
            <small>TRYHACKME</small>
            <strong>xxMonkeyxx</strong>
            <span>View learning profile</span>
          </div>
          <ExternalLink size={16} />
        </a>
        <a href={socials.hackthebox} target="_blank" rel="noreferrer">
          <LockKeyhole size={24} />
          <div>
            <small>HACK THE BOX</small>
            <strong>My HTB profile</strong>
            <span>Explore lab activity</span>
          </div>
          <ExternalLink size={16} />
        </a>
      </div>
      {selected === null ? (
        <div className="mission-list">
          {missions.map((m, i) => (
            <button
              data-tilt
              className="mission-card"
              key={m.name}
              onClick={() => setSelected(i)}
            >
              <div className="mission-index">0{i + 1}</div>
              <div>
                <small>{m.type}</small>
                <h3>{m.name}</h3>
                <Tags items={m.tools} />
              </div>
              <span className="status-pill">PRACTICE NOTE</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <button className="back-button" onClick={() => setSelected(null)}>
            <ArrowLeft size={15} /> All practice notes
          </button>
          <h3 className="detail-title">{missions[selected].name}</h3>
          <p className="body-copy">{missions[selected].note}</p>
          <Tags items={missions[selected].tools} />
          <ol className="step-list">
            {missions[selected].steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <div className="notice">
            <ShieldCheck size={18} /> Use only provided challenge files or
            environments you have permission to assess.
          </div>
        </>
      )}
    </div>
  );
}
const nodes: [AppId, string, number, number][] = [
  ["skills", "CYBERSECURITY", 180, 60],
  ["network", "NETWORKING", 480, 60],
  ["terminal", "LINUX", 565, 195],
  ["ctf", "FORENSICS", 480, 325],
  ["projects", "DEVELOPMENT", 180, 325],
  ["ctf", "CTF LAB", 95, 195],
];
export function NetworkMap({ open }: { open: (id: AppId) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="module-pad">
      <Heading code="/labs/topology" title="Everything is connected.">
        Select a node to explore a part of my learning map. This is a portfolio
        map, not a real network scan.
      </Heading>
      <div className="network-map">
        <svg
          viewBox="0 0 660 390"
          role="img"
          aria-label="Learning map connecting Tushar with cybersecurity, networking, Linux, forensics, development and CTF"
        >
          <defs>
            <radialGradient id="nodeglow">
              <stop stopColor="#a855f7" stopOpacity=".35" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="330" cy="195" r="140" fill="url(#nodeglow)" />
          {nodes.map(([, label, x, y], i) => (
            <line
              key={label}
              x1="330"
              y1="195"
              x2={x}
              y2={y}
              className={hover === i ? "connection selected" : "connection"}
            />
          ))}
          <circle cx="330" cy="195" r="62" className="center-node" />
          <text x="330" y="191" textAnchor="middle" className="center-label">
            TUSHAR
          </text>
          <text x="330" y="213" textAnchor="middle" className="node-sub">
            LEARNING MAP
          </text>
          {nodes.map(([id, label, x, y], i) => (
            <g
              key={label}
              role="button"
              tabIndex={0}
              aria-label={"Open " + label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => open(id === "network" ? "skills" : id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(id === "network" ? "skills" : id);
                }
              }}
            >
              <rect
                x={x - 75}
                y={y - 24}
                width="150"
                height="48"
                rx="6"
                className={"map-node " + (hover === i ? "selected" : "")}
              />
              <text x={x} y={y + 4} textAnchor="middle" className="node-label">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="info-grid">
        <div>
          <small>NETWORKING FUNDAMENTALS</small>
          <strong>VLAN · OSPF · RIP · ACL · DHCP</strong>
        </div>
        <div>
          <small>LEARNING ENVIRONMENT</small>
          <strong>Cisco Packet Tracer / isolated labs</strong>
        </div>
      </div>
    </div>
  );
}
type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};
type Event = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
};
export function GithubPanel() {
  const [repos, setRepos] = useState<Repo[]>([]),
    [events, setEvents] = useState<Event[]>([]),
    [state, setState] = useState("loading"),
    [eventsState, setEventsState] = useState("loading");
  useEffect(() => {
    const c = new AbortController();
    const timer = setTimeout(() => c.abort(), 10000);
    fetch(
      "https://api.github.com/users/tuashar0506/repos?sort=updated&per_page=100",
      { signal: c.signal },
    )
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((d) => {
        if (!Array.isArray(d)) throw Error();
        setRepos(d);
        setState("live");
      })
      .catch(() => setState("offline"));
    fetch(
      "https://api.github.com/users/tuashar0506/events/public?per_page=30",
      { signal: c.signal },
    )
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((d) => {
        if (!Array.isArray(d)) throw Error();
        setEvents(d);
        setEventsState("live");
      })
      .catch(() => setEventsState("offline"));
    return () => {
      clearTimeout(timer);
      c.abort();
    };
  }, []);
  const languages = Object.entries(
    repos.reduce<Record<string, number>>((a, r) => {
      if (r.language) a[r.language] = (a[r.language] || 0) + 1;
      return a;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  return (
    <div className="module-pad">
      <Heading code="github.com/tuashar0506" title="The public workbench.">
        Repositories and recent public activity, loaded directly from GitHub.
      </Heading>
      <div className="github-profile">
        <Github size={33} />
        <div>
          <strong>@tuashar0506</strong>
          <span>
            {state === "live"
              ? "Connected to GitHub API"
              : state === "loading"
                ? "Connecting…"
                : "Live data unavailable"}
          </span>
        </div>
        <a
          className="os-button"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          Visit GitHub <ExternalLink size={14} />
        </a>
      </div>
      {state === "live" && (
        <>
          <div className="github-stats">
            <div>
              <strong>{repos.length}</strong>
              <span>Public repos returned</span>
            </div>
            <div>
              <strong>
                {repos.reduce((s, r) => s + r.stargazers_count, 0)}
              </strong>
              <span>Stars across these repos</span>
            </div>
            <div>
              <strong>{languages.length}</strong>
              <span>Primary languages</span>
            </div>
          </div>
          <div className="language-breakdown">
            {languages.map(([l, n]) => (
              <div key={l}>
                <span>{l}</span>
                <meter min="0" max={Math.max(repos.length, 1)} value={n} />
                <small>{n} repos</small>
              </div>
            ))}
          </div>
        </>
      )}
      <h3 className="subheading">
        {state === "live"
          ? "Recently updated repositories"
          : "Featured repositories"}
      </h3>
      {state === "offline" && (
        <p className="body-copy">
          GitHub may be temporarily unavailable or rate-limited. The project
          links below remain available.
        </p>
      )}
      <div className="repository-list">
        {(state === "live"
          ? repos.slice(0, 6)
          : projects.map((p) => ({
              name: p.name,
              html_url: p.repo,
              description: p.description,
              language: p.tech[0],
              stargazers_count: 0,
              updated_at: "",
            }))
        ).map((r) => (
          <a key={r.name} href={r.html_url} target="_blank" rel="noreferrer">
            <Code2 size={19} />
            <div>
              <strong>{r.name}</strong>
              <p>{r.description}</p>
              <span>
                {r.language}
                {r.updated_at
                  ? " · " + new Date(r.updated_at).toLocaleDateString("en-GB")
                  : ""}
              </span>
            </div>
            {state === "live" && (
              <small>
                <Star size={13} />
                {r.stargazers_count}
              </small>
            )}
            <ExternalLink size={15} />
          </a>
        ))}
      </div>
      <h3 className="subheading">Recent public activity</h3>
      <p className="small-copy">
        Latest public events only; this is not a full contribution history.
      </p>
      {eventsState === "live" && events.length ? (
        events.slice(0, 6).map((e) => (
          <div className="activity-event" key={e.id}>
            <GitCommitHorizontal size={18} />
            <div>
              <strong>{e.type.replace("Event", "")}</strong>
              <span>{e.repo.name}</span>
            </div>
            <time>{new Date(e.created_at).toLocaleDateString("en-GB")}</time>
          </div>
        ))
      ) : (
        <p className="body-copy">
          {eventsState === "loading"
            ? "Loading public activity…"
            : eventsState === "offline"
              ? "Activity could not be loaded. View the GitHub profile for more."
              : "No recent public events returned."}
        </p>
      )}
    </div>
  );
}
export function Credentials() {
  return (
    <div className="module-pad">
      <Heading code="/vault/certifications" title="Learning, documented.">
        TryHackMe learning-path completion certificates, with links to the
        original issuer-hosted PDFs.
      </Heading>
      <div className="certificate-grid">
        {certificates.map((c) => (
          <article data-tilt className="certificate-card" key={c.id}>
            <a href={c.url} target="_blank" rel="noreferrer" data-cursor="VIEW">
              <img
                src={c.image}
                alt={
                  c.title + " completion certificate issued to " + c.recipient
                }
                loading="lazy"
                width="900"
                height="636"
              />
            </a>
            <div className="certificate-body">
              <div>
                <span>TRYHACKME</span>
                <ShieldCheck size={19} />
              </div>
              <h3>{c.title}</h3>
              <p>Learning path · Completed {c.date}</p>
              <dl>
                <div>
                  <dt>Certificate ID</dt>
                  <dd>{c.id}</dd>
                </div>
                <div>
                  <dt>Recipient shown</dt>
                  <dd>{c.recipient}</dd>
                </div>
                <div>
                  <dt>Listed learning time</dt>
                  <dd>{c.duration}</dd>
                </div>
              </dl>
              <a
                className="os-button"
                href={c.url}
                target="_blank"
                rel="noreferrer"
              >
                View original certificate <ExternalLink size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="small-copy">
        Certificate details are transcribed from the supplied PDFs. Pre Security
        displays the recipient name “UnKnown”. These are learning-path
        completion records.
      </p>
    </div>
  );
}
export function Experience() {
  return (
    <div className="module-pad">
      <Heading code="/home/tushar/journey" title="Built one lesson at a time.">
        Currently an undergraduate, developing practical security and software
        skills.
      </Heading>
      <div className="timeline-card">
        <GraduationCap size={28} />
        <div>
          <span className="status-pill">IN PROGRESS</span>
          <h3>{education[0].program}</h3>
          <p>{education[0].school}</p>
          <p>{education[0].note}</p>
        </div>
      </div>
      <div className="journey-credentials">
        <h3 className="subheading">Learning-path milestones</h3>
        {certificates
          .slice()
          .reverse()
          .map((c) => (
            <a key={c.id} href={c.url} target="_blank" rel="noreferrer">
              <span>{c.date}</span>
              <strong>{c.title}</strong>
              <span>
                TryHackMe <ExternalLink size={13} />
              </span>
            </a>
          ))}
      </div>
      <h3 className="subheading">Practical focus</h3>
      {[
        [
          "01",
          "Build security tools",
          "Developing Python projects such as IDS_Guard and PortScanX to understand detection and reconnaissance.",
        ],
        [
          "02",
          "Understand networks",
          "Practicing addressing, routing, switching, and network analysis in learning environments.",
        ],
        [
          "03",
          "Develop with security in mind",
          "Building web applications while studying authentication, access control, and system fundamentals.",
        ],
      ].map(([n, t, d]) => (
        <div className="journey-row" key={n}>
          <span>{n}</span>
          <div>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
const fieldNotes = [
  [
    "Reconnaissance",
    "An open port is a starting point.",
    "A listening service is an observation, not proof of a vulnerability. Record what is exposed, whether it is expected, and the limits of your evidence. A useful finding connects an observation to impact and a practical recommendation.",
  ],
  [
    "Secure development",
    "Identity is only half the story.",
    "Authentication establishes identity. Authorization decides what that identity can do. Enforce access control on the server for every protected action and resource, rather than relying on hidden interface controls.",
  ],
  [
    "Reporting",
    "Good evidence tells a clear story.",
    "Record the environment, relevant steps, and expected versus observed behavior. Keep sensitive information out of screenshots. Explain limitations and recommend a practical next step without overstating the finding.",
  ],
];
export function Notes() {
  return (
    <div className="module-pad">
      <Heading code="/home/tushar/notes" title="Keep what you learn." />
      {fieldNotes.map(([tag, title, body]) => (
        <article className="field-note" key={title}>
          <small>{tag}</small>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}
export function Resume() {
  return (
    <div className="module-pad">
      <Heading code="/home/tushar/resume" title="A concise introduction.">
        A student profile compiled from the information in this portfolio.
      </Heading>
      <div className="resume-preview">
        <div>
          <FileText size={32} />
          <span>PROFILE / 01</span>
        </div>
        <h3>Tushar Pradhan</h3>
        <p>Ethical Hacking & Cybersecurity Student · Nepal</p>
        <hr />
        <h4>Education</h4>
        <p>
          {education[0].program}
          <br />
          {education[0].school} · In progress
        </p>
        <h4>Selected work</h4>
        <p>{projects.map((p) => p.name).join(" · ")}</p>
        <h4>Learning-path certificates</h4>
        <p>
          TryHackMe · Cyber Security 101 (May 2025)
          <br />
          Pre Security (May 2025; recipient shown as UnKnown)
        </p>
        <h4>Contact</h4>
        <p>{profile.email}</p>
      </div>
      <div className="module-actions">
        <a
          className="os-button primary"
          href="/resume.html"
          target="_blank"
          rel="noreferrer"
        >
          <FileText size={16} /> Open printable résumé
        </a>
        <a
          className="os-button"
          href="/resume.html"
          download="Tushar-Pradhan-Resume.html"
        >
          <Download size={16} /> Download HTML résumé
        </a>
      </div>
      <p className="small-copy">
        Use your browser’s Print → Save as PDF from the printable version.
      </p>
    </div>
  );
}
export function Contact() {
  const [copied, setCopied] = useState(false),
    [draft, setDraft] = useState(""),
    [sending, setSending] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSending(true);
    const text = `Hi Tushar,\n\nI'm ${f.get("name")}.\n\n${f.get("message")}\n\nReply to: ${f.get("email")}`;
    setTimeout(() => {
      setDraft(text);
      setSending(false);
    }, 350);
  }
  return (
    <div className="module-pad">
      <Heading code="$ initiate_contact" title="Open a conversation.">
        Projects, security labs, or an interesting idea. Let’s see what we can
        build.
      </Heading>
      <div className="contact-address">
        <Mail size={20} />
        <a href={"mailto:" + profile.email}>{profile.email}</a>
        <button aria-label="Copy email address" onClick={copy}>
          {copied ? <Check size={17} /> : <Copy size={17} />}
        </button>
      </div>
      <div className="contact-links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          <Github size={17} /> GitHub <ExternalLink size={13} />
        </a>
        <a href={socials.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <ExternalLink size={13} />
        </a>
        <a href={socials.tryhackme} target="_blank" rel="noreferrer">
          TryHackMe <ExternalLink size={13} />
        </a>
        <a href={socials.hackthebox} target="_blank" rel="noreferrer">
          Hack The Box <ExternalLink size={13} />
        </a>
        <span>Nepal / Remote collaboration</span>
      </div>
      <form className="os-contact-form" onSubmit={prepare}>
        <div className="form-two">
          <label>
            NAME
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Your name"
            />
          </label>
          <label>
            REPLY EMAIL
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label>
          MESSAGE
          <textarea
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={4000}
            placeholder="Tell me what you have in mind…"
          />
        </label>
        <button className="os-button primary" disabled={sending}>
          {sending ? "Preparing draft…" : "Prepare message"}
          <Mail size={16} />
        </button>
        <p className="small-copy">
          Creates an email draft for you to review and send. This website does
          not store or transmit your message.
        </p>
      </form>
      {draft && (
        <div className="contact-result" role="status">
          <Check size={22} />
          <div>
            <h3>Your message is ready.</h3>
            <p>Open your email app to review and send it.</p>
            <a
              className="os-button primary"
              href={
                "mailto:" +
                profile.email +
                "?subject=" +
                encodeURIComponent("Portfolio inquiry") +
                "&body=" +
                encodeURIComponent(draft)
              }
            >
              Open email app
            </a>
            <details>
              <summary>Review message</summary>
              <pre>{draft}</pre>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
export function Settings({
  prefs,
  setPrefs,
  reboot,
}: {
  prefs: Preferences;
  setPrefs: (p: Partial<Preferences>) => void;
  reboot: () => void;
}) {
  return (
    <div className="module-pad">
      <Heading code="/etc/preferences" title="Make yourself at home.">
        Display preferences stay on this device. Sound starts muted each visit.
      </Heading>
      {(
        [
          [
            "motion",
            "Ambient motion",
            "Particles, window transitions, and cursor effects.",
          ],
          [
            "sound",
            "Interface sounds",
            "Quiet synthesized clicks. Enabled only with your choice.",
          ],
          ["matrix", "Matrix mode", "Purple code rain behind the desktop."],
          ["crt", "CRT overlay", "Subtle scanlines, without screen flicker."],
        ] as const
      ).map(([key, title, desc]) => (
        <div className="preference-row" key={key}>
          <div>
            <label htmlFor={"pref-" + key}>{title}</label>
            <p>{desc}</p>
          </div>
          <Switch
            id={"pref-" + key}
            checked={prefs[key]}
            onCheckedChange={(v) => setPrefs({ [key]: v })}
          />
        </div>
      ))}
      <div className="preference-row">
        <div>
          <strong>Replay boot sequence</strong>
          <p>A short introduction to TUSHAR_OS.</p>
        </div>
        <button className="os-button" onClick={reboot}>
          Replay
        </button>
      </div>
      <div className="notice">
        <Info size={18} /> Reduced-motion devices automatically start with
        ambient motion disabled.
      </div>
      <h3 className="subheading">Keyboard shortcuts</h3>
      <div className="shortcut-table">
        {[
          ["Ctrl / ⌘ + K", "Command palette"],
          ["Ctrl + `", "Terminal"],
          ["Esc", "Close focused app"],
          [
            "Alt + 1 / 2 / 3 / 4 / 5",
            "Identity / Arsenal / Projects / CTF / Contact",
          ],
          ["Alt + arrow keys", "Move focused desktop window"],
          ["Alt + Shift + arrows", "Resize focused desktop window"],
        ].map(([key, action]) => (
          <div key={key}>
            <kbd>{key}</kbd>
            <span>{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
