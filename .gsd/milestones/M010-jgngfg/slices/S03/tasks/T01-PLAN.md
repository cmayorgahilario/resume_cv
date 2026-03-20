---
estimated_steps: 3
estimated_files: 8
---

# T01: Move horizontal padding inside max-width container on all 8 sections

**Slice:** S03 — Max-Width Constraint Fix
**Milestone:** M010-jgngfg

## Description

All 8 content sections (Hero through Footer) have `px-6 md:px-20` on their outer `<section>`/`<footer>` element, while the inner `<div class="max-w-[1440px] mx-auto ...">` has no horizontal padding. This means at viewports wider than 1440px, content fills the full 1440px max-width. The Header already has the correct pattern — padding is inside the max-width container, so its content area is 1440 - 160 = 1280px. Move horizontal padding inward on all 8 sections to match.

**Relevant skill:** No special skill needed — this is mechanical Tailwind class movement across 8 Astro component files.

## Steps

1. For each of these 8 files, perform 2 edits (remove `px-6 md:px-20` from outer element, add it to the inner `max-w-[1440px]` div):
   - `src/components/sections/Hero.astro` — line 5 outer `<section>`, line 6 inner `<div>`
   - `src/components/sections/SobreMi.astro` — line 5 outer `<section>`, line 6 inner `<div>`
   - `src/components/sections/Skills.astro` — line 5 outer `<section>`, line 6 inner `<div>`
   - `src/components/sections/Proyectos.astro` — line 5 outer `<section>`, line 6 inner `<div>`
   - `src/components/sections/Experiencia.astro` — line 5 outer `<section>`, line 6 inner `<div>`
   - `src/components/sections/Educacion.astro` — line 5 outer `<section>`, line 6 inner `<div>`
   - `src/components/sections/Contacto.astro` — line 6 outer `<section>`, line 7 inner `<div>`
   - `src/components/sections/Footer.astro` — line 5 outer `<footer>`, line 6 inner `<div>`

2. Run `npm run build` to confirm no broken markup.

3. Run grep verification to confirm all 8 files have the correct pattern:
   - No outer `<section>`/`<footer>` element should contain `px-6`
   - Every inner `max-w-[1440px]` div should contain `px-6 md:px-20`

### Exact edit pattern

**Before (each section):**
```html
<section class="bg-[var(--bg-xxx)] py-12 md:py-20 px-6 md:px-20">
  <div class="max-w-[1440px] mx-auto ...">
```

**After:**
```html
<section class="bg-[var(--bg-xxx)] py-12 md:py-20">
  <div class="max-w-[1440px] mx-auto px-6 md:px-20 ...">
```

**Footer variant — before:**
```html
<footer class="bg-[var(--bg-footer)] py-12 px-6 md:px-20">
  <div class="max-w-[1440px] mx-auto ...">
```

**Footer variant — after:**
```html
<footer class="bg-[var(--bg-footer)] py-12">
  <div class="max-w-[1440px] mx-auto px-6 md:px-20 ...">
```

### Constraints

- Do NOT modify `Header.astro` — it already has the correct pattern
- Keep `py-*` vertical padding on the outer `<section>`/`<footer>` — it doesn't affect width
- Keep `bg-[var(--bg-*)]` on the outer element — backgrounds must span full viewport
- Contacto.astro has its `<section>` on line 6 (not line 5) because of an extra frontmatter line — check before editing

## Must-Haves

- [ ] `px-6 md:px-20` removed from outer element on all 8 files
- [ ] `px-6 md:px-20` added to inner `max-w-[1440px]` div on all 8 files
- [ ] `py-*` stays on outer element (not moved)
- [ ] `bg-*` stays on outer element (not moved)
- [ ] Header.astro untouched
- [ ] `npm run build` exits 0

## Verification

- `npm run build` exits 0
- Run: `grep -n "px-6 md:px-20" src/components/sections/*.astro` — every match should be on a line containing `max-w-[1440px]`, none on a line containing `<section` or `<footer`
- Run: `node -e "const fs=require('fs');const files=['Hero','SobreMi','Skills','Proyectos','Experiencia','Educacion','Contacto','Footer'];let ok=true;for(const f of files){const c=fs.readFileSync('src/components/sections/'+f+'.astro','utf8');const lines=c.split('\n');const outerLine=lines.find(l=>(l.includes('<section')||l.includes('<footer'))&&l.includes('px-6'));if(outerLine){console.error(f+': px-6 still on outer element');ok=false;}const innerLine=lines.find(l=>l.includes('max-w-[1440px]')&&l.includes('px-6')&&l.includes('md:px-20'));if(!innerLine){console.error(f+': px-6 md:px-20 missing on inner max-w div');ok=false;}}if(!ok)process.exit(1);console.log('All 8 sections have correct padding placement.');"`

## Inputs

- `src/components/sections/Hero.astro` — section with padding on outer element (to be fixed)
- `src/components/sections/SobreMi.astro` — section with padding on outer element (to be fixed)
- `src/components/sections/Skills.astro` — section with padding on outer element (to be fixed)
- `src/components/sections/Proyectos.astro` — section with padding on outer element (to be fixed)
- `src/components/sections/Experiencia.astro` — section with padding on outer element (to be fixed)
- `src/components/sections/Educacion.astro` — section with padding on outer element (to be fixed)
- `src/components/sections/Contacto.astro` — section with padding on outer element (to be fixed)
- `src/components/sections/Footer.astro` — footer with padding on outer element (to be fixed)
- `src/components/sections/Header.astro` — reference for the correct padding-inside-max-width pattern (DO NOT MODIFY)

## Expected Output

- `src/components/sections/Hero.astro` — padding moved to inner max-w div
- `src/components/sections/SobreMi.astro` — padding moved to inner max-w div
- `src/components/sections/Skills.astro` — padding moved to inner max-w div
- `src/components/sections/Proyectos.astro` — padding moved to inner max-w div
- `src/components/sections/Experiencia.astro` — padding moved to inner max-w div
- `src/components/sections/Educacion.astro` — padding moved to inner max-w div
- `src/components/sections/Contacto.astro` — padding moved to inner max-w div
- `src/components/sections/Footer.astro` — padding moved to inner max-w div
