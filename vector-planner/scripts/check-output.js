import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scripts = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scripts, '..');
const outputPath = path.join(root, 'output', 'vector-planner.html');
const stylesPath = path.join(root, 'src', 'styles.css');
const configPath = path.join(root, 'src', 'config.json');

const requiredLabels = [
  'VECTOR METHOD',
  'QUARTERLY COMPASS',
  'PRIMARY VECTOR',
  'MISSION CRITICAL',
  'PHYSICAL STATE',
  'FRICTION SCAN',
  'TRAINING / MOVEMENT',
  'EVENING CALIBRATION',
  'WEEKLY REVIEW',
];

const requiredStyleTokens = ['@page', 'A5', '148mm', '210mm'];

const failures = [];

const readRequiredFile = (filePath, label) => {
  if (!fs.existsSync(filePath)) {
    failures.push(`${label} missing: ${filePath}`);
    return '';
  }

  return fs.readFileSync(filePath, 'utf8');
};

const html = readRequiredFile(outputPath, 'Generated HTML');
const css = readRequiredFile(stylesPath, 'Stylesheet');
const config = JSON.parse(readRequiredFile(configPath, 'Config') || '{}');

const pageMatches = html.match(/<section class="page(?:\s|")/g) || [];
const expectedPages = 7 + (Number(config.days) || 0) * 2;

if (pageMatches.length !== expectedPages) {
  failures.push(`Expected ${expectedPages} pages, found ${pageMatches.length}`);
}

const normalizedHtml = html.toUpperCase();
for (const label of requiredLabels) {
  if (!normalizedHtml.includes(label)) {
    failures.push(`Required label missing: ${label}`);
  }
}

for (const token of requiredStyleTokens) {
  if (!css.includes(token)) {
    failures.push(`Required style token missing: ${token}`);
  }
}

if (failures.length > 0) {
  console.error('VECTOR output check failed');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('VECTOR output check passed');
console.log(`- HTML: ${outputPath}`);
console.log(`- Pages: ${pageMatches.length}`);
console.log(`- Required labels: ${requiredLabels.length}`);
console.log(`- A5 style tokens: ${requiredStyleTokens.length}`);
