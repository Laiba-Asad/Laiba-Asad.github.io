import { useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../hooks.js';

// Brief "scanning visitor" overlay on the first visit of a session. The page
// renders underneath it the whole time; this only sits on top for ~1.2s.
// Skipped entirely under prefers-reduced-motion. Click or Escape dismisses it.

const KEY = 'scan-overlay-seen';
const SHOW_MS = 1200;
const FADE_MS = 300;

function shouldShow() {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  return !reduced && readStorage('sessionStorage', KEY) !== '1';
}

export default function ScanOverlay() {
  const [phase, setPhase] = useState(() => (shouldShow() ? 'in' : 'done'));

  useEffect(() => {
    if (phase === 'done') return undefined;
    writeStorage('sessionStorage', KEY, '1');
    if (phase === 'in') {
      const timer = setTimeout(() => setPhase('out'), SHOW_MS);
      const onKey = (event) => {
        if (event.key === 'Escape') setPhase('out');
      };
      window.addEventListener('keydown', onKey);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', onKey);
      };
    }
    const timer = setTimeout(() => setPhase('done'), FADE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={`scan-overlay${phase === 'out' ? ' is-leaving' : ''}`}
      aria-hidden="true"
      onClick={() => setPhase('out')}
    >
      <div className="scan-card">
        <p>scanning visitor…</p>
        <span className="scan-bar" />
        <p className="scan-result">threat level: probably fine.</p>
      </div>
    </div>
  );
}
