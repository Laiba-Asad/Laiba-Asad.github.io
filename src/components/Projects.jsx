import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/content.js';
import { GitHubIcon, Icon } from './icons.jsx';
import SectionHeader from './SectionHeader.jsx';
import SmartLink from './SmartLink.jsx';

function CaseFolder({ project, index }) {
  const caseNumber = `CASE #${String(index + 1).padStart(3, '0')}`;
  const inProgress = project.status === 'In progress';

  return (
    <article className={`folder${inProgress ? ' is-in-progress' : ''}`}>
      <div className="folder-tab">{caseNumber}</div>
      <div className="folder-body">
        <div className="folder-top">
          <span className="icon-box"><Icon name={project.icon} /></span>
          {project.status && (
            <span className={`stamp${inProgress ? ' stamp-blue' : ''}`}>{project.status}</span>
          )}
        </div>

        <h3>{project.name}</h3>
        <p className="folder-description">{project.description}</p>

        <p className="evidence-label">Evidence</p>
        <ul className="tags tags-evidence" aria-label={`${project.name} tags`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {(project.repoUrl || project.demoUrl) && (
          <div className="folder-links">
            {project.repoUrl && (
              <SmartLink
                href={project.repoUrl}
                className="folder-link"
                label={`${project.name} repository (opens in a new tab)`}
              >
                <GitHubIcon size={14} /> Repository <ArrowUpRight size={14} aria-hidden="true" />
              </SmartLink>
            )}
            {project.demoUrl && (
              <SmartLink
                href={project.demoUrl}
                className="folder-link"
                label={`${project.name} live demo (opens in a new tab)`}
              >
                <ExternalLink size={14} aria-hidden="true" /> Live demo
              </SmartLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Projects"
          title={<>Selected <em>cases</em>.</>}
          id="projects-title"
        >
          Security utilities, a hands-on monitoring lab, and an event platform.
        </SectionHeader>

        <div className="folders-grid">
          {projects.map((project, index) => (
            <CaseFolder project={project} index={index} key={project.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
