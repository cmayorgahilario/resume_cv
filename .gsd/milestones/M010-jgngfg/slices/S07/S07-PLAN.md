# S07: Final Visual Verification

**Goal:** Retake all 54 dev screenshots reflecting S03–S06 fixes and visually confirm 0 discrepancies against the 36 design references, satisfying R056.
**Demo:** `node _design/count-screenshots.mjs` exits 0 (54/54 present) and visual comparison report confirms 0 remaining discrepancies across all 36 design↔dev pairs.

## Must-Haves

- All 54 dev screenshots retaken from a fresh build that includes S03–S06 fixes
- `node _design/count-screenshots.mjs` exits 0
- All 36 design↔dev pairs (light/dark × mobile/desktop) visually compared
- 18 wide (1600px) screenshots checked for max-width compliance (content within 1440px)
- Visual comparison report with per-pair assessment — 0 discrepancies remaining

## Proof Level

- This slice proves: final-assembly
- Real runtime required: yes (static build served for screenshot capture)
- Human/UAT required: yes (visual comparison is human-judgment work)

## Verification

- `node _design/count-screenshots.mjs` exits 0 (54/54 passed)
- `find _design/screenshots/dev -name "*.png" -size +0c | wc -l` returns 54
- `npm run build` exits 0
- Visual comparison report exists and documents 0 discrepancies across all 36 design↔dev pairs

## Integration Closure

- Upstream surfaces consumed: `_design/take-screenshots.mjs` (S02), `_design/count-screenshots.mjs` (S02), `_design/screenshots/design/{light,dark}/{desktop,mobile}/*.png` (S01 + pre-existing light refs), all S03–S06 CSS fixes in `src/components/sections/*.astro`
- New wiring introduced in this slice: none
- What remains before the milestone is truly usable end-to-end: nothing — this slice IS the final assembly proof

## Tasks

- [ ] **T01: Retake all 54 dev screenshots from post-fix build** `est:15m`
  - Why: The existing dev screenshots were captured before S03–S06 fixes. Fresh captures are needed to reflect the corrected state.
  - Files: `_design/screenshots/dev/**/*.png`, `_design/take-screenshots.mjs`, `_design/count-screenshots.mjs`
  - Do: Run `npm run build`, serve `dist/` on port 4322 via `npx serve`, execute `node _design/take-screenshots.mjs` to capture all 54 PNGs, verify with `node _design/count-screenshots.mjs`, then kill the serve process.
  - Verify: `node _design/count-screenshots.mjs` exits 0 (54/54 passed)
  - Done when: All 54 dev screenshots exist, are non-zero bytes, and reflect the post-fix build

- [ ] **T02: Compare all design↔dev pairs and confirm 0 discrepancies** `est:30m`
  - Why: This is the slice's real deliverable — the proof that S03–S06 fixes produce a pixel-faithful implementation matching the .pen design. Validates R056.
  - Files: `_design/screenshots/design/{light,dark}/{desktop,mobile}/*.png`, `_design/screenshots/dev/{light,dark}/{mobile,desktop}/*.png`, `_design/screenshots/dev/{light,dark}/wide/*.png`
  - Do: Load each design reference PNG alongside its matching dev PNG and visually compare. Process in 4 batches: light/desktop (9 pairs), light/mobile (9 pairs), dark/desktop (9 pairs), dark/mobile (9 pairs). For the 18 wide screenshots, verify content stays within 1440px and backgrounds extend full width. Note: design light/mobile `002_header.png` matches dev `002_hero.png` (same section, legacy naming).
  - Verify: Visual comparison report documents each pair and confirms 0 remaining discrepancies
  - Done when: All 36 pairs compared, 18 wide screenshots checked, 0 discrepancies documented, R056 validated

## Files Likely Touched

- `_design/screenshots/dev/light/mobile/*.png`
- `_design/screenshots/dev/light/desktop/*.png`
- `_design/screenshots/dev/light/wide/*.png`
- `_design/screenshots/dev/dark/mobile/*.png`
- `_design/screenshots/dev/dark/desktop/*.png`
- `_design/screenshots/dev/dark/wide/*.png`
