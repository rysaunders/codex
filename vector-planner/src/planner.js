import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const src = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(src, '..');
const out = path.join(root, 'output');
const config = JSON.parse(fs.readFileSync(path.join(src, 'config.json'), 'utf8'));
const css = fs.readFileSync(path.join(src, 'styles.css'), 'utf8');

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const formatDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const formatDayName = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
  weekday: 'long',
  timeZone: 'UTC',
});

const addDays = (iso, count) => {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + count);
  return date.toISOString().slice(0, 10);
};

let pageNumber = 1;

const footer = (label) => `<div class="footer">VECTOR / ${escapeHtml(label)} / ${String(pageNumber++).padStart(3, '0')}</div>`;
const phaseText = () => config.phase ? `Phase: ${escapeHtml(config.phase)}` : 'Phase';
const sectionLabel = (label) => `<div class="section-label">${escapeHtml(label)}</div>`;
const promptText = (text) => `<div class="prompt">${escapeHtml(text)}</div>`;

const pageHeader = (title, right = '') => `
  <div class="page-header">
    <div>
      <div class="eyebrow">${escapeHtml(config.title || 'VECTOR')}</div>
      <div class="page-heading">${escapeHtml(title)}</div>
    </div>
    <div class="page-meta">${right}</div>
  </div>
`;

const ruledArea = ({ label, prompt = '', size = 'md', className = '' }) => `
  <section class="ruled-area ${escapeHtml(size)} ${escapeHtml(className)}">
    ${sectionLabel(label)}
    ${prompt ? promptText(prompt) : ''}
    <div class="write-zone"></div>
  </section>
`;

const openArea = ({ label, prompt = '', className = '' }) => `
  <section class="open-area ${escapeHtml(className)}">
    ${sectionLabel(label)}
    ${prompt ? promptText(prompt) : ''}
    <div class="open-area-space"></div>
  </section>
`;

const dotGridArea = ({ label, prompt = '', size = 'md', className = '' }) => `
  <section class="dot-grid-area ${escapeHtml(size)} ${escapeHtml(className)}">
    ${sectionLabel(label)}
    ${prompt ? promptText(prompt) : ''}
    <div class="write-zone"></div>
  </section>
`;

const buildCoverPage = () => `
  <section class="page black">
    <div class="cover-title">${escapeHtml(config.title || 'VECTOR')}</div>
    <div class="cover-sub">${escapeHtml(config.subtitle || 'Operator Journal')}</div>
    <div class="cover-rule"></div>
    <div class="cover-principles">DIRECTION &gt;<br>DISCIPLINE &gt;<br>CAPABILITY &gt;</div>
    <div class="cover-meta">Range: ${escapeHtml(config.range || 'Daily')}</div>
    <div class="cover-meta">${escapeHtml(config.edition || '')}</div>
    ${footer('COVER')}
  </section>
`;

const buildMethodPage = () => {
  const steps = [
    ['01', 'Orient', 'Identify the day\'s direction.'],
    ['02', 'Select', 'Choose only what can move the needle.'],
    ['03', 'Reduce Friction', 'Remove the obvious failure point before it wins.'],
    ['04', 'Execute', 'Train, work, connect, recover.'],
    ['05', 'Calibrate', 'Close the loop.'],
  ];

  return `
    <section class="page method-page">
      ${pageHeader('VECTOR METHOD', '')}
      <div class="method-subtitle">Orient the day. Remove friction. Close the loop.</div>
      <div class="method-ladder">
        ${steps.map(([number, label, text], index) => `
          <div class="method-step">
            <div class="method-number">${number}</div>
            <div>
              <div class="method-label">${escapeHtml(label)}</div>
              <div class="method-copy">${escapeHtml(text)}</div>
            </div>
            ${index < steps.length - 1 ? '<div class="method-connector">↓</div>' : '<div></div>'}
          </div>
        `).join('')}
      </div>
      <div class="operating-standard">
        ${sectionLabel('Operating Standard')}
        <div>Direction before tasks.</div>
        <div>Friction before discipline.</div>
        <div>Calibration before judgment.</div>
      </div>
      ${footer('METHOD')}
    </section>
  `;
};

