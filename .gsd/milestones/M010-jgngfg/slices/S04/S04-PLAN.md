# S04: Footer Desktop Alignment

**Goal:** Footer displays brand info on the left and navigation + social columns on the right in a horizontal row on desktop, matching the `.pen` design's `justify-content: space-between` layout.
**Demo:** At 1440px viewport, the footer shows brand (logo + name + description) left-aligned at 300px width, with NAVEGACIÓN and SOCIAL columns to the right separated by 48px gap. Mobile layout unchanged (vertical stack).

## Must-Haves

- `footerTop` div uses `md:flex-row md:justify-between md:items-start` for horizontal desktop layout
- Brand column constrained to `md:w-[300px]` on desktop
- Nav columns wrapper uses `md:gap-12` (48px) on desktop instead of the mobile 32px
- Mobile layout remains vertical — all changes are `md:` prefixed
- The S03 canonical layout pattern preserved: outer `<footer>` for bg + py, inner `max-w-[1440px] mx-auto px-6 md:px-20` for content

## Verification

- `npm run build` exits 0
- `grep -q "md:flex-row md:justify-between md:items-start" src/components/sections/Footer.astro` exits 0
- `grep -q "md:w-\[300px\]" src/components/sections/Footer.astro` exits 0
- `grep -q "md:gap-12" src/components/sections/Footer.astro` exits 0
- `grep -q "max-w-\[1440px\] mx-auto px-6 md:px-20" src/components/sections/Footer.astro` exits 0 (S03 pattern intact)

## Tasks

- [x] **T01: Add responsive desktop classes to Footer.astro** `est:10m`
  - Why: The footer currently stacks brand and nav columns vertically on all viewports. The `.pen` design shows a horizontal `space-between` layout on desktop. Three Tailwind class additions on three lines fix this.
  - Files: `src/components/sections/Footer.astro`
  - Do: (1) Add `md:flex-row md:justify-between md:items-start` to the `footerTop` div (line 9). (2) Add `md:w-[300px]` to the brand column div (line 12). (3) Add `md:gap-12` to the nav columns wrapper div (line 32, alongside existing `gap-8`). All changes are `md:` prefixed to preserve mobile vertical layout. Do NOT modify the outer `<footer>` or inner `max-w-[1440px]` wrapper — preserve the S03 canonical layout pattern.
  - Verify: `npm run build` exits 0 && `grep -q "md:flex-row md:justify-between md:items-start" src/components/sections/Footer.astro` && `grep -q "md:w-\[300px\]" src/components/sections/Footer.astro` && `grep -q "md:gap-12" src/components/sections/Footer.astro`
  - Done when: All four grep checks pass and build succeeds. Footer HTML has responsive desktop classes that will produce horizontal brand-left/nav-right layout at `md:` breakpoint.

## Files Likely Touched

- `src/components/sections/Footer.astro`

## Observability / Diagnostics

- **Inspection surface:** `grep -n "md:" src/components/sections/Footer.astro` lists all responsive desktop classes in the footer — count should be ≥5 (3 new + 2 existing from S03).
- **Failure visibility:** If desktop layout breaks, the footer will visually stack vertically at ≥768px viewport; inspect browser DevTools for missing `md:flex-row` on the footerTop div.
- **Build-time check:** `npm run build` catches any Astro template syntax errors introduced by class changes.
- **No runtime signals:** This is a static CSS-only change with no JS, no API calls, no error states at runtime.
