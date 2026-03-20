---
estimated_steps: 4
estimated_files: 1
---

# T01: Apply responsive flex-direction and stripe classes to all 4 education cards

**Slice:** S05 — Educación Mobile Card Borders
**Milestone:** M010-jgngfg

## Description

The Educación section has 4 cards (1 degree panel + 3 certification rows). Each has a 5px colored stripe on the left side, rendered via `flex flex-row` on the card wrapper + a `w-[5px] self-stretch` stripe div. The `.pen` mobile design shows the stripe as a horizontal bar on TOP of the card. This task applies responsive Tailwind classes so mobile (< 768px) shows a top stripe and desktop (≥ 768px) preserves the left stripe.

This is a pure CSS/Tailwind change in a single file. No HTML structure changes, no JS, no new components.

**Relevant skill:** `astro` — this is an `.astro` component file.

## Steps

1. **Edit the degree card wrapper** (line 20 of `Educacion.astro`). Change `flex flex-row` to `flex flex-col md:flex-row` on the div that has `overflow-hidden`. The full class string to find is:
   ```
   bg-[var(--bg-card)] rounded-[16px] border-[1.5px] border-[var(--border-default)] shadow-[0_2px_12px_#00000012] overflow-hidden flex flex-row
   ```
   Replace with:
   ```
   bg-[var(--bg-card)] rounded-[16px] border-[1.5px] border-[var(--border-default)] shadow-[0_2px_12px_#00000012] overflow-hidden flex flex-col md:flex-row
   ```

2. **Edit the degree stripe div** (line 23). Change from:
   ```
   w-[5px] bg-[var(--color-primary-bg)] self-stretch flex-shrink-0
   ```
   To:
   ```
   h-[5px] w-full md:w-[5px] md:h-auto md:self-stretch flex-shrink-0 bg-[var(--color-primary-bg)]
   ```

3. **Edit the 3 certification card wrappers** (lines 101, 137, 173). Each has the same class pattern:
   ```
   bg-[var(--bg-card)] rounded-[12px] border-[1.5px] border-[var(--border-default)] shadow-[0_2px_12px_#00000012] overflow-hidden flex flex-row
   ```
   Replace `flex flex-row` → `flex flex-col md:flex-row` in each. These 3 edits have identical old text, so run the edit tool 3 times (it replaces only the first match each time).

4. **Edit the 3 certification stripe divs** (lines 103, 139, 175). Each stripe div follows one of two patterns:
   - Lines 103, 175 (amber): `w-[5px] bg-[var(--color-amber)] self-stretch flex-shrink-0` → `h-[5px] w-full md:w-[5px] md:h-auto md:self-stretch flex-shrink-0 bg-[var(--color-amber)]`
   - Line 139 (indigo): `w-[5px] bg-[var(--color-primary-bg)] self-stretch flex-shrink-0` → `h-[5px] w-full md:w-[5px] md:h-auto md:self-stretch flex-shrink-0 bg-[var(--color-primary-bg)]`

   **IMPORTANT:** The degree stripe (step 2) and the CAL I stripe (line 139) have IDENTICAL class text (`w-[5px] bg-[var(--color-primary-bg)] self-stretch flex-shrink-0`). After step 2 changes the degree stripe, the edit tool's first-match behavior will correctly target line 139 for the CAL I stripe. Edit the degree stripe FIRST, then the CAL I stripe.

   Similarly, the two amber stripes (lines 103 and 175) share the same class text. Edit them sequentially — each `edit` call replaces the next remaining match.

**Critical constraint:** Do NOT modify any inner `flex flex-row` classes. These exist on:
- Line 75: stats column (`flex flex-row md:flex-col`) — already responsive, leave it alone
- Lines 105, 141, 177: cert content containers (`flex flex-row flex-wrap`) — these control icon+text horizontal layout
- Lines 107, 143, 179: icon+text groups (`flex flex-row items-center`) — inner layout
- Line 236: platform pills (`flex flex-row flex-wrap`) — summary bar pills

Only the 4 outermost card wrappers (the ones with `overflow-hidden` + `shadow-*`) should change.

## Must-Haves

- [ ] 4 card wrappers changed from `flex flex-row` to `flex flex-col md:flex-row`
- [ ] 4 stripe divs changed from `w-[5px] ... self-stretch` to `h-[5px] w-full md:w-[5px] md:h-auto md:self-stretch`
- [ ] Zero inner `flex flex-row` divs modified (content, icon, stats, pills layouts)
- [ ] `overflow-hidden` and `rounded-*` classes preserved on all card wrappers
- [ ] `npm run build` exits 0

## Verification

- Run `npm run build` — must exit 0
- Run `grep -c "flex flex-col md:flex-row" src/components/sections/Educacion.astro` — must return exactly 4
- Run `grep "overflow-hidden flex flex-row" src/components/sections/Educacion.astro` — must return 0 matches (no old pattern remaining on card wrappers)
- Run `grep -c "h-\[5px\] w-full" src/components/sections/Educacion.astro` — must return exactly 4
- Run `grep -c "flex flex-row" src/components/sections/Educacion.astro` — should return 8 (the 8 inner flex-row usages that were NOT changed: lines 75, 105, 107, 141, 143, 177, 179, 236)

## Inputs

- `src/components/sections/Educacion.astro` — current file with 4 card wrappers using `flex flex-row` and 4 stripe divs using `w-[5px] ... self-stretch`

## Expected Output

- `src/components/sections/Educacion.astro` — updated with responsive `flex flex-col md:flex-row` on 4 card wrappers and `h-[5px] w-full md:w-[5px] md:h-auto md:self-stretch` on 4 stripe divs
