import { useEffect, useRef, useState } from 'react';
import { readStorage, useMediaQuery, writeStorage } from '../hooks.js';
import PixelLaiba from './PixelLaiba.jsx';

// Small Pixel Laiba fixed to the bottom-right once the hero is scrolled past.
// She says one line per section (once each), and gets out of the way whenever
// she or her speech bubble would sit on top of a link, button, or form field.

const LINES = {
  about: 'tl;dr: I find things, then I fix things.',
  skills: "ask me about Sysmon. actually, don't. I won't stop.",
  experience: "currently: reading logs so you don't have to.",
  projects: "click one. they're not malware. I checked.",
  certifications: "yes, the CEH is real. yes, I'll keep mentioning it.",
  contact: "go on. I read email headers, but I don't judge. much.",
};

const HIDE_KEY = 'pixel-laiba-hidden';
const LINE_MS = 4000;
const SETTLE_MS = 350;
const INTERACTIVE =
  'a[href], button, input, select, textarea, summary, label, [role="button"], [tabindex]:not([tabindex="-1"])';

// True if any interactive element (outside the companion) is under the rectangle.
function coversInteractive(rect, self) {
  const step = 14;
  for (let x = rect.left + 2; x <= rect.right - 2; x += step) {
    for (let y = rect.top + 2; y <= rect.bottom - 2; y += step) {
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) continue;
      const stack = document.elementsFromPoint(x, y);
      const top = stack.find((el) => !self.contains(el));
      if (top?.closest(INTERACTIVE)) return true;
    }
  }
  return false;
}

export default function Companion() {
  const [dismissed, setDismissed] = useState(() => readStorage('localStorage', HIDE_KEY) === '1');
  const [pastHero, setPastHero] = useState(false);
  const [section, setSection] = useState('');
  const [nearContact, setNearContact] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [bubbleBlocked, setBubbleBlocked] = useState(false);
  const [line, setLine] = useState(null);
  const said = useRef(new Set());
  const rootRef = useRef(null);
  const small = useMediaQuery('(max-width: 479px)');

  const visible = !dismissed && pastHero && !(small && nearContact);
  const shown = visible && !blocked;

  // Hero scrolled past? Which section is in the middle of the screen? Contact/footer near?
  useEffect(() => {
    if (dismissed || typeof IntersectionObserver === 'undefined') return undefined;
    const observers = [];

    const hero = document.getElementById('top');
    if (hero) {
      const io = new IntersectionObserver(([entry]) =>
        setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      );
      io.observe(hero);
      observers.push(io);
    }

    const sectionIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    Object.keys(LINES).forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionIo.observe(el);
    });
    observers.push(sectionIo);

    const near = new Map();
    const nearIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => near.set(entry.target, entry.isIntersecting));
      setNearContact([...near.values()].some(Boolean));
    });
    [document.getElementById('contact'), document.querySelector('.site-footer')]
      .filter(Boolean)
      .forEach((el) => nearIo.observe(el));
    observers.push(nearIo);

    return () => observers.forEach((io) => io.disconnect());
  }, [dismissed]);

  // A line only belongs to the section it was said in.
  useEffect(() => setLine(null), [section]);

  // Say the current section's line (once per section) when she is on screen and
  // the bubble has room. The short settle delay avoids stale or rapid-fire lines
  // while someone scrolls quickly; sections skipped that way stay unsaid.
  useEffect(() => {
    if (!shown || bubbleBlocked || !LINES[section] || said.current.has(section)) return undefined;
    const timer = setTimeout(() => {
      said.current.add(section);
      setLine(LINES[section]);
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [section, shown, bubbleBlocked]);

  useEffect(() => {
    if (!line) return undefined;
    const timer = setTimeout(() => setLine(null), LINE_MS);
    return () => clearTimeout(timer);
  }, [line]);

  // Hide the bubble right away if she tucks away or it would cover something.
  useEffect(() => {
    if (!shown || bubbleBlocked) setLine(null);
  }, [shown, bubbleBlocked]);

  // Hit-test what's underneath her on scroll/resize.
  useEffect(() => {
    if (!visible) {
      setBlocked(false);
      setBubbleBlocked(false);
      return undefined;
    }
    let frame = 0;
    const check = () => {
      frame = 0;
      // Measure the wrapper: it never moves, even while the figure is tucked away.
      const root = rootRef.current;
      if (!root) return;
      const r = root.getBoundingClientRect();
      setBlocked(coversInteractive(r, root));
      const bubbleWidth = Math.min(260, window.innerWidth * 0.8);
      setBubbleBlocked(
        coversInteractive(
          { left: r.right - bubbleWidth, right: r.right, top: r.top - 100, bottom: r.top - 8 },
          root,
        ),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [visible, small]);

  if (dismissed) return null;

  const hide = () => {
    writeStorage('localStorage', HIDE_KEY, '1');
    setDismissed(true);
  };

  // Clicking her shows her own quips; drop the section line so bubbles never stack.
  const onClick = (event) => {
    if (event.target.closest('.pxl-btn')) setLine(null);
  };

  const size = small ? 72 : 96;

  return (
    <aside
      ref={rootRef}
      className={`companion${shown ? ' is-shown' : ''}`}
      style={{ '--pxl-size': `${size}px` }}
      aria-label="Pixel Laiba"
      onClick={onClick}
    >
      <div className="companion-figure">
        <p className="pxl-bubble companion-line" hidden={!line} aria-hidden="true">
          {line}
        </p>
        <PixelLaiba size={size} />
        <button type="button" className="companion-hide" aria-label="Hide Pixel Laiba" onClick={hide}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {line}
      </p>
    </aside>
  );
}
