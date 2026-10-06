import { profile, projects, tools, skillGroups } from "../data/portfolio";
import { socials, certificates } from "../data/credentials";
export const HOME = "/home/guest";
export const files: Record<string, string> = {
  "/home/guest/README.md":
    "# TusharOS — portfolio sandbox\n\nExplore a virtual Linux-style filesystem. No real shell, network scans, or server access.\n\nStart here:\n  ls -la\n  cat about.txt\n  cd projects\n  cat IDS_Guard.md\n  help\n  man grep\n\nUse Tab to complete commands and paths. Use Up/Down for history.\nPipes: cat skills.txt | grep Python\nCtrl+L clears the screen. Ctrl+C cancels input.",
  "/home/guest/about.txt": `${profile.name}\nEthical Hacking and Cybersecurity student\nSoftwarica College of IT and E-Commerce\nLocation: Nepal\nFocus: offensive security, network defense, and secure development.\nGoal: grow toward penetration testing and red-team work.`,
  "/home/guest/contact.txt": `Email: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${socials.linkedin}\nTryHackMe: ${socials.tryhackme}\nHack The Box: ${socials.hackthebox}\nOpen to practical freelance collaboration.`,
  "/home/guest/skills.txt":
    skillGroups.map((g) => `${g.label}\n${g.items.join("\n")}`).join("\n\n") +
    "\n\nToolbox\n" +
    tools.join("\n"),
  "/home/guest/ethics.txt":
    "Permission first. Agree the scope. Respect privacy.\nDocument evidence. Explain limitations. Report responsibly.\nSecurity testing belongs only in owned or explicitly authorized environments.",
  "/home/guest/certificates.txt": certificates
    .map(
      (c) =>
        `${c.title} — ${c.issuer}\nCompleted: ${c.date}\nRecipient shown: ${c.recipient}\nID: ${c.id}\n${c.url}`,
    )
    .join("\n\n"),
  "/home/guest/.profile":
    "USER=guest\nSHELL=portfolio-shell\nHOME=/home/guest\nMODE=browser-simulation",
  "/home/guest/notes/linux-basics.md":
    "# Linux basics\npwd — print working directory\nls — list files\ncd — change directory\ncat — read a file\ngrep — find matching lines\nhead / tail — see the start or end of a file\nwc — count lines, words and characters\nfind — search paths\n\nTry: cat ../skills.txt | grep Python\nThis sandbox implements a small subset of Linux commands.",
  "/home/guest/notes/security.md":
    "# Security mindset\nAn open port is an observation, not proof of vulnerability.\nAuthentication proves identity; authorization controls access.\nA good report separates evidence, inference, impact, and remediation.",
  "/home/guest/notes/networking.md":
    "# Networking foundations\nIP: logical addressing and routing.\nTCP: ordered, reliable byte streams.\nUDP: datagrams without delivery guarantees.\nDNS: resolves names to records.\nTLS: protects data in transit.\n\nTry: man nmap\nNetwork examples here are static demonstrations.",
  "/etc/os-release":
    'NAME="TusharOS Portfolio"\nVERSION="3.0"\nID=portfolio\nPRETTY_NAME="TusharOS — browser simulation, not an operating system"',
  "/etc/motd":
    "Welcome, curious mind.\nUnderstand the system. Respect the boundaries.\nType help to explore.",
  "/var/log/lab.log":
    "INFO sandbox initialized\nINFO virtual filesystem mounted\nINFO portfolio modules ready\nNOTICE all network output is simulated\nINFO visitor session active",
  ...Object.fromEntries(
    projects.map((p) => [
      `/home/guest/projects/${p.name}.md`,
      `# ${p.name}\n\n${p.description}\n\nStack: ${p.tech.join(", ")}\nRepository: ${p.repo}`,
    ]),
  ),
};
const manuals: Record<string, [string, string]> = {
  ctf: ["ctf", "Open CTF practice notes."],
  certificates: ["certificates", "Open the credential vault."],
  education: ["education", "View current education and learning journey."],
  experience: ["experience", "Open the learning journey."],
  github: ["github", "Open the GitHub uplink panel."],
  resume: ["resume", "Open the printable student résumé."],
  tools: ["tools", "Open the cyber arsenal."],
  network: ["network", "Open the interactive learning map."],
  social: ["social", "Show published social and contact links."],
  status: ["status", "Open simulated portfolio telemetry."],
  scan: ["scan", "Print a fictional lab result. No network scan runs."],
  matrix: [
    "matrix [off]",
    "Toggle purple matrix rain. Reduced-motion settings take priority.",
  ],
  hack: [
    "hack",
    "Enable the green hacker visual theme. This does not perform an attack.",
  ],
  normal: ["normal", "Return to the purple dashboard theme."],
  coffee: ["coffee", "A tiny break from the command line."],
  hello: ["hello", "Say hello."],
  fortune: ["fortune", "A small piece of advice."],
  root: ["root", "This browser shell has no elevated privileges."],
  exit: ["exit", "Close the terminal window."],
  konami: ["konami", "A small secret for curious visitors."],
  help: ["help [command]", "List available commands, or explain one."],
  man: ["man COMMAND", "Read this command reference. Example: man grep"],
  ls: [
    "ls [-a] [-l] [PATH]",
    "List virtual files. -a includes hidden files. -l shows a simple long listing. Example: ls -la ~/projects",
  ],
  cd: [
    "cd [PATH]",
    "Change the virtual working directory. Supports /, ~, .., and cd -.",
  ],
  pwd: ["pwd", "Print the full virtual working directory."],
  cat: [
    "cat FILE [FILE...]",
    "Read virtual files. Example: cat about.txt contact.txt",
  ],
  less: [
    "less FILE",
    "Print a virtual file. Interactive paging is not implemented in this sandbox.",
  ],
  head: [
    "head [-n COUNT] [FILE]",
    "Show the first lines of a file or piped input. Example: head -n 3 skills.txt",
  ],
  tail: [
    "tail [-n COUNT] [FILE]",
    "Show the last lines of a file or piped input.",
  ],
  grep: [
    "grep [-i] [-n] [-v] TEXT [FILE]",
    "Filter lines by literal text. -i ignores case, -n adds line numbers, -v inverts matches. Example: cat skills.txt | grep -i python",
  ],
  wc: [
    "wc [-l | -w | -c] [FILE]",
    "Count lines, words, or characters of a virtual file or piped input. Default prints all three.",
  ],
  sort: [
    "sort [-r] [FILE]",
    "Sort lines alphabetically; -r reverses the result.",
  ],
  uniq: [
    "uniq [FILE]",
    "Remove adjacent repeated lines. Try: cat skills.txt | sort | uniq",
  ],
  find: [
    "find [PATH] [-name PATTERN]",
    'Find virtual paths. Supports * and ? filename patterns. Example: find ~ -name "*.md"',
  ],
  tree: ["tree [PATH]", "Display the virtual directory tree."],
  echo: [
    "echo TEXT",
    "Print text. Quotes and $USER, $HOME, $PWD expansion are supported.",
  ],
  whoami: [
    "whoami",
    "Print the simulated session user: guest. Use about to learn about Tushar.",
  ],
  id: ["id", "Display the simulated user identity."],
  hostname: ["hostname", "Display the portfolio sandbox host name."],
  uname: [
    "uname [-a]",
    "Describe the simulated environment, not the visitor’s operating system.",
  ],
  neofetch: ["neofetch", "Show a summary of the portfolio environment."],
  date: ["date", "Show the current date and time in Nepal."],
  uptime: ["uptime", "Show how long this terminal session has been open."],
  history: [
    "history",
    "Show commands used in this terminal session. Up/Down recalls them.",
  ],
  clear: [
    "clear",
    "Clear terminal output without deleting command history. Shortcut: Ctrl+L.",
  ],
  about: ["about", "Read Tushar’s profile."],
  skills: ["skills", "Show technical focus and tools."],
  projects: ["projects", "List the featured projects and repository links."],
  contact: ["contact", "Show contact email and GitHub."],
  ethics: ["ethics", "Read the security principles."],
  open: [
    "open SECTION",
    "Navigate the portfolio. Sections: home, about, work, services, expertise, journey, notes, process, contact, terminal.",
  ],
  theme: [
    "theme green|cyan|violet",
    "Change this terminal’s accent color for the current session.",
  ],
  shortcuts: [
    "shortcuts",
    "Tab: complete command/path. Up/Down: history. Ctrl+L: clear. Ctrl+C: cancel. Ctrl/⌘+K: terminal window.",
  ],
  nmap: [
    "nmap --demo | nmap --help",
    "Show a fixed example for a fictional lab host. No scan runs. Real Nmap inventories hosts and services within an authorized scope.",
  ],
  ping: [
    "ping --demo | ping --help",
    "Show a fixed ICMP example. No packets are sent. Real ping helps assess reachability and round-trip time.",
  ],
  ip: [
    "ip addr | ip route",
    "Show a fixed example interface or route table. These are not the visitor’s network details.",
  ],
  ps: ["ps", "Show a fictional process listing, clearly labeled as a demo."],
  sudo: [
    "sudo COMMAND",
    "Privilege changes are not available in the portfolio sandbox.",
  ],
};
export const commands = Object.keys(manuals).sort();
export type Session = {
  cwd: string;
  previous: string;
  history: string[];
  started: number;
};
export type Result = {
  effect?: string;
  output: string;
  cwd?: string;
  clear?: boolean;
  section?: string;
  theme?: string;
};
export const initialSession = (): Session => ({
  cwd: HOME,
  previous: HOME,
  history: [],
  started: Date.now(),
});
export function resolvePath(path: string, cwd: string) {
  const input =
    path === "~" ? HOME : path.startsWith("~/") ? HOME + path.slice(1) : path;
  const parts = (input.startsWith("/") ? input : cwd + "/" + input).split("/");
  const result: string[] = [];
  for (const p of parts) {
    if (p === "..") result.pop();
    else if (p && p !== ".") result.push(p);
  }
  return "/" + result.join("/");
}
const dirs = new Set([
  "/",
  ...Object.keys(files).flatMap((p) => {
    const parts = p.split("/");
    return parts.slice(1, -1).map((_, i) => parts.slice(0, i + 2).join("/"));
  }),
]);
const exists = (p: string) => p in files || dirs.has(p);
function children(path: string) {
  const base = path === "/" ? "/" : path + "/";
  return [
    ...new Set(
      [...dirs, ...Object.keys(files)]
        .filter((p) => p.startsWith(base) && p !== path)
        .map((p) => p.slice(base.length).split("/")[0]),
    ),
  ].sort();
}
function tokens(input: string): string[][] {
  const pipeline: string[][] = [[]];
  let word = "",
    quote = "",
    active = false;
  function push() {
    if (active) pipeline[pipeline.length - 1].push(word);
    word = "";
    active = false;
  }
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quote) {
      if (c === quote) quote = "";
      else word += c;
      active = true;
    } else if (c === '"' || c === "'") {
      quote = c;
      active = true;
    } else if (c === "\\" && i + 1 < input.length) {
      word += input[++i];
      active = true;
    } else if (c === "|") {
      push();
      pipeline.push([]);
    } else if (/\s/.test(c)) {
      push();
    } else {
      word += c;
      active = true;
    }
  }
  if (quote)
    throw new Error("Unclosed quote. Close the quotation mark and try again.");
  push();
  if (pipeline.some((p) => !p.length))
    throw new Error("A pipe needs a command on both sides.");
  return pipeline;
}
function read(path: string, cwd: string) {
  const p = resolvePath(path, cwd);
  if (dirs.has(p)) throw new Error(`${path}: is a directory`);
  if (!(p in files)) throw new Error(`${path}: no such file`);
  return files[p];
}
export function execute(input: string, session: Session): Result {
  try {
    const value = input.trim().toLowerCase();
    const routes: Record<string, string> = {
      ctf: "ctf",
      certificates: "certificates",
      education: "experience",
      experience: "experience",
      github: "github",
      resume: "resume",
      tools: "skills",
      network: "network",
      status: "system",
    };
    if (routes[value])
      return {
        output: "Opening " + routes[value] + "…",
        section: routes[value],
      };
    if (value === "matrix" || value === "matrix off")
      return {
        output:
          value === "matrix"
            ? "Purple matrix mode enabled."
            : "Matrix mode disabled.",
        effect: value === "matrix" ? "matrix-on" : "matrix-off",
      };
    if (value === "hack")
      return {
        output:
          "VISUAL MODE: HACKER\nSimulation only. Stay curious, stay ethical.",
        effect: "hack",
      };
    if (value === "normal")
      return { output: "Purple dashboard restored.", effect: "normal" };
    if (value === "exit")
      return {
        output: "Session closed. See you around, operator.",
        effect: "exit",
      };
    if (value === "whoami") return { output: files[HOME + "/about.txt"] };
    if (value === "social") return { output: files[HOME + "/contact.txt"] };
    if (value === "scan")
      return {
        output:
          "PORTFOLIO DEMO — no scan performed\nTarget: lab.example\n22/tcp ssh · 80/tcp http · 443/tcp https\nPermission first. Evidence next.",
      };
    if (value === "hack nasa")
      return { output: "Nice try. Let's keep it ethical." };
    if (value === "sudo access" || value === "root")
      return {
        output:
          "ACCESS DENIED — nice try :)\nThis portfolio has no privileged shell.",
      };
    if (value === "rm -rf /")
      return {
        output:
          "Permission denied. Portfolio protection enabled.\nNo files were touched.",
      };
    const eggs: Record<string, string> = {
      coffee: "Coffee loaded. Curiosity recharged.",
      hello: "Hello, operator. Welcome to Tushar’s corner of the internet.",
      fortune: "Understand the system before trusting the tool.",
      konami:
        "↑ ↑ ↓ ↓ ← → ← → B A\nCuriosity unlocked. Achievement: you read the manual.",
    };
    if (eggs[value]) return { output: eggs[value] };
    const parts = tokens(input.trim());
    let result: Result = { output: "" };
    for (let index = 0; index < parts.length; index++) {
      const [cmd, ...raw] = parts[index];
      const args = raw.map((a) =>
        a.replace(/\$(USER|HOME|PWD)\b/g, (_, v) =>
          v === "USER" ? "guest" : v === "HOME" ? HOME : session.cwd,
        ),
      );
      const pipe = index > 0 ? result.output : undefined;
      const flags = args.filter((a) => a.startsWith("-"));
      const plain = args.filter((a) => !a.startsWith("-"));
      const has = (f: string) =>
        flags.some((a) => a === `--${f}` || a.slice(1).includes(f));
      const source = (path?: string) =>
        path ? read(path, session.cwd) : (pipe ?? "");
      if (
        parts.length > 1 &&
        ![
          "cat",
          "less",
          "grep",
          "head",
          "tail",
          "wc",
          "sort",
          "uniq",
          "echo",
          "ls",
          "pwd",
          "find",
          "tree",
          "skills",
          "about",
          "contact",
          "projects",
          "history",
        ].includes(cmd)
      )
        throw new Error(`${cmd}: not supported in pipelines`);
      if (cmd === "man" || cmd === "help") {
        const m = args[0];
        result = {
          output: m
            ? manuals[m]
              ? `${m.toUpperCase()}\n\nUSAGE\n  ${manuals[m][0]}\n\n${manuals[m][1]}\n\nBrowser simulation: supported syntax is shown above.`
              : `No manual entry for ${m}. Try help.`
            : `TUSHAROS COMMAND REFERENCE\n\nEXPLORE\n  about  skills  projects  contact  ethics  open\n  ctf  certificates  education  experience  github\n  resume  tools  network  social  status\n\nFILES & TEXT\n  ls  cd  pwd  cat  less  tree  find\n  grep  head  tail  wc  sort  uniq  echo\n\nSESSION\n  whoami  id  hostname  uname  neofetch\n  date  uptime  history  clear  theme  shortcuts\n\nLEARNING DEMOS\n  nmap --demo   ping --demo   ip addr   ps\n  matrix / matrix off · hack / normal · scan\n  coffee  hello  fortune  konami  exit\n\nType man COMMAND to see supported options.\nTry: cat skills.txt | grep -i python\nRead-only virtual files. No real shell or network access.`,
        };
      } else if (args.includes("--help") && manuals[cmd])
        result = { output: manuals[cmd].join("\n\n") };
      else if (cmd === "pwd") result = { output: session.cwd };
      else if (cmd === "cd") {
        const p =
          args[0] === "-"
            ? session.previous
            : resolvePath(args[0] || HOME, session.cwd);
        if (!dirs.has(p))
          throw new Error(
            `${args[0]}: ${exists(p) ? "not a directory" : "no such directory"}`,
          );
        result = { output: args[0] === "-" ? p : "", cwd: p };
      } else if (cmd === "ls") {
        const p = resolvePath(plain[0] || ".", session.cwd);
        if (!exists(p)) throw new Error(`${p}: no such file or directory`);
        const names = dirs.has(p)
          ? children(p).filter((n) => has("a") || !n.startsWith("."))
          : [p.split("/").pop()!];
        result = {
          output: names
            .map((n) => {
              const full = dirs.has(p) ? resolvePath(n, p) : p;
              const dir = dirs.has(full);
              return (
                (has("l")
                  ? `${dir ? "dr-xr-xr-x" : "-r--r--r--"}  guest  ${String(dir ? 0 : files[full].length).padStart(5)}  `
                  : "") +
                n +
                (dir ? "/" : "")
              );
            })
            .join(has("l") ? "\n" : "   "),
        };
      } else if (cmd === "cat" || cmd === "less") {
        if (!args.length && pipe === undefined)
          throw new Error(`usage: ${manuals[cmd][0]}`);
        result = {
          output: args.length
            ? args.map((p) => read(p, session.cwd)).join("\n")
            : pipe!,
        };
      } else if (cmd === "head" || cmd === "tail") {
        let count = 10;
        let path: string | undefined;
        for (let i = 0; i < args.length; i++) {
          if (args[i] === "-n") {
            count = Number(args[++i]);
          } else path = args[i];
        }
        if (!Number.isInteger(count) || count < 0 || count > 10000)
          throw new Error("line count must be between 0 and 10000");
        if (!path && pipe === undefined)
          throw new Error(`usage: ${manuals[cmd][0]}`);
        const lines = source(path).split("\n");
        result = {
          output: (count === 0
            ? []
            : cmd === "head"
              ? lines.slice(0, count)
              : lines.slice(-count)
          ).join("\n"),
        };
      } else if (cmd === "grep") {
        if (!plain[0]) throw new Error(`usage: ${manuals.grep[0]}`);
        if (!plain[1] && pipe === undefined)
          throw new Error("grep needs a file or piped input");
        const term = has("i") ? plain[0].toLowerCase() : plain[0];
        result = {
          output: source(plain[1])
            .split("\n")
            .flatMap((line, i) => {
              const match = (has("i") ? line.toLowerCase() : line).includes(
                term,
              );
              return (has("v") ? !match : match)
                ? [(has("n") ? `${i + 1}:` : "") + line]
                : [];
            })
            .join("\n"),
        };
      } else if (["sort", "uniq", "wc"].includes(cmd)) {
        if (!plain[0] && pipe === undefined)
          throw new Error(`${cmd} needs a file or piped input`);
        const s = source(plain[0]),
          lines = s.split("\n");
        if (cmd === "wc") {
          const counts = [
            s ? (s.match(/\n/g) || []).length + 1 : 0,
            s.trim() ? s.trim().split(/\s+/).length : 0,
            s.length,
          ];
          result = {
            output: String(
              has("l")
                ? counts[0]
                : has("w")
                  ? counts[1]
                  : has("c")
                    ? counts[2]
                    : counts.join("  "),
            ),
          };
        } else
          result = {
            output: (cmd === "sort"
              ? has("r")
                ? lines.sort().reverse()
                : lines.sort()
              : lines.filter((l, i) => i === 0 || l !== lines[i - 1])
            ).join("\n"),
          };
      } else if (cmd === "find" || cmd === "tree") {
        const p = resolvePath(
          args[0] && !args[0].startsWith("-") ? args[0] : ".",
          session.cwd,
        );
        if (!exists(p)) throw new Error(`${p}: no such path`);
        const all = [...dirs, ...Object.keys(files)]
          .filter((x) => x === p || x.startsWith(p === "/" ? "/" : p + "/"))
          .sort();
        if (cmd === "find") {
          const n = args.indexOf("-name");
          const pattern = n < 0 ? "*" : args[n + 1];
          if (!pattern) throw new Error("find: -name needs a pattern");
          const re = new RegExp(
            "^" +
              pattern
                .replace(/[.+^${}()|[\]\\]/g, "\\$&")
                .replace(/\*/g, ".*")
                .replace(/\?/g, ".") +
              "$",
          );
          result = {
            output: all
              .filter((x) => re.test(x.split("/").pop() || "/"))
              .join("\n"),
          };
        } else
          result = {
            output: all
              .map((x) =>
                x === p
                  ? p
                  : "  ".repeat(
                      x.slice(p.length).split("/").filter(Boolean).length,
                    ) +
                    "└ " +
                    x.split("/").pop() +
                    (dirs.has(x) ? "/" : ""),
              )
              .join("\n"),
          };
      } else if (cmd === "echo") result = { output: args.join(" ") };
      else if (cmd === "whoami") result = { output: "guest" };
      else if (cmd === "id")
        result = {
          output:
            "uid=1000(guest) gid=1000(visitors) groups=1000(visitors) [simulated]",
        };
      else if (cmd === "hostname") result = { output: "tushar-portfolio" };
      else if (cmd === "uname")
        result = {
          output:
            "TusharOS 3.7 / browser-based portfolio simulation / not a Linux kernel",
        };
      else if (cmd === "neofetch")
        result = {
          output: `guest@tushar-portfolio\n────────────────────────\nOS       TusharOS 3.7 (simulated)\nHost     Browser sandbox\nShell    Portfolio shell\nTheme    Cyberpunk\nIdentity ${profile.name}\nLocation Nepal\nFocus    Security + development\nContact  ${profile.email}\n────────────────────────\nExplore: ls /home/guest`,
        };
      else if (cmd === "date")
        result = {
          output: new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Kathmandu",
            dateStyle: "full",
            timeStyle: "long",
          }).format(new Date()),
        };
      else if (cmd === "uptime")
        result = {
          output: `Terminal session: ${Math.floor((Date.now() - session.started) / 60000)}m ${Math.floor((Date.now() - session.started) / 1000) % 60}s. Not server uptime.`,
        };
      else if (cmd === "history")
        result = {
          output: session.history
            .map((s, i) => `${String(i + 1).padStart(3)}  ${s}`)
            .join("\n"),
        };
      else if (cmd === "clear") result = { output: "", clear: true };
      else if (["about", "skills", "contact", "ethics"].includes(cmd))
        result = { output: files[`${HOME}/${cmd}.txt`] };
      else if (cmd === "projects")
        result = {
          output: projects
            .map((p) => `${p.name}\n  ${p.tech.join(" / ")}\n  ${p.repo}`)
            .join("\n\n"),
        };
      else if (cmd === "open") {
        const section = args[0];
        if (
          ![
            "home",
            "about",
            "work",
            "services",
            "expertise",
            "journey",
            "notes",
            "process",
            "contact",
            "terminal",
            "projects",
            "skills",
            "ctf",
            "certificates",
            "experience",
            "github",
            "resume",
            "network",
            "system",
            "settings",
          ].includes(section)
        )
          throw new Error(manuals.open.join("\n"));
        result = { output: `Opening ${section}…`, section };
      } else if (cmd === "theme") {
        if (!["green", "cyan", "violet"].includes(args[0]))
          throw new Error(manuals.theme[0]);
        result = { output: `Terminal accent: ${args[0]}`, theme: args[0] };
      } else if (cmd === "shortcuts") result = { output: manuals.shortcuts[1] };
      else if (cmd === "nmap") {
        result = {
          output:
            args.length === 1 && args[0] === "--demo"
              ? "STATIC DEMO — no scan performed\nTarget: lab.example (fictional lab)\nPORT     STATE  SERVICE\n22/tcp   open   ssh\n80/tcp   open   http\n443/tcp  open   https\n\nAn open port is not proof of a vulnerability."
              : manuals.nmap.join("\n\n"),
        };
      } else if (cmd === "ping") {
        result = {
          output:
            args.length === 1 && args[0] === "--demo"
              ? "STATIC DEMO — no packets sent\nPING lab.example (192.0.2.10): fictional lab\nicmp_seq=1 ttl=64 time=0.42 ms\nicmp_seq=2 ttl=64 time=0.38 ms\n2 example replies / 0% example loss"
              : manuals.ping.join("\n\n"),
        };
      } else if (cmd === "ip")
        result = {
          output:
            args[0] === "addr"
              ? "STATIC DEMO — not your network\nlo: 127.0.0.1/8\nlab0: 192.0.2.10/24 (documentation address)"
              : args[0] === "route"
                ? "STATIC DEMO — not your routes\ndefault via 192.0.2.1 dev lab0\n192.0.2.0/24 dev lab0"
                : manuals.ip.join("\n\n"),
        };
      else if (cmd === "ps")
        result = {
          output:
            "STATIC DEMO — fictional processes\nPID  NAME\n001  portfolio.init\n002  curiosity.service\n003  ethics.guard\n004  learning.loop",
        };
      else if (cmd === "sudo")
        result = {
          output:
            "guest is already welcome here. Elevated privileges are not available.\nThis is a read-only browser simulation.",
        };
      else if (
        [
          "rm",
          "mv",
          "cp",
          "touch",
          "mkdir",
          "chmod",
          "chown",
          "apt",
          "apt-get",
          "ssh",
          "curl",
          "wget",
          "bash",
          "sh",
          "python",
          "python3",
        ].includes(cmd)
      )
        result = {
          output: `${cmd}: not executable in this read-only portfolio sandbox.\nTry help for supported commands.`,
        };
      else
        result = {
          output: `${cmd}: command not found. Type help or use Tab completion.`,
        };
    }
    return result;
  } catch (error) {
    return {
      output: `shell: ${error instanceof Error ? error.message : "Unable to parse command."}`,
    };
  }
}
export function complete(input: string, cwd: string): string[] {
  const start = input.lastIndexOf("|") + 1;
  const segment = input.slice(start).trimStart();
  const prefix = input.slice(0, input.length - segment.length);
  if (!segment.includes(" "))
    return commands
      .filter((c) => c.startsWith(segment))
      .map((c) => prefix + c + " ");
  const cut = input.lastIndexOf(" "),
    word = input.slice(cut + 1),
    before = input.slice(0, cut + 1);
  const slash = word.lastIndexOf("/");
  const dirText = slash >= 0 ? word.slice(0, slash + 1) : "";
  const name = word.slice(slash + 1);
  const dir = resolvePath(dirText || ".", cwd);
  return children(dir)
    .filter((n) => n.startsWith(name))
    .map(
      (n) => before + dirText + n + (dirs.has(resolvePath(n, dir)) ? "/" : " "),
    );
}
