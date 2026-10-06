import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  TerminalSquare,
  Command as CommandIcon,
  Settings2,
  Volume2,
  VolumeX,
  LockKeyhole,
  ChevronRight,
  Search,
  LayoutDashboard,
  Keyboard,
  ShieldCheck,
  FolderLock,
  Network,
  Activity,
  Wifi,
  Menu,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { apps, appById } from "./os/catalog";
import type { AppId, Preferences } from "./os/catalog";
import AppWindow from "./os/Window";
import type { WindowState } from "./os/Window";
import Effects from "./os/Effects";
import { SystemMonitor } from "./os/SystemMonitor";
import avatar from "@/assets/avatar.webp";
import "./os/os.css";
const Terminal = lazy(() => import("./components/PortfolioTerminal"));
const About = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.About })),
  ),
  Projects = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.Projects })),
  ),
  Skills = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.Skills })),
  ),
  CTF = lazy(() => import("./os/Modules").then((m) => ({ default: m.CTF }))),
  NetworkMap = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.NetworkMap })),
  ),
  GithubPanel = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.GithubPanel })),
  ),
  Credentials = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.Credentials })),
  ),
  Experience = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.Experience })),
  ),
  Notes = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.Notes })),
  ),
  Resume = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.Resume })),
  ),
  Contact = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.Contact })),
  ),
  Settings = lazy(() =>
    import("./os/Modules").then((m) => ({ default: m.Settings })),
  );
