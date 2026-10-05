import { useEffect, useRef, useState } from "react";

export interface TermLine {
  prompt?: string;
  cmd: string;
  output?: string[];
}

/** Types out terminal command lines one character at a time, then prints output. */
export default function Terminal({ lines, className = "" }: { lines: TermLine[]; className?: string }) {
  const [done, setDone] = useState<TermLine[]>([]);
  const [currentCmd, setCurrentCmd] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  // start typing when the terminal scrolls into view
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    let i = 0;
    const typer = setInterval(() => {
      i++;
      setCurrentCmd(line.cmd.slice(0, i));
      if (i >= line.cmd.length) {
        clearInterval(typer);
        setTimeout(() => {
          setDone((d) => [...d, line]);
          setCurrentCmd("");
          setLineIdx((n) => n + 1);
        }, 350);
      }
    }, 34);
    return () => clearInterval(typer);
  }, [started, lineIdx, lines]);

  const finished = lineIdx >= lines.length;

  return (
    <div ref={hostRef} className={`font-mono text-[13px] leading-relaxed ${className}`}>
      {done.map((l, i) => (
        <div key={i} className="mb-2">
          <div>
            <span className="text-neon">{l.prompt ?? "tushar@kali"}</span>
            <span className="text-muted2">:~$ </span>
            <span className="text-slate-200">{l.cmd}</span>
          </div>
          {l.output?.map((o, j) => (
            <div key={j} className="text-muted2 pl-3">
              {o}
            </div>
          ))}
        </div>
      ))}
      {!finished && started && (
        <div>
          <span className="text-neon">{lines[lineIdx]?.prompt ?? "tushar@kali"}</span>
          <span className="text-muted2">:~$ </span>
          <span className="text-slate-200">{currentCmd}</span>
          <span className="term-cursor ml-0.5" />
        </div>
      )}
      {finished && (
        <div>
          <span className="text-neon">tushar@kali</span>
          <span className="text-muted2">:~$ </span>
          <span className="term-cursor ml-0.5" />
        </div>
      )}
    </div>
  );
}
