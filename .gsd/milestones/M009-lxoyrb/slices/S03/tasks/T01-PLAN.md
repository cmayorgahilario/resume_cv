---
estimated_steps: 4
estimated_files: 1
---

# T01: Restructure Experiencia mobile layout for inline date+company and hidden timeline

**Slice:** S03 — Experiencia Layout Fix
**Milestone:** M009-lxoyrb

## Description

Fix the Experiencia section's mobile layout so date and company appear inline on a single row (matching the design screenshot, requirement R042). Three changes in one file:

1. **Hide center timeline column on mobile** — add `hidden` class to all 4 center dot+line column divs so they become `hidden md:flex`
2. **Inline date+company blocks on mobile** — change each of the 4 mobile-only `<div class="flex flex-col gap-0.5 md:hidden">` blocks to `flex items-center gap-2 md:hidden`, add an inline dot element before the date, and add a `·` separator span between date and company
3. **Add border-bottom dividers on mobile** — add `border-b border-[var(--border-default)] md:border-b-0` to items 1-3 outer wrappers (not item 4)

**Relevant skill:** `astro` — this is an Astro component file.

### Important details from codebase inspection:

- **Item 1** (Tech Lead) uses a **filled** dot: `bg-[var(--color-primary-bg)]` — the inline mobile dot must match
- **Items 2-4** use a **hollow** dot: `bg-[var(--bg-primary)] border-[3px] border-[var(--color-primary)]` — inline mobile dots must match
- **Item 4** (Software Developer) has `class="flex gap-6"` (no `pb-8`), while items 1-3 have `class="flex gap-6 pb-8"` — item 4 must NOT get `border-b`
- **Knowledge: "Proyectos.astro Has Duplicate Card Sections"** — after all edits, grep to confirm each title appears exactly once (no duplicate blocks in this file)
- The desktop layout (left date column + center timeline + right content) must remain completely unchanged

## Steps

1. **Hide center timeline columns on mobile.** For all 4 items, find the center column `<div class="w-6 flex flex-col items-center flex-shrink-0">` and change it to `<div class="w-6 hidden md:flex flex-col items-center flex-shrink-0">`. This hides the dot+line on mobile while preserving the desktop timeline.

2. **Restructure mobile date+company blocks to inline layout.** For each of the 4 items:
   - Change `<div class="flex flex-col gap-0.5 md:hidden">` to `<div class="flex items-center gap-2 md:hidden">`
   - Add an inline dot element as the first child:
     - Item 1 (filled): `<div class="w-3 h-3 rounded-full bg-[var(--color-primary-bg)] flex-shrink-0"></div>`
     - Items 2-4 (hollow): `<div class="w-3 h-3 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--color-primary)] flex-shrink-0"></div>`
   - Add a `·` separator between the date and company spans: `<span class="text-[var(--text-secondary)]">·</span>`

3. **Add border-bottom dividers on mobile for items 1-3.** Change the outer wrapper class for each:
   - Item 1: `class="flex gap-6 pb-8"` → `class="flex gap-6 pb-8 border-b border-[var(--border-default)] md:border-b-0"`
   - Item 2: same pattern
   - Item 3: same pattern
   - Item 4: leave as `class="flex gap-6"` — no border, no padding-bottom (last item)

4. **Verify all changes.** Run:
   - `grep -c "flex items-center gap-2 md:hidden" src/components/sections/Experiencia.astro` → expect 4
   - `grep -c "hidden md:flex" src/components/sections/Experiencia.astro` → expect 8 (4 desktop date + 4 center timeline)
   - `grep -c "border-b" src/components/sections/Experiencia.astro` → expect 3
   - `grep -c "Tech Lead" src/components/sections/Experiencia.astro` → expect 1 (no duplicates)
   - `npm run build` → exits 0

## Must-Haves

- [ ] All 4 mobile date+company blocks use `flex items-center gap-2 md:hidden` (inline row)
- [ ] All 4 center timeline column divs have `hidden md:flex` (hidden on mobile)
- [ ] Each mobile block has an inline dot (filled for item 1, hollow for items 2-4)
- [ ] Each mobile block has a `·` separator between date and company
- [ ] Items 1-3 have `border-b border-[var(--border-default)] md:border-b-0` on outer wrapper
- [ ] Item 4 has NO `border-b`
- [ ] Desktop layout completely unchanged (no change to `md:` classes on desktop date columns)
- [ ] `npm run build` exits 0

## Verification

- `grep -c "flex items-center gap-2 md:hidden" src/components/sections/Experiencia.astro` returns 4
- `grep -c "hidden md:flex" src/components/sections/Experiencia.astro` returns 8
- `grep -c "border-b" src/components/sections/Experiencia.astro` returns 3
- `npm run build` exits 0

## Inputs

- `src/components/sections/Experiencia.astro` — current file with stacked mobile layout, visible timeline on mobile, no dividers

## Expected Output

- `src/components/sections/Experiencia.astro` — updated with inline date+company on mobile, hidden timeline column on mobile, border dividers between items 1-3
