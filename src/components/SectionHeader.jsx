export default function SectionHeader({ index, eyebrow, title, id, subtitle, children }) {
  return (
    <header className="section-header">
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children && <p className="section-lede">{children}</p>}
    </header>
  );
}
