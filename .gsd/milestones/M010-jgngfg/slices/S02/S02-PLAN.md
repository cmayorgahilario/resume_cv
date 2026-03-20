# S02: Dev Screenshot Infrastructure

**Goal:** Comprehensive dev screenshots captured for all 9 sections across light+dark × 390px+1440px+1600px, stored in structured folders under `_design/screenshots/dev/`.
**Demo:** 54 PNG files exist in `_design/screenshots/dev/{light,dark}/{mobile,desktop,wide}/`, each named `001_header.png` through `009_footer.png`, all non-zero size.

## Must-Haves

- Rewritten `_design/take-screenshots.mjs` supports 9 sections, 2 modes (light/dark), 3 viewports (390px/1440px/1600px)
- Header is NOT hidden — it's captured as section 001
- Dark mode toggled via `document.documentElement.classList.add('dark')` after page load
- Each viewport uses a fresh browser context (Playwright requires this — viewport is immutable after context creation)
- All screenshots taken against static build served on port 4322 (not dev server)
- Device scale factor is 2x for all viewports
- Output follows D029 folder structure: `_design/screenshots/dev/{light,dark}/{mobile,desktop,wide}/`
- 54 total PNGs (9 sections × 2 modes × 3 viewports), all > 0 bytes

## Verification

- `node _design/count-screenshots.mjs` — verification script that checks: (1) 54 PNG files exist, (2) correct folder structure with 9 files each, (3) all files > 0 bytes, (4) correct filenames 001–009
- `npm run build` exits 0
- `node _design/count-screenshots.mjs 2>&1` on incomplete/missing output — exits 1 with diagnostic listing of which directories/files are missing or zero-byte (failure-path check)

## Tasks

- [x] **T01: Rewrite take-screenshots.mjs for multi-mode multi-viewport capture** `est:30m`
  - Why: The current script only captures 7 sections at 390px light-only with header hidden and wrong numbering. Need full 9-section × 2-mode × 3-viewport support with correct naming.
  - Files: `_design/take-screenshots.mjs`, `_design/count-screenshots.mjs`
  - Do: Rewrite `take-screenshots.mjs` with: (1) 9-section map matching design reference naming (001_header through 009_footer), (2) 3 viewport configs (mobile 390×844, desktop 1440×900, wide 1600×900), (3) outer loop over modes, inner over viewports, innermost over sections, (4) fresh browser context per viewport, (5) dark mode via `page.evaluate(() => document.documentElement.classList.add('dark'))` after navigation, (6) `mkdir -p` for output dirs, (7) remove `hideHeader()`. Also write `count-screenshots.mjs` verification script that validates 54 files exist, correct names, non-zero size.
  - Verify: `node -c _design/take-screenshots.mjs && node -c _design/count-screenshots.mjs` (syntax check both files)
  - Done when: Both scripts parse without errors and the screenshot script has 9 sections, 2 modes, 3 viewports configured.

- [ ] **T02: Build site, run screenshot script, and verify 54 output PNGs** `est:20m`
  - Why: The script from T01 needs to be executed against the built site to produce the actual screenshots. This task handles build + serve + execute + verify.
  - Files: `_design/screenshots/dev/light/mobile/*.png`, `_design/screenshots/dev/light/desktop/*.png`, `_design/screenshots/dev/light/wide/*.png`, `_design/screenshots/dev/dark/mobile/*.png`, `_design/screenshots/dev/dark/desktop/*.png`, `_design/screenshots/dev/dark/wide/*.png`
  - Do: (1) Run `npm run build` to generate `dist/`. (2) Start static server: `npx serve dist -l 4322` in background. (3) Run `node _design/take-screenshots.mjs`. (4) Stop server. (5) Run `node _design/count-screenshots.mjs` to verify output. If any screenshots fail, debug and re-run.
  - Verify: `node _design/count-screenshots.mjs` exits 0 (54 PNGs, correct structure, all non-zero)
  - Done when: All 54 PNG files exist in correct folders with correct names and non-zero file sizes.

## Observability / Diagnostics

- **Progress logging:** `take-screenshots.mjs` prints `✓ {mode}/{viewportName}/{file}` for each successful capture, enabling progress tracking during long runs.
- **Verification script:** `count-screenshots.mjs` prints per-directory pass/fail counts, expected vs actual filenames, and zero-byte file detection. Exit code 0 = all pass, 1 = any failure.
- **Failure visibility:** If a section selector is not found, the script logs the missing selector and continues (no silent skip). On crash, the partial output directory reveals how far the run progressed.
- **Inspection surface:** After a run, `ls -la _design/screenshots/dev/{light,dark}/{mobile,desktop,wide}/` shows which files were produced and their sizes. `node _design/count-screenshots.mjs` gives a structured summary.
- **Redaction:** No secrets or credentials are involved in screenshot capture.

## Files Likely Touched

- `_design/take-screenshots.mjs`
- `_design/count-screenshots.mjs`
- `_design/screenshots/dev/light/mobile/*.png`
- `_design/screenshots/dev/light/desktop/*.png`
- `_design/screenshots/dev/light/wide/*.png`
- `_design/screenshots/dev/dark/mobile/*.png`
- `_design/screenshots/dev/dark/desktop/*.png`
- `_design/screenshots/dev/dark/wide/*.png`