function readPrefs(): Preferences {
  try {
    const p = JSON.parse(localStorage.getItem("tushar-os-prefs") || "{}");
    return {
      motion:
        !matchMedia("(prefers-reduced-motion: reduce)").matches &&
        p.motion !== false,
      sound: false,
      matrix: p.matrix === true,
      crt: p.crt === true,
      hacker: false,
    };
  } catch {
    return {
      motion: false,
      sound: false,
      matrix: false,
      crt: false,
      hacker: false,
    };
  }
}
function Boot({ done, motion }: { done: () => void; motion: boolean }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!motion) {
      done();
      return;
    }
    const started = performance.now();
    const t = setInterval(() => {
      const p = Math.min(100, Math.round((performance.now() - started) / 23));
      setProgress(p);
      if (p === 100) {
        clearInterval(t);
        done();
      }
    }, 80);
    return () => clearInterval(t);
  }, [done, motion]);
  return (
    <div
      className="boot-screen"
      role="dialog"
      aria-modal="true"
      aria-label="TusharOS startup"
    >
      <div className="boot-mark">
        <TerminalSquare size={44} />
      </div>
      <p>
        TUSHAR_OS <span>v3.7</span>
      </p>
      <h1>Initializing your session.</h1>
      <div
        className="boot-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ width: progress + "%" }} />
      </div>
      <div className="boot-lines">
        {[
          "Loading interface kernel",
          "Mounting /portfolio",
          "Preparing command shell",
          "Opening learning modules",
        ].map((s, i) => (
          <div key={s}>
            <span>{s}</span>
            <b>{progress > i * 25 ? "OK" : "…"}</b>
          </div>
        ))}
      </div>
      <span className="boot-sub">
        Portfolio interface / no authentication required
      </span>
      <button autoFocus className="os-button" onClick={done}>
        Skip boot
      </button>
    </div>
  );
}
export default function App() {
  const [prefs, setPreferences] = useState<Preferences>(readPrefs),
    [windows, setWindows] = useState<WindowState[]>([]),
    [palette, setPalette] = useState(false),
    [mobileMenu, setMobileMenu] = useState(false),
    [bounds, setBounds] = useState({ w: 1000, h: 700 }),
    [clock, setClock] = useState(new Date()),
    [boot, setBoot] = useState(() => {
      try {
        return !localStorage.getItem("tushar-os-booted");
      } catch {
        return true;
      }
    });
  const workspace = useRef<HTMLDivElement>(null),
    z = useRef(10),
    audio = useRef<AudioContext | null>(null);
  const active = windows
    .filter((w) => !w.minimized && !w.closing)
    .sort((a, b) => b.z - a.z)[0]?.id;
  const finishBoot = useCallback(() => {
    setBoot(false);
    try {
      localStorage.setItem("tushar-os-booted", "1");
    } catch {}
  }, []);
  const setPrefs = useCallback(
    (p: Partial<Preferences>) => setPreferences((old) => ({ ...old, ...p })),
    [],
  );
  useEffect(() => {
    document.documentElement.dataset.motion = prefs.motion ? "on" : "off";
    document.documentElement.dataset.hacker = prefs.hacker ? "on" : "off";
    try {
      localStorage.setItem(
        "tushar-os-prefs",
        JSON.stringify({ ...prefs, sound: false, hacker: false }),
      );
    } catch {}
  }, [prefs]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => {
      if (media.matches) setPrefs({ motion: false });
    };
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, [setPrefs]);
  useEffect(() => {
    const t = setInterval(() => {
      if (!document.hidden) setClock(new Date());
    }, 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const el = workspace.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width,
        h = entry.contentRect.height;
      setBounds({ w, h });
      setWindows((old) =>
        old.map((win) => ({
          ...win,
          w: Math.min(win.w, w),
          h: Math.min(win.h, h),
          x: Math.max(0, Math.min(win.x, w - Math.min(win.w, w))),
          y: Math.max(0, Math.min(win.y, h - Math.min(win.h, h))),
        })),
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const beep = useCallback(() => {
    if (!prefs.sound) return;
    try {
      const ctx = audio.current ?? new AudioContext();
      audio.current = ctx;
      if (ctx.state === "suspended") void ctx.resume();
      const oscillator = ctx.createOscillator(),
        gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(680, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        420,
        ctx.currentTime + 0.055,
      );
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.08);
    } catch {}
  }, [prefs.sound]);
  useEffect(
    () => () => {
      void audio.current?.close();
    },
    [],
  );
  const open = useCallback(
    (id: AppId) => {
      beep();
      setMobileMenu(false);
      setPalette(false);
      setWindows((old) => {
        const found = old.find((w) => w.id === id);
        if (found)
          return old.map((w) =>
            w.id === id
              ? { ...w, minimized: false, closing: false, z: ++z.current }
              : w,
          );
        const w = Math.min(860, bounds.w - 30),
          h = Math.min(660, bounds.h - 30),
          offset = (old.length % 4) * 20;
        return [
          ...old,
          {
            id,
            x: Math.max(0, Math.min(bounds.w - w, (bounds.w - w) / 2 + offset)),
            y: Math.max(0, Math.min(bounds.h - h, 20 + offset)),
            w,
            h,
            z: ++z.current,
            minimized: false,
            maximized: bounds.w < 750,
          },
        ];
      });
    },
    [bounds, beep],
  );
  const close = useCallback(
    (id: AppId) => {
      beep();
      setWindows((old) =>
        old.map((w) => (w.id === id ? { ...w, closing: true } : w)),
      );
      setTimeout(
        () => {
          setWindows((old) => old.filter((w) => w.id !== id || !w.closing));
          document
            .querySelector<HTMLButtonElement>(`[data-launch="${id}"]`)
            ?.focus({ preventScroll: true });
        },
        prefs.motion ? 130 : 0,
      );
    },
    [beep, prefs.motion],
  );
  const update = (id: AppId, p: Partial<WindowState>) =>
    setWindows((old) => old.map((w) => (w.id === id ? { ...w, ...p } : w)));
  const focus = (id: AppId) =>
    setWindows((old) => {
      if (
        old.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0]?.id === id
      )
        return old;
      return old.map((w) => (w.id === id ? { ...w, z: ++z.current } : w));
    });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      } else if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        open("terminal");
      } else if (e.key === "Escape" && !palette && !boot) {
        if (mobileMenu) setMobileMenu(false);
        else if (active) close(active);
      } else if (e.altKey && ["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        open(
          (["about", "skills", "projects", "ctf", "contact"] as AppId[])[
            Number(e.key) - 1
          ],
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, active, palette, boot, mobileMenu]);
  const terminalNavigate = (id: string) => {
    const aliases: Record<string, AppId> = {
      work: "projects",
      expertise: "skills",
      journey: "experience",
      services: "contact",
      home: "about",
      process: "experience",
    };
    const next = aliases[id] ?? id;
    if (apps.some((a) => a.id === next)) open(next as AppId);
  };
  const terminalEffect = (effect: string) => {
    if (effect === "matrix-on") setPrefs({ matrix: true });
    if (effect === "matrix-off") setPrefs({ matrix: false });
    if (effect === "hack") {
      setPrefs({ hacker: true, matrix: true });
      update("terminal", { maximized: true });
    }
    if (effect === "normal") setPrefs({ hacker: false, matrix: false });
    if (effect === "exit") close("terminal");
  };
  const time = clock.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
  });
  function render(id: AppId) {
    switch (id) {
      case "about":
        return <About open={open} />;
      case "terminal":
        return (
          <Terminal
            expanded
            onNavigate={terminalNavigate}
            onEffect={terminalEffect}
            onType={beep}
          />
        );
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;
      case "ctf":
        return <CTF />;
      case "network":
        return <NetworkMap open={open} />;
      case "github":
        return <GithubPanel />;
      case "certificates":
        return <Credentials />;
      case "experience":
        return <Experience />;
      case "notes":
        return <Notes />;
      case "resume":
        return <Resume />;
      case "contact":
        return <Contact />;
      case "settings":
        return (
          <Settings
            prefs={prefs}
            setPrefs={setPrefs}
            reboot={() => {
              setBoot(true);
            }}
          />
        );
      case "system":
        return <SystemMonitor motion={prefs.motion} />;
    }
  }
  return (
    <div
      className={
        "os-shell " +
        (prefs.crt ? "crt-mode " : "") +
        (prefs.hacker ? "hacker-mode" : "")
      }
    >
      <Effects prefs={prefs} />
      <a className="os-skip" href="#desktop-main">
        Skip to dashboard
      </a>
      <header className="os-topbar" inert={boot}>
        <div className="topbar-brand">
          <button
            className="mobile-nav-toggle"
            aria-label="Toggle app navigation"
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={19} /> : <Menu size={19} />}
          </button>
          <TerminalSquare size={22} />
          <strong>
            TUSHAR<span>_OS</span>
          </strong>
          <span className="version">v3.7</span>
        </div>
        <div className="topbar-status">
          <span className="status-light" />
          <span>PORTFOLIO SESSION</span>
          <span className="top-separator" />
          <LockKeyhole size={12} />
          <span>
            {location.protocol === "https:" ? "HTTPS" : "LOCAL PREVIEW"}
          </span>
        </div>
        <button className="palette-trigger" onClick={() => setPalette(true)}>
          <Search size={14} />
          <span>Search anything</span>
          <kbd>⌘ K</kbd>
        </button>
        <div className="topbar-right">
          <span className="top-time">
            {time}
            <small>NPT</small>
          </span>
          <button
            aria-label={prefs.sound ? "Mute sound" : "Enable sound"}
            aria-pressed={prefs.sound}
            onClick={() => setPrefs({ sound: !prefs.sound })}
          >
            {prefs.sound ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <button
            aria-label="Open preferences"
            onClick={() => open("settings")}
          >
            <Settings2 size={17} />
          </button>
        </div>
      </header>
      <div className="os-body" inert={boot}>
        <aside className={"os-sidebar " + (mobileMenu ? "menu-visible" : "")}>
          <div className="operator-label">OPERATOR / 001</div>
          <button
            aria-label="Command center"
            className={"sidebar-home " + (!active ? "selected" : "")}
            onClick={() => {
              setWindows((old) => old.map((w) => ({ ...w, minimized: true })));
              setMobileMenu(false);
            }}
          >
            <LayoutDashboard size={17} />
            <span>Command center</span>
          </button>
          <div className="sidebar-section-label">WORKSPACE</div>
          <nav aria-label="Portfolio applications">
            {apps
              .filter((a) => !["system", "settings"].includes(a.id))
              .map((a) => (
                <button
                  key={a.id}
                  aria-label={a.name}
                  data-launch={a.id}
                  className={active === a.id ? "selected" : ""}
                  onClick={() => open(a.id)}
                  aria-current={active === a.id ? "page" : undefined}
                >
                  <a.icon size={17} />
                  <span>{a.name}</span>
                  {windows.some((w) => w.id === a.id) && <i />}
                </button>
              ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="operator-avatar">TP</div>
            <div>
              <strong>Tushar Pradhan</strong>
              <span>Ethical hacking student</span>
            </div>
            <span className="status-light" />
          </div>
        </aside>
        <main
          id="desktop-main"
          tabIndex={-1}
          className="os-workspace"
          ref={workspace}
        >
          <div className="desktop-home">
            <div className="desktop-breadcrumb">
              <span>workspace</span>
              <ChevronRight size={13} />
              <b>command-center</b>
              <span className="desktop-session">SESSION / PUBLIC</span>
            </div>
            <div className="dashboard-heading">
              <div>
                <p className="os-eyebrow">YOUR CONNECTION TO MY WORLD</p>
                <h2>
                  Welcome to the command center<span>.</span>
                </h2>
              </div>
              <span className="mode-tag">EXPLORE MODE</span>
            </div>
            <section className="desktop-hero">
              <div className="hero-intro">
                <div className="terminal-prompt">
                  <span>tushar@cyberlab</span>:~$ whoami <i />
                </div>
                <h1>
                  TUSHAR
                  <br />
                  <span>PRADHAN</span>
                  <b>_</b>
                </h1>
                <div className="role-line">ETHICAL HACKING STUDENT</div>
                <p>
                  Breaking systems to understand
                  <br className="desktop-break" /> how to defend them.
                </p>
                <div className="hero-os-actions">
                  <button
                    className="os-button primary"
                    data-cursor="EXECUTE"
                    onClick={() => open("terminal")}
                  >
                    <TerminalSquare size={16} /> Enter terminal
                  </button>
                  <button
                    className="os-button"
                    onClick={() => open("projects")}
                  >
                    <FolderLock size={16} /> Project vault
                  </button>
                </div>
                <div className="hero-coordinate">
                  <span>NEPAL / UTC +05:45</span>
                  <span>CURIOUS BY DEFAULT. ETHICAL BY DESIGN.</span>
                </div>
              </div>
              <div className="hero-id-card" data-tilt>
                <img
                  src={avatar}
                  alt="Purple-lit hooded character illustration"
                  fetchPriority="high"
                />
                <div className="hero-id-shade" />
                <div className="hero-id-top">
                  <span>IDENTITY / 001</span>
                  <ShieldCheck size={19} />
                </div>
                <div className="hero-id-bottom">
                  <small>THE PERSON BEHIND THE PROMPT</small>
                  <strong>TUSHAR.PRADHAN</strong>
                  <span>SECURITY × DEVELOPMENT</span>
                </div>
                <div className="portrait-reticle" aria-hidden="true" />
              </div>
            </section>
            <div className="module-strip-heading">
              <span>QUICK ACCESS</span>
              <span>SELECT A MODULE TO BEGIN</span>
            </div>
            <div className="desktop-modules">
              {(["projects", "skills", "ctf", "network"] as AppId[]).map(
                (id, i) => {
                  const a = appById(id);
                  return (
                    <button
                      key={id}
                      data-tilt
                      data-cursor="OPEN"
                      onClick={() => open(id)}
                    >
                      <div>
                        <a.icon size={22} />
                        <span>0{i + 1}</span>
                      </div>
                      <h3>{a.name}</h3>
                      <p>{a.description}</p>
                      <footer>
                        Launch module <span>+</span>
                      </footer>
                    </button>
                  );
                },
              )}
            </div>
            <div className="desktop-tip">
              <Keyboard size={15} />
              <span>Navigate at the speed of thought.</span>
              <button onClick={() => setPalette(true)}>
                <kbd>Ctrl + K</kbd> command palette
              </button>
              <button onClick={() => open("settings")}>All shortcuts</button>
            </div>
          </div>
          {windows.map((win) => (
            <AppWindow
              key={win.id}
              win={win}
              active={active === win.id}
              bounds={bounds}
              update={(p) => update(win.id, p)}
              focus={() => focus(win.id)}
              close={() => close(win.id)}
            >
              <Suspense
                fallback={
                  <div className="module-loading">
                    <Activity size={24} />
                    <span>Loading module…</span>
                  </div>
                }
              >
                {render(win.id)}
              </Suspense>
            </AppWindow>
          ))}
        </main>
        <aside className="system-rail">
          <SystemMonitor compact motion={prefs.motion} />
          <div className="rail-section">
            <div className="monitor-label">
              <span>SESSION INFO</span>
              <LockKeyhole size={13} />
            </div>
            <p>
              ACCESS LEVEL<strong>PUBLIC PORTFOLIO</strong>
            </p>
            <p>
              LOCATION<strong>NEPAL / NPT</strong>
            </p>
            <p>
              ENVIRONMENT<strong>BROWSER SANDBOX</strong>
            </p>
          </div>
          <button className="rail-map" onClick={() => open("network")}>
            <Network size={30} />
            <strong>Explore the network</strong>
            <span>Open learning topology +</span>
          </button>
          <div className="rail-bottom">
            <ShieldCheck size={15} />
            <span>
              Permission first.
              <br />
              Always.
            </span>
          </div>
        </aside>
      </div>
      <footer className="os-taskbar" inert={boot}>
        <button
          className="taskbar-launcher"
          aria-label="Open command palette"
          onClick={() => setPalette(true)}
        >
          <CommandIcon size={20} />
        </button>
        <span className="taskbar-divider" />
        <div className="taskbar-apps">
          {(
            [
              "terminal",
              "projects",
              "skills",
              "ctf",
              ...windows
                .map((w) => w.id)
                .filter(
                  (id) =>
                    !["terminal", "projects", "skills", "ctf"].includes(id),
                ),
            ] as AppId[]
          ).map((id) => {
            const a = appById(id),
              win = windows.find((w) => w.id === id);
            return (
              <button
                key={id}
                className={
                  (win ? "running " : "") + (active === id ? "active" : "")
                }
                aria-label={
                  (win?.minimized
                    ? "Restore "
                    : active === id
                      ? "Minimize "
                      : "Open ") + a.name
                }
                onClick={() => {
                  if (active === id) update(id, { minimized: true });
                  else open(id);
                }}
              >
                <a.icon size={17} />
                <span>{a.name}</span>
                {win && <i />}
              </button>
            );
          })}
        </div>
        <div className="taskbar-tray">
          <Wifi size={14} />
          <span>{time}</span>
          <button
            aria-label="Minimize all windows"
            onClick={() =>
              setWindows((old) => old.map((w) => ({ ...w, minimized: true })))
            }
          >
            <LayoutDashboard size={16} />
          </button>
        </div>
      </footer>
      <Dialog open={palette} onOpenChange={setPalette}>
        <DialogContent className="os-command-dialog">
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <DialogDescription className="sr-only">
            Search and open a portfolio module. Use arrow keys and Enter to
            select.
          </DialogDescription>
          <Command>
            <CommandInput placeholder="Where do you want to go?" />
            <CommandList>
              <CommandEmpty>No matching modules.</CommandEmpty>
              <CommandGroup heading="APPLICATIONS">
                {apps.map((a) => (
                  <CommandItem
                    key={a.id}
                    value={a.name + " " + a.label + " " + a.description}
                    onSelect={() => open(a.id)}
                  >
                    <a.icon size={18} />
                    <div>
                      <strong>Open {a.name}</strong>
                      <span>{a.path}</span>
                    </div>
                    <kbd>↵</kbd>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="command-footer">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>esc dismiss</span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
      {boot && <Boot done={finishBoot} motion={prefs.motion} />}
    </div>
  );
}
