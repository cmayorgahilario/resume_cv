#!/usr/bin/env node
/**
 * verify-s03.mjs — Slice S03 verification script
 *
 * Checks:
 *   1. SobreMi.astro exists and has >30 lines
 *   2. index.astro imports SobreMi
 *   3. npm run build exits 0
 *   4. dist/index.html exists
 *   5. dist/index.html contains required content strings:
 *      sobre-mi, Orientado a resultados, Liderazgo técnico,
 *      Calidad como cultura, Ingeniero de software
 *
 * Exits 0 on all pass, exits 1 with a descriptive message on any failure.
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

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

// ── File checks ──────────────────────────────────────────────────────────────

check('SobreMi.astro exists', () => {
  const path = 'src/components/sections/SobreMi.astro';
  if (!existsSync(path)) return `File not found: ${path}`;
  return true;
});

check('SobreMi.astro has >30 lines', () => {
  const path = 'src/components/sections/SobreMi.astro';
  const lines = readFileSync(path, 'utf8').split('\n').length;
  if (lines <= 30) return `Expected >30 lines, got ${lines}`;
  return true;
});

check('index.astro imports SobreMi', () => {
  const path = 'src/pages/index.astro';
  const content = readFileSync(path, 'utf8');
  if (!content.includes('import SobreMi')) return '"import SobreMi" not found in index.astro';
  return true;
});

// ── Build check ───────────────────────────────────────────────────────────────

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

// ── Built HTML content checks ─────────────────────────────────────────────────

const distPath = 'dist/index.html';
const requiredStrings = [
  'sobre-mi',
  'Orientado a resultados',
  'Liderazgo técnico',
  'Calidad como cultura',
  'Ingeniero de software',
];

check('dist/index.html exists after build', () => {
  if (!existsSync(distPath)) return `File not found: ${distPath} — build may have failed silently`;
  return true;
});

const htmlContent = existsSync(distPath) ? readFileSync(distPath, 'utf8') : '';

for (const str of requiredStrings) {
  check(`dist/index.html contains "${str}"`, () => {
    if (!htmlContent.includes(str)) return `String not found in built HTML: "${str}"`;
    return true;
  });
}

// ── Result ────────────────────────────────────────────────────────────────────

if (allPassed) {
  console.log('\n✅ All S03 checks passed.');
  process.exit(0);
} else {
  console.error('\n❌ One or more S03 checks failed. See errors above.');
  process.exit(1);
}
