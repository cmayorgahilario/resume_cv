#!/usr/bin/env node
/**
 * verify-s05.mjs — Slice S05 verification script
 *
 * Checks:
 *   Proyectos.astro (T01):
 *   1.  File exists
 *   2.  Has >100 lines
 *   3.  Contains id="proyectos"
 *   4.  Contains max-w-[1440px]
 *   5-10. All 6 card titles present
 *   11. Uses --bg-indigo-pill token
 *   12. Uses --bg-amber-pill token
 *   13. Uses --text-amber-accent token
 *
 *   Experiencia.astro (T02):
 *   14. File exists
 *   15. Has >50 lines
 *   16. Contains id="experiencia"
 *   17. Contains max-w-[1440px]
 *   18-21. All 4 experience titles present
 *   22. Uses --color-primary (dots, dates)
 *   23. Uses --border-default (timeline lines)
 *
 *   Global:
 *   24. global.css --text-amber-accent contains b45309 (not d97706)
 *   25. npm run build exits 0
 *
 * Exits 0 on all pass, exits 1 with per-check messages on any failure.
 *
 * Failure inspection:
 *   - A specific FAIL line shows exactly which string/file is missing.
 *   - Build failures emit the first 800 chars of Astro's stderr.
 *   - After the script, inspect dist/index.html for id="proyectos" and
 *     id="experiencia" to confirm both sections were wired into the page.
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

// ── Proyectos.astro ───────────────────────────────────────────────────────────

const PROYECTOS_PATH = 'src/components/sections/Proyectos.astro';
const CSS_PATH = 'src/styles/global.css';
const EXPERIENCIA_PATH = 'src/components/sections/Experiencia.astro';

check('Proyectos.astro exists', () => {
  if (!existsSync(PROYECTOS_PATH)) return `File not found: ${PROYECTOS_PATH}`;
  return true;
});

check('Proyectos.astro has >100 lines', () => {
  if (!existsSync(PROYECTOS_PATH)) return 'File not found — skipping line count';
  const lines = readFileSync(PROYECTOS_PATH, 'utf8').split('\n').length;
  if (lines <= 100) return `Expected >100 lines, got ${lines}`;
  return true;
});

const proyectosContent = existsSync(PROYECTOS_PATH) ? readFileSync(PROYECTOS_PATH, 'utf8') : '';

check('Proyectos: section id="proyectos" present', () => {
  if (!proyectosContent.includes('id="proyectos"')) return 'String id="proyectos" not found in Proyectos.astro';
  return true;
});

check('Proyectos: max-w-[1440px] wrapper present', () => {
  if (!proyectosContent.includes('max-w-[1440px]')) return 'String max-w-[1440px] not found in Proyectos.astro';
  return true;
});

const projectCardTitles = [
  'Plataforma E-commerce Omnicanal',
  'Gestión de Espacios Publicitarios',
  'Core de Facturación de Servicios',
  'Nómina y Cálculo Presupuestal',
  'Inspección Vehicular Automatizada',
  'Sistema de Balanced Scorecard',
];

for (const title of projectCardTitles) {
  check(`Proyectos: card title present: "${title}"`, () => {
    if (!proyectosContent.includes(title)) return `String "${title}" not found in Proyectos.astro`;
    return true;
  });
}

check('Proyectos: uses --bg-indigo-pill token', () => {
  if (!proyectosContent.includes('--bg-indigo-pill')) return 'Token --bg-indigo-pill not found in Proyectos.astro';
  return true;
});

check('Proyectos: uses --bg-amber-pill token', () => {
  if (!proyectosContent.includes('--bg-amber-pill')) return 'Token --bg-amber-pill not found in Proyectos.astro';
  return true;
});

check('Proyectos: uses --text-amber-accent token', () => {
  if (!proyectosContent.includes('--text-amber-accent')) return 'Token --text-amber-accent not found in Proyectos.astro';
  return true;
});

// ── Experiencia.astro ─────────────────────────────────────────────────────────

check('Experiencia.astro exists', () => {
  if (!existsSync(EXPERIENCIA_PATH)) return `File not found: ${EXPERIENCIA_PATH}`;
  return true;
});

check('Experiencia.astro has >50 lines', () => {
  if (!existsSync(EXPERIENCIA_PATH)) return 'File not found — skipping line count';
  const lines = readFileSync(EXPERIENCIA_PATH, 'utf8').split('\n').length;
  if (lines <= 50) return `Expected >50 lines, got ${lines}`;
  return true;
});

const experienciaContent = existsSync(EXPERIENCIA_PATH) ? readFileSync(EXPERIENCIA_PATH, 'utf8') : '';

check('Experiencia: section id="experiencia" present', () => {
  if (!experienciaContent.includes('id="experiencia"')) return 'String id="experiencia" not found in Experiencia.astro';
  return true;
});

check('Experiencia: max-w-[1440px] wrapper present', () => {
  if (!experienciaContent.includes('max-w-[1440px]')) return 'String max-w-[1440px] not found in Experiencia.astro';
  return true;
});

const experienceTitles = [
  'Tech Lead',
  'Technical Product Owner',
  'Analista Desarrollador',
  'Software Developer',
];

for (const title of experienceTitles) {
  check(`Experiencia: job title present: "${title}"`, () => {
    if (!experienciaContent.includes(title)) return `String "${title}" not found in Experiencia.astro`;
    return true;
  });
}

check('Experiencia: uses --color-primary token', () => {
  if (!experienciaContent.includes('--color-primary')) return 'Token --color-primary not found in Experiencia.astro';
  return true;
});

check('Experiencia: uses --border-default token', () => {
  if (!experienciaContent.includes('--border-default')) return 'Token --border-default not found in Experiencia.astro';
  return true;
});

// ── Global checks ─────────────────────────────────────────────────────────────

const cssContent = existsSync(CSS_PATH) ? readFileSync(CSS_PATH, 'utf8') : '';

check('global.css --text-amber-accent uses #b45309 (not #d97706)', () => {
  if (!existsSync(CSS_PATH)) return `File not found: ${CSS_PATH}`;
  if (!cssContent.includes('b45309')) return 'Value b45309 not found in global.css — amber token may not be corrected';
  if (cssContent.includes('d97706')) return 'Value d97706 (old amber) still present in global.css — token not corrected';
  return true;
});

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
  console.log('\n✅ All S05 checks passed.');
  process.exit(0);
} else {
  console.error('\n❌ One or more S05 checks failed. See errors above.');
  process.exit(1);
}
