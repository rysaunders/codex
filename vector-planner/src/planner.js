import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('vector-planner');
const src = path.join(root, 'src');
const out = path.join(root, 'output');
const config = JSON.parse(fs.readFileSync(path.join(src, 'config.json'), 'utf8'));
const css = fs.readFileSync(path.join(src, 'styles.css'), 'utf8');

const fmt = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0,10); };
const dayName = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });

let page = 1;
const footer = (label) => `<div class="footer">VECTOR / ${label} / ${String(page++).padStart(3,'0')}</div>`;
const h = (x) => `<div class="h">${x}</div>`;

const pages = [];
pages.push(`<section class="page black"><div class="cover-title">VECTOR</div><div class="cover-sub">OPERATOR JOURNAL</div><div style="margin-top:16mm;font-size:8pt;letter-spacing:.14em">DIRECTION > DISCIPLINE > CAPABILITY</div><div style="margin-top:4mm;font-size:8pt">Range: ${config.range} · ${config.edition}</div>${footer('COVER')}</section>`);
pages.push(`<section class="page"><div style="font-size:14pt;letter-spacing:.08em">VECTOR METHOD</div><div class="block lg">${h('Orient')}identify the day’s direction.</div><div class="block lg">${h('Select')}choose only what can move the needle.</div><div class="block lg">${h('Reduce Friction')}remove the obvious failure point before it wins.</div><div class="block lg">${h('Execute')}train, work, connect, recover.</div><div class="block lg">${h('Calibrate')}close the loop without drama.</div>${footer('METHOD')}</section>`);
pages.push(`<section class="page"><div style="font-size:12pt;letter-spacing:.08em">QUARTERLY COMPASS</div><div class="twocol"><div class="block lg">${h('Quarter / Date Range')}</div><div class="block lg">${h('Phase')}</div><div class="block lg">${h('Theme')}</div><div class="block lg">${h('North Star')}</div><div class="block lg">${h('Outcomes')}</div><div class="block lg">${h('Focus Areas')}</div><div class="block lg">${h('Constraints')}</div><div class="block lg">${h('Risks / Friction')}</div></div><div class="block lg">${h('Standards')}</div>${footer('COMPASS')}</section>`);
pages.push(`<section class="page"><div style="font-size:12pt;letter-spacing:.08em">WEEKLY PLANNING</div><div class="header"><div>Week of</div><div>Phase: ${config.phase || ''}</div></div><div class="block">${h('Primary Vector')}<div class="lines"><div></div><div></div></div></div><div class="block">${h('Mission Critical This Week')}<div class="lines"><div></div><div></div><div></div></div></div><div class="twocol"><div class="block">${h('Training Targets')}</div><div class="block">${h('Recovery / Sleep Target')}</div><div class="block">${h('Relationship / Family Anchor')}</div><div class="block">${h('Work / Build Focus')}</div></div><div class="block">${h('Known Friction')}</div><div class="block">${h('Pre-Commitments')}</div>${footer('WEEKLY')}</section>`);

for (let i=0;i<config.days;i++) {
  const dt = addDays(config.startDate, i);
  pages.push(`<section class="page"><div class="header"><div>${fmt(dt)} · ${dayName(dt)}</div><div>Phase: ${config.phase || ''}</div></div><div class="block lg">${h('Primary Vector')}What matters most today?</div><div class="block">${h('Mission Critical')}01<br>02<br>03</div><div class="block">${h('Physical State')}Sleep · Energy · Recovery · Training Readiness</div><div class="block lg" style="border-width:.45mm">${h('Friction Scan')}What might derail today?<br><br>How will I reduce it?</div>${footer('DAILY')}</section>`);
  pages.push(`<section class="page right"><div class="header"><div>${fmt(dt)} · ${dayName(dt)}</div><div>Execution & Calibration</div></div><div class="block lg">${h('Training / Movement')}Time · RPE · HR Avg · Calories · Notes</div><div class="block lg dot" style="flex:1">${h('Notes / Observations')}</div><div class="block">${h('Evening Calibration')}Did I move forward? Yes / Neutral / Drifted<br>What created momentum?<br>What created friction?<br>One adjustment for tomorrow.</div>${footer('DAILY')}</section>`);
}
pages.push(`<section class="page"><div style="font-size:12pt;letter-spacing:.08em">WEEKLY REVIEW</div><div class="block">Week of</div><div class="block lg">What actually mattered this week?</div><div class="block lg">What produced disproportionate value?</div><div class="block lg">What drained energy without return?</div><div class="block">Where did I avoid discomfort?</div><div class="block">What strengthened me? / What weakened me?</div><div class="block">Scorecard: Training · Focus · Recovery · Nutrition · Relationships · Finances · Growth · Overall (1-10)</div><div class="block">Next Week: Primary Vector</div>${footer('REVIEW')}</section>`);
pages.push(`<section class="page dot"><div class="h">NOTES</div>${footer('NOTES')}</section>`);
pages.push(`<section class="page grid"><div class="h">NOTES</div>${footer('NOTES')}</section>`);

const html = `<!doctype html><html><head><meta charset="utf-8"><title>${config.title} Planner</title><style>${css}</style></head><body><main id="planner">${pages.join('')}</main></body></html>`;
fs.writeFileSync(path.join(out, 'vector-planner.html'), html);
console.log(`Generated ${pages.length} pages at output/vector-planner.html`);
