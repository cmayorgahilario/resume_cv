# S03: Experiencia Layout Fix

**Goal:** Date and company appear inline on mobile (e.g. "2022 — 2025 · Real Plaza"), timeline column hidden on mobile, horizontal dividers between items — matching the design screenshot.
**Demo:** At 390×844 viewport, each experience item shows date · company on one line with an inline dot, no vertical timeline column, and a thin divider between items.

## Must-Haves

- All 4 mobile date+company blocks display inline (single row) with a `·` separator between date and company
- Center timeline column (dot + line) hidden on mobile, visible on desktop
- Inline dot rendered before date text on mobile — filled for item 1, hollow for items 2-4
- Horizontal border-bottom divider between items on mobile (items 1-3, not item 4)
- Desktop timeline layout unchanged
- `npm run build` exits 0

## Verification

- `npm run build` exits 0
- `grep -c "flex items-center gap-2 md:hidden" src/components/sections/Experiencia.astro` returns 4 (all mobile blocks converted to inline)
- `grep -c "hidden md:flex" src/components/sections/Experiencia.astro` returns 8 (4 desktop date columns + 4 center timeline columns, all hidden on mobile)
- `grep -c "border-b" src/components/sections/Experiencia.astro` returns 3 (dividers on items 1-3)

## Tasks

- [x] **T01: Restructure Experiencia mobile layout for inline date+company and hidden timeline** `est:25m`
  - Why: R042 requires date and company to appear inline on mobile. Currently they're stacked vertically, the timeline column is visible on mobile, and there are no dividers between items.
  - Files: `src/components/sections/Experiencia.astro`
  - Do: (1) Add `hidden` to center timeline column divs so they become `hidden md:flex`. (2) Change all 4 mobile date+company blocks from `flex flex-col gap-0.5` to `flex items-center gap-2` and add inline dot + `·` separator. (3) Add `border-b border-[var(--border-default)] md:border-b-0` to items 1-3 wrappers. Preserve filled vs hollow dot distinction. Verify all 4 items changed.
  - Verify: `npm run build` exits 0; grep counts match plan verification section
  - Done when: All 4 items have inline date+company on mobile, timeline hidden on mobile, dividers between items 1-3, desktop layout unchanged, build passes

## Observability / Diagnostics

This slice is a pure static layout change — no runtime behavior, API calls, or client-side JavaScript. Diagnostic signals:

- **Build-time verification:** `npm run build` exits 0, confirming the Astro template compiles cleanly.
- **Structural grep checks:** The grep-based verification commands in the Verification section serve as the primary diagnostic surface for confirming correct class application.
- **Visual inspection:** At 390×844 viewport, the Experiencia section should show inline date·company rows with dots and dividers. Desktop viewport should show the original timeline layout unchanged.
- **Failure visibility:** A malformed template will cause `npm run build` to fail with an Astro compilation error pointing to the exact line. Missing classes will be caught by the grep count checks.

## Files Likely Touched

- `src/components/sections/Experiencia.astro`
