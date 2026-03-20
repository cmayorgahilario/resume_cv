# S01: Hero + Skills Fix

**Goal:** Hero CTA buttons match design proportions on mobile; Skills text matches design screenshot verbatim.
**Demo:** At 390×844 viewport, Hero "Contactar" and "Ver Proyectos" buttons span nearly the full container width equally. Java Ecosystem and APIs & Integration card descriptions match design (no extra sentences). Desktop layout unchanged.

## Must-Haves

- Hero CTA buttons use `flex-1 md:flex-initial text-center` so they fill the row on mobile and revert to auto-width on desktop (R040)
- Java Ecosystem card description ends at "…para servicios robustos y escalables." — extra sentence removed (R044)
- APIs & Integration card description ends at "…servicios de terceros." — extra sentence removed (R044)
- `npm run build` exits 0
- Desktop layout at 1440px is unaffected

## Verification

- `npm run build` exits 0
- `node -e "const fs=require('fs');const h=fs.readFileSync('src/components/sections/Hero.astro','utf8');if(!h.includes('flex-1')){process.exit(1)};if(!h.includes('md:flex-initial')){process.exit(1)};if(!h.includes('text-center')){process.exit(1)};console.log('Hero PASS')"` — confirms Hero button classes present
- `node -e "const fs=require('fs');const s=fs.readFileSync('src/components/sections/Skills.astro','utf8');if(s.includes('Arquitectura de microservicios')){process.exit(1)};if(s.includes('Implementación de contratos')){process.exit(1)};console.log('Skills PASS')"` — confirms extra sentences removed

## Tasks

- [x] **T01: Fix Hero button proportions and Skills text content** `est:15m`
  - Why: Closes both R040 (Hero CTA proportions) and R044 (Skills text fidelity) — the only two fixes in this slice
  - Files: `src/components/sections/Hero.astro`, `src/components/sections/Skills.astro`
  - Do: (1) Add `flex-1 md:flex-initial text-center` to both `<a>` tags in the Hero CTA row. (2) Remove the second sentence from the Java Ecosystem description in Skills. (3) Remove the second sentence from the APIs & Integration description in Skills. (4) Run `npm run build` to confirm no regressions.
  - Verify: `npm run build` exits 0; grep confirms `flex-1` in Hero.astro; grep confirms "Arquitectura de microservicios" absent from Skills.astro
  - Done when: Both files edited, build passes, verification commands exit 0

## Observability / Diagnostics

- **Runtime signals:** These are static Astro components with no runtime JS — no client-side signals to monitor. Changes are purely presentational (CSS classes and static text).
- **Inspection surfaces:** Visual inspection at 390×844 viewport confirms button proportions. Text content verified via `grep` or `node -e` checks against the source files.
- **Failure visibility:** Build failure (`npm run build` non-zero exit) is the primary failure signal. Incorrect text or missing classes are caught by the verification node scripts.
- **Redaction constraints:** None — no secrets or PII involved in these static content edits.

## Files Likely Touched

- `src/components/sections/Hero.astro`
- `src/components/sections/Skills.astro`
