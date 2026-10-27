import { about, education, profile } from '../data/content.js';
import SectionHeader from './SectionHeader.jsx';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="About"
          title={<>Curiosity, with a <em>method</em>.</>}
          id="about-title"
        />

        <div className="about-grid">
          <div className="about-body">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <dl className="about-facts">
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Background</dt>
              <dd>{education.degree}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Blue team · Testing · Automation</dd>
            </div>
          </dl>
        </div>
      </div>

      <figure className="statement-band">
        <blockquote className="container">
          <p>
            I trust <em>evidence</em>, not assumptions.
          </p>
        </blockquote>
      </figure>

      <div className="container">
        <ul className="principles">
          {about.principles.map((item, i) => (
            <li key={item.title}>
              <span className="mono-index">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
