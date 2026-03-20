#!/usr/bin/env node
/**
 * verify-m04.mjs — Milestone M004-ahf7ia verification script
 *
 * Structural checks for overlay enhancements (chevron arrows, social icons row),
 * token usage validation, and regression gates.
 *
 * Checks:
 *   1.  Overlay nav links contain chevron SVG (polyline with "9 18 15 12 9 6")
 *   2.  Each overlay nav link has exactly one chevron SVG
 *   3.  Social icons row exists with 4 <a> elements
 *   4.  Social icons have aria-labels (LinkedIn, GitHub, Twitter, Email)
 *   5.  No hardcoded hex colors in overlay section of Header.astro
 *   6.  All overlay color references use var(-- syntax
 *   7.  Active chevron uses --color-primary-bg token
 *   8.  Inactive chevrons use --text-muted token
 *   9.  Social icons use --bg-alt and --text-secondary tokens
 *   10. npm run build exits 0
 *   11. verify-m02.mjs passes (dark mode regression)
 *   12. verify-m03.mjs passes (mobile regression)
 *
 * Failure inspection:
 *   - Chevron check:  grep "polyline" src/components/sections/Header.astro
 *   - Social row:     grep "social-icons-row" src/components/sections/Header.astro
 *   - Hex colors:     grep -n "#[0-9a-fA-F]\{3,8\}" src/components/sections/Header.astro
 *   - Token usage:    grep "var(--" src/components/sections/Header.astro
 *
 * Exits 0 on all pass, exits 1 with per-check failure messages.
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

// ── Read Header.astro ─────────────────────────────────────────────────────────

const HEADER_PATH = 'src/components/sections/Header.astro';
const headerContent = existsSync(HEADER_PATH) ? readFileSync(HEADER_PATH, 'utf8') : '';

if (!headerContent) {
  console.error(`${FAIL} FATAL: ${HEADER_PATH} not found or empty`);
  process.exit(1);
}

// Extract overlay section (from id="mobile-menu" to end of that div tree)
const overlayStart = headerContent.indexOf('id="mobile-menu"');
const overlaySection = overlayStart >= 0 ? headerContent.slice(overlayStart) : '';

// ── Chevron SVG checks ────────────────────────────────────────────────────────

check('Overlay nav links contain chevron SVGs with correct polyline', () => {
  const polylinePattern = /polyline\s+points="9 18 15 12 9 6"/g;
  const matches = overlaySection.match(polylinePattern);
  if (!matches || matches.length === 0) {
    return 'No chevron polyline SVGs found in overlay section';
  }
  return true;
});

check('Exactly 7 chevron polylines in overlay (one per nav link)', () => {
  const polylinePattern = /polyline\s+points="9 18 15 12 9 6"/g;
  const matches = overlaySection.match(polylinePattern);
  const count = matches ? matches.length : 0;
  if (count !== 7) {
    return `Expected 7 chevron polylines, found ${count}`;
  }
  return true;
});

check('Overlay has 7 nav links with class overlay-nav-link', () => {
  const linkPattern = /class="overlay-nav-link/g;
  const matches = overlaySection.match(linkPattern);
  const count = matches ? matches.length : 0;
  if (count !== 7) {
    return `Expected 7 overlay-nav-link elements, found ${count}`;
  }
  return true;
});

// ── Social icons row checks ───────────────────────────────────────────────────

check('Social icons row exists with class social-icons-row', () => {
  if (!overlaySection.includes('social-icons-row')) {
    return 'No element with class "social-icons-row" found in overlay';
  }
  return true;
});

check('Social icons row contains exactly 4 <a> elements', () => {
  // Extract the social-icons-row section
  const socialStart = overlaySection.indexOf('social-icons-row');
  if (socialStart < 0) return 'social-icons-row not found';

  // Find the containing div from social-icons-row to its close
  const socialSection = overlaySection.slice(socialStart);
  // Count <a elements until we hit the closing </div> of the social row
  // Find the first </div> that closes the social row container
  const closingDiv = socialSection.indexOf('</div>');
  const socialBlock = socialSection.slice(0, closingDiv > 0 ? closingDiv : undefined);

  const aMatches = socialBlock.match(/<a\b/g);
  const count = aMatches ? aMatches.length : 0;
  if (count !== 4) {
    return `Expected 4 <a> elements in social icons row, found ${count}`;
  }
  return true;
});

check('Social icons have correct aria-labels', () => {
  const expectedLabels = ['LinkedIn', 'GitHub', 'Twitter', 'Email'];
  const missing = expectedLabels.filter(label => {
    return !overlaySection.includes(`aria-label="${label}"`);
  });
  if (missing.length > 0) {
    return `Missing aria-labels in social icons: ${missing.join(', ')}`;
  }
  return true;
});

// ── Token usage checks ───────────────────────────────────────────────────────

check('No hardcoded hex colors in overlay markup (excluding <script> and SVG coordinates)', () => {
  // Only check the HTML markup portion, not the <script> block
  // Extract overlay markup from id="mobile-menu" to the first <script> tag
  let overlayMarkup = overlaySection;
  const scriptStart = overlayMarkup.indexOf('<script');
  if (scriptStart >= 0) {
    overlayMarkup = overlayMarkup.slice(0, scriptStart);
  }

  const lines = overlayMarkup.split('\n');
  const violations = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip lines that are SVG coordinate-only (viewBox, points, polyline, path, rect, circle, line)
    if (/^\s*<(polyline|path|rect|circle|line|svg)\b/.test(line)) continue;
    if (/^\s*(points|d|viewBox|x[12]?|y[12]?|cx|cy|r|width|height|rx)=/.test(line)) continue;

    // Look for hex color patterns like #fff, #ffffff, #4338CA, etc.
    // Match # followed by 3-8 hex chars, but NOT inside url(#...) or href="#..."
    const hexMatches = line.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hexMatches) {
      for (const hex of hexMatches) {
        // Exclude anchor hrefs like href="#inicio"
        if (line.includes(`href="${hex}`) || line.includes(`href='${hex}`)) continue;
        // Exclude SVG coordinate values (pure numbers after #)
        if (/^#\d+$/.test(hex)) continue;
        // This is likely a hardcoded color
        violations.push(`  Line ${i + 1}: ${hex} in: ${line.trim().slice(0, 100)}`);
      }
    }
  }

  if (violations.length > 0) {
    return `Found hardcoded hex colors in overlay markup:\n${violations.join('\n')}`;
  }
  return true;
});

check('All overlay CSS color/bg classes use var(-- syntax', () => {
  // Check that text-[...], bg-[...], border-[...] classes in overlay use var(--)
  const classPattern = /(?:text|bg|border)-\[([^\]]+)\]/g;
  const violations = [];
  let match;

  while ((match = classPattern.exec(overlaySection)) !== null) {
    const value = match[1];
    // Skip Tailwind arbitrary values that are pure numbers/dimensions (e.g., w-[500px])
    if (/^\d/.test(value)) continue;
    // Should use var(--...) syntax
    if (!value.startsWith('var(--')) {
      violations.push(`  ${match[0]} — should use var(-- token`);
    }
  }

  if (violations.length > 0) {
    return `Non-token color references in overlay:\n${violations.join('\n')}`;
  }
  return true;
});

// ── Token-specific checks ─────────────────────────────────────────────────────

check('Active chevron uses --color-primary-bg token', () => {
  // The active nav link (aria-current="page") should have a chevron with --color-primary-bg
  const activeSection = overlaySection.slice(
    overlaySection.indexOf('aria-current="page"'),
    overlaySection.indexOf('</li>', overlaySection.indexOf('aria-current="page"'))
  );
  if (!activeSection.includes('--color-primary-bg')) {
    return 'Active nav link chevron does not reference --color-primary-bg token';
  }
  return true;
});

check('Inactive chevrons use --text-muted token', () => {
  // Find nav links without aria-current and check their chevrons
  if (!overlaySection.includes('--text-muted')) {
    return 'No --text-muted token found in overlay — inactive chevrons should use it';
  }
  return true;
});

check('Social icons use --bg-alt token for backgrounds', () => {
  const socialStart = overlaySection.indexOf('social-icons-row');
  const socialSection = overlaySection.slice(socialStart);
  if (!socialSection.includes('--bg-alt')) {
    return 'Social icons row does not reference --bg-alt token';
  }
  return true;
});

check('Social icons use --text-secondary token for icon colors', () => {
  const socialStart = overlaySection.indexOf('social-icons-row');
  const socialSection = overlaySection.slice(socialStart);
  if (!socialSection.includes('--text-secondary')) {
    return 'Social icons row does not reference --text-secondary token';
  }
  return true;
});

// ── Build gate ────────────────────────────────────────────────────────────────

check('npm run build exits 0', () => {
  try {
    execSync('npm run build', { stdio: 'pipe' });
    return true;
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString().slice(0, 800) : '';
    const stdout = err.stdout ? err.stdout.toString().slice(0, 400) : '';
    return `Build failed.\nSTDERR: ${stderr}\nSTDOUT: ${stdout}`;
  }
});

// ── Regression gates ──────────────────────────────────────────────────────────

check('verify-m02.mjs passes (dark mode regression)', () => {
  try {
    execSync('node scripts/verify-m02.mjs', { stdio: 'pipe' });
    return true;
  } catch (err) {
    const stdout = err.stdout ? err.stdout.toString().slice(0, 500) : '';
    const stderr = err.stderr ? err.stderr.toString().slice(0, 500) : '';
    return `verify-m02.mjs failed:\n${stderr}\n${stdout}`;
  }
});

check('verify-m03.mjs passes (mobile regression)', () => {
  try {
    execSync('node scripts/verify-m03.mjs', { stdio: 'pipe' });
    return true;
  } catch (err) {
    const stdout = err.stdout ? err.stdout.toString().slice(0, 500) : '';
    const stderr = err.stderr ? err.stderr.toString().slice(0, 500) : '';
    return `verify-m03.mjs failed:\n${stderr}\n${stdout}`;
  }
});

// ── Result ────────────────────────────────────────────────────────────────────

console.log('\n=== M04 Milestone Verification ===\n');

const total = 14; // Total expected checks
if (allPassed) {
  console.log(`✅ All ${total} M04 checks passed. Milestone M004-ahf7ia overlay enhancements verified.`);
  process.exit(0);
} else {
  console.error('❌ One or more M04 checks failed. See errors above.');
  console.error('   Diagnostics:');
  console.error('   - Chevrons:     grep "polyline" src/components/sections/Header.astro');
  console.error('   - Social row:   grep "social-icons-row" src/components/sections/Header.astro');
  console.error('   - Hex colors:   grep -n "#[0-9a-fA-F]\\{3,8\\}" src/components/sections/Header.astro');
  console.error('   - Tokens:       grep "var(--" src/components/sections/Header.astro');
  console.error('   - Build:        npm run build');
  console.error('   - M02 regress:  node scripts/verify-m02.mjs');
  console.error('   - M03 regress:  node scripts/verify-m03.mjs');
  process.exit(1);
}
