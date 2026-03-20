---
estimated_steps: 4
estimated_files: 1
---

# T01: Fix mobile spacing and dividers in Experiencia timeline

**Slice:** S06 — Experiencia Mobile Spacing
**Milestone:** M010-jgngfg

## Description

The Experiencia section's mobile layout has three spacing discrepancies from the .pen design. The .pen mobile design uses: (1) `gap:24` on the timeline container between items, (2) `padding-bottom:24px` on items 1–3, and (3) a 1px divider as a child element inside each item (not a CSS border). The current code uses no container gap, `pb-8` (32px) padding-bottom, and `border-b` (a CSS border property). All changes are mobile-only — desktop uses the vertical dot+line column and should remain unchanged.

**Relevant skill:** `astro` — this is an Astro component file.

## Steps

1. **Add mobile gap to timeline container.** On the `<div class="flex flex-col">` (the vertical timeline wrapper, around line 13), change to `<div class="flex flex-col gap-6 md:gap-0">`. This adds 24px gap between items on mobile, and 0 gap on desktop (desktop spacing is handled by the dot+line column and per-item padding-bottom:32).

2. **Fix items 1–3 padding and remove border-b.** For each of the 3 item wrappers (items 1, 2, 3), change their class from `pb-8 border-b border-[var(--border-default)] md:border-b-0` to just `pb-6`. This changes padding-bottom from 32px to 24px (matching .pen) and removes the CSS border entirely. The exact current classes on these items are:
   - Item 1: `class="flex gap-6 pb-8 border-b border-[var(--border-default)] md:border-b-0"`
   - Item 2: `class="flex gap-6 pb-8 border-b border-[var(--border-default)] md:border-b-0"`
   - Item 3: `class="flex gap-6 pb-8 border-b border-[var(--border-default)] md:border-b-0"`
   - Change each to: `class="flex gap-6 pb-6"`

3. **Add child divider divs to items 1–3.** Inside each item's content wrapper (the `<div class="flex-1 flex flex-col gap-2 pt-0.5">` div), add as the **last child** (after the `<p>` paragraph):
   ```html
   <div class="h-px w-full bg-[var(--border-default)] md:hidden"></div>
   ```
   This creates a 1px horizontal line matching the .pen's divider-inside-item pattern. It's hidden on desktop (`md:hidden`) since desktop uses the connecting vertical line in the center column.

4. **Verify item 4 is unchanged.** Item 4 (`<div class="flex gap-6">`) should have no divider and no padding-bottom — confirm it was not modified.

## Must-Haves

- [ ] Timeline container has `gap-6 md:gap-0` class
- [ ] Items 1–3 use `pb-6` (not `pb-8`)
- [ ] Items 1–3 have NO `border-b` CSS class
- [ ] Items 1–3 each contain a `<div class="h-px w-full bg-[var(--border-default)] md:hidden"></div>` divider as last child of the content wrapper
- [ ] Item 4 has no divider div and no padding-bottom class
- [ ] Desktop layout unchanged — dividers are `md:hidden`, gap is `md:gap-0`
- [ ] `npm run build` exits 0

## Verification

- `npm run build` exits 0
- `grep -c "gap-6 md:gap-0" src/components/sections/Experiencia.astro` returns 1
- `grep -c "pb-6" src/components/sections/Experiencia.astro` returns 3
- `grep -c "border-b" src/components/sections/Experiencia.astro` returns 0
- `grep -c "h-px w-full" src/components/sections/Experiencia.astro` returns 3

## Inputs

- `src/components/sections/Experiencia.astro` — current experience timeline with incorrect mobile spacing (pb-8, border-b, no container gap)

## Expected Output

- `src/components/sections/Experiencia.astro` — updated with gap-6 on container, pb-6 on items 1–3, child divider divs replacing border-b, desktop layout preserved
