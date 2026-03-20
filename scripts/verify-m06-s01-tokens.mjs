// scripts/verify-m06-s01-tokens.mjs
// Token audit verification: compares all .pen variable values against global.css
// Uses check(label, fn) pattern per KNOWLEDGE.md
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// ── .pen variable reference (from MCP get_variables) ──────────────────────
// All values are lowercase hex.
const PEN_VARIABLES = [
  { name: 'bg-alt',                   light: '#f3f4f6', dark: '#1a1a2e', themed: true },
  { name: 'bg-amber',                 light: '#fffdf5', dark: '#1f1d0a', themed: true },
  { name: 'bg-amber-pill',            light: '#fef3c7', dark: '#3d2e0a', themed: true },
  { name: 'bg-card',                  light: '#ffffff', dark: '#1e1e2a', themed: true },
  { name: 'bg-card-alt',              light: '#f9fafb', dark: '#2a2a3a', themed: true },
  { name: 'bg-card-muted',            light: '#f0f0f0', dark: '#2d2d3a', themed: true },
  { name: 'bg-footer',                light: '#18181b', dark: '#0a0a0c', themed: true },
  { name: 'bg-green',                 light: '#f0fdf4', dark: '#0a2e1e', themed: true },
  { name: 'bg-hero-photo',            light: '#f8f7ff', dark: '#1e1e2a', themed: true },
  { name: 'bg-indigo-pill',           light: '#ede8ff', dark: '#2d2558', themed: true },
  { name: 'bg-indigo-soft',           light: '#f8f7ff', dark: '#0f0a2a', themed: true },
  { name: 'bg-input',                 light: '#f3f4f6', dark: '#1a1a2e', themed: true },
  { name: 'bg-primary',               light: '#ffffff', dark: '#0f0f11', themed: true },
  { name: 'bg-stats',                 light: '#374151', dark: '#0f0a2a', themed: true },
  { name: 'border-accent',            light: '#7c3aed66', dark: '#7c3aed66', themed: false },
  { name: 'border-default',           light: '#e5e7eb', dark: '#2d2d3a', themed: true },
  { name: 'border-muted',             light: '#d4d4d8', dark: '#d4d4d8', themed: false },
  { name: 'color-accent',             light: '#7c3aed', dark: '#7c3aed', themed: false },
  { name: 'color-accent-lighter',     light: '#c4b5fd', dark: '#c4b5fd', themed: false },
  { name: 'color-accent-overlay',     light: '#7c3aed33', dark: '#7c3aed33', themed: false },
  { name: 'color-accent-overlay-light', light: '#7c3aed22', dark: '#7c3aed22', themed: false },
  { name: 'color-accent-soft',        light: '#a78bfa', dark: '#a78bfa', themed: false },
  { name: 'color-amber',              light: '#f59e0b', dark: '#f59e0b', themed: false },
  { name: 'color-green',              light: '#22c55e', dark: '#22c55e', themed: false },
  { name: 'color-indigo-light',       light: '#a5b4fc', dark: '#a5b4fc', themed: false },
  { name: 'color-primary',            light: '#4338ca', dark: '#4338ca', themed: false },
  { name: 'divider',                  light: '#374151', dark: '#4b5563', themed: true },
  { name: 'text-accent-muted',        light: '#7c3aed99', dark: '#7c3aed99', themed: false },
  { name: 'text-amber-accent',        light: '#d97706', dark: '#fbbf24', themed: true },
  { name: 'text-amber-dark',          light: '#92400e', dark: '#d97706', themed: true },
  { name: 'text-green',               light: '#166534', dark: '#4ade80', themed: true },
  { name: 'text-heading',             light: '#18181b', dark: '#f1f1f3', themed: true },
  { name: 'text-muted',               light: '#a1a1aa', dark: '#a1a1aa', themed: false },
  { name: 'text-on-primary',          light: '#ffffff', dark: '#ffffff', themed: false },
  { name: 'text-primary',             light: '#18181b', dark: '#ffffff', themed: true },
  { name: 'text-secondary',           light: '#6b7280', dark: '#9ca3af', themed: true },
  { name: 'text-tertiary',            light: '#374151', dark: '#d1d5db', themed: true },
];

