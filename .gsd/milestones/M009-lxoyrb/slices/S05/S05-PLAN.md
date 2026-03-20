# S05: Final Visual Verification

**Goal:** Confirm that all S01–S04 fixes produce dev screenshots visually matching the 7 design screenshots, with 0 remaining discrepancies, build passing, and no desktop regressions.
**Demo:** 7 retaken dev screenshots in `_design/screenshots/dev/` visually match their design counterparts in `_design/screenshots/design/`, `npm run build` exits 0, and desktop sanity check at 1440px shows no regressions.

## Must-Haves

- All 7 dev screenshots retaken at 390×844 / 2x retina with header hidden
- Visual comparison of each dev screenshot against its design counterpart — 0 discrepancies
- Desktop sanity check at 1440×900 shows no regressions
- `npm run build` exits 0

## Proof Level

- This slice proves: final-assembly
- Real runtime required: yes (dev server + browser screenshots)
- Human/UAT required: yes (visual comparison is the milestone's UAT gate)

## Verification

- `npm run build` exits 0
- All 7 dev screenshot files exist: `test -f _design/screenshots/dev/001_hero.png && test -f _design/screenshots/dev/002_sobre_mi.png && test -f _design/screenshots/dev/003_skills.png && test -f _design/screenshots/dev/004_proyectos.png && test -f _design/screenshots/dev/005_experiencia.png && test -f _design/screenshots/dev/006_contacto.png && test -f _design/screenshots/dev/007_footer.png`
- Visual side-by-side comparison of all 7 pairs confirms 0 discrepancies (agent reads each design PNG then its dev PNG and reports match/mismatch)

## Integration Closure

- Upstream surfaces consumed: `src/components/sections/Hero.astro` (S01), `src/components/sections/Skills.astro` (S01), `src/components/sections/Proyectos.astro` (S02), `src/components/sections/Experiencia.astro` (S03), `src/components/sections/Contacto.astro` (S04)
- New wiring introduced in this slice: none — verification only
- What remains before the milestone is truly usable end-to-end: nothing — this slice is the milestone's final gate

## Tasks

- [ ] **T01: Retake 7 mobile screenshots and visually verify against design** `est:20m`
  - Why: This is the milestone's final gate — all S01–S04 fixes must be visually confirmed by comparing retaken dev screenshots against the design originals. Validates R045.
  - Files: `_design/screenshots/dev/001_hero.png`, `_design/screenshots/dev/002_sobre_mi.png`, `_design/screenshots/dev/003_skills.png`, `_design/screenshots/dev/004_proyectos.png`, `_design/screenshots/dev/005_experiencia.png`, `_design/screenshots/dev/006_contacto.png`, `_design/screenshots/dev/007_footer.png`
  - Do: (1) Confirm `npm run build` exits 0. (2) Start dev server via `bg_shell` with `ready_port:4321`. (3) Navigate browser to localhost, set viewport to 390×844 via `browser_set_viewport` with custom width/height. (4) Hide sticky header via `browser_evaluate`: `document.querySelector('header').style.display = 'none'`. (5) Screenshot each of the 7 sections by CSS selector (`#inicio`, `#sobre-mi`, `#habilidades`, `#proyectos`, `#experiencia`, `#contacto`, `footer`) — save each to the matching `_design/screenshots/dev/00N_*.png` path. (6) Read each design PNG from `_design/screenshots/design/` and its dev PNG pair, visually compare side-by-side. (7) Set viewport to 1440×900 for desktop sanity check — quick visual scan for regressions. (8) Report results: 0 discrepancies = pass, or list any findings. **Skills:** Load `agent-browser` skill for browser automation patterns. **Gotchas from KNOWLEDGE.md:** Check actual dev server port from output (may auto-increment); wait for `network_idle` after navigation before `browser_evaluate` to avoid HMR context destruction.
  - Verify: `npm run build` exits 0 and all 7 dev screenshot files exist in `_design/screenshots/dev/`
  - Done when: All 7 dev screenshots visually match their design counterparts with 0 discrepancies, desktop sanity check shows no regressions, build passes

## Files Likely Touched

- `_design/screenshots/dev/001_hero.png`
- `_design/screenshots/dev/002_sobre_mi.png`
- `_design/screenshots/dev/003_skills.png`
- `_design/screenshots/dev/004_proyectos.png`
- `_design/screenshots/dev/005_experiencia.png`
- `_design/screenshots/dev/006_contacto.png`
- `_design/screenshots/dev/007_footer.png`
