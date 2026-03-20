#!/usr/bin/env node
/**
 * verify-s04.mjs — Slice S04 verification script
 *
 * Checks:
 *   1.  Skills.astro exists
 *   2.  Skills.astro has >100 lines
 *   3.  Section id="habilidades" is present
 *   4.  max-w-[1440px] wrapper is present
 *   5.  All 11 card titles are present
 *   6.  Featured card uses --bg-java-card token
 *   7.  Standard card style (--bg-card-alt) is present
 *   8.  Muted card style (--bg-card-muted) is present
 *   9.  Warm amber card style (--bg-amber) is present
 *   10. global.css contains all 3 new tokens
 *   11. npm run build exits 0
 *
 * Exits 0 on all pass, exits 1 with per-check messages on any failure.
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

// ── File existence and size ───────────────────────────────────────────────────

const SKILLS_PATH = 'src/components/sections/Skills.astro';
const CSS_PATH = 'src/styles/global.css';

check('Skills.astro exists', () => {
  if (!existsSync(SKILLS_PATH)) return `File not found: ${SKILLS_PATH}`;
  return true;
});

check('Skills.astro has >100 lines', () => {
  if (!existsSync(SKILLS_PATH)) return 'File not found — skipping line count';
  const lines = readFileSync(SKILLS_PATH, 'utf8').split('\n').length;
  if (lines <= 100) return `Expected >100 lines, got ${lines}`;
  return true;
});

// ── Structural checks ─────────────────────────────────────────────────────────

const skillsContent = existsSync(SKILLS_PATH) ? readFileSync(SKILLS_PATH, 'utf8') : '';

check('Section id is "habilidades"', () => {
  if (!skillsContent.includes('id="habilidades"')) return 'String id="habilidades" not found in Skills.astro';
  return true;
});

check('Max-width wrapper present', () => {
  if (!skillsContent.includes('max-w-[1440px]')) return 'String max-w-[1440px] not found in Skills.astro';
  return true;
});

// ── All 11 card titles ────────────────────────────────────────────────────────

const cardTitles = [
  'Java Ecosystem',
  'C# / .NET',
  'TypeScript / JavaScript',
  'PHP',
  'Distributed Systems & Architecture',
  'APIs & Integration',
  'Reactive Systems',
  'Cloud & DevOps',
  'Data',
  'Quality & Testing',
  'Agile Delivery',
];

for (const title of cardTitles) {
  check(`Card title present: "${title}"`, () => {
    if (!skillsContent.includes(title)) return `String "${title}" not found in Skills.astro`;
    return true;
  });
}

// ── Visual style token checks ─────────────────────────────────────────────────

check('Featured card uses --bg-java-card token', () => {
  if (!skillsContent.includes('--bg-java-card')) return 'Token --bg-java-card not found in Skills.astro';
  return true;
});

check('Standard card style present (--bg-card-alt)', () => {
  if (!skillsContent.includes('--bg-card-alt')) return 'Token --bg-card-alt not found in Skills.astro';
  return true;
});

check('Muted card style present (--bg-card-muted)', () => {
  if (!skillsContent.includes('--bg-card-muted')) return 'Token --bg-card-muted not found in Skills.astro';
  return true;
});

check('Warm amber card style present (--bg-amber)', () => {
  if (!skillsContent.includes('--bg-amber')) return 'Token --bg-amber not found in Skills.astro';
  return true;
});

// ── Design tokens in global.css ───────────────────────────────────────────────

const cssContent = existsSync(CSS_PATH) ? readFileSync(CSS_PATH, 'utf8') : '';

check('global.css contains --bg-java-card', () => {
  if (!existsSync(CSS_PATH)) return `File not found: ${CSS_PATH}`;
  if (!cssContent.includes('--bg-java-card')) return 'Token --bg-java-card not found in global.css';
  return true;
});

check('global.css contains --text-accent-light', () => {
  if (!existsSync(CSS_PATH)) return `File not found: ${CSS_PATH}`;
  if (!cssContent.includes('--text-accent-light')) return 'Token --text-accent-light not found in global.css';
  return true;
});

check('global.css contains --text-accent-desc', () => {
  if (!existsSync(CSS_PATH)) return `File not found: ${CSS_PATH}`;
  if (!cssContent.includes('--text-accent-desc')) return 'Token --text-accent-desc not found in global.css';
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

// ── Result ────────────────────────────────────────────────────────────────────

if (allPassed) {
  console.log('\n✅ All S04 checks passed.');
  process.exit(0);
} else {
  console.error('\n❌ One or more S04 checks failed. See errors above.');
  process.exit(1);
}
