# S03: Max-Width Constraint Fix

**Goal:** At 1600px viewport width, all section content stays within 1440px. Background colors extend full viewport but content does not stretch beyond 1440px.
**Demo:** Open the site at 1600px wide — every section's content aligns with the Header's content width (1280px effective content area = 1440px max-width minus 160px horizontal padding). Section backgrounds span the full viewport.

## Must-Haves

- `px-6 md:px-20` removed from outer `<section>`/`<footer>` elements on all 8 content sections (Hero, SobreMi, Skills, Proyectos, Experiencia, Educacion, Contacto, Footer)
- `px-6 md:px-20` added to each section's inner `<div class="max-w-[1440px] mx-auto ...">` element
- Vertical padding (`py-*`) remains on the outer element — NOT moved
- Background color classes (`bg-[var(--bg-*)]`) remain on the outer element — NOT moved
- Header.astro is NOT modified (already correct)
- `npm run build` exits 0

## Verification

- `npm run build` exits 0
- `node -e "const fs=require('fs');const files=['Hero','SobreMi','Skills','Proyectos','Experiencia','Educacion','Contacto','Footer'];let ok=true;for(const f of files){const c=fs.readFileSync('src/components/sections/'+f+'.astro','utf8');const lines=c.split('\n');const outerLine=lines.find(l=>(l.includes('<section')||l.includes('<footer'))&&l.includes('px-6'));if(outerLine){console.error(f+': px-6 still on outer element');ok=false;}const innerLine=lines.find(l=>l.includes('max-w-[1440px]')&&l.includes('px-6')&&l.includes('md:px-20'));if(!innerLine){console.error(f+': px-6 md:px-20 missing on inner max-w div');ok=false;}}if(!ok)process.exit(1);console.log('All 8 sections have correct padding placement.');"` exits 0

## Tasks

- [x] **T01: Move horizontal padding inside max-width container on all 8 sections** `est:20m`
  - Why: All 8 content sections have `px-6 md:px-20` on the outer wrapper, causing content to fill 1440px at wide viewports instead of being constrained to 1280px like the Header. Moving padding inside the `max-w-[1440px]` div matches the Header pattern.
  - Files: `src/components/sections/Hero.astro`, `src/components/sections/SobreMi.astro`, `src/components/sections/Skills.astro`, `src/components/sections/Proyectos.astro`, `src/components/sections/Experiencia.astro`, `src/components/sections/Educacion.astro`, `src/components/sections/Contacto.astro`, `src/components/sections/Footer.astro`
  - Do: For each of the 8 files: (1) remove `px-6 md:px-20` from the outer `<section>`/`<footer>` class attribute, (2) add `px-6 md:px-20` to the inner `<div class="max-w-[1440px] mx-auto ...">` class attribute. Keep `py-*` and `bg-*` on the outer element. Do NOT touch Header.astro. After all edits, run `npm run build` and the verification script.
  - Verify: `npm run build` exits 0 AND grep confirms no outer element has `px-6 md:px-20` while all inner `max-w-[1440px]` divs do
  - Done when: All 8 sections have `px-6 md:px-20` on the inner `max-w-[1440px]` div and not on the outer wrapper, and build passes

## Observability / Diagnostics

- **Runtime signals:** This is a CSS-only change — no runtime behavior, no JS, no API calls. The observable signal is visual: section content width at viewports >1440px should match the Header's 1280px effective content area.
- **Inspection surface:** At 1600px viewport, use browser DevTools to measure any section's inner `max-w-[1440px]` div — its computed content width should be 1280px (1440 - 80 - 80 padding). Background colors on outer `<section>`/`<footer>` elements should span the full viewport.
- **Failure visibility:** If padding is missing or misplaced, content will either fill the full 1440px (padding missing from inner div) or backgrounds won't span full-width (if bg was accidentally moved). Both are visually obvious at wide viewports.
- **Redaction constraints:** None — no secrets or user data involved.

## Files Likely Touched

- `src/components/sections/Hero.astro`
- `src/components/sections/SobreMi.astro`
- `src/components/sections/Skills.astro`
- `src/components/sections/Proyectos.astro`
- `src/components/sections/Experiencia.astro`
- `src/components/sections/Educacion.astro`
- `src/components/sections/Contacto.astro`
- `src/components/sections/Footer.astro`
