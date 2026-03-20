#!/usr/bin/env node
// scripts/verify-m03.mjs
// Automated milestone-level verification for M003: Mobile Responsive
// Checks all 9 section files for correct mobile-first Tailwind patterns,
// then runs `npm run build` to confirm the build passes.
// Exit 0 = all checks pass, Exit 1 = one or more checks failed

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(__dirname, '../src/components/sections');

// Read all 9 section files
const files = {};
const fileNames = [
  'Header', 'Hero', 'SobreMi', 'Skills', 'Proyectos',
  'Experiencia', 'Educacion', 'Contacto', 'Footer'
];
for (const name of fileNames) {
  files[name] = readFileSync(resolve(sectionsDir, `${name}.astro`), 'utf8');
}

const results = [];

function check(label, fn) {
  try {
    const result = fn();
    if (result === true) {
      results.push({ label, pass: true });
    } else {
      results.push({ label, pass: false, reason: result });
    }
  } catch (err) {
    results.push({ label, pass: false, reason: err.message });
  }
}

// --- Check 1: All sections use px-6 md:px-20 ---
check('All 9 sections use px-6 md:px-20', () => {
  const missing = fileNames.filter(name => !files[name].includes('px-6 md:px-20'));
  return missing.length === 0
    ? true
    : `Missing px-6 md:px-20 in: ${missing.join(', ')}`;
});

// --- Check 2: No bare px-20 without md: prefix ---
check('No bare px-20 without md: prefix', () => {
  const violations = [];
  for (const name of fileNames) {
    const lines = files[name].split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Find all px-20 occurrences on this line
      // Each px-20 must be preceded by md: (i.e. md:px-20)
      const matches = [...line.matchAll(/(?<![a-z]:)px-20/g)];
      for (const m of matches) {
        // Check if preceded by "md:" — look at the characters before the match
        const before = line.substring(Math.max(0, m.index - 3), m.index);
        if (!before.endsWith('md:')) {
          violations.push(`${name}.astro line ${i + 1}: bare px-20`);
        }
      }
    }
  }
  return violations.length === 0
    ? true
    : `Bare px-20 found:\n  ${violations.join('\n  ')}`;
});

// --- Check 3: No bare fixed widths without md: guard ---
// Each entry: [filename, width pattern, context note]
const fixedWidthChecks = [
  ['Skills', 'w-[500px]', 'Java card'],
  ['Skills', 'w-[480px]', 'Distributed Systems card'],
  ['Experiencia', 'w-[200px]', 'date columns (must be on hidden md:flex lines)'],
  ['Contacto', 'w-[360px]', 'info card'],
  ['SobreMi', 'w-[420px]', 'side panel'],
  ['Educacion', 'w-[180px]', 'stats panel'],
];

for (const [fileName, widthClass, context] of fixedWidthChecks) {
  check(`${fileName}: no bare ${widthClass} (${context})`, () => {
    const lines = files[fileName].split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.includes(widthClass)) continue;
      // Line has the width class — check it's guarded
      // Either preceded by md: (md:w-[Xpx]) or on a line with "hidden md:flex" (Experiencia pattern)
      const hasMdGuard = line.includes(`md:${widthClass}`);
      const isHiddenOnMobile = line.includes('hidden md:flex') || line.includes('hidden md:block');
      if (!hasMdGuard && !isHiddenOnMobile) {
        return `${fileName}.astro line ${i + 1}: bare ${widthClass} without md: guard or hidden`;
      }
    }
    return true;
  });
}

// --- Check 4: Skills has flex-col md:flex-row (at least 4) ---
check('Skills has >= 4 flex-col md:flex-row', () => {
  const count = (files['Skills'].match(/flex-col md:flex-row/g) || []).length;
  return count >= 4
    ? true
    : `Skills has ${count} flex-col md:flex-row (need >= 4)`;
});

// --- Check 5: Experiencia has hidden md:flex (at least 4) ---
check('Experiencia has >= 4 hidden md:flex (date columns)', () => {
  const count = (files['Experiencia'].match(/hidden md:flex/g) || []).length;
  return count >= 4
    ? true
    : `Experiencia has ${count} hidden md:flex (need >= 4)`;
});

// --- Check 6: Experiencia has md:hidden (at least 4) ---
check('Experiencia has >= 4 md:hidden (inline mobile dates)', () => {
  const count = (files['Experiencia'].match(/md:hidden/g) || []).length;
  return count >= 4
    ? true
    : `Experiencia has ${count} md:hidden (need >= 4)`;
});

// --- Check 7: Hero inner container has flex-col md:flex-row ---
check('Hero inner container has flex-col md:flex-row', () => {
  return files['Hero'].includes('flex-col md:flex-row')
    ? true
    : 'Hero does not contain flex-col md:flex-row';
});

// --- Check 8: Footer has no inline style="min-width" ---
check('Footer has no inline style="min-width"', () => {
  return !files['Footer'].includes('style="min-width')
    ? true
    : 'Footer contains inline style="min-width"';
});

// --- Check 9: Contacto form row has flex-col md:flex-row ---
check('Contacto form row has flex-col md:flex-row', () => {
  return files['Contacto'].includes('flex-col md:flex-row')
    ? true
    : 'Contacto does not contain flex-col md:flex-row';
});

// --- Check 10: Educación degree panel has flex-col md:flex-row ---
check('Educación degree panel has flex-col md:flex-row', () => {
  return files['Educacion'].includes('flex-col md:flex-row')
    ? true
    : 'Educacion does not contain flex-col md:flex-row';
});

// --- Check 11: Build passes ---
check('npm run build exits 0', () => {
  try {
    execSync('npm run build', { stdio: 'pipe', cwd: resolve(__dirname, '..') });
    return true;
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString().slice(0, 500) : 'unknown error';
    return `Build failed: ${stderr}`;
  }
});

// --- Report results ---
console.log('\n=== M003 Milestone Verification ===\n');
let allPassed = true;
for (const r of results) {
  const icon = r.pass ? '✅' : '❌';
  console.log(`${icon} ${r.label}`);
  if (!r.pass) {
    console.log(`   Reason: ${r.reason}`);
    allPassed = false;
  }
}

const total = results.length;
const passed = results.filter(r => r.pass).length;
console.log(`\n${passed}/${total} checks passed.`);
console.log(`${allPassed ? '✅ All checks passed.' : '❌ One or more checks failed.'}\n`);
process.exit(allPassed ? 0 : 1);
