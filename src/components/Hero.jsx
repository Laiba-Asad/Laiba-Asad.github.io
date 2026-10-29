import { ArrowRight, MapPin, Search } from 'lucide-react';
import { profile } from '../data/content.js';
import CaseFile from './CaseFile.jsx';
import { GitHubIcon, LinkedInIcon } from './icons.jsx';
import SmartLink from './SmartLink.jsx';
import SocConsole from './SocConsole.jsx';

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <Search size={14} aria-hidden="true" />
            {profile.name} <span className="sep" aria-hidden="true">/</span> {profile.role}
          </p>

          <h1 id="hero-title">
            Securing systems.
            <span className="hero-title-line">
              Following the <em>evidence</em>.
            </span>
          </h1>

          <p className="hero-intro">
            I work where alerts turn into questions. Most of my time goes into defensive
            security (watching telemetry, triaging alerts, and investigating what actually
            happened), with security testing and Python automation covering the gaps that
            tools alone do not.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View projects <ArrowRight size={16} aria-hidden="true" />
            </a>
            <SmartLink
              href={profile.github}
              className="button button-ghost"
              label="GitHub profile (opens in a new tab)"
            >
              <GitHubIcon size={16} /> GitHub
            </SmartLink>
            <SmartLink
              href={profile.linkedin}
              className="button button-ghost"
              label="LinkedIn profile (opens in a new tab)"
              placeholder={<><LinkedInIcon size={16} /> LinkedIn · link pending</>}
            >
              <LinkedInIcon size={16} /> LinkedIn
            </SmartLink>
          </div>

          <p className="hero-location">
            <MapPin size={14} aria-hidden="true" /> {profile.location}
          </p>
        </div>

        <div className="hero-visual">
          <div className="hero-stripes" aria-hidden="true" />
          <CaseFile />
        </div>
      </div>

      <div className="container">
        <SocConsole />
      </div>
    </section>
  );
}