const buildCompassPage = () => `
  <section class="page compass-page">
    ${pageHeader('QUARTERLY COMPASS', '<div>Quarter / Date Range</div><div>Phase</div>')}
    <div class="compass-subtitle">Big picture. Clear direction.</div>
    <div class="compass-grid">
      ${openArea({ label: 'Theme', prompt: 'What is the operating theme for this quarter?', className: 'compass-theme' })}
      ${openArea({ label: 'Outcomes', prompt: 'What will success look like?', className: 'compass-outcomes' })}
      ${openArea({ label: 'Focus Areas', prompt: 'Where will attention concentrate?', className: 'compass-focus' })}
      ${openArea({ label: 'North Star', prompt: 'The why behind it all.', className: 'compass-north-star' })}
    </div>
    ${footer('COMPASS')}
  </section>
`;

const buildWeeklyPage = () => `
  <section class="page weekly-page">
    ${pageHeader('WEEKLY PLANNING', `<div>Week of</div><div>${phaseText()}</div>`)}
    <div class="weekly-planning-stack">
      <section class="weekly-primary">
        ${sectionLabel('Primary Vector')}
        ${promptText('What must the week move toward?')}
      </section>
      <div class="weekly-main-grid">
        <section class="weekly-mission">
          ${sectionLabel('Mission Critical This Week')}
          ${promptText('1-3 outcomes that move the needle.')}
          <div class="weekly-mission-rows">
            <div><span>01</span></div>
            <div><span>02</span></div>
            <div><span>03</span></div>
          </div>
        </section>
        <section class="weekly-support-panel">
          <div class="weekly-support-item">
            ${sectionLabel('Training Targets')}
          </div>
          <div class="weekly-support-item">
            ${sectionLabel('Recovery / Sleep Target')}
          </div>
          <div class="weekly-support-item">
            ${sectionLabel('Relationship / Family Anchor')}
          </div>
          <div class="weekly-support-item">
            ${sectionLabel('Work / Build Focus')}
          </div>
        </section>
      </div>
      <div class="weekly-close-grid">
        <section class="weekly-close-item">
          ${sectionLabel('Known Friction')}
          ${promptText('What could slow or derail execution?')}
        </section>
        <section class="weekly-close-item">
          ${sectionLabel('Pre-Commitments')}
          ${promptText('What will be decided before the week gets noisy?')}
        </section>
      </div>
    </div>
    ${footer('WEEKLY')}
  </section>
`;

const ratingRow = (label) => `
  <div class="state-row">
    <div>${escapeHtml(label)}</div>
    <div class="state-dots"><span></span><span></span><span></span><span></span><span></span></div>
  </div>
`;

const missionRow = (number) => `
  <div class="mission-row">
    <div>${String(number).padStart(2, '0')}</div>
    <div></div>
  </div>
`;

const buildDailyPlanPage = (date) => `
  <section class="page daily-orientation-page">
    ${pageHeader(`${formatDate(date)} · ${formatDayName(date)}`, phaseText())}
    <div class="daily-orientation-stack">
      <section class="primary-vector-area">
        ${sectionLabel('Primary Vector')}
        ${promptText('What matters most today?')}
        <div class="open-write-zone"></div>
      </section>
      <section class="mission-critical">
        ${sectionLabel('Mission Critical')}
        ${promptText('1-3 things that move the needle.')}
        ${missionRow(1)}
        ${missionRow(2)}
        ${missionRow(3)}
      </section>
      <section class="physical-state-section">
        ${sectionLabel('Physical State')}
        <div class="physical-state-grid">
          <div class="state-rows">
            ${ratingRow('Sleep')}
            ${ratingRow('Energy')}
            ${ratingRow('Recovery')}
            ${ratingRow('Training Readiness')}
          </div>
          <div class="physical-state-notes">
            <div class="physical-state-notes-label">Notes</div>
          </div>
        </div>
      </section>
      <section class="friction-scan">
        ${sectionLabel('Friction Scan')}
        ${promptText('What might derail today?')}
        <div class="friction-write-zone"></div>
        ${promptText('How will I reduce it?')}
        <div class="friction-write-zone"></div>
      </section>
    </div>
    ${footer('DAILY')}
  </section>
`;

const statRow = (label) => `
  <div class="stat-row">
    <div>${escapeHtml(label)}</div>
    <div></div>
  </div>
`;

const calibrationLine = (label) => `
  <div class="calibration-line">
    <div>${escapeHtml(label)}</div>
    <div></div>
  </div>
`;

