---
estimated_steps: 4
estimated_files: 2
---

# T01: Rewrite take-screenshots.mjs for multi-mode multi-viewport capture

**Slice:** S02 — Dev Screenshot Infrastructure
**Milestone:** M010-jgngfg

## Description

Rewrite `_design/take-screenshots.mjs` to capture all 9 sections across 2 modes (light/dark) × 3 viewports (mobile 390px / desktop 1440px / wide 1600px) = 54 PNGs total. The current script only handles 7 sections at one viewport/mode with header hidden and wrong numbering. Also write a verification script `_design/count-screenshots.mjs` that validates the output.

**Relevant skill:** The `astro` skill may help if Astro build context is needed, but this task is pure Playwright scripting — no Astro-specific knowledge required beyond "serve `dist/` on port 4322".

## Steps

1. **Rewrite `_design/take-screenshots.mjs`** with the following structure:
   - Section map (9 entries): `{ selector: 'header', file: '001_header.png' }`, `{ selector: '#inicio', file: '002_hero.png' }`, `{ selector: '#sobre-mi', file: '003_sobre_mi.png' }`, `{ selector: '#habilidades', file: '004_skills.png' }`, `{ selector: '#proyectos', file: '005_proyectos.png' }`, `{ selector: '#experiencia', file: '006_experience.png' }`, `{ selector: '#educacion', file: '007_education.png' }`, `{ selector: '#contacto', file: '008_contact.png' }`, `{ selector: 'footer', file: '009_footer.png' }`
   - Viewport configs: `mobile: { width: 390, height: 844 }`, `desktop: { width: 1440, height: 900 }`, `wide: { width: 1600, height: 900 }`
   - All viewports use `deviceScaleFactor: 2`
   - Outer loop: modes (`light`, `dark`). Inner loop: viewports. Innermost: sections.
   - For each viewport, create a new `browser.newContext({ viewport, deviceScaleFactor: 2 })` — viewport is immutable after context creation.
   - For `dark` mode: after `page.goto()` and `waitForLoadState('networkidle')`, call `page.evaluate(() => document.documentElement.classList.add('dark'))` then `page.waitForTimeout(300)` to let CSS transitions settle.
   - For `light` mode: no class manipulation needed (default state).
   - Output path: `_design/screenshots/dev/{mode}/{viewportName}/{file}`
   - Use `fs.mkdirSync(dir, { recursive: true })` to create output directories.
   - Remove `hideHeader()` — header must be visible as section 001.
   - Connect to `http://localhost:4322` (static build server, not dev server).
   - Use `el.screenshot({ path })` for element screenshots (handles `position: fixed` header correctly).
   - Log progress: `✓ {mode}/{viewportName}/{file}` for each screenshot.

2. **Write `_design/count-screenshots.mjs`** verification script:
   - Check that `_design/screenshots/dev/` has exactly 6 subdirectories: `light/mobile`, `light/desktop`, `light/wide`, `dark/mobile`, `dark/desktop`, `dark/wide`.
   - Each subdirectory must contain exactly 9 PNG files.
   - All files must match the naming pattern `001_header.png` through `009_footer.png`.
   - All files must be > 0 bytes.
   - Print pass/fail summary. Exit 0 on all pass, exit 1 on any failure.

3. **Syntax-check both scripts** with `node -c` to catch parse errors.

4. **Read back the section map** in `take-screenshots.mjs` to verify all 9 entries and correct naming.

## Must-Haves

- [ ] 9 sections mapped with correct selectors and filenames (001_header through 009_footer)
- [ ] 3 viewport configs (mobile 390×844, desktop 1440×900, wide 1600×900) all at 2x scale
- [ ] Dark mode toggled via `document.documentElement.classList.add('dark')` after page load
- [ ] Fresh browser context created per viewport (not reused)
- [ ] Header is NOT hidden — no `hideHeader()` function or header-hiding style injection
- [ ] Output directories created automatically with `recursive: true`
- [ ] Verification script `count-screenshots.mjs` checks file count, names, and non-zero size

## Verification

- `node -c _design/take-screenshots.mjs` exits 0 (no syntax errors)
- `node -c _design/count-screenshots.mjs` exits 0 (no syntax errors)
- `grep -c "selector:" _design/take-screenshots.mjs` returns 9 (all sections mapped)
- `grep -q "hideHeader" _design/take-screenshots.mjs` should FAIL (header hiding removed)

## Observability Impact

- **New signal:** `take-screenshots.mjs` emits `✓ {mode}/{viewportName}/{file}` per capture and a final summary line (`Done: N captured, M failed`). Non-zero exit on any failure.
- **New signal:** `count-screenshots.mjs` emits per-file PASS/FAIL lines and exits 1 on any missing/zero-byte file, enabling CI-style pass/fail gating.
- **Inspection:** After a run, `ls _design/screenshots/dev/{light,dark}/{mobile,desktop,wide}/` shows partial progress. `node _design/count-screenshots.mjs` gives a structured summary.
- **Failure state:** Partial output directories reveal exactly which mode/viewport/section failed. Error messages include the selector that was not found.

## Inputs

- `_design/take-screenshots.mjs` — existing script to rewrite (current: 7 sections, single mode/viewport)

## Expected Output

- `_design/take-screenshots.mjs` — rewritten multi-mode/multi-viewport screenshot script
- `_design/count-screenshots.mjs` — verification script for validating screenshot output
