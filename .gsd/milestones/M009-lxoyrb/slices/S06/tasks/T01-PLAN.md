---
estimated_steps: 5
estimated_files: 2
---

# T01: Add flex classes to "Ver Proyectos" button, rebuild, and retake hero screenshot

**Slice:** S06 — Fix "Ver Proyectos" Button + Retake Hero Screenshot
**Milestone:** M009-lxoyrb

## Description

S01 added `flex-1 md:flex-initial text-center` to the "Contactar" CTA button in Hero.astro but missed the "Ver Proyectos" button. This task adds those same three classes to the second button, rebuilds, retakes the hero screenshot, and visually confirms the fix.

**Important context from KNOWLEDGE.md:** Screenshots must be taken against a static build served on port 4322 (`npx serve dist -l 4322`), NOT the dev server — HMR destroys execution context mid-screenshot.

## Steps

1. **Edit `src/components/sections/Hero.astro`** — Find the "Ver Proyectos" `<a>` tag (around line 43–45). Its current class list is:
   ```
   class="border-[1.5px] border-[var(--border-default)] text-[var(--text-heading)] rounded-md px-8 py-3.5 text-base font-semibold hover:border-[var(--color-primary)] transition-colors bg-[var(--bg-primary)]"
   ```
   Add ` flex-1 md:flex-initial text-center` to the end of the class string.

2. **Verify with grep** — Run `grep -c "flex-1 md:flex-initial text-center" src/components/sections/Hero.astro` and confirm it returns `2` (both CTA buttons now have the classes).

3. **Build** — Run `npm run build` and confirm exit code 0.

4. **Retake screenshots** — Serve the static build with `npx serve dist -l 4322` (background). Run `node _design/take-screenshots.mjs` to retake all 7 section screenshots. Stop the serve process.

5. **Visual comparison** — Compare `_design/screenshots/dev/001_hero.png` against `_design/screenshots/design/001_hero.png`. Both CTA buttons should span equal width, matching design proportions.

## Must-Haves

- [ ] "Ver Proyectos" button class list includes `flex-1 md:flex-initial text-center`
- [ ] Both CTA buttons in Hero.astro have identical flex/layout classes
- [ ] `npm run build` exits 0
- [ ] Hero screenshot retaken and visually matches design

## Verification

- `grep -c "flex-1 md:flex-initial text-center" src/components/sections/Hero.astro` returns `2`
- `npm run build` exits 0
- `_design/screenshots/dev/001_hero.png` exists and was recently modified (retaken)
- Visual comparison confirms both buttons span equal width at 390×844

## Inputs

- `src/components/sections/Hero.astro` — Current file where "Ver Proyectos" button is missing flex classes
- `_design/take-screenshots.mjs` — Screenshot script that captures all 7 sections at 390×844 @2x
- `_design/screenshots/design/001_hero.png` — Design reference for visual comparison

## Expected Output

- `src/components/sections/Hero.astro` — "Ver Proyectos" button now has `flex-1 md:flex-initial text-center`
- `_design/screenshots/dev/001_hero.png` — Retaken screenshot showing both buttons at equal width
