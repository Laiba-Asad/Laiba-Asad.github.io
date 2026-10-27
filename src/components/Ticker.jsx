const defaultWords = [
  'evidence over assumptions',
  'detect',
  'investigate',
  'respond',
  'document',
  'verify',
];

// Decorative scrolling band. Content is duplicated so the loop is seamless;
// under prefers-reduced-motion it stays static (see styles.css).
export default function Ticker({ words = defaultWords }) {
  const sequence = words.map((word) => (
    <span key={word} className="ticker-item">
      {word}
      <span className="ticker-sep">·</span>
    </span>
  ));

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <div className="ticker-group">{sequence}</div>
        <div className="ticker-group">{sequence}</div>
      </div>
    </div>
  );
}
