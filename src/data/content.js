/*
 * ─────────────────────────────────────────────────────────────
 *  Portfolio content — edit this file to update the site.
 * ─────────────────────────────────────────────────────────────
 *  Any URL left as an empty string ('') renders as a clearly
 *  labelled placeholder instead of a broken link. Replace the
 *  empty strings with verified URLs when you have them.
 */

export const profile = {
  name: 'Laiba Asad',
  initials: 'LA',
  role: 'Cyber Security Engineer',
  location: 'Islamabad, Pakistan',
  principle: 'I trust evidence, not assumptions.',

  email: 'socials.laiba@gmail.com',
  linkedin: 'https://www.linkedin.com/in/laibaasad/',
  github: 'https://github.com/Laiba-Asad',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const about = {
  paragraphs: [
    'Computer science taught me how systems are built. Security taught me to ask how they behave when someone leans on them. That foundation — how operating systems, networks, and applications actually fit together — is what I reach for when an alert does not make sense yet.',
    'My work sits on both sides of the line. On the defensive side: monitoring, triage, log analysis, and tuning detections so the alerts that reach a person are worth reading. On the testing side: probing web applications and networks the way an attacker would, then writing findings up so someone can actually fix them.',
    'I am more interested in what the logs say than in what everyone assumes happened. I keep a home lab, I keep learning, and I keep asking one more question before I close a case.',
  ],
  principles: [
    {
      title: 'Evidence first',
      text: 'Conclusions come from telemetry, artefacts, and reproducible tests — not hunches.',
    },
    {
      title: 'Practical over theatrical',
      text: 'A clear fix that gets applied beats a dramatic finding that does not.',
    },
    {
      title: 'Always learning',
      text: 'Attack techniques move. So do the tools and the people defending against them.',
    },
  ],
};

// `icon` keys map to lucide icons in src/components/Skills.jsx
export const skillGroups = [
  {
    title: 'Blue Team & SOC',
    icon: 'radar',
    items: [
      'SIEM monitoring',
      'Security alert triage',
      'Incident investigation',
      'Log analysis',
      'Detection logic & tuning',
      'Threat intelligence',
      'MITRE ATT&CK',
    ],
  },
  {
    title: 'Security Testing',
    icon: 'crosshair',
    items: [
      'Web application security testing',
      'Network security testing',
      'Burp Suite',
      'Nmap',
      'Wireshark',
      'Metasploit',
      'MobSF',
    ],
  },
  {
    title: 'Security Platforms',
    icon: 'server',
    items: ['Wazuh', 'Elastic Stack / ELK', 'Splunk', 'CrowdStrike', 'Sysmon', 'TheHive'],
  },
  {
    title: 'Automation & Development',
    icon: 'code',
    items: ['Python', 'REST APIs', 'Security workflow automation', 'Git & GitHub'],
  },
];

export const experience = [
  {
    role: 'Cyber Security Engineer',
    company: 'Cydemic',
    location: 'Islamabad, Pakistan',
    period: 'October 2024 — Present',
    current: true,
    summary:
      'Working across the defensive and testing sides of security — from watching telemetry and investigating alerts to testing applications and automating the repetitive parts.',
    highlights: [
      'Monitor security events, triage alerts, and investigate suspicious activity through to a clear, evidence-backed conclusion.',
      'Deploy, configure, and tune SIEM platforms, including writing and refining detection logic so alerts stay meaningful.',
      'Perform web application and network security testing, and document findings with practical remediation guidance.',
      'Produce security documentation and technical reports written for both technical and non-technical readers.',
      'Build Python-based security utilities to automate repetitive investigation and reporting tasks.',
      'Contribute to cybersecurity awareness initiatives and internal security activities.',
      'Handle social media content for Cydemic alongside my security work.',
    ],
    tags: ['SOC operations', 'SIEM', 'Incident response', 'Security testing', 'Python'],
  },
];

/*
 * Projects
 *  - repoUrl / demoUrl: leave '' until you have a verified link.
 *  - status: text for the stamp on the case folder, e.g. 'On file', 'Active',
 *            'In progress'. Only use 'Active' if the project is actively maintained.
 */
export const projects = [
  {
    name: 'CheckIPReputation',
    icon: 'fingerprint',
    description:
      'A utility for checking the reputation of an IP address and pulling threat-intelligence context into one place — useful when triaging an alert that points at an unfamiliar source.',
    tags: ['Threat intelligence', 'IP reputation', 'Alert triage'],
    repoUrl: 'https://github.com/Laiba-Asad/CheckIPReputation',
    demoUrl: '',
    status: 'On file',
  },
  {
    name: 'SonarQube Issues Exporter',
    icon: 'file',
    description:
      'A tool for exporting SonarQube issue data and organising it into a format that is easier to review, share, and report on.',
    tags: ['SonarQube', 'Code quality', 'Reporting'],
    repoUrl: 'https://github.com/Laiba-Asad/ExtractIssuesFromSonarQube',
    demoUrl: '',
    status: 'On file',
  },
  {
    name: 'Wazuh Home Lab',
    icon: 'activity',
    description:
      'A hands-on monitoring lab for exploring endpoint telemetry, alert behaviour, SIEM workflows, and detection capabilities outside of a production environment.',
    tags: ['Wazuh', 'SIEM', 'Endpoint telemetry', 'Detection'],
    repoUrl: 'https://github.com/Laiba-Asad/wazuh-deployment-lab',
    demoUrl: '',
    status: 'On file',
  },
  {
    name: 'CTF Platform',
    icon: 'flag',
    description:
      'A Capture the Flag platform built for an upcoming cybersecurity event.',
    tags: ['CTF', 'Event platform', 'Challenge design'],
    repoUrl: '', // No public repository: the card shows no link row.
    demoUrl: '',
    status: 'Completed',
  },
];

export const education = {
  degree: 'BS Computer Science',
  institution: 'PMAS-Arid Agriculture University, Rawalpindi',
  period: '2020 — 2024',
  cgpa: '3.77',
  scale: '4.00',
};

/*
 * Certifications & achievements
 *  - verifyUrl: credential / badge verification link ('' = none shown)
 *  - image:     path or URL to a badge image, e.g. '/badges/ceh.png'
 *               (put files in /public/badges/). '' = icon is shown instead.
 */
export const certifications = [
  {
    name: 'Certified Ethical Hacker',
    short: 'CEH',
    issuer: 'EC-Council',
    type: 'Certification',
    icon: 'shield',
    verifyUrl: '',
    image: '',
  },
  {
    name: 'Pre Security',
    issuer: 'TryHackMe',
    type: 'Learning path',
    icon: 'route',
    verifyUrl: '',
    image: '',
  },
  {
    name: 'Cyber Security 101',
    issuer: 'TryHackMe',
    type: 'Learning path',
    icon: 'route',
    verifyUrl: '',
    image: '',
  },
  {
    name: 'Jr Penetration Testing',
    issuer: 'TryHackMe',
    type: 'Badge',
    icon: 'trophy',
    verifyUrl: '',
    image: '',
  },
];

/*
 * Initiatives
 *  - state: 'completed' | 'ongoing' | 'planned'
 *    Only mark something 'completed' once it has actually happened.
 */
export const initiatives = [
  {
    title: 'Cybersecurity awareness',
    icon: 'megaphone',
    state: 'ongoing',
    text: 'Supporting internal awareness activities that make safer habits part of everyday work rather than a once-a-year slideshow.',
  },
  {
    title: 'CTF planning',
    icon: 'flag',
    state: 'planned',
    text: 'Planning a Capture the Flag event. The platform behind it is built; the event has not taken place yet.',
  },
  {
    title: 'Technical documentation',
    icon: 'file',
    state: 'ongoing',
    text: 'Writing reports, runbooks, and remediation guidance that a reader can act on without a follow-up meeting.',
  },
  {
    title: 'Security automation',
    icon: 'workflow',
    state: 'ongoing',
    text: 'Turning repetitive lookups and reporting steps into small Python utilities, so investigation time goes to investigating.',
  },
];
