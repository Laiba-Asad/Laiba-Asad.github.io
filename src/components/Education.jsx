import { GraduationCap } from 'lucide-react';
import { education } from '../data/content.js';
import SectionHeader from './SectionHeader.jsx';

export default function Education() {
  return (
    <section id="education" className="section section-alt section-tight" aria-labelledby="education-title">
      <div className="container education-grid">
        <SectionHeader
          index="05"
          eyebrow="Education"
          title={<>The <em>foundation</em>.</>}
          id="education-title"
        />

        <article className="card education-card">
          <span className="icon-box"><GraduationCap size={18} strokeWidth={1.5} aria-hidden="true" /></span>
          <div className="education-main">
            <h3>{education.degree}</h3>
            <p>{education.institution}</p>
          </div>
          <dl className="education-meta">
            <div>
              <dt>Period</dt>
              <dd>{education.period}</dd>
            </div>
            <div>
              <dt>CGPA</dt>
              <dd>
                {education.cgpa}
                <span className="muted"> / {education.scale}</span>
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
