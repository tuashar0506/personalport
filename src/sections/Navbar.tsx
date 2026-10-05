import { useEffect, useState } from "react";
import { Menu, X, TerminalSquare } from "lucide-react";

const links = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-edge" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-mono text-sm group">
          <TerminalSquare className="w-5 h-5 text-neon" />
          <span className="text-muted2">~/</span>
          <span className="text-slate-100 group-hover:text-neon transition-colors">tushar.pradhan</span>
          <span className="term-cursor" style={{ height: "0.9em" }} />
        </a>

        <div className="hidden md:flex items-center gap-7 font-mono text-[13px]">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted2 hover:text-neon transition-colors"
            >
              <span className="text-neon/60 mr-1">0{i + 1}.</span>
              {l.label}
            </a>
          ))}
          <a
            href="mailto:tusharpradhan619@gmail.com"
            className="ml-2 px-4 py-1.5 border border-neon/50 text-neon hover:bg-neon hover:text-ink transition-all duration-200"
          >
            hire_me
          </a>
        </div>

        <button
          className="md:hidden text-slate-200"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink/95 backdrop-blur-md border-b border-edge px-6 py-4 font-mono text-sm">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-muted2 hover:text-neon transition-colors"
            >
              <span className="text-neon/60 mr-2">0{i + 1}.</span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
