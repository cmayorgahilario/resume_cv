// scripts/verify-s01-tokens.mjs
// Verifies all 37 design tokens from the .pen are present in the built CSS output.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const TOKENS = [
  '--bg-primary', '--bg-alt', '--bg-card', '--bg-card-alt', '--bg-card-muted',
  '--bg-footer', '--bg-green', '--bg-amber', '--bg-hero-photo', '--bg-indigo-soft',
  '--bg-indigo-pill', '--bg-amber-pill', '--bg-input', '--bg-stats',
  '--text-heading', '--text-primary', '--text-secondary', '--text-tertiary',
  '--text-muted', '--text-on-primary', '--text-green', '--text-amber-accent',
  '--text-amber-dark', '--text-accent-muted',
  '--color-accent', '--color-accent-lighter', '--color-accent-soft',
  '--color-accent-overlay', '--color-accent-overlay-light',
  '--color-primary', '--color-green', '--color-amber', '--color-indigo-light',
  '--border-default', '--border-accent', '--border-muted',
  '--divider',
];

async function findCssFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter(e => e.isFile() && e.name.endsWith('.css'))
    .map(e => join(e.parentPath || e.path, e.name));
}

async function main() {
  const distDir = join(process.cwd(), 'dist');
  const cssFiles = await findCssFiles(distDir);
  if (cssFiles.length === 0) {
    console.error('❌ No CSS files found in dist/. Did you run npm run build?');
    process.exit(1);
  }

  const allCss = (await Promise.all(cssFiles.map(f => readFile(f, 'utf-8')))).join('\n');
  const missing = TOKENS.filter(t => !allCss.includes(t));

  if (missing.length > 0) {
    console.error(`❌ Missing ${missing.length} tokens in built CSS:`);
    missing.forEach(t => console.error(`   ${t}`));
    process.exit(1);
  }

  console.log(`✅ All ${TOKENS.length} design tokens verified in built CSS.`);
  console.log(`   CSS files checked: ${cssFiles.length}`);
}

main().catch(err => { console.error(err); process.exit(1); });
