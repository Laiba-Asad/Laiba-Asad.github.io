import { Fingerprint } from 'lucide-react';
import { profile } from '../data/content.js';

// Decorative case-file illustration. The log lines are illustrative, not real data.
const log = [
  ['09:14:02', 'sysmon', 'process_create powershell.exe'],
  ['09:14:03', 'siem', 'rule match: encoded command'],
  ['09:14:05', 'triage', 'enrich: ip reputation'],
  ['09:14:11', 'analyst', 'verdict: evidence-backed'],
];

export default function CaseFile() {
  const [first, ...rest] = profile.name.split(' ');
  const fileName = `${first.charAt(0)}. ${rest.join(' ')}`.toUpperCase();

  return (
    <div className="case-file" aria-hidden="true">
      <div className="case-file-tab">Case file: {fileName}</div>
      <div className="case-file-body">
        <div className="case-file-head">
          <span className="case-file-ref">REF / LA-001</span>
          <Fingerprint size={22} strokeWidth={1.25} />
        </div>

        <dl className="case-file-fields">
          <div>
            <dt>Subject</dt>
            <dd>{profile.name}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{profile.role}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Method</dt>
            <dd>Evidence over assumptions</dd>
          </div>
        </dl>

        <div className="case-file-log">
          <p className="case-file-log-title">Exhibit A · illustrative event log</p>
          <ol>
            {log.map(([time, source, message]) => (
              <li key={time + source}>
                <span className="log-time">{time}</span>
                <span className="log-source">{source}</span>
                <span className="log-message">{message}</span>
              </li>
            ))}
          </ol>
        </div>

        <span className="stamp case-file-stamp">Verified</span>
      </div>
    </div>
  );
}
