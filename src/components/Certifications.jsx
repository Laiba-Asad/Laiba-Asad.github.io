import { ArrowUpRight } from 'lucide-react';
import { certifications } from '../data/content.js';
import { Icon } from './icons.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function Certifications() {
  return (
    <section id="certifications" className="section" aria-labelledby="certifications-title">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="Certifications & achievements"
          title={<>Certifications & <em>achievements</em>.</>}
          id="certifications-title"
        />

        <ul className="cert-grid">
          {certifications.map((cert) => (
            <li className="cert" key={cert.name}>
              <div className="cert-inner">
                {/* Badge slot: set `image` in content.js to show a badge here. */}
                <div className={`cert-badge${cert.image ? ' has-image' : ''}`}>
                  {cert.image ? (
                    <img src={cert.image} alt={`${cert.name} badge`} loading="lazy" />
                  ) : (
                    <Icon name={cert.icon} size={26} />
                  )}
                </div>

                <p className="cert-type">{cert.type}</p>
                <h3>
                  {cert.name}
                  {cert.short && <span className="cert-short"> ({cert.short})</span>}
                </h3>
                <p className="cert-issuer">{cert.issuer}</p>

                {/* Verification slot: set `verifyUrl` in content.js to show a link here. */}
                {cert.verifyUrl && (
                  <a
                    className="cert-verify"
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.name} (opens in a new tab)`}
                  >
                    Verify credential <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