// CSS-only tokens — present in CSS but not in .pen variables (expected)
const CSS_ONLY_TOKENS = [
  '--bg-java-card',
  '--text-accent-light',
  '--text-accent-desc',
  '--text-footer-link',
  '--text-footer-muted',
  '--color-primary-bg',
];

// Dark overrides for non-themed .pen variables (expected)
const EXPECTED_DARK_OVERRIDES = {
  '--color-primary': '#818cf8',   // D014 — text variant lightened in dark mode
  '--border-muted': '#4b5563',    // Practical need — #d4d4d8 too light on dark bg
};

// ── CSS parser ────────────────────────────────────────────────────────────
function parseCssBlock(css, selectorPattern) {
  // Match block content for a given selector
  const regex = new RegExp(selectorPattern + '\\s*\\{([^}]+)\\}', 's');
  const match = css.match(regex);
  if (!match) return {};
  const block = match[1];
  const props = {};
  const propRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = propRegex.exec(block)) !== null) {
    props[`--${m[1]}`] = m[2].trim().toLowerCase();
  }
  return props;
}

// ── Main ──────────────────────────────────────────────────────────────────
const cssPath = join(process.cwd(), 'src', 'styles', 'global.css');
const css = readFileSync(cssPath, 'utf-8');

const rootProps = parseCssBlock(css, ':root');
const darkProps = parseCssBlock(css, '\\.dark');

const failures = [];
let passCount = 0;

function check(label, fn) {
  const result = fn();
  if (result === true) {
    passCount++;
    return;
  }
  failures.push(`MISMATCH: ${label} — ${result}`);
}

// ── Check all 36 .pen variables ───────────────────────────────────────────
console.log('\n═══ .pen Variable Comparison ═══\n');

for (const v of PEN_VARIABLES) {
  const cssVar = `--${v.name}`;

  // Light mode: .pen light value vs :root CSS value
  check(`${cssVar} light`, () => {
    const cssVal = rootProps[cssVar];
    if (!cssVal) return `not found in :root`;
    if (cssVal !== v.light) return `expected ${v.light}, got ${cssVal}`;
    return true;
  });

  // Dark mode: .pen dark value vs .dark CSS value (only for themed variables)
  if (v.themed) {
    check(`${cssVar} dark`, () => {
      const cssVal = darkProps[cssVar];
      if (!cssVal) return `not found in .dark block (themed variable should be overridden)`;
      if (cssVal !== v.dark) return `expected ${v.dark}, got ${cssVal}`;
      return true;
    });
  }
}

// ── Report CSS-only tokens ────────────────────────────────────────────────
console.log('═══ CSS-Only Tokens (expected, not errors) ═══\n');
for (const token of CSS_ONLY_TOKENS) {
  const inRoot = rootProps[token] !== undefined;
  const inDark = darkProps[token] !== undefined;
  const status = inRoot ? '✓ present' : '✗ missing';
  console.log(`  ${token}: ${status} in :root${inDark ? ', overridden in .dark' : ''}`);
}

// ── Report dark overrides for non-themed .pen variables ───────────────────
console.log('\n═══ Dark Overrides for Non-Themed .pen Variables (expected) ═══\n');
for (const [token, expectedDarkVal] of Object.entries(EXPECTED_DARK_OVERRIDES)) {
  const cssVal = darkProps[token];
  if (!cssVal) {
    console.log(`  ${token}: ✗ missing from .dark block`);
  } else if (cssVal !== expectedDarkVal) {
    console.log(`  ${token}: ✗ expected ${expectedDarkVal}, got ${cssVal}`);
  } else {
    console.log(`  ${token}: ✓ ${cssVal} (intentional override)`);
  }
}

// ── Summary ───────────────────────────────────────────────────────────────
console.log('\n═══ Summary ═══\n');
console.log(`  .pen variables checked: ${PEN_VARIABLES.length}`);
console.log(`  Checks passed: ${passCount}`);
console.log(`  Mismatches: ${failures.length}`);

if (failures.length > 0) {
  console.log('\n❌ FAILURES:\n');
  for (const f of failures) {
    console.error(`  ${f}`);
  }
  process.exit(1);
} else {
  console.log('\n✅ All .pen variables match CSS values. Zero mismatches.\n');
  process.exit(0);
}
