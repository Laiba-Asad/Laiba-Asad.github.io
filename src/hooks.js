import { useEffect, useState } from 'react';

/** Live result of a CSS media query. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia?.(query).matches ?? false);

  useEffect(() => {
    const media = window.matchMedia?.(query);
    if (!media) return undefined;
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Storage helpers: storage can be unavailable (private mode, blocked site data). */
export function readStorage(kind, key) {
  try {
    return window[kind].getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(kind, key, value) {
  try {
    window[kind].setItem(key, value);
  } catch {
    /* ignore: the feature just won't be remembered */
  }
}
