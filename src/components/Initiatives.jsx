import { initiatives } from '../data/content.js';
import { Icon } from './icons.jsx';
import SectionHeader from './SectionHeader.jsx';

const stateLabels = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  planned: 'Planned',
};

export default function Initiatives() {
  return (
    <section id="initiatives" className="section section-alt" aria-labelledby="initiatives-title">
      <div className="container">
        <SectionHeader
          index="07"
          eyebrow="Beyond the role"
          title={<>Analyst <em>notes</em>.</>}
          id="initiatives-title"
        >
          Side efforts that support the day job, each labelled with where it actually stands.
        </SectionHeader>

        <ul className="notes-grid">
          {initiatives.map((item) => (
            <li className={`note note-${item.state}`} key={item.title}>
              <span className="note-pin" aria-hidden="true" />
              <div className="note-head">
                <Icon name={item.icon} size={16} />
                <span className={`state state-${item.state}`}>{stateLabels[item.state]}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
