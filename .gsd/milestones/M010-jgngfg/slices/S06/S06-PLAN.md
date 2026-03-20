# S06: Experiencia Mobile Spacing

**Goal:** Experience items on mobile have proper spacing between content and horizontal divider lines, matching the .pen design's gap:24 + padding-bottom:24 pattern.
**Demo:** At 390px viewport, experience items 1–3 show 24px gap between items, 24px padding-bottom per item, and a 1px child-div divider (not a CSS border) inside each item. Item 4 has no divider and no extra padding. Desktop layout at 1440px is unchanged.

## Must-Haves

- Timeline container has `gap-6` (24px) on mobile, `md:gap-0` on desktop
- Items 1–3 use `pb-6` (24px) instead of `pb-8` (32px)
- Items 1–3 use a child `<div class="h-px w-full bg-[var(--border-default)] md:hidden">` divider instead of `border-b` CSS property
- Item 4 unchanged — no divider, no padding-bottom
- Desktop layout (dot+line vertical timeline) visually unchanged
- `npm run build` exits 0

## Verification

- `npm run build` exits 0
- `grep -c "gap-6 md:gap-0" src/components/sections/Experiencia.astro` returns 1
- `grep -c "pb-6" src/components/sections/Experiencia.astro` returns 3 (items 1–3)
- `grep -c "border-b" src/components/sections/Experiencia.astro` returns 0 (no CSS borders on items)
- `grep -c "h-px w-full bg-\[var(--border-default)\] md:hidden" src/components/sections/Experiencia.astro` returns 3 (divider divs)

## Observability / Diagnostics

- **Build-time:** `npm run build` catches any template syntax errors introduced by class/div changes.
- **Inspection surface:** `grep -c "border-b" src/components/sections/Experiencia.astro` should always return 0 — any non-zero result indicates a regression to CSS border approach.
- **Failure visibility:** If mobile spacing regresses, inspect the built HTML at `dist/index.html` and search for `h-px w-full` to confirm divider divs are rendered; search for `gap-6 md:gap-0` to confirm container gap. Browser DevTools at 390px viewport width reveals computed padding-bottom values on timeline items.
- **Diagnostic grep for divider pattern:** `grep -n "h-px w-full bg-\[var(--border-default)\] md:hidden" src/components/sections/Experiencia.astro` shows line numbers of all divider elements for quick structural verification.

## Tasks

- [x] **T01: Fix mobile spacing and dividers in Experiencia timeline** `est:20m`
  - Why: The .pen design specifies gap:24 between timeline items, padding-bottom:24 per item, and a 1px divider child element inside each item — current code uses no gap, pb-8 (32px), and CSS border-b instead.
  - Files: `src/components/sections/Experiencia.astro`
  - Do: (1) Add `gap-6 md:gap-0` to the timeline container `<div class="flex flex-col">`. (2) On items 1–3, change `pb-8` to `pb-6`. (3) On items 1–3, remove `border-b border-[var(--border-default)] md:border-b-0` and add a child `<div class="h-px w-full bg-[var(--border-default)] md:hidden"></div>` as the last element inside each item's content wrapper (the `flex-1` div). (4) Item 4 stays unchanged. (5) Desktop layout must remain visually identical — divider divs are `md:hidden`, gap is `md:gap-0`.
  - Verify: `npm run build` exits 0, grep confirms 1× `gap-6 md:gap-0`, 3× `pb-6`, 0× `border-b` on items, 3× divider divs
  - Done when: Build passes and all grep checks confirm the spacing/divider pattern matches the .pen spec

## Files Likely Touched

- `src/components/sections/Experiencia.astro`
