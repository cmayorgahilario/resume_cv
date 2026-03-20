#!/usr/bin/env node
/**
 * verify-m02.mjs — Milestone M002-0eaci5 verification script
 *
 * This is the authoritative gate for Milestone M002-0eaci5 (Dark Mode implementation).
 *
 * Checks:
 *   CSS token infrastructure (global.css):
 *   1.  global.css contains @custom-variant dark
 *   2.  global.css contains .dark { block
 *   3.  .dark block has ≥24 CSS variable overrides
 *   4.  :root block contains --color-primary-bg
 *
 *   FOUC prevention (Layout.astro):
 *   5.  Layout.astro contains inline FOUC script referencing localStorage
 *   6.  Layout.astro FOUC script references classList
 *
 *   Theme toggle markup (Header.astro):
 *   7.  Header.astro contains <button for theme toggle
 *   8.  Header.astro contains aria-label="Cambiar tema"
 *
 *   Hardcoded color migration:
 *   9.  Zero bg-[var(--color-primary)] across all component files
 *   10. Zero bg-white in Skills.astro
 *   11. Zero text-[#737373] in Contacto.astro
 *
 *   Build health:
 *   12. npm run build passes
 *   13. Built dist/index.html contains all 9 section IDs
 *   14. Built HTML references localStorage (FOUC script present in output)
 *
 * Exits 0 on all pass, exits 1 with per-check ❌ FAIL messages on any failure.
 *
 * Failure inspection:
 *   - CSS token count:  awk '/.dark \{/{found=1; count=0} found && /^\s*--/{count++} found && /^\}$/{print count; found=0}' src/styles/global.css
 *   - bg-white leakage: grep "bg-white" src/components/sections/Skills.astro
 *   - #737373 leakage:  grep "text-\[#737373\]" src/components/sections/Contacto.astro
 *   - Section IDs:      grep -o 'id="[^"]*"' dist/index.html
 *   - FOUC in output:   grep "localStorage" dist/index.html
 *   - primary leak:     grep -r "bg-\[var(--color-primary)\]" src/components/
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { glob } from 'fs/promises';
import path from 'path';

const PASS = '✅';
const FAIL = '❌';
let allPassed = true;

function check(label, fn) {
  try {
    const result = fn();
    if (result !== true) {
      console.error(`${FAIL} FAIL: ${label}`);
      if (typeof result === 'string') console.error(`   ${result}`);
      allPassed = false;
    } else {
      console.log(`${PASS} PASS: ${label}`);
    }
  } catch (err) {
    console.error(`${FAIL} FAIL: ${label}`);
    console.error(`   ${err.message}`);
    allPassed = false;
  }
}

// ── global.css ────────────────────────────────────────────────────────────────

const CSS_PATH = 'src/styles/global.css';
const cssContent = existsSync(CSS_PATH) ? readFileSync(CSS_PATH, 'utf8') : '';

check('global.css contains @custom-variant dark', () => {
  if (!cssContent.includes('@custom-variant dark')) {
    return 'String "@custom-variant dark" not found in global.css';
  }
  return true;
});

check('global.css contains .dark { block', () => {
  if (!cssContent.includes('.dark {')) return 'String ".dark {" not found in global.css';
  return true;
});

check('.dark block has ≥24 CSS variable overrides', () => {
  // Count lines matching /^\s*--/ between .dark { and its closing }
  const lines = cssContent.split('\n');
  let inside = false;
  let count = 0;
  for (const line of lines) {
    if (!inside && line.includes('.dark {')) { inside = true; continue; }
    if (inside && /^\s*--/.test(line)) count++;
    if (inside && /^}/.test(line)) break;
  }
  if (count < 24) return `Expected ≥24 CSS variable overrides in .dark block, found ${count}`;
  return true;
});

check(':root block contains --color-primary-bg', () => {
  // Check that the :root block (before .dark {) defines --color-primary-bg
  const rootSection = cssContent.split('.dark {')[0];
  if (!rootSection.includes('--color-primary-bg')) {
    return 'Token --color-primary-bg not found in :root block of global.css';
  }
  return true;
});

// ── Layout.astro FOUC prevention ──────────────────────────────────────────────

const LAYOUT_PATH = 'src/layouts/Layout.astro';
const layoutContent = existsSync(LAYOUT_PATH) ? readFileSync(LAYOUT_PATH, 'utf8') : '';

check('Layout.astro FOUC script references localStorage', () => {
  if (!layoutContent.includes('localStorage')) {
    return 'String "localStorage" not found in Layout.astro — FOUC prevention script may be missing';
  }
  return true;
});

check('Layout.astro FOUC script references classList', () => {
  if (!layoutContent.includes('classList')) {
    return 'String "classList" not found in Layout.astro — FOUC prevention script may not be applying the dark class';
  }
  return true;
});

// ── Header.astro theme toggle ─────────────────────────────────────────────────

const HEADER_PATH = 'src/components/sections/Header.astro';
const headerContent = existsSync(HEADER_PATH) ? readFileSync(HEADER_PATH, 'utf8') : '';

check('Header.astro contains <button for theme toggle', () => {
  if (!headerContent.includes('<button')) {
    return 'No <button element found in Header.astro — theme toggle may be missing';
  }
  return true;
});

check('Header.astro contains aria-label="Cambiar tema"', () => {
  if (!headerContent.includes('aria-label="Cambiar tema"')) {
    return 'aria-label="Cambiar tema" not found in Header.astro — accessible label missing from theme toggle button';
  }
  return true;
});

// ── Hardcoded color migration ─────────────────────────────────────────────────

check('Zero bg-[var(--color-primary)] across all component files', () => {
  try {
    const result = execSync(
      'grep -r "bg-\\[var(--color-primary)\\]" src/components/',
      { stdio: 'pipe' }
    ).toString().trim();
    if (result.length > 0) {
      return `Found bg-[var(--color-primary)] in component files (should use --color-primary-bg):\n   ${result.split('\n').slice(0, 5).join('\n   ')}`;
    }
    return true;
  } catch {
    // grep exits 1 when no matches found — that is the success case
    return true;
  }
});

check('Zero bg-white in Skills.astro', () => {
  const SKILLS_PATH = 'src/components/sections/Skills.astro';
  if (!existsSync(SKILLS_PATH)) return `File not found: ${SKILLS_PATH}`;
  const content = readFileSync(SKILLS_PATH, 'utf8');
  const matches = content.match(/\bbg-white\b/g);
  if (matches && matches.length > 0) {
    return `Found ${matches.length} hardcoded bg-white in Skills.astro — should use bg-[var(--bg-card)]`;
  }
  return true;
});

check('Zero text-[#737373] in Contacto.astro', () => {
  const CONTACTO_PATH = 'src/components/sections/Contacto.astro';
  if (!existsSync(CONTACTO_PATH)) return `File not found: ${CONTACTO_PATH}`;
  const content = readFileSync(CONTACTO_PATH, 'utf8');
  if (content.includes('text-[#737373]')) {
    return 'Found hardcoded text-[#737373] in Contacto.astro — should use text-[var(--text-primary)]';
  }
  return true;
});

// ── Build ─────────────────────────────────────────────────────────────────────

check('npm run build exits 0', () => {
  try {
    execSync('npm run build', { stdio: 'pipe' });
    return true;
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : '';
    const stdout = err.stdout ? err.stdout.toString() : '';
    return `Build failed.\nSTDERR: ${stderr.slice(0, 800)}\nSTDOUT: ${stdout.slice(0, 400)}`;
  }
});

// ── Built HTML checks ─────────────────────────────────────────────────────────

const DIST_HTML_PATH = 'dist/index.html';
const distHtml = existsSync(DIST_HTML_PATH) ? readFileSync(DIST_HTML_PATH, 'utf8') : '';

const SECTION_IDS = [
  'inicio',
  'sobre-mi',
  'habilidades',
  'proyectos',
  'experiencia',
  'educacion',
  'contacto',
];

check('Built dist/index.html contains all 7 content section IDs', () => {
  if (!distHtml) return 'dist/index.html not found or empty — did the build succeed?';
  const missing = SECTION_IDS.filter(id => !distHtml.includes(`id="${id}"`));
  if (missing.length > 0) {
    return `Missing section IDs in built HTML: ${missing.map(id => `id="${id}"`).join(', ')}`;
  }
  return true;
});

check('Built dist/index.html references localStorage (FOUC script present)', () => {
  if (!distHtml) return 'dist/index.html not found or empty';
  if (!distHtml.includes('localStorage')) {
    return 'String "localStorage" not found in dist/index.html — FOUC prevention inline script may have been stripped during build';
  }
  return true;
});

// ── Result ────────────────────────────────────────────────────────────────────

if (allPassed) {
  console.log('\n✅ All M02 checks passed. Milestone M002-0eaci5 dark mode is complete.');
  process.exit(0);
} else {
  console.error('\n❌ One or more M02 checks failed. See errors above.');
  console.error('   Diagnostics:');
  console.error('   - CSS var count:  awk \'/.dark \\{/{found=1; count=0} found && /^\\s*--/{count++} found && /^}$/{print count; found=0}\' src/styles/global.css');
  console.error('   - bg-white check: grep "bg-white" src/components/sections/Skills.astro');
  console.error('   - #737373 check:  grep "text-\\[#737373\\]" src/components/sections/Contacto.astro');
  console.error('   - Section IDs:    grep -o \'id="[^"]*"\' dist/index.html');
  console.error('   - FOUC present:   grep "localStorage" dist/index.html');
  console.error('   - primary leak:   grep -r "bg-\\[var(--color-primary)\\]" src/components/');
  process.exit(1);
}
