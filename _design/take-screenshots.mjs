import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'screenshots', 'dev');

const sections = [
  { selector: '#inicio', file: '001_hero.png' },
  { selector: '#sobre-mi', file: '002_sobre_mi.png' },
  { selector: '#habilidades', file: '003_skills.png' },
  { selector: '#proyectos', file: '004_proyectos.png' },
  { selector: '#experiencia', file: '005_experiencia.png' },
  { selector: '#contacto', file: '006_contacto.png' },
  { selector: 'footer', file: '007_footer.png' },
];

async function hideHeader(page) {
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
    // Also inject a style tag so it persists through HMR
    if (!document.getElementById('hide-header-style')) {
      const style = document.createElement('style');
      style.id = 'hide-header-style';
      style.textContent = 'header { display: none !important; }';
      document.head.appendChild(style);
    }
  });
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Navigate to the built static output instead of dev server to avoid HMR
  // But we need the dev server for live content — just wait longer for HMR to settle
  // Use the built static output (port 4322) to avoid HMR context destruction
  await page.goto('http://localhost:4322', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);
  
  await hideHeader(page);
  await page.waitForTimeout(500);

  for (const { selector, file } of sections) {
    // Verify page is still valid
    try {
      await page.evaluate(() => document.readyState);
    } catch {
      console.log('Context destroyed, re-navigating...');
      await page.goto('http://localhost:4322', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      await hideHeader(page);
      await page.waitForTimeout(500);
    }

    const el = await page.waitForSelector(selector, { timeout: 10000 });
    if (!el) {
      console.error(`Element not found: ${selector}`);
      continue;
    }
    const outPath = path.join(outDir, file);
    await el.screenshot({ path: outPath });
    console.log(`✓ ${file} (${selector})`);
  }

  await browser.close();
  console.log('\nAll screenshots saved to:', outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
