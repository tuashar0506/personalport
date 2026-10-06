import { useEffect, useRef } from "react";
import type { ReactNode, PointerEvent } from "react";
import { Minus, Maximize2, Minimize2, X, Grip } from "lucide-react";
import { appById } from "./catalog";
import type { AppId } from "./catalog";
export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  closing?: boolean;
};
export default function AppWindow({
  win,
  active,
  bounds,
  update,
  focus,
  close,
  children,
}: {
  win: WindowState;
  active: boolean;
  bounds: { w: number; h: number };
  update: (p: Partial<WindowState>) => void;
  focus: () => void;
  close: () => void;
  children: ReactNode;
}) {
  const el = useRef<HTMLElement>(null),
    interaction = useRef<{
      x: number;
      y: number;
      w: number;
      h: number;
      px: number;
      py: number;
      resize: boolean;
    } | null>(null);
  const app = appById(win.id),
    Icon = app.icon;
  const mobile = bounds.w < 750;
  useEffect(() => {
    if (active && !win.minimized) {
      el.current?.focus({ preventScroll: true });
    }
  }, [active, win.minimized]);
  function start(e: PointerEvent<HTMLElement>, resize = false) {
    if (mobile || win.maximized || (e.target as HTMLElement).closest("button"))
      return;
    e.preventDefault();
    focus();
    interaction.current = {
      x: win.x,
      y: win.y,
      w: win.w,
      h: win.h,
      px: e.clientX,
      py: e.clientY,
      resize,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e: PointerEvent<HTMLElement>) {
    const p = interaction.current;
    if (!p) return;
    const dx = e.clientX - p.px,
      dy = e.clientY - p.py;
    if (p.resize)
      update({
        w: Math.max(350, Math.min(bounds.w - p.x, p.w + dx)),
        h: Math.max(250, Math.min(bounds.h - p.y, p.h + dy)),
      });
    else
      update({
        x: Math.max(0, Math.min(bounds.w - win.w, p.x + dx)),
        y: Math.max(0, Math.min(bounds.h - win.h, p.y + dy)),
      });
  }
  return (
    <section
      ref={el}
      role="region"
      aria-label={app.name + " window"}
      tabIndex={-1}
      hidden={win.minimized}
      onPointerDownCapture={focus}
      className={
        "app-window " +
        (active ? "focused " : "") +
        (win.maximized ? "maximized " : "") +
        (win.closing ? "closing" : "")
      }
      style={{
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
      }}
      onKeyDown={(e) => {
        if (
          e.altKey &&
          ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key) &&
          !mobile &&
          !win.maximized
        ) {
          e.preventDefault();
          if (e.shiftKey)
            update({
              w: Math.max(
                350,
                Math.min(
                  bounds.w - win.x,
                  win.w +
                    (e.key === "ArrowRight"
                      ? 20
                      : e.key === "ArrowLeft"
                        ? -20
                        : 0),
                ),
              ),
              h: Math.max(
                250,
                Math.min(
                  bounds.h - win.y,
                  win.h +
                    (e.key === "ArrowDown"
                      ? 20
                      : e.key === "ArrowUp"
                        ? -20
                        : 0),
                ),
              ),
            });
          else
            update({
              x: Math.max(
                0,
                Math.min(
                  bounds.w - win.w,
                  win.x +
                    (e.key === "ArrowRight"
                      ? 20
                      : e.key === "ArrowLeft"
                        ? -20
                        : 0),
                ),
              ),
              y: Math.max(
                0,
                Math.min(
                  bounds.h - win.h,
                  win.y +
                    (e.key === "ArrowDown"
                      ? 20
                      : e.key === "ArrowUp"
                        ? -20
                        : 0),
                ),
              ),
            });
        }
      }}
    >
      <header
        className="window-titlebar"
        onPointerDown={(e) => start(e)}
        onPointerMove={move}
        onPointerUp={() => (interaction.current = null)}
        onPointerCancel={() => (interaction.current = null)}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button"))
            update({ maximized: !win.maximized });
        }}
      >
        <div>
          <Icon size={16} />
          <span>{app.name}</span>
          <small>{app.path}</small>
        </div>
        <div className="window-controls">
          <button
            aria-label={"Minimize " + app.name}
            onClick={() => update({ minimized: true })}
          >
            <Minus size={16} />
          </button>
          <button
            className="maximize-control"
            aria-label={(win.maximized ? "Restore " : "Maximize ") + app.name}
            onClick={() => update({ maximized: !win.maximized })}
          >
            {win.maximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
          <button
            className="close-control"
            aria-label={"Close " + app.name}
            onClick={close}
          >
            <X size={17} />
          </button>
        </div>
      </header>
      <div className="window-content">{children}</div>
      <div className="window-foot">
        <span>{app.path}</span>
        <span>PUBLIC ACCESS</span>
      </div>
      <div
        role="separator"
        aria-label={"Resize " + app.name}
        className="window-resize"
        onPointerDown={(e) => start(e, true)}
        onPointerMove={move}
        onPointerUp={() => (interaction.current = null)}
        onPointerCancel={() => (interaction.current = null)}
      >
        <Grip size={16} />
      </div>
    </section>
  );
}
