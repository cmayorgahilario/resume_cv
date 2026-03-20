---
estimated_steps: 5
estimated_files: 54
---

# T01: Retake all 54 dev screenshots from post-fix build

**Slice:** S07 — Final Visual Verification
**Milestone:** M010-jgngfg

## Description

Run the established screenshot pipeline to capture fresh dev screenshots that reflect all S03–S06 fixes. The pipeline is: build the static site, serve it on port 4322, run the capture script (54 PNGs across 9 sections × 2 modes × 3 viewports), verify the output with the count script, and kill the serve process. No script modifications needed — the infrastructure from S02 is fully operational.

**Important:** The current dev screenshots are pre-fix captures. This task overwrites them with post-fix captures. The screenshots are the input for T02's visual comparison.

## Steps

1. Run `npm run build` to produce a fresh static build including all S03–S06 CSS fixes.
2. Kill any process on port 4322 if occupied: check with `netstat` or `lsof`, kill if needed.
3. Start a static file server: `npx serve dist -l 4322` in the background. Wait until it's ready (listening on port 4322).
4. Run `node _design/take-screenshots.mjs` — expect 54 ✓ lines and 0 ✗ lines. The script takes ~20 seconds.
5. Run `node _design/count-screenshots.mjs` — expect exit 0 with "54/54 passed" and "RESULT: PASS".
6. Kill the `npx serve` process on port 4322.

## Must-Haves

- [ ] `npm run build` exits 0
- [ ] `node _design/take-screenshots.mjs` completes with 54 captured, 0 failed
- [ ] `node _design/count-screenshots.mjs` exits 0 (54/54 passed)
- [ ] All 54 PNGs in `_design/screenshots/dev/` are non-zero bytes

## Verification

- `node _design/count-screenshots.mjs` exits 0
- `find _design/screenshots/dev -name "*.png" -size +0c | wc -l` returns 54
- `npm run build` exits 0

## Inputs

- `_design/take-screenshots.mjs` — Screenshot capture script from S02
- `_design/count-screenshots.mjs` — Verification script from S02
- `src/components/sections/Hero.astro` — Contains S03 max-width fix
- `src/components/sections/Footer.astro` — Contains S03+S04 fixes
- `src/components/sections/Educacion.astro` — Contains S05 responsive stripe fix
- `src/components/sections/Experiencia.astro` — Contains S06 spacing fix

## Expected Output

- `_design/screenshots/dev/light/mobile/*.png` — 9 light mobile screenshots at 390px (overwritten)
- `_design/screenshots/dev/light/desktop/*.png` — 9 light desktop screenshots at 1440px (overwritten)
- `_design/screenshots/dev/light/wide/*.png` — 9 light wide screenshots at 1600px (overwritten)
- `_design/screenshots/dev/dark/mobile/*.png` — 9 dark mobile screenshots at 390px (overwritten)
- `_design/screenshots/dev/dark/desktop/*.png` — 9 dark desktop screenshots at 1440px (overwritten)
- `_design/screenshots/dev/dark/wide/*.png` — 9 dark wide screenshots at 1600px (overwritten)
