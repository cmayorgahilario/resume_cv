# S06: Fix "Ver Proyectos" Button + Retake Hero Screenshot

**Goal:** Both Hero CTA buttons have `flex-1 md:flex-initial text-center`, matching design proportions equally on mobile. Hero screenshot retaken and visually confirmed.
**Demo:** Retaken `_design/screenshots/dev/001_hero.png` shows both CTA buttons spanning equal width at 390×844, matching `_design/screenshots/design/001_hero.png`.

## Must-Haves

- "Ver Proyectos" button in `Hero.astro` has `flex-1 md:flex-initial text-center` in its class list (matching the "Contactar" button)
- `npm run build` exits 0
- Hero screenshot retaken at 390×844 @2x and visually confirmed against design

## Verification

- `grep -c "flex-1 md:flex-initial text-center" src/components/sections/Hero.astro` returns `2` (both CTA buttons have the classes)
- `npm run build` exits 0
- Visual comparison: `_design/screenshots/dev/001_hero.png` matches `_design/screenshots/design/001_hero.png` — both buttons span equal width

## Tasks

- [ ] **T01: Add flex classes to "Ver Proyectos" button, rebuild, and retake hero screenshot** `est:15m`
  - Why: S01 added `flex-1 md:flex-initial text-center` to the "Contactar" button but missed the "Ver Proyectos" button — both must have these classes for equal-width mobile layout
  - Files: `src/components/sections/Hero.astro`, `_design/screenshots/dev/001_hero.png`
  - Do: Add `flex-1 md:flex-initial text-center` to the "Ver Proyectos" `<a>` tag class list. Grep to confirm both buttons have the classes. Run `npm run build`. Serve `dist/` on port 4322 via `npx serve dist -l 4322`. Run `node _design/take-screenshots.mjs` to retake screenshots. Visually compare `_design/screenshots/dev/001_hero.png` against `_design/screenshots/design/001_hero.png`.
  - Verify: `grep -c "flex-1 md:flex-initial text-center" src/components/sections/Hero.astro` returns `2` AND `npm run build` exits 0
  - Done when: Both CTA buttons have identical flex/text-center classes, build passes, and retaken hero screenshot visually matches design proportions

## Files Likely Touched

- `src/components/sections/Hero.astro`
- `_design/screenshots/dev/001_hero.png`
