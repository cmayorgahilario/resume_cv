---
estimated_steps: 4
estimated_files: 1
---

# T01: Add responsive desktop classes to Footer.astro

**Slice:** S04 — Footer Desktop Alignment
**Milestone:** M010-jgngfg

## Description

The footer currently stacks brand info and navigation columns vertically on all viewports. The `.pen` design specifies a horizontal `justify-content: space-between` layout on desktop: brand (logo + name + description) on the left at 300px width, navigation + social columns on the right with 48px gap between them. Mobile stays vertical.

This task adds three `md:` Tailwind class groups to three lines in `Footer.astro`. No structural HTML changes, no new elements, no JS changes.

**Relevant skill:** `astro` (Astro project structure)

## Steps

1. Open `src/components/sections/Footer.astro` and locate line 9 — the `footerTop` div with classes `flex flex-col gap-8`. Add `md:flex-row md:justify-between md:items-start` so the full class string becomes `flex flex-col gap-8 md:flex-row md:justify-between md:items-start`.
2. Locate line 12 — the brand column div with classes `flex flex-col gap-3`. Add `md:w-[300px]` so the full class string becomes `flex flex-col gap-3 md:w-[300px]`.
3. Locate line 32 — the nav columns wrapper div with classes `flex flex-row gap-8`. Add `md:gap-12` so the full class string becomes `flex flex-row gap-8 md:gap-12`.
4. Run `npm run build` and grep verification to confirm all changes are present and build succeeds.

## Must-Haves

- [ ] `footerTop` div has `md:flex-row md:justify-between md:items-start` classes
- [ ] Brand column div has `md:w-[300px]` class
- [ ] Nav columns wrapper div has `md:gap-12` class
- [ ] Mobile layout unchanged — all additions are `md:` prefixed only
- [ ] S03 canonical layout pattern preserved — outer `<footer>` has `bg-*` + `py-*`, inner div has `max-w-[1440px] mx-auto px-6 md:px-20`

## Verification

- `npm run build` exits 0
- `grep -q "md:flex-row md:justify-between md:items-start" src/components/sections/Footer.astro` exits 0
- `grep -q "md:w-\[300px\]" src/components/sections/Footer.astro` exits 0
- `grep -q "md:gap-12" src/components/sections/Footer.astro` exits 0
- `grep -q "max-w-\[1440px\] mx-auto px-6 md:px-20" src/components/sections/Footer.astro` exits 0

## Inputs

- `src/components/sections/Footer.astro` — current footer with vertical-only layout (99 lines, S03 max-width fix already applied)

## Expected Output

- `src/components/sections/Footer.astro` — updated with three `md:` class additions for horizontal desktop layout
