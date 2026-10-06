import { useState, useEffect } from "react";
import { Network } from "lucide-react";
export function SystemMonitor({
  compact = false,
  motion = true,
}: {
  compact?: boolean;
  motion?: boolean;
}) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!motion) return;
    const t = setInterval(() => {
      if (!document.hidden) setTick((x) => x + 1);
    }, 2200);
    return () => clearInterval(t);
  }, [motion]);
  const cpu = 28 + Math.round(Math.sin(tick * 0.7) * 9),
    ram = 48 + Math.round(Math.cos(tick * 0.5) * 6);
  return (
    <div className={compact ? "monitor-compact" : "module-pad"}>
      {!compact && (
        <div className="module-heading">
          <span>/proc/portfolio</span>
          <h2>A little atmosphere.</h2>
          <p>
            Synthetic telemetry for the portfolio interface. These readings do
            not measure your device, network, or security.
          </p>
        </div>
      )}
      <div className="monitor-label">
        <span>SYSTEM MONITOR</span>
        <b>DEMO</b>
      </div>
      <div className="telemetry-value">
        <span>CPU LOAD</span>
        <strong>
          {cpu}
          <small>%</small>
        </strong>
      </div>
      <div className="telemetry-bars" aria-hidden="true">
        {Array.from({ length: 22 }, (_, i) => (
          <i
            key={i}
            style={{
              height: 8 + ((i * 17 + tick * 7) % 32),
              opacity: i < cpu / 5 ? 1 : 0.22,
            }}
          />
        ))}
      </div>
      <div className="telemetry-value">
        <span>MEMORY</span>
        <strong>
          {ram}
          <small>%</small>
        </strong>
      </div>
      <div className="memory-track">
        <span style={{ width: ram + "%" }} />
      </div>
      <div className="monitor-divider" />
      <div className="monitor-label">
        <span>NETWORK ACTIVITY</span>
        <Network size={14} />
      </div>
      <svg
        viewBox="0 0 180 60"
        role="img"
        aria-label="Simulated network activity graph"
        className="telemetry-graph"
      >
        <path d="M0 15H180M0 30H180M0 45H180" stroke="#a855f71a" fill="none" />
        <polyline
          points={Array.from(
            { length: 25 },
            (_, i) =>
              `${i * 7.5},${50 - Math.abs(Math.sin(i * 1.8 + tick * 0.3)) * 35}`,
          ).join(" ")}
          fill="none"
          stroke="#ae8afa"
          strokeWidth="1.4"
        />
      </svg>
      <div className="monitor-status">
        <span>FIREWALL</span>
        <strong>DEMO ACTIVE</strong>
      </div>
      <div className="monitor-status">
        <span>THREAT LEVEL</span>
        <strong>SIMULATED LOW</strong>
      </div>
      <p className="telemetry-disclaimer">
        Portfolio visualization
        <br />
        Not live device telemetry
      </p>
    </div>
  );
}
