import { ArrowUp } from 'lucide-react';
import { profile } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <span className="brand-mark" aria-hidden="true">{profile.initials}</span>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="footer-line">Case closed only when the evidence says so.</p>
        <a className="back-to-top" href="#top">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
