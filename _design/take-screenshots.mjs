import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'screenshots', 'dev');

// --- Section map: 9 entries, order matches site layout ---
const sections = [
  { selector: 'header', file: '001_header.png' },
  { selector: '#inicio', file: '002_hero.png' },
  { selector: '#sobre-mi', file: '003_sobre_mi.png' },
  { selector: '#habilidades', file: '004_skills.png' },
  { selector: '#proyectos', file: '005_proyectos.png' },
  { selector: '#experiencia', file: '006_experience.png' },
  { selector: '#educacion', file: '007_education.png' },
  { selector: '#contacto', file: '008_contact.png' },
  { selector: 'footer', file: '009_footer.png' },
];

// --- Viewport configs ---
const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
  wide: { width: 1600, height: 900 },
};

// --- Mode configs ---
const modes = ['light', 'dark'];

async function main() {
  const browser = await chromium.launch();
  let totalCaptured = 0;
  let totalFailed = 0;

  for (const mode of modes) {
    for (const [viewportName, viewport] of Object.entries(viewports)) {
      // Fresh browser context per viewport (viewport is immutable after creation)
      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();

      await page.goto('http://localhost:4322', {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Toggle dark mode if needed
      if (mode === 'dark') {
        await page.evaluate(() =>
          document.documentElement.classList.add('dark')
        );
        await page.waitForTimeout(300); // Let CSS transitions settle
      }

      // Capture each section
      for (const { selector, file } of sections) {
        const dir = path.join(outDir, mode, viewportName);
        fs.mkdirSync(dir, { recursive: true });
        const outPath = path.join(dir, file);

        try {
          const el = await page.waitForSelector(selector, { timeout: 10000 });
          if (!el) {
            console.error(`✗ ${mode}/${viewportName}/${file} — selector not found: ${selector}`);
            totalFailed++;
            continue;
          }
          await el.screenshot({ path: outPath });
          console.log(`✓ ${mode}/${viewportName}/${file}`);
          totalCaptured++;
        } catch (err) {
          console.error(`✗ ${mode}/${viewportName}/${file} — ${err.message}`);
          totalFailed++;
        }
      }

      await context.close();
    }
  }

  await browser.close();

  console.log(`\nDone: ${totalCaptured} captured, ${totalFailed} failed`);
  console.log('Output:', outDir);

  if (totalFailed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
