import { useEffect, useRef } from "react";
import type { Preferences } from "./catalog";
export default function Effects({ prefs }: { prefs: Preferences }) {
  const canvas = useRef<HTMLCanvasElement>(null),
    cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!prefs.motion) return;
    const c = canvas.current,
      ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    let w = 0,
      h = 0,
      frame = 0,
      last = 0;
    const mouse = { x: -999, y: -999 };
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [],
      drops: number[] = [];
    const mobile = matchMedia("(pointer:coarse)").matches;
    const size = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w;
      c.height = h;
      nodes = Array.from({ length: mobile ? 15 : 36 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      }));
      drops = Array.from(
        { length: Math.ceil(w / 30) },
        () => Math.random() * h,
      );
    };
    size();
    const move = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const draw = (t: number) => {
      frame = requestAnimationFrame(draw);
      if (document.hidden || t - last < 40) return;
      last = t;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(168,85,247,.12)";
      ctx.fillStyle = prefs.hacker ? "#55d998" : "#c084fc";
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x = (n.x + n.vx + w) % w;
        n.y = (n.y + n.vy + h) % h;
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < 100 && d > 0) {
          n.x += ((n.x - mouse.x) / d) * 0.4;
          n.y += ((n.y - mouse.y) / d) * 0.4;
        }
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.hypot(n.x - nodes[j].x, n.y - nodes[j].y) < 150) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = prefs.matrix ? 0.24 : 0.045;
      ctx.font = "12px monospace";
      drops.forEach((y, i) => {
        ctx.fillText("01<>/{}"[Math.floor((t / 600 + i) % 7)], i * 30, y);
        drops[i] = y > h ? -20 : y + (prefs.matrix ? 2.4 : 0.5);
      });
      ctx.globalAlpha = 1;
    };
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", move);
      ctx.clearRect(0, 0, w, h);
    };
  }, [prefs.motion, prefs.matrix, prefs.hacker]);
  useEffect(() => {
    if (!prefs.motion || !matchMedia("(pointer:fine)").matches) return;
    let frame = 0,
      last: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = cursor.current;
        if (!el) return;
        el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        el.classList.add("visible");
        const target = (e.target as HTMLElement).closest<HTMLElement>(
          "button,a,[data-tilt]",
        );
        el.dataset.active = target ? "yes" : "no";
        el.dataset.label =
          target?.dataset.cursor ||
          (target?.tagName === "A" ? "CONNECT" : target ? "OPEN" : "");
        if (last !== target) {
          last?.style.removeProperty("transform");
          last?.removeAttribute("data-lit");
          last = target;
        }
        if (target) {
          const r = target.getBoundingClientRect();
          target.style.setProperty("--mx", `${e.clientX - r.left}px`);
          target.style.setProperty("--my", `${e.clientY - r.top}px`);
          target.dataset.lit = "true";
          if (target.hasAttribute("data-tilt"))
            target.style.transform = `perspective(900px) rotateX(${(-(e.clientY - r.top - r.height / 2) / r.height) * 3}deg) rotateY(${((e.clientX - r.left - r.width / 2) / r.width) * 3}deg)`;
        }
      });
    };
    const leave = () => {
      cursor.current?.classList.remove("visible");
      last?.style.removeProperty("transform");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", leave);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.classList.add("hud-cursor-enabled");
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", leave);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("hud-cursor-enabled");
      leave();
    };
  }, [prefs.motion]);
  return (
    <>
      <canvas className="os-atmosphere" ref={canvas} aria-hidden="true" />
      <div ref={cursor} className="os-cursor" aria-hidden="true">
        <i />
        <b />
      </div>
    </>
  );
}
