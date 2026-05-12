import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve('vector-planner');
const htmlPath = path.join(root, 'output', 'vector-planner.html');
const pdfPath = path.join(root, 'output', 'vector-planner.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${htmlPath}`);
await page.pdf({
  path: pdfPath,
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' }
});
await browser.close();
console.log(`Generated ${pdfPath}`);
