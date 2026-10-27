export default function SectionHeader({ index, eyebrow, title, id, children }) {
  return (
    <header className="section-header">
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-lede">{children}</p>}
    </header>
  );
}
