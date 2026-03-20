#!/usr/bin/env node
/**
 * verify-s07.mjs — Slice S07 milestone-level verification script
 *
 * This is the authoritative gate for Milestone M001-ykiyqu (complete desktop light homepage).
 *
 * Checks:
 *   Footer.astro file checks:
 *   1.  Footer.astro exists
 *   2.  Footer.astro has >30 lines
 *   3.  Contains "Carlos Mayorga"
 *   4.  Contains "Todos los derechos reservados"
 *   5.  Contains "NAVEGACIÓN" (uppercase)
 *   6.  Contains "SOCIAL" (uppercase)
 *   7.  Contains var(--bg-footer)
 *   8.  Contains var(--text-footer-link) or var(--text-footer-muted)
 *   9.  Zero hardcoded hex values
 *
 *   Token checks in global.css:
 *   10. Contains --text-footer-link
 *   11. Contains --text-footer-muted
 *
 *   index.astro import checks:
 *   12. Imports Header
 *   13. Imports Hero
 *   14. Imports SobreMi
 *   15. Imports Skills
 *   16. Imports Proyectos
 *   17. Imports Experiencia
 *   18. Imports Educacion
 *   19. Imports Contacto
 *   20. Imports Footer
 *
 *   Built HTML section ID checks (in dist/index.html):
 *   21. Contains id="inicio"
 *   22. Contains id="sobre-mi"
 *   23. Contains id="habilidades"
 *   24. Contains id="proyectos"
 *   25. Contains id="experiencia"
 *   26. Contains id="educacion"
 *   27. Contains id="contacto"
 *
 *   Built HTML content string checks (in dist/index.html):
 *   28. Contains "Carlos Alberto Mayorga Hilario"
 *   29. Contains "Descargar CV"
 *   30. Contains "Tech Lead"
 *   31. Contains "profile.webp"
 *   32. Contains "Todos los derechos reservados"
 *   33. Contains "Java Ecosystem"
 *
 * Exits 0 on all pass, exits 1 with per-check ❌ FAIL messages on any failure.
 *
 * Failure inspection:
 *   - A specific FAIL line shows exactly which string/file/token is missing.
 *   - Build failures emit the first 800 chars of Astro's stderr.
 *   - After a build, run: grep -o 'id="[^"]*"' dist/index.html
 *     to list all section anchors and identify which one is missing.
 *   - For token misses: grep 'text-footer-link\|text-footer-muted' src/styles/global.css
 *   - For hex leakage: grep -oE '#[0-9a-fA-F]{3,8}' src/components/sections/Footer.astro
 *   - The dist/ directory being absent (build failed) is itself a failure signal.
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

// ── Build (fresh dist) ────────────────────────────────────────────────────────

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

// ── Footer.astro file checks ──────────────────────────────────────────────────

const FOOTER_PATH = 'src/components/sections/Footer.astro';

check('Footer.astro exists', () => {
  if (!existsSync(FOOTER_PATH)) return `File not found: ${FOOTER_PATH}`;
  return true;
});

check('Footer.astro has >30 lines', () => {
  if (!existsSync(FOOTER_PATH)) return 'File not found — skipping line count';
  const lines = readFileSync(FOOTER_PATH, 'utf8').split('\n').length;
  if (lines <= 30) return `Expected >30 lines, got ${lines}`;
  return true;
});

const footerContent = existsSync(FOOTER_PATH) ? readFileSync(FOOTER_PATH, 'utf8') : '';

check('Footer: contains "Carlos Mayorga"', () => {
  if (!footerContent.includes('Carlos Mayorga')) return 'String "Carlos Mayorga" not found in Footer.astro';
  return true;
});

check('Footer: contains "Todos los derechos reservados"', () => {
  if (!footerContent.includes('Todos los derechos reservados')) return 'String "Todos los derechos reservados" not found in Footer.astro';
  return true;
});

check('Footer: contains "NAVEGACIÓN" (uppercase)', () => {
  if (!footerContent.includes('NAVEGACIÓN')) return 'String "NAVEGACIÓN" not found in Footer.astro';
  return true;
});

check('Footer: contains "SOCIAL" (uppercase)', () => {
  if (!footerContent.includes('SOCIAL')) return 'String "SOCIAL" not found in Footer.astro';
  return true;
});

check('Footer: uses var(--bg-footer) token', () => {
  if (!footerContent.includes('var(--bg-footer)')) return 'Token var(--bg-footer) not found in Footer.astro';
  return true;
});

check('Footer: uses var(--text-footer-link) or var(--text-footer-muted)', () => {
  if (!footerContent.includes('var(--text-footer-link)') && !footerContent.includes('var(--text-footer-muted)')) {
    return 'Neither var(--text-footer-link) nor var(--text-footer-muted) found in Footer.astro';
  }
  return true;
});

check('Footer: zero hardcoded hex values', () => {
  const hexMatches = footerContent.match(/#[0-9a-fA-F]{3,8}/g);
  if (hexMatches && hexMatches.length > 0) {
    return `Found hardcoded hex values: ${hexMatches.join(', ')}`;
  }
  return true;
});

// ── Token checks in global.css ────────────────────────────────────────────────

const CSS_PATH = 'src/styles/global.css';
const cssContent = existsSync(CSS_PATH) ? readFileSync(CSS_PATH, 'utf8') : '';

check('global.css contains --text-footer-link', () => {
  if (!cssContent.includes('--text-footer-link')) return 'Token --text-footer-link not found in global.css';
  return true;
});

check('global.css contains --text-footer-muted', () => {
  if (!cssContent.includes('--text-footer-muted')) return 'Token --text-footer-muted not found in global.css';
  return true;
});

// ── index.astro import checks ─────────────────────────────────────────────────

const INDEX_PATH = 'src/pages/index.astro';
const indexContent = existsSync(INDEX_PATH) ? readFileSync(INDEX_PATH, 'utf8') : '';

check('index.astro imports Header', () => {
  if (!indexContent.includes("import Header from")) return 'Import for Header not found in index.astro';
  return true;
});

check('index.astro imports Hero', () => {
  if (!indexContent.includes("import Hero from")) return 'Import for Hero not found in index.astro';
  return true;
});

check('index.astro imports SobreMi', () => {
  if (!indexContent.includes("import SobreMi from")) return 'Import for SobreMi not found in index.astro';
  return true;
});

check('index.astro imports Skills', () => {
  if (!indexContent.includes("import Skills from")) return 'Import for Skills not found in index.astro';
  return true;
});

check('index.astro imports Proyectos', () => {
  if (!indexContent.includes("import Proyectos from")) return 'Import for Proyectos not found in index.astro';
  return true;
});

check('index.astro imports Experiencia', () => {
  if (!indexContent.includes("import Experiencia from")) return 'Import for Experiencia not found in index.astro';
  return true;
});

check('index.astro imports Educacion', () => {
  if (!indexContent.includes("import Educacion from")) return 'Import for Educacion not found in index.astro';
  return true;
});

check('index.astro imports Contacto', () => {
  if (!indexContent.includes("import Contacto from")) return 'Import for Contacto not found in index.astro';
  return true;
});

check('index.astro imports Footer', () => {
  if (!indexContent.includes("import Footer from")) return 'Import for Footer not found in index.astro';
  return true;
});

// ── Built HTML section ID checks ──────────────────────────────────────────────

const DIST_HTML_PATH = 'dist/index.html';
const distHtml = existsSync(DIST_HTML_PATH) ? readFileSync(DIST_HTML_PATH, 'utf8') : '';

check('Built HTML: contains id="inicio"', () => {
  if (!distHtml.includes('id="inicio"')) return 'id="inicio" not found in dist/index.html';
  return true;
});

check('Built HTML: contains id="sobre-mi"', () => {
  if (!distHtml.includes('id="sobre-mi"')) return 'id="sobre-mi" not found in dist/index.html';
  return true;
});

check('Built HTML: contains id="habilidades"', () => {
  if (!distHtml.includes('id="habilidades"')) return 'id="habilidades" not found in dist/index.html';
  return true;
});

check('Built HTML: contains id="proyectos"', () => {
  if (!distHtml.includes('id="proyectos"')) return 'id="proyectos" not found in dist/index.html';
  return true;
});

check('Built HTML: contains id="experiencia"', () => {
  if (!distHtml.includes('id="experiencia"')) return 'id="experiencia" not found in dist/index.html';
  return true;
});

check('Built HTML: contains id="educacion"', () => {
  if (!distHtml.includes('id="educacion"')) return 'id="educacion" not found in dist/index.html';
  return true;
});

check('Built HTML: contains id="contacto"', () => {
  if (!distHtml.includes('id="contacto"')) return 'id="contacto" not found in dist/index.html';
  return true;
});

// ── Built HTML content string checks ─────────────────────────────────────────

check('Built HTML: contains "Carlos Alberto Mayorga Hilario"', () => {
  if (!distHtml.includes('Carlos Alberto Mayorga Hilario')) return 'String "Carlos Alberto Mayorga Hilario" not found in dist/index.html';
  return true;
});

check('Built HTML: contains "Descargar CV"', () => {
  if (!distHtml.includes('Descargar CV')) return 'String "Descargar CV" not found in dist/index.html';
  return true;
});

check('Built HTML: contains "Tech Lead"', () => {
  if (!distHtml.includes('Tech Lead')) return 'String "Tech Lead" not found in dist/index.html';
  return true;
});

check('Built HTML: contains "profile.webp"', () => {
  if (!distHtml.includes('profile.webp')) return 'String "profile.webp" not found in dist/index.html';
  return true;
});

check('Built HTML: contains "Todos los derechos reservados"', () => {
  if (!distHtml.includes('Todos los derechos reservados')) return 'String "Todos los derechos reservados" not found in dist/index.html';
  return true;
});

check('Built HTML: contains "Java Ecosystem"', () => {
  if (!distHtml.includes('Java Ecosystem')) return 'String "Java Ecosystem" not found in dist/index.html';
  return true;
});

// ── Result ────────────────────────────────────────────────────────────────────

if (allPassed) {
  console.log('\n✅ All S07 checks passed. Milestone M001-ykiyqu is complete.');
  process.exit(0);
} else {
  console.error('\n❌ One or more S07 checks failed. See errors above.');
  console.error('   Diagnostics:');
  console.error('   - Section IDs: grep -o \'id="[^"]*"\' dist/index.html');
  console.error('   - Hex leakage: grep -oE \'#[0-9a-fA-F]{3,8}\' src/components/sections/Footer.astro');
  console.error('   - Token check: grep \'text-footer-link\\|text-footer-muted\' src/styles/global.css');
  process.exit(1);
}
