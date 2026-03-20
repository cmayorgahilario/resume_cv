---
estimated_steps: 8
estimated_files: 7
---

# T01: Retake 7 mobile screenshots and visually verify against design

**Slice:** S05 — Final Visual Verification
**Milestone:** M009-lxoyrb

## Description

This is the milestone's final visual QA gate. Start the Astro dev server, take retina screenshots of all 7 sections at a 390×844 mobile viewport (matching iPhone 14 dimensions), save them to `_design/screenshots/dev/`, then visually compare each against its design counterpart in `_design/screenshots/design/`. Also perform a desktop sanity check at 1440×900 and confirm `npm run build` exits 0. No code changes are expected — if a discrepancy is found, document it as a finding rather than fixing inline.

**Relevant skills:** `agent-browser` (browser automation patterns for screenshots).

## Steps

1. **Build check:** Run `npm run build` — must exit 0.
2. **Start dev server:** Use `bg_shell` with `action: start`, `command: "npm run dev"`, `ready_port: 4321`, `type: "server"`. Check server output for the actual port (may auto-increment if 4321 is occupied — see KNOWLEDGE.md).
3. **Navigate and set viewport:** `browser_navigate` to `http://localhost:<port>`. Then `browser_set_viewport` with `width: 390, height: 844`. Wait for `network_idle`.
4. **Hide sticky header:** `browser_evaluate` with `document.querySelector('header').style.display = 'none'`. This prevents the sticky header from appearing in section screenshots (design screenshots don't include it).
5. **Screenshot all 7 sections:** For each section, use `browser_screenshot` with the CSS `selector` parameter to crop to that section. The mapping is:
   - `#inicio` → `_design/screenshots/dev/001_hero.png`
   - `#sobre-mi` → `_design/screenshots/dev/002_sobre_mi.png`
   - `#habilidades` → `_design/screenshots/dev/003_skills.png`
   - `#proyectos` → `_design/screenshots/dev/004_proyectos.png`
   - `#experiencia` → `_design/screenshots/dev/005_experiencia.png`
   - `#contacto` → `_design/screenshots/dev/006_contacto.png`
   - `footer` → `_design/screenshots/dev/007_footer.png`
   
   **Important:** The `browser_screenshot` tool with a `selector` crops to the element but returns an inline image — it does NOT save to a file path. To save screenshots to disk, use `browser_evaluate` to scroll each section into view, then use the Bash tool with a script or the agent-browser CLI (`npx agent-browser screenshot --selector "#inicio" _design/screenshots/dev/001_hero.png`) to save to a file path. Alternatively, use `browser_evaluate` + `page.screenshot` through the Playwright API.

   **Practical approach:** Use the built-in browser tools to take screenshots for visual comparison (inline images work for comparison), AND separately save the files to disk. The simplest reliable approach: take inline screenshots via `browser_screenshot` with `selector` for visual comparison, then for file saving use a Node.js script or the agent-browser CLI to capture element screenshots to the target paths.

6. **Visual comparison:** For each of the 7 pairs, read the design PNG from `_design/screenshots/design/00N_*.png` (via the `Read` tool which renders images inline), then read/view the corresponding dev screenshot. Compare: layout, text content, spacing, colors, element proportions. Report match or mismatch for each section.
7. **Desktop sanity check:** `browser_set_viewport` with `preset: "desktop"` or `width: 1440, height: 900`. Reload the page. Take a quick screenshot to visually scan for regressions introduced by S01–S04 responsive changes.
8. **Report results:** Summarize the visual comparison outcome for all 7 sections. If 0 discrepancies, the milestone passes. If any discrepancies remain, document them as findings (section, nature of discrepancy, severity).

## Must-Haves

- [ ] All 7 dev screenshots retaken at 390×844 viewport with 2x retina and header hidden
- [ ] Each dev screenshot visually compared against its design counterpart
- [ ] Desktop sanity check at 1440×900 confirms no regressions
- [ ] `npm run build` exits 0
- [ ] 7 updated PNG files saved to `_design/screenshots/dev/`

## Verification

- `npm run build` exits 0
- `test -f _design/screenshots/dev/001_hero.png && test -f _design/screenshots/dev/002_sobre_mi.png && test -f _design/screenshots/dev/003_skills.png && test -f _design/screenshots/dev/004_proyectos.png && test -f _design/screenshots/dev/005_experiencia.png && test -f _design/screenshots/dev/006_contacto.png && test -f _design/screenshots/dev/007_footer.png` — all 7 files exist
- Visual comparison report shows 0 discrepancies across all 7 section pairs

## Inputs

- `_design/screenshots/design/001_hero.png` — Design reference for Hero section
- `_design/screenshots/design/002_sobre_mi.png` — Design reference for Sobre Mí section
- `_design/screenshots/design/003_skills.png` — Design reference for Skills section
- `_design/screenshots/design/004_proyectos.png` — Design reference for Proyectos section
- `_design/screenshots/design/005_experiencia.png` — Design reference for Experiencia section
- `_design/screenshots/design/006_contacto.png` — Design reference for Contacto section
- `_design/screenshots/design/007_footer.png` — Design reference for Footer section
- `src/components/sections/Hero.astro` — Fixed in S01 (CTA button proportions)
- `src/components/sections/Skills.astro` — Fixed in S01 (card description text)
- `src/components/sections/Proyectos.astro` — Fixed in S02 (subtitle + card descriptions)
- `src/components/sections/Experiencia.astro` — Fixed in S03 (inline date+company layout)
- `src/components/sections/Contacto.astro` — Fixed in S04 (header alignment, full-width cards)
- `src/pages/index.astro` — Main page containing all sections

## Expected Output

- `_design/screenshots/dev/001_hero.png` — Retaken Hero mobile screenshot
- `_design/screenshots/dev/002_sobre_mi.png` — Retaken Sobre Mí mobile screenshot
- `_design/screenshots/dev/003_skills.png` — Retaken Skills mobile screenshot
- `_design/screenshots/dev/004_proyectos.png` — Retaken Proyectos mobile screenshot
- `_design/screenshots/dev/005_experiencia.png` — Retaken Experiencia mobile screenshot
- `_design/screenshots/dev/006_contacto.png` — Retaken Contacto mobile screenshot
- `_design/screenshots/dev/007_footer.png` — Retaken Footer mobile screenshot
