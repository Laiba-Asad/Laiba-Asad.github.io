import { skillGroups } from '../data/content.js';
import { Icon } from './icons.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function Skills() {
  return (
    <section id="skills" className="section section-alt" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Skills & tools"
          title={<>A practical <em>toolkit</em>.</>}
          id="skills-title"
        >
          Tools are only as useful as the questions they help answer. These are the ones I use
          to answer them.
        </SectionHeader>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="card skill-card" key={group.title}>
              <div className="card-head">
                <span className="icon-box"><Icon name={group.icon} /></span>
                <h3>{group.title}</h3>
              </div>
              <ul className="tags" aria-label={`${group.title} skills`}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
