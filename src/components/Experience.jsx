import { MapPin } from 'lucide-react';
import { experience } from '../data/content.js';
import SectionHeader from './SectionHeader.jsx';

export default function Experience() {
  return (
    <section id="experience" className="section section-dark" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Experience"
          title={<>On the <em>defensive</em>.</>}
          id="experience-title"
        />

        {experience.map((job) => (
          <article className="job" key={`${job.company}-${job.period}`}>
            <header className="job-head">
              <div>
                <h3>
                  {job.role} <span className="at">at <em>{job.company}</em></span>
                </h3>
                <p className="job-summary">{job.summary}</p>
              </div>
              <div className="job-meta">
                <p className="job-period">
                  {job.current && <span className="live-dot" aria-hidden="true" />}
                  {job.period}
                </p>
                <p className="job-location">
                  <MapPin size={13} aria-hidden="true" /> {job.location}
                </p>
              </div>
            </header>

            <div className="job-panel">
              <p className="job-panel-label">Responsibilities</p>
              <ol className="highlights">
                {job.highlights.map((item, i) => (
                  <li key={item}>
                    <span className="highlight-index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <ul className="tags tags-dark" aria-label="Focus areas">
              {job.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
