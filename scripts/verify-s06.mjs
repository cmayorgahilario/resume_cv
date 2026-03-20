#!/usr/bin/env node
/**
 * verify-s06.mjs — Slice S06 verification script
 *
 * Checks:
 *   Educacion.astro (T01):
 *   1.  File exists
 *   2.  Has >150 lines
 *   3.  Contains id="educacion"
 *   4.  Contains max-w-[1440px]
 *   5.  Contains "Ingeniería de Sistemas"
 *   6.  Contains "Certified ScrumMaster (CSM)"
 *   7.  Contains "Certified Agile Leadership I (CAL I)"
 *   8.  Contains "UX/UI Designer"
 *   9.  Contains "Universidad Nacional del Callao"
 *   10. Uses --color-primary token
 *   11. Uses --color-amber token
 *   12. Uses --bg-indigo-pill token
 *   13. Uses --bg-amber-pill token
 *
 *   Contacto.astro (T02):
 *   14. File exists
 *   15. Has >50 lines
 *   16. Contains id="contacto"
 *   17. Contains max-w-[1440px]
 *   18. Contains <form element
 *   19. Contains <label element
 *   20. Contains <input element
 *   21. Contains <textarea element
 *   22. Contains <button element
 *   23. Contains "cmayorgahilario@gmail.com"
 *   24. Contains "+51 997 509 616"
 *   25. Contains "Disponible para proyectos"
 *   26. Uses --color-primary token
 *   27. Uses --bg-green token
 *
 *   Global:
 *   28. npm run build exits 0
 *
 * Exits 0 on all pass, exits 1 with per-check messages on any failure.
 *
 * Failure inspection:
 *   - A specific FAIL line shows exactly which string/file is missing.
 *   - Build failures emit the first 800 chars of Astro's stderr.
 *   - After the script, inspect dist/index.html for id="educacion" and
 *     id="contacto" to confirm both sections were wired into the page.
 *   - Anchor scroll: visit /#educacion and /#contacto in the browser to
 *     confirm smooth-scroll nav targets resolve correctly.
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

// ── Educacion.astro ───────────────────────────────────────────────────────────

const EDUCACION_PATH = 'src/components/sections/Educacion.astro';

check('Educacion.astro exists', () => {
  if (!existsSync(EDUCACION_PATH)) return `File not found: ${EDUCACION_PATH}`;
  return true;
});

check('Educacion.astro has >150 lines', () => {
  if (!existsSync(EDUCACION_PATH)) return 'File not found — skipping line count';
  const lines = readFileSync(EDUCACION_PATH, 'utf8').split('\n').length;
  if (lines <= 150) return `Expected >150 lines, got ${lines}`;
  return true;
});

const educacionContent = existsSync(EDUCACION_PATH) ? readFileSync(EDUCACION_PATH, 'utf8') : '';

check('Educacion: section id="educacion" present', () => {
  if (!educacionContent.includes('id="educacion"')) return 'String id="educacion" not found in Educacion.astro';
  return true;
});

check('Educacion: max-w-[1440px] wrapper present', () => {
  if (!educacionContent.includes('max-w-[1440px]')) return 'String max-w-[1440px] not found in Educacion.astro';
  return true;
});

check('Educacion: degree title "Ingeniería de Sistemas" present', () => {
  if (!educacionContent.includes('Ingeniería de Sistemas')) return 'String "Ingeniería de Sistemas" not found in Educacion.astro';
  return true;
});

check('Educacion: cert "Certified ScrumMaster (CSM)" present', () => {
  if (!educacionContent.includes('Certified ScrumMaster (CSM)')) return 'String "Certified ScrumMaster (CSM)" not found in Educacion.astro';
  return true;
});

check('Educacion: cert "Certified Agile Leadership I (CAL I)" present', () => {
  if (!educacionContent.includes('Certified Agile Leadership I (CAL I)')) return 'String "Certified Agile Leadership I (CAL I)" not found in Educacion.astro';
  return true;
});

check('Educacion: cert "UX/UI Designer" present', () => {
  if (!educacionContent.includes('UX/UI Designer')) return 'String "UX/UI Designer" not found in Educacion.astro';
  return true;
});

check('Educacion: university "Universidad Nacional del Callao" present', () => {
  if (!educacionContent.includes('Universidad Nacional del Callao')) return 'String "Universidad Nacional del Callao" not found in Educacion.astro';
  return true;
});

check('Educacion: uses --color-primary token', () => {
  if (!educacionContent.includes('--color-primary')) return 'Token --color-primary not found in Educacion.astro';
  return true;
});

check('Educacion: uses --color-amber token', () => {
  if (!educacionContent.includes('--color-amber')) return 'Token --color-amber not found in Educacion.astro';
  return true;
});

check('Educacion: uses --bg-indigo-pill token', () => {
  if (!educacionContent.includes('--bg-indigo-pill')) return 'Token --bg-indigo-pill not found in Educacion.astro';
  return true;
});

check('Educacion: uses --bg-amber-pill token', () => {
  if (!educacionContent.includes('--bg-amber-pill')) return 'Token --bg-amber-pill not found in Educacion.astro';
  return true;
});

// ── Contacto.astro ────────────────────────────────────────────────────────────

const CONTACTO_PATH = 'src/components/sections/Contacto.astro';

check('Contacto.astro exists', () => {
  if (!existsSync(CONTACTO_PATH)) return `File not found: ${CONTACTO_PATH}`;
  return true;
});

check('Contacto.astro has >50 lines', () => {
  if (!existsSync(CONTACTO_PATH)) return 'File not found — skipping line count';
  const lines = readFileSync(CONTACTO_PATH, 'utf8').split('\n').length;
  if (lines <= 50) return `Expected >50 lines, got ${lines}`;
  return true;
});

const contactoContent = existsSync(CONTACTO_PATH) ? readFileSync(CONTACTO_PATH, 'utf8') : '';

check('Contacto: section id="contacto" present', () => {
  if (!contactoContent.includes('id="contacto"')) return 'String id="contacto" not found in Contacto.astro';
  return true;
});

check('Contacto: max-w-[1440px] wrapper present', () => {
  if (!contactoContent.includes('max-w-[1440px]')) return 'String max-w-[1440px] not found in Contacto.astro';
  return true;
});

check('Contacto: semantic <form element present', () => {
  if (!contactoContent.includes('<form')) return 'Element <form not found in Contacto.astro';
  return true;
});

check('Contacto: semantic <label element present', () => {
  if (!contactoContent.includes('<label')) return 'Element <label not found in Contacto.astro';
  return true;
});

check('Contacto: semantic <input element present', () => {
  if (!contactoContent.includes('<input')) return 'Element <input not found in Contacto.astro';
  return true;
});

check('Contacto: semantic <textarea element present', () => {
  if (!contactoContent.includes('<textarea')) return 'Element <textarea not found in Contacto.astro';
  return true;
});

check('Contacto: semantic <button element present', () => {
  if (!contactoContent.includes('<button')) return 'Element <button not found in Contacto.astro';
  return true;
});

check('Contacto: real email "cmayorgahilario@gmail.com" present', () => {
  if (!contactoContent.includes('cmayorgahilario@gmail.com')) return 'String "cmayorgahilario@gmail.com" not found in Contacto.astro';
  return true;
});

check('Contacto: real phone "+51 997 509 616" present', () => {
  if (!contactoContent.includes('+51 997 509 616')) return 'String "+51 997 509 616" not found in Contacto.astro';
  return true;
});

check('Contacto: availability badge "Disponible para proyectos" present', () => {
  if (!contactoContent.includes('Disponible para proyectos')) return 'String "Disponible para proyectos" not found in Contacto.astro';
  return true;
});

check('Contacto: uses --color-primary token', () => {
  if (!contactoContent.includes('--color-primary')) return 'Token --color-primary not found in Contacto.astro';
  return true;
});

check('Contacto: uses --bg-green token', () => {
  if (!contactoContent.includes('--bg-green')) return 'Token --bg-green not found in Contacto.astro';
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
  console.log('\n✅ All S06 checks passed.');
  process.exit(0);
} else {
  console.error('\n❌ One or more S06 checks failed. See errors above.');
  process.exit(1);
}
