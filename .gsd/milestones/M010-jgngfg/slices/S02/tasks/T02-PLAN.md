---
estimated_steps: 5
estimated_files: 7
---

# T02: Build site, run screenshot script, and verify 54 output PNGs

**Slice:** S02 — Dev Screenshot Infrastructure
**Milestone:** M010-jgngfg

## Description

Execute the rewritten screenshot script from T01 against the built static site to produce all 54 dev screenshots. This task handles the build → serve → capture → verify pipeline. If any screenshots fail, debug the script and re-run. The task is done when `count-screenshots.mjs` confirms 54 valid PNGs in the correct folder structure.

## Steps

1. **Build the site:** Run `npm run build` and confirm it exits 0. This produces `dist/` which the screenshot script serves from.

2. **Start static server:** Run `npx serve dist -l 4322` in the background. Wait for the server to be ready (port 4322 open). Verify with a quick `curl http://localhost:4322` or equivalent.

3. **Run the screenshot script:** Execute `node _design/take-screenshots.mjs`. Watch for errors. If screenshots fail for specific sections, check that the selectors match the actual DOM (selectors from T01: `header`, `#inicio`, `#sobre-mi`, `#habilidades`, `#proyectos`, `#experiencia`, `#educacion`, `#contacto`, `footer`). If the script fails due to a context/navigation issue, fix the script and re-run.

4. **Verify output:** Run `node _design/count-screenshots.mjs`. It should exit 0, confirming 54 PNGs exist with correct names and non-zero file sizes across all 6 subdirectories.

5. **Stop the static server** after successful verification.

## Must-Haves

- [ ] `npm run build` exits 0
- [ ] All 54 PNG files exist in `_design/screenshots/dev/{light,dark}/{mobile,desktop,wide}/`
- [ ] Every PNG file is > 0 bytes
- [ ] All filenames follow `001_header.png` through `009_footer.png` pattern
- [ ] `node _design/count-screenshots.mjs` exits 0

## Verification

- `node _design/count-screenshots.mjs` exits 0
- `find _design/screenshots/dev -name "*.png" | wc -l` returns 54

## Observability Impact

- **New artifact surface:** 54 PNG files in `_design/screenshots/dev/{light,dark}/{mobile,desktop,wide}/` provide visual regression baselines for all 9 site sections across viewports and color modes.
- **Inspection:** `node _design/count-screenshots.mjs` gives structured pass/fail summary with per-file diagnostics. `ls -la _design/screenshots/dev/{light,dark}/{mobile,desktop,wide}/` shows file sizes.
- **Failure state:** Missing or zero-byte PNGs are individually reported. Partial output directories reveal how far a capture run progressed before failure.
- **No runtime signals change** — this task produces static assets, not running services.

## Inputs

- `_design/take-screenshots.mjs` — rewritten screenshot script from T01
- `_design/count-screenshots.mjs` — verification script from T01
- `dist/` — built site output (created by `npm run build` in this task)

## Expected Output

- `_design/screenshots/dev/light/mobile/001_header.png` through `009_footer.png` — 9 light mobile screenshots
- `_design/screenshots/dev/light/desktop/001_header.png` through `009_footer.png` — 9 light desktop screenshots
- `_design/screenshots/dev/light/wide/001_header.png` through `009_footer.png` — 9 light wide screenshots
- `_design/screenshots/dev/dark/mobile/001_header.png` through `009_footer.png` — 9 dark mobile screenshots
- `_design/screenshots/dev/dark/desktop/001_header.png` through `009_footer.png` — 9 dark desktop screenshots
- `_design/screenshots/dev/dark/wide/001_header.png` through `009_footer.png` — 9 dark wide screenshots
