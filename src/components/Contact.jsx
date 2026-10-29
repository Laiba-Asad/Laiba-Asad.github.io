import { ArrowUpRight, Mail } from 'lucide-react';
import { profile } from '../data/content.js';
import { GitHubIcon, LinkedInIcon } from './icons.jsx';
import SmartLink from './SmartLink.jsx';

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export default function Contact() {
  const channels = [
    {
      label: 'Email',
      icon: <Mail size={18} strokeWidth={1.5} aria-hidden="true" />,
      href: profile.email ? `mailto:${profile.email}` : '',
      value: profile.email,
      placeholder: 'Email address to be added',
    },
    {
      label: 'LinkedIn',
      icon: <LinkedInIcon size={18} />,
      href: profile.linkedin,
      value: stripProtocol(profile.linkedin),
      placeholder: 'Profile link to be added',
    },
    {
      label: 'GitHub',
      icon: <GitHubIcon size={18} />,
      href: profile.github,
      value: stripProtocol(profile.github),
      placeholder: 'Profile link to be added',
    },
  ];

  return (
    <section id="contact" className="section section-dark contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">
            <span className="eyebrow-index">08</span>
            <span className="eyebrow-rule" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title">
            Have a problem worth <em>investigating</em>?
          </h2>
          <p className="section-lede">
           Let's connect and discuss how I can help you with your security needs. Whether it's monitoring, incident response, or testing your systems, I'm here to provide evidence-based solutions.
          </p>
        </div>

        <ul className="contact-list">
          {channels.map((channel) => (
            <li key={channel.label}>
              <SmartLink
                href={channel.href}
                className="contact-row"
                label={`${channel.label}: ${channel.value}`}
                placeholder={
                  <>
                    <span className="contact-icon">{channel.icon}</span>
                    <span className="contact-text">
                      <span className="contact-label">{channel.label}</span>
                      <span className="contact-value">{channel.placeholder}</span>
                    </span>
                  </>
                }
              >
                <span className="contact-icon">{channel.icon}</span>
                <span className="contact-text">
                  <span className="contact-label">{channel.label}</span>
                  <span className="contact-value">{channel.value}</span>
                </span>
                <ArrowUpRight className="contact-arrow" size={18} aria-hidden="true" />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
