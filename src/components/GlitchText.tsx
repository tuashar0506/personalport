import { useEffect, useState } from "react";

const GLYPHS = "01#@$%&/\\<>[]{}*+=~^";

/**
 * Periodically scrambles random characters of the text into hacker glyphs,
 * then resolves back — a controlled glitch effect.
 */
export default function GlitchText({
  text,
  className = "",
  interval = 3800,
}: {
  text: string;
  className?: string;
  interval?: number;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let scrambleTimer: ReturnType<typeof setInterval> | null = null;
    let resolveTimer: ReturnType<typeof setTimeout> | null = null;

    const trigger = () => {
      const chars = text.split("");
      const hits = new Set<number>();
      const count = Math.max(2, Math.floor(text.length * 0.14));
      while (hits.size < count) {
        const i = Math.floor(Math.random() * chars.length);
        if (chars[i] !== " ") hits.add(i);
      }
      let steps = 0;
      scrambleTimer = setInterval(() => {
        steps++;
        setDisplay(
          chars
            .map((c, i) =>
              hits.has(i) && steps < 4
                ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                : c
            )
            .join("")
        );
        if (steps >= 4 && scrambleTimer) {
          clearInterval(scrambleTimer);
          setDisplay(text);
        }
      }, 70);
    };

    const loop = setInterval(trigger, interval);
    resolveTimer = setTimeout(trigger, 900);
    return () => {
      clearInterval(loop);
      if (scrambleTimer) clearInterval(scrambleTimer);
      if (resolveTimer) clearTimeout(resolveTimer);
    };
  }, [text, interval]);

  return <span className={className}>{display}</span>;
}
