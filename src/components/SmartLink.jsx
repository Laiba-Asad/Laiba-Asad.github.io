/**
 * Renders an external link when `href` is set, or a clearly marked,
 * non-interactive placeholder when it is empty. This keeps the site free
 * of broken links while URLs are still being collected.
 */
export default function SmartLink({ href, children, placeholder, className = '', label }) {
  if (!href) {
    return (
      <span className={`placeholder-link ${className}`} title="Link not added yet">
        {placeholder ?? children}
      </span>
    );
  }

  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      className={className}
      href={href}
      aria-label={label}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
