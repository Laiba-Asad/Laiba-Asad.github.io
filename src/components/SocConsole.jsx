import { useEffect, useRef, useState } from 'react';
import { profile, projects, skillGroups } from '../data/content.js';
import { usePrefersReducedMotion } from '../hooks.js';

// "SOC console" below the hero. The dashboard is simulated (random numbers);
// the terminal types a short intro once, then accepts a few real commands.
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

const HELP = [
  ['help', 'list commands'],
  ['whoami', 'name, role, location'],
  ['ls projects', 'things I built'],
  ['cat skills', 'what I work with'],
  ['contact', 'how to reach me'],
  ['sudo hire-laiba', 'you know what to do'],
  ['clear', 'clear the screen'],
];

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const linkLine = (label, href, text) => (
  <>
    {label.padEnd(10)}
    <a
      href={href}
      {...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {text}
    </a>
  </>
);

const normalize = (raw) => raw.trim().replace(/\s+/g, ' ').toLowerCase();

// Output lines for a command; null means "clear the screen".
function runCommand(cmd) {
  switch (cmd) {
    case '':
      return [];
    case 'help':
      return HELP.map(([name, text]) => `${name.padEnd(17)}${text}`);
    case 'whoami':
      return [`${profile.name} · ${profile.role} · ${profile.location}`];
    case 'ls projects':
      return projects.map((p) => p.name);
    case 'cat skills':
      return skillGroups.map((g) => g.title);
    case 'contact':
      return [
        profile.email && linkLine('email', `mailto:${profile.email}`, profile.email),
        profile.linkedin && linkLine('linkedin', profile.linkedin, stripProtocol(profile.linkedin)),
        profile.github && linkLine('github', profile.github, stripProtocol(profile.github)),
      ].filter(Boolean);
    case 'sudo hire-laiba':
      return ['permission granted. opening your email client…'];
    case 'rm -rf /':
    case 'sudo rm -rf /':
      return ['absolutely not.'];
    case 'clear':
      return null;
    default:
      return ['command not found. nice try though.'];
  }
}

function Terminal({ active, reduced }) {
  const [pos, setPos] = useState({ line: 0, chars: 0, output: false });
  const [introDone, setIntroDone] = useState(false);
  const interactive = reduced || introDone;

  const [showIntro, setShowIntro] = useState(true);
  const [log, setLog] = useState([{ id: 0, out: ["type 'help' to see what this thing does."] }]);
  const [value, setValue] = useState('');
  const [caret, setCaret] = useState(0);
  const [history, setHistory] = useState([]);
  const [recall, setRecall] = useState(-1);
  const nextId = useRef(1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const mailTimer = useRef(null);

  // Intro: type the script once, then hand over to the prompt.
  useEffect(() => {
    if (!active || interactive) return undefined;
    const { line, chars, output } = pos;
    if (line === SCRIPT.length) {
      setIntroDone(true);
      return undefined;
    }
    let next;
    let delay;
    if (chars < SCRIPT[line].cmd.length) {
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
  }, [pos, active, interactive]);

  useEffect(() => () => clearTimeout(mailTimer.current), []);

  // Keep the newest output in view (scrolls the terminal only, never the page).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, showIntro, interactive]);

  const cursor = <span className="terminal-cursor" />;

  const renderLines = (full) =>
    SCRIPT.map(({ cmd, out }, i) => {
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
    });

  const submit = (event) => {
    event.preventDefault();
    const cmd = normalize(value);
    const out = runCommand(cmd);
    if (cmd) setHistory((h) => [...h, value.trim()]);
    setRecall(-1);
    setValue('');
    setCaret(0);

    if (out === null) {
      setShowIntro(false);
      setLog([]);
      return;
    }
    setLog((entries) => [...entries, { id: nextId.current++, cmd: value, out }]);

    if (cmd === 'sudo hire-laiba' && profile.email) {
      clearTimeout(mailTimer.current);
      mailTimer.current = setTimeout(() => {
        window.location.href = `mailto:${profile.email}`;
      }, 900);
    }
  };

  const syncCaret = (el) => setCaret(el.selectionStart ?? el.value.length);

  // ArrowUp recalls earlier commands, ArrowDown walks back toward an empty prompt.
  const onKeyDown = (event) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    if (!history.length) return;
    event.preventDefault();
    let index;
    if (event.key === 'ArrowUp') {
      index = recall === -1 ? history.length - 1 : Math.max(0, recall - 1);
    } else {
      index = recall === -1 || recall === history.length - 1 ? -1 : recall + 1;
    }
    const text = index === -1 ? '' : history[index];
    setRecall(index);
    setValue(text);
    setCaret(text.length);
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(text.length, text.length));
  };

  // Clicking the terminal focuses the prompt (unless selecting text or using a link).
  const focusPrompt = (event) => {
    if (event.target.closest('a, input')) return;
    if (window.getSelection?.().toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="terminal">
      <div className="terminal-bar" aria-hidden="true">
        <span className="terminal-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="terminal-title">laiba@cydemic:~$</span>
      </div>

      {!interactive ? (
        // The invisible full copy reserves the final height, so typing never shifts the layout.
        <div className="terminal-body" aria-hidden="true">
          <div className="terminal-ghost">
            {renderLines(true)}
            <p>
              <span className="terminal-prompt">$ </span>
              {cursor}
            </p>
          </div>
          <div className="terminal-live">{renderLines(false)}</div>
        </div>
      ) : (
        <div className="terminal-body terminal-body-interactive" onMouseUp={focusPrompt}>
          <div
            className="terminal-scroll"
            ref={scrollRef}
            role="log"
            aria-label="Terminal output"
            tabIndex={0}
          >
            {showIntro && (
              <div className="terminal-intro" aria-hidden="true">
                {renderLines(true)}
              </div>
            )}
            {log.map(({ id, cmd, out }) => (
              <div key={id}>
                {cmd !== undefined && (
                  <p>
                    <span className="terminal-prompt">$ </span>
                    <span className="terminal-cmd">{cmd}</span>
                  </p>
                )}
                {out.map((line, i) => (
                  <p className="terminal-out" key={i}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <form className="terminal-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="terminal-input">
              Type a command
            </label>
            <span className="terminal-prompt" aria-hidden="true">$ </span>
            <span className="terminal-field">
              <input
                id="terminal-input"
                ref={inputRef}
                className="terminal-input"
                type="text"
                value={value}
                maxLength={64}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
                aria-describedby="terminal-hint"
                onChange={(e) => {
                  setValue(e.target.value);
                  syncCaret(e.target);
                }}
                onSelect={(e) => syncCaret(e.target)}
                onKeyDown={onKeyDown}
              />
              <span className="terminal-mirror" aria-hidden="true">
                <span className="terminal-mirror-text">{value.slice(0, caret)}</span>
                {cursor}
              </span>
            </span>
            <span id="terminal-hint" className="sr-only">
              Press Enter to run. Type help to list commands. Arrow Up recalls the last command.
            </span>
          </form>
        </div>
      )}
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
