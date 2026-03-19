#!/usr/bin/env node
/**
 * verify-s02.mjs — Slice S02 verification script
 *
 * Checks:
 *   1. Header.astro exists and has >50 lines
 *   2. Hero.astro exists and has >50 lines
 *   3. Hero.astro contains "profile.webp"
 *   4. index.astro imports Header and Hero
 *   5. npm run build exits 0
 *   6. dist/index.html contains required content strings
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

check('Header.astro exists', () => {
  const path = 'src/components/sections/Header.astro';
  if (!existsSync(path)) return `File not found: ${path}`;
  return true;
});

check('Header.astro has >50 lines', () => {
  const path = 'src/components/sections/Header.astro';
  const lines = readFileSync(path, 'utf8').split('\n').length;
  if (lines <= 50) return `Expected >50 lines, got ${lines}`;
  return true;
});

check('Hero.astro exists', () => {
  const path = 'src/components/sections/Hero.astro';
  if (!existsSync(path)) return `File not found: ${path}`;
  return true;
});

check('Hero.astro has >50 lines', () => {
  const path = 'src/components/sections/Hero.astro';
  const lines = readFileSync(path, 'utf8').split('\n').length;
  if (lines <= 50) return `Expected >50 lines, got ${lines}`;
  return true;
});

check('Hero.astro contains "profile.webp"', () => {
  const path = 'src/components/sections/Hero.astro';
  const content = readFileSync(path, 'utf8');
  if (!content.includes('profile.webp')) return 'String "profile.webp" not found in Hero.astro';
  return true;
});

check('index.astro imports Header', () => {
  const path = 'src/pages/index.astro';
  const content = readFileSync(path, 'utf8');
  if (!content.includes('import Header')) return '"import Header" not found in index.astro';
  return true;
});

check('index.astro imports Hero', () => {
  const path = 'src/pages/index.astro';
  const content = readFileSync(path, 'utf8');
  if (!content.includes('import Hero')) return '"import Hero" not found in index.astro';
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
  'Carlos Alberto',
  'Disponible para nuevos proyectos',
  'Descargar CV',
  'Tech Lead',
  'profile.webp',
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
  console.log('\n✅ All S02 checks passed.');
  process.exit(0);
} else {
  console.error('\n❌ One or more S02 checks failed. See errors above.');
  process.exit(1);
}
