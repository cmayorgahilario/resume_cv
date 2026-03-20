---
estimated_steps: 4
estimated_files: 2
---

# T01: Fix Hero button proportions and Skills text content

**Slice:** S01 — Hero + Skills Fix
**Milestone:** M009-lxoyrb

## Description

Two surgical edits to fix mobile visual fidelity against design screenshots. First, make Hero CTA buttons fill the row equally on mobile by adding Tailwind flex utilities. Second, remove extra sentences from two Skills card descriptions that don't appear in the design. Both changes are CSS-class additions or text deletions — no structural refactoring.

**Relevant skill:** `astro` — this is an Astro component project using Tailwind v4.

## Steps

1. In `src/components/sections/Hero.astro`, find the "Contactar" `<a>` tag (line ~39). Add `flex-1 md:flex-initial text-center` to its class list, keeping all existing classes. The result should be: `class="bg-[var(--color-primary-bg)] text-[var(--text-on-primary)] rounded-md px-8 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity flex-1 md:flex-initial text-center"`.

2. In `src/components/sections/Hero.astro`, find the "Ver Proyectos" `<a>` tag (line ~45). Add `flex-1 md:flex-initial text-center` to its class list, keeping all existing classes. The result should be: `class="border-[1.5px] border-[var(--border-default)] text-[var(--text-heading)] rounded-md px-8 py-3.5 text-base font-semibold hover:border-[var(--color-primary)] transition-colors bg-[var(--bg-primary)] flex-1 md:flex-initial text-center"`.

3. In `src/components/sections/Skills.astro`, find the Java Ecosystem card description `<p>` (Card 1, around line 37). The current text is: `Desarrollo backend con Java 11+ y dominio del ecosistema empresarial Spring para servicios robustos y escalables. Arquitectura de microservicios, APIs REST, mensajería asíncrona y pipelines de datos en entornos de alta disponibilidad.` — Remove the second sentence so it reads: `Desarrollo backend con Java 11+ y dominio del ecosistema empresarial Spring para servicios robustos y escalables.`

4. In `src/components/sections/Skills.astro`, find the APIs & Integration card description `<p>` (Card 6, around line 148). The current text is: `Diseño, exposición y consumo de APIs para integración entre sistemas internos y servicios de terceros. Implementación de contratos, versionado, rate limiting y estrategias de resiliencia en entornos distribuidos.` — Remove the second sentence so it reads: `Diseño, exposición y consumo de APIs para integración entre sistemas internos y servicios de terceros.`

## Must-Haves

- [ ] Both Hero `<a>` buttons include `flex-1 md:flex-initial text-center` in their class list
- [ ] Java Ecosystem description ends at "…para servicios robustos y escalables." with no second sentence
- [ ] APIs & Integration description ends at "…servicios de terceros." with no second sentence
- [ ] `npm run build` exits 0

## Verification

- `npm run build` exits 0
- `node -e "const fs=require('fs');const h=fs.readFileSync('src/components/sections/Hero.astro','utf8');if(!h.includes('flex-1')){process.exit(1)};if(!h.includes('md:flex-initial')){process.exit(1)};if(!h.includes('text-center')){process.exit(1)};console.log('Hero PASS')"`
- `node -e "const fs=require('fs');const s=fs.readFileSync('src/components/sections/Skills.astro','utf8');if(s.includes('Arquitectura de microservicios')){process.exit(1)};if(s.includes('Implementación de contratos')){process.exit(1)};console.log('Skills PASS')"`

## Inputs

- `src/components/sections/Hero.astro` — current Hero section with narrow CTA buttons missing flex-1
- `src/components/sections/Skills.astro` — current Skills section with extra sentences in Java Ecosystem and APIs & Integration descriptions

## Expected Output

- `src/components/sections/Hero.astro` — both CTA `<a>` tags now include `flex-1 md:flex-initial text-center`
- `src/components/sections/Skills.astro` — Java Ecosystem and APIs & Integration descriptions shortened to match design
