# S05: Educación Mobile Card Borders

**Goal:** Mobile education cards (degree + 3 certifications) show a colored horizontal stripe on top instead of a vertical stripe on the left, matching the `.pen` mobile design. Desktop layout remains unchanged.
**Demo:** At 390px viewport, all 4 cards in the Educación section have a horizontal colored bar spanning the full card width at the top. At 1440px, the same cards have a vertical left stripe as before.

## Must-Haves

- All 4 card wrappers (degree + 3 certs) use `flex flex-col md:flex-row` instead of `flex flex-row`
- All 4 stripe divs use `h-[5px] w-full md:w-[5px] md:h-auto md:self-stretch` instead of `w-[5px] ... self-stretch`
- Inner content `flex flex-row` divs (icon+text layouts, stats column) are NOT changed
- `overflow-hidden` and `rounded-*` classes preserved on card wrappers
- `npm run build` exits 0
- Desktop layout at ≥768px is visually identical to current

## Verification

- `npm run build` exits 0
- `grep -c "flex flex-col md:flex-row" src/components/sections/Educacion.astro` returns exactly 4 (the 4 card wrappers)
- `grep "overflow-hidden flex flex-row" src/components/sections/Educacion.astro` returns 0 matches (no card wrapper still using the old pattern)
- `grep -c "h-\[5px\] w-full" src/components/sections/Educacion.astro` returns exactly 4 (the 4 stripe divs)
- `grep '"w-\[5px\]' src/components/sections/Educacion.astro` returns 0 matches (no old stripe pattern remaining — failure diagnostic check)

## Tasks

- [x] **T01: Apply responsive flex-direction and stripe classes to all 4 education cards** `est:20m`
  - Why: R054 requires mobile cards to have a horizontal top stripe instead of vertical left stripe. This is the entire slice — a single-file Tailwind class change across 4 card wrappers and 4 stripe divs.
  - Files: `src/components/sections/Educacion.astro`
  - Do: Change 4 card wrapper divs from `flex flex-row` to `flex flex-col md:flex-row`. Change 4 stripe divs from `w-[5px] bg-[...] self-stretch flex-shrink-0` to `h-[5px] w-full md:w-[5px] md:h-auto md:self-stretch flex-shrink-0 bg-[...]`. Do NOT touch inner `flex flex-row` on content/icon/stats divs. Preserve `overflow-hidden` and `rounded-*` on wrappers. See T01-PLAN.md for exact edit targets.
  - Verify: `npm run build` exits 0, grep checks confirm 4 instances of new pattern and 0 of old pattern
  - Done when: All 4 card wrappers use `flex flex-col md:flex-row`, all 4 stripes use `h-[5px] w-full md:w-[5px] md:h-auto md:self-stretch`, build passes, no inner flex-row divs were changed

## Observability / Diagnostics

This is a pure CSS/Tailwind class change with no runtime JS. Observability is static:

- **Inspection surface:** `grep -n "flex flex-col md:flex-row" src/components/sections/Educacion.astro` shows all 4 responsive card wrappers with line numbers. `grep -n "h-\[5px\] w-full" src/components/sections/Educacion.astro` shows all 4 responsive stripe divs.
- **Failure visibility:** If any card wrapper still uses `flex flex-row` without `flex-col`, `grep "overflow-hidden flex flex-row" src/components/sections/Educacion.astro` will return matches (should return 0). If any stripe div still uses the old `w-[5px] ... self-stretch` pattern, `grep "w-\[5px\].*self-stretch" src/components/sections/Educacion.astro` will return matches (should return 0).
- **Visual verification:** At 390px viewport, cards should show horizontal top stripe. At ≥768px, cards should show vertical left stripe. Use browser DevTools responsive mode to toggle.
- **Redaction:** No secrets, tokens, or PII involved — this is a presentation-only change.

## Files Likely Touched

- `src/components/sections/Educacion.astro`