const buildDailyReviewPage = (date) => `
  <section class="page right daily-execution-page">
    ${pageHeader(`${formatDate(date)} · ${formatDayName(date)}`, 'Execution & Calibration')}
    <section class="training-log-section">
      ${sectionLabel('Training / Movement')}
      ${promptText('Log it.')}
      <div class="training-layout">
        <div class="training-writing dot-grid-surface"></div>
        <div class="stat-panel">
          ${statRow('Time')}
          ${statRow('RPE')}
          ${statRow('HR Avg')}
          ${statRow('Cal')}
          ${statRow('Notes')}
        </div>
      </div>
    </section>
    ${dotGridArea({ label: 'Notes / Observations', prompt: 'Capture thoughts, ideas, conversations.', size: 'lg', className: 'daily-notes-area' })}
    <section class="evening-calibration">
      ${sectionLabel('Evening Calibration')}
      ${promptText('Close the loop.')}
      <div class="calibration-choice-row">
        <div>Did I move forward?</div>
        <div><span></span> Yes</div>
        <div><span></span> Neutral</div>
        <div><span></span> Drifted</div>
      </div>
      ${calibrationLine('What created momentum?')}
      ${calibrationLine('What created friction?')}
      ${calibrationLine('One adjustment for tomorrow')}
    </section>
    ${footer('DAILY')}
  </section>
`;

const reviewPrompt = (label) => `
  <section class="review-prompt">
    <div class="review-prompt-label">${escapeHtml(label)}</div>
    <div class="review-write-line"></div>
  </section>
`;

const scoreRow = (label) => `
  <div class="score-row">
    <div>${escapeHtml(label)}</div>
    <div>/10</div>
  </div>
`;

const buildWeeklyReviewPage = () => `
  <section class="page weekly-review-page">
    <div class="weekly-review-header">
      <div>
        <div class="weekly-review-title">WEEKLY REVIEW</div>
        <div class="weekly-review-subtitle">Look back. Get clear. Adjust.</div>
      </div>
      <div class="weekly-review-week">
        <div>Week of</div>
      </div>
    </div>
    <div class="weekly-review-layout">
      <div class="review-main-column">
        ${reviewPrompt('What actually mattered this week?')}
        ${reviewPrompt('What produced disproportionate value?')}
        ${reviewPrompt('What drained energy without return?')}
        ${reviewPrompt('Where did I avoid discomfort?')}
        ${reviewPrompt('What strengthened me?')}
        ${reviewPrompt('What weakened me?')}
      </div>
      <aside class="review-side-column">
        <div class="scorecard">
          ${sectionLabel('Weekly Scorecard')}
          <div class="scorecard-note">Not about perfection.</div>
          ${scoreRow('Training')}
          ${scoreRow('Focus')}
          ${scoreRow('Recovery')}
          ${scoreRow('Nutrition')}
          ${scoreRow('Relationships')}
          ${scoreRow('Finances')}
          ${scoreRow('Growth')}
          ${scoreRow('Overall')}
        </div>
        ${ruledArea({ label: 'Next Week: Primary Vector', prompt: 'What will be most important?', size: 'lg', className: 'next-vector-area' })}
      </aside>
    </div>
    ${footer('REVIEW')}
  </section>
`;

const buildNotesPage = () => `
  <section class="page notes-page">
    <div class="notes-header">
      <div class="notes-title">NOTE PAGES</div>
      <div class="notes-instruction">Use for anything that matters.</div>
    </div>
    <div class="full-note-grid dot-grid-surface"></div>
    ${footer('NOTES')}
  </section>
`;

const pages = [
  buildCoverPage(),
  buildMethodPage(),
  buildCompassPage(),
  buildWeeklyPage(),
];

for (let index = 0; index < config.days; index += 1) {
  const date = addDays(config.startDate, index);
  pages.push(buildDailyPlanPage(date));
  pages.push(buildDailyReviewPage(date));
}

pages.push(buildWeeklyReviewPage());
pages.push(buildNotesPage());
pages.push(buildNotesPage());

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(config.title || 'VECTOR')} Planner</title>
    <style>${css}</style>
  </head>
  <body>
    <main id="planner">${pages.join('')}</main>
  </body>
</html>`;

fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'vector-planner.html'), html);
console.log(`Generated ${pages.length} pages at ${path.join(out, 'vector-planner.html')}`);
