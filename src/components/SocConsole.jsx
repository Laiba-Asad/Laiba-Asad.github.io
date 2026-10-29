import { useEffect, useRef, useState } from 'react';

// Decorative "SOC console" below the hero. Everything here is simulated:
// the terminal replays a fixed script and the dashboard numbers are random.
// Timers only run while the block is on screen, and not at all under
// prefers-reduced-motion.

const SCRIPT = [
  { cmd: 'whoami', out: 'laiba asad — Security Analyst' },
  { cmd: 'cat focus.txt', out: 'blue team · soc · incident response · security testing' },
  { cmd: 'pwd', out: '/islamabad/pakistan' },
];

const THREATS = [
  { type: 'Ransomware', status: 'Mitigated' },
  { type: 'Botnet', status: 'Quarantined' },
  { type: 'Phishing', status: 'Blocked' },
  { type: 'Brute force', status: 'Contained' },
  { type: 'Malware', status: 'Blocked' },
];

const random = (min, max) => min + Math.random() * (max - min);
const randomInt = (min, max) => Math.floor(random(min, max + 1));
const easeOutCubic = (t) => 1 - (1 - t) ** 3;

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia?.(query).matches ?? false);

  useEffect(() => {
    const media = window.matchMedia?.(query);
    if (!media) return undefined;
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function Terminal({ active, reduced }) {
  const [pos, setPos] = useState({ line: 0, chars: 0, output: false });

  useEffect(() => {
    if (!active || reduced) return undefined;
    const { line, chars, output } = pos;
    let next;
    let delay;

    if (line === SCRIPT.length) {
      next = { line: 0, chars: 0, output: false };
      delay = 3200;
    } else if (chars < SCRIPT[line].cmd.length) {
      next = { line, chars: chars + 1, output: false };
      delay = random(55, 120);
    } else if (!output) {
      next = { line, chars, output: true };
      delay = 350;
    } else {
      next = { line: line + 1, chars: 0, output: false };
      delay = 800;
    }

    const timer = setTimeout(() => setPos(next), delay);
    return () => clearTimeout(timer);
  }, [pos, active, reduced]);

  const cursor = <span className="terminal-cursor" />;

  const renderLines = (full) => (
    <>
      {SCRIPT.map(({ cmd, out }, i) => {
        if (!full && i > pos.line) return null;
        const done = full || i < pos.line;
        const typing = !done && i === pos.line;
        return (
          <div key={cmd}>
            <p>
              <span className="terminal-prompt">$ </span>
              <span className="terminal-cmd">{done ? cmd : cmd.slice(0, pos.chars)}</span>
              {typing && !pos.output && cursor}
            </p>
            {(done || pos.output) && <p className="terminal-out">{out}</p>}
          </div>
        );
      })}
      {(full || pos.line === SCRIPT.length) && (
        <p>
          <span className="terminal-prompt">$ </span>
          {cursor}
        </p>
      )}
    </>
  );

  return (
    <div className="terminal" aria-hidden="true">
      <div className="terminal-bar">
        <span className="terminal-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="terminal-title">laiba@cydemic:~$</span>
      </div>
      {/* The invisible full copy reserves the final height, so typing never shifts the layout. */}
      <div className="terminal-body">
        <div className="terminal-ghost">{renderLines(true)}</div>
        <div className="terminal-live">{renderLines(reduced)}</div>
      </div>
    </div>
  );
}

function AnimatedNumber({ value, decimals = 0, suffix = '', reduced }) {
  const [shown, setShown] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    if (reduced) {
      current.current = value;
      setShown(value);
      return undefined;
    }
    const from = current.current;
    const start = performance.now();
    let frame;
    const step = (now) => {
      const t = Math.min(1, (now - start) / 700);
      current.current = from + (value - from) * easeOutCubic(t);
      setShown(current.current);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, reduced]);

  const text = shown.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${text}${suffix}`;
}

function SocDashboard({ active, reduced }) {
  const [metrics, setMetrics] = useState({ events: 12048, alerts: 7, blocked: 612, health: 98.2 });
  const [threats, setThreats] = useState(THREATS.slice(0, 3));

  useEffect(() => {
    if (!active || reduced) return undefined;
    let timer;
    const tick = () => {
      setMetrics((m) => ({
        events: m.events + randomInt(8, 64),
        alerts: randomInt(3, 15),
        blocked: m.blocked + randomInt(0, 2),
        health: Math.round(random(96, 99) * 10) / 10,
      }));
      if (Math.random() < 0.35) {
        setThreats((rows) => {
          const unused = THREATS.filter((t) => !rows.some((r) => r.type === t.type));
          const next = [...rows];
          next[randomInt(0, rows.length - 1)] = unused[randomInt(0, unused.length - 1)];
          return next;
        });
      }
      timer = setTimeout(tick, random(2000, 4000));
    };
    timer = setTimeout(tick, random(2000, 4000));
    return () => clearTimeout(timer);
  }, [active, reduced]);

  const rows = [
    { label: 'Events processed', value: metrics.events },
    { label: 'Alerts in queue', value: metrics.alerts },
    { label: 'Blocked IPs', value: metrics.blocked },
    { label: 'Sensor health', value: metrics.health, decimals: 1, suffix: '%' },
  ];

  return (
    <div className="soc-card" aria-hidden="true">
      <div className="soc-card-head">
        <p className="soc-card-title">
          <span className="soc-dot" />
          SOC Dashboard
        </p>
        <p className="soc-card-note">Demo feed · simulated data</p>
      </div>

      <dl className="soc-metrics">
        {rows.map(({ label, ...number }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              <AnimatedNumber {...number} reduced={reduced} />
            </dd>
          </div>
        ))}
      </dl>

      <ul className="soc-threats">
        {threats.map(({ type, status }, i) => (
          <li key={i}>
            <span className="soc-pill soc-pill-type">{type}</span>
            <span className="soc-arrow">→</span>
            <span className="soc-pill soc-pill-status">{status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SocConsole() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`soc${active ? ' is-active' : ''}`} ref={ref}>
      <p className="sr-only">
        Decorative demo of a simulated security console. The numbers are not real data.
      </p>
      <Terminal active={active} reduced={reduced} />
      <SocDashboard active={active} reduced={reduced} />
    </div>
  );
}
