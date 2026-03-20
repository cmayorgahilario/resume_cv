# S04: Contacto Layout Fix

**Goal:** Section header is left-aligned and form + info card span full width on mobile, matching the design screenshot.
**Demo:** At 390×844 viewport, the CONTACTO label/title/subtitle are left-aligned, the form card and contact info card each stretch edge-to-edge (minus section padding), and the desktop layout at 1440px is unchanged.

## Must-Haves

- Header div (`items-center text-center`) uses responsive prefixes so it's left-aligned on mobile and centered on desktop
- Two-column container `items-start` uses responsive prefix so children stretch full-width on mobile
- Form column wrapper has explicit `w-full` for mobile full-width
- `npm run build` exits 0
- Desktop layout at 1440px shows no regressions (header centered, two-column layout intact)

## Verification

- `npm run build` exits 0
- `grep -q "md:items-center md:text-center" src/components/sections/Contacto.astro` — header alignment is responsive
- `grep -q "md:items-start" src/components/sections/Contacto.astro` — container alignment is responsive
- `grep -q "w-full flex-1" src/components/sections/Contacto.astro` — form column has explicit full-width

## Tasks

- [ ] **T01: Apply responsive Tailwind classes for mobile Contacto layout** `est:15m`
  - Why: The design shows header left-aligned and form/info card full-width on mobile; current implementation centers the header and constrains children width via `items-start`. Three Tailwind class edits in one file fix both issues. Covers requirement R043.
  - Files: `src/components/sections/Contacto.astro`
  - Do: (1) Change header div classes from `items-center text-center` to `md:items-center md:text-center` — removes centering on mobile, preserves on desktop. (2) Change two-column container from `items-start` to `md:items-start` — allows children to stretch full-width on mobile via default `align-items: stretch`. (3) Add `w-full` to the form column wrapper alongside `flex-1` — ensures explicit full-width on mobile. The right column already has `w-full md:w-[360px]` so no change needed there. All changes use responsive prefixes to preserve desktop behavior.
  - Verify: `npm run build` exits 0; grep confirms all three class changes are present
  - Done when: Build passes, all three responsive class patterns are in the source, and a visual check at 390px confirms left-aligned header + full-width cards

## Files Likely Touched

- `src/components/sections/Contacto.astro`
