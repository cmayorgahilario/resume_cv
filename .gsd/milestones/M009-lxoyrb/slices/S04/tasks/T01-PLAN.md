---
estimated_steps: 4
estimated_files: 1
---

# T01: Apply responsive Tailwind classes for mobile Contacto layout

**Slice:** S04 — Contacto Layout Fix
**Milestone:** M009-lxoyrb

## Description

The Contacto section has two mobile layout discrepancies vs the design screenshot (R043): the header is centered instead of left-aligned, and the form/info card don't span full width. All fixes are pure Tailwind responsive class changes in one file — no structural HTML, no JS, no new elements.

**Relevant skills:** `astro` (Astro project conventions).

## Steps

1. Open `src/components/sections/Contacto.astro` and locate the section header div (the one with `flex flex-col gap-3 items-center text-center`). Change `items-center text-center` to `md:items-center md:text-center`. This removes centering on mobile (defaults to `items-stretch` + left-aligned text) while preserving centered layout on desktop.

2. Locate the two-column container div (the one with `flex flex-col md:flex-row gap-8 md:gap-[32px] items-start`). Change `items-start` to `md:items-start`. On mobile (where `flex-col` applies), the default `align-items: stretch` will make children span full container width. On desktop (`md:flex-row`), `items-start` top-aligns the two columns.

3. Locate the form column wrapper div (the one with just `class="flex-1"`). Change it to `class="w-full flex-1"`. This ensures the form column explicitly takes full width on mobile. The right column (contact info card) already has `w-full md:w-[360px]` so no change is needed there.

4. Run `npm run build` to verify no compile errors.

## Must-Haves

- [ ] Header div uses `md:items-center md:text-center` (not bare `items-center text-center`)
- [ ] Two-column container uses `md:items-start` (not bare `items-start`)
- [ ] Form column wrapper has `w-full flex-1` (not bare `flex-1`)
- [ ] `npm run build` exits 0
- [ ] No changes to any other file — changes are scoped to `Contacto.astro` only

## Verification

- `npm run build` exits 0
- `grep -q "md:items-center md:text-center" src/components/sections/Contacto.astro` exits 0
- `grep -q "md:items-start" src/components/sections/Contacto.astro` exits 0
- `grep -q "w-full flex-1" src/components/sections/Contacto.astro` exits 0
- Visual check at 390×844 viewport: header left-aligned, form card and info card full-width
- Quick desktop sanity check at 1440px: header still centered, two-column layout intact

## Inputs

- `src/components/sections/Contacto.astro` — current implementation with centered header and `items-start` container

## Expected Output

- `src/components/sections/Contacto.astro` — updated with responsive Tailwind classes for mobile-correct layout
