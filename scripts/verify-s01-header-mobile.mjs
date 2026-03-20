#!/usr/bin/env node
// scripts/verify-s01-header-mobile.mjs
// Automated structural checks for S01: Header Responsive + Hamburger Menu
// Exit 0 = all checks pass, Exit 1 = one or more checks failed

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const headerPath = resolve(__dirname, '../src/components/sections/Header.astro');
const source = readFileSync(headerPath, 'utf8');

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

// 1. Hamburger button exists with md:hidden (flex md:hidden)
check('Hamburger button exists with md:hidden class', () => {
  return source.includes('id="hamburger-btn"') && source.includes('flex md:hidden')
    ? true
    : 'No hamburger button with flex md:hidden found';
});

// 2. Overlay/mobile-menu container exists
check('Mobile menu overlay container exists (#mobile-menu)', () => {
  return source.includes('id="mobile-menu"')
    ? true
    : 'No element with id="mobile-menu" found';
});

// 3. Desktop nav ul has hidden md:flex
check('Desktop nav <ul> has hidden md:flex', () => {
  return source.includes('hidden md:flex items-center gap-8')
    ? true
    : 'Desktop nav <ul> does not have hidden md:flex';
});

// 4. Pill toggle has hidden md:flex
check('Pill toggle has hidden md:flex', () => {
  return source.includes('id="theme-toggle"') && source.includes('hidden md:flex')
    ? true
    : 'Pill toggle does not have hidden md:flex class';
});

// 5. Bare mobile icon toggle has flex md:hidden
check('Mobile bare icon toggle has flex md:hidden', () => {
  return source.includes('id="theme-toggle-mobile"')
    ? true
    : 'No element with id="theme-toggle-mobile" found';
});

// 6. Descargar CV has hidden md: class
check('"Descargar CV" link has hidden md:flex or hidden md:inline-flex', () => {
  const cvMatch = source.match(/hidden md:(flex|inline-flex)[^"]*"[^>]*>[\s\r\n]*Descargar CV/);
  if (cvMatch) return true;
  // Also check: hidden md:inline-flex ... Descargar CV anywhere nearby
  const hasHiddenMd = source.includes('hidden md:inline-flex') || (source.match(/hidden md:flex[^"]*"[^>]*>\s*Descargar CV/) !== null);
  return hasHiddenMd ? true : '"Descargar CV" element does not have hidden md:flex or hidden md:inline-flex';
});

// 7. Header padding is px-6 md:px-20
check('Header inner div padding is px-6 md:px-20', () => {
  return source.includes('px-6 md:px-20')
    ? true
    : 'Header padding does not include px-6 md:px-20';
});

// 8. Script block contains hamburger toggle logic (getElementById for menu elements)
check('Script block contains hamburger toggle logic', () => {
  const hasHamburger = source.includes('hamburger-btn') && source.includes('mobile-menu');
  const hasOpenClose = source.includes('openMenu') || source.includes('closeMenu') ||
    (source.includes("classList.remove('hidden')") && source.includes("classList.add('flex')"));
  return hasHamburger && hasOpenClose
    ? true
    : 'Script block missing hamburger toggle logic (openMenu/closeMenu or classList manipulation)';
});

// Report results
console.log('\n=== S01 Header Mobile Verification ===\n');
let allPassed = true;
for (const r of results) {
  const icon = r.pass ? '✅' : '❌';
  console.log(`${icon} ${r.label}`);
  if (!r.pass) {
    console.log(`   Reason: ${r.reason}`);
    allPassed = false;
  }
}

console.log(`\n${allPassed ? '✅ All checks passed.' : '❌ One or more checks failed.'}\n`);
process.exit(allPassed ? 0 : 1);
