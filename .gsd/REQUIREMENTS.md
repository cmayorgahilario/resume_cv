# Requirements

This file is the explicit capability and coverage contract for the project.

## Validated

### R001 — El sitio debe renderizar la homepage completa en light mode, fiel al diseño `.pen`: Header, Hero, Sobre Mí, Skills, Proyectos, Experiencia, Educación, Contacto, Footer.
- Class: primary-user-loop
- Status: validated
- Description: El sitio debe renderizar la homepage completa en light mode, fiel al diseño `.pen`: Header, Hero, Sobre Mí, Skills, Proyectos, Experiencia, Educación, Contacto, Footer.
- Why it matters: Es el entregable principal y la base de todos los milestones siguientes.
- Source: user
- Primary owning slice: M001-ykiyqu/S01–S07
- Supporting slices: none
- Validation: All 9 homepage sections render faithfully in light mode — S02 visual QA compared every section against .pen frame KyT96 at 1440×900 with reference PNGs. 7 structural CSS fixes applied. 9/9 PASS. npm run build exits 0.
- Notes: Max width 1440px boxed. Padding horizontal 80px por sección.

### R002 — Todo el CSS debe usar Tailwind v4 via `@tailwindcss/vite`. Los tokens de color, tipografía y espaciado deben mapearse desde las variables del `.pen` en `@theme` de `global.css`.
- Class: quality-attribute
- Status: validated
- Description: Todo el CSS debe usar Tailwind v4 via `@tailwindcss/vite`. Los tokens de color, tipografía y espaciado deben mapearse desde las variables del `.pen` en `@theme` de `global.css`.
- Why it matters: Garantiza consistencia con el diseño fuente y escalabilidad entre milestones.
- Source: user
- Primary owning slice: M001-ykiyqu/S01
- Supporting slices: M002-0eaci5, M003-8vt8w6, M004-ahf7ia
- Validation: All 36 .pen design variables verified against global.css @theme tokens in S01. Token verification script (verify-m06-s01-tokens.mjs) exits 0 with zero mismatches. Tailwind v4 via @tailwindcss/vite confirmed in astro.config.mjs. No tailwind.config.js present.
- Notes: No `tailwind.config.js`. Variables definidas con `@theme`. Sin `@astrojs/tailwind` (deprecated para v4).

### R003 — Todos los componentes deben ser `.astro`. Sin React, Vue ni ningún otro framework de UI.
- Class: constraint
- Status: validated
- Description: Todos los componentes deben ser `.astro`. Sin React, Vue ni ningún otro framework de UI.
- Why it matters: El usuario lo especificó explícitamente para este proyecto.
- Source: user
- Primary owning slice: M001-ykiyqu/S01
- Supporting slices: todos
- Validation: M006 QA confirmed all section components are .astro files in src/components/sections/. No React, Vue, or other framework imports found. All interactivity via script tags in Astro components.
- Notes: Scripts de interactividad (theme toggle, etc.) via `<script>` en Astro.

### R004 — La sección hero debe usar `public/profile.webp` como foto profesional, en el slot donde el diseño tiene "Photo Placeholder".
- Class: core-capability
- Status: validated
- Description: La sección hero debe usar `public/profile.webp` como foto profesional, en el slot donde el diseño tiene "Photo Placeholder".
- Why it matters: El usuario lo especificó explícitamente.
- Source: user
- Primary owning slice: M001-ykiyqu/S02
- Supporting slices: none
- Validation: Hero.astro references `/profile.webp` at 320×380px with rounded-lg; `public/profile.webp` exists; `dist/index.html` contains "profile.webp" after build; browser renders the photo in the hero section.
- Notes: El placeholder en el `.pen` es 320×380px, cornerRadius 8, con icon "user" de lucide.

### R005 — Todas las secciones deben tener variante dark mode fiel al frame "Homepage Dark" del `.pen`, usando las variables `$bg-*`, `$text-*`, `$border-*` en su valor `mode:dark`.
- Class: core-capability
- Status: validated
- Description: Todas las secciones deben tener variante dark mode fiel al frame "Homepage Dark" del `.pen`, usando las variables `$bg-*`, `$text-*`, `$border-*` en su valor `mode:dark`.
- Why it matters: Milestone completo de la visión del usuario.
- Source: user
- Primary owning slice: M002-0eaci5/S01
- Supporting slices: M004-ahf7ia
- Validation: All 9 sections dark mode match .pen frame j1mfs at 1440×900. Mobile dark at 390×844 against .pen frame euVyc also passes.

### R006 — El sitio debe ser completamente responsive en mobile (≤768px), fiel a los frames "Homepage Mobile Light" y "Homepage Mobile Dark" del `.pen`. Incluye menú hamburguesa.
- Class: core-capability
- Status: validated
- Description: El sitio debe ser completamente responsive en mobile (≤768px), fiel a los frames "Homepage Mobile Light" y "Homepage Mobile Dark" del `.pen`. Incluye menú hamburguesa.
- Why it matters: Milestone explícito del usuario.
- Source: user
- Primary owning slice: M003-8vt8w6/S01
- Supporting slices: M004-ahf7ia
- Validation: All 9 sections responsive at 390×844 match .pen mobile frames.

### R008 — Validación exhaustiva componente por componente del resultado implementado vs. el diseño `.pen`, usando screenshots exportados de Pencil comparados contra el browser.
- Class: quality-attribute
- Status: validated
- Description: Validación exhaustiva componente por componente del resultado implementado vs. el diseño `.pen`, usando screenshots exportados de Pencil comparados contra el browser.
- Why it matters: El usuario lo especificó como el milestone final más minucioso.
- Source: user
- Primary owning slice: M006-5l0p96/S01–S04
- Supporting slices: none
- Validation: 36/36 section-mode combinations pass visual QA. Token audit script exits 0 with zero mismatches.

### R040 — Los botones "Contactar" y "Ver Proyectos" en la sección Hero en mobile deben coincidir con las proporciones del diseño `.pen` (más anchos, ocupando mayor porcentaje del ancho de pantalla).
- Class: quality-attribute
- Status: validated
- Description: Los botones "Contactar" y "Ver Proyectos" en la sección Hero en mobile deben coincidir con las proporciones del diseño `.pen` (más anchos, ocupando mayor porcentaje del ancho de pantalla).
- Why it matters: Los botones actuales son visualmente más pequeños que en el diseño, afectando la fidelidad visual.
- Source: user
- Primary owning slice: M009-lxoyrb/S01
- Supporting slices: none
- Validation: Both Hero CTA buttons have flex-1 md:flex-initial text-center (grep count = 2). S05 + S06 visual comparison of retaken 001_hero.png at 390×844 @2x confirms equal-width buttons matching design proportions. Build passes.
- Notes: S01 applied flex-1 md:flex-initial text-center. S05 confirmed visual match via screenshot comparison.

### R041 — El subtítulo de la sección Proyectos y las descripciones de las 6 tarjetas deben coincidir verbatim con el texto visible en el screenshot del diseño `.pen`.
- Class: quality-attribute
- Status: validated
- Description: El subtítulo de la sección Proyectos y las descripciones de las 6 tarjetas deben coincidir verbatim con el texto visible en el screenshot del diseño `.pen`.
- Why it matters: Múltiples textos fueron reescritos durante la implementación y no coinciden con el diseño original. Esta es la sección con más diferencias de contenido.
- Source: user
- Primary owning slice: M009-lxoyrb/S02
- Supporting slices: none
- Validation: S02 replaced subtitle and 5 card descriptions with design-verbatim text (Card 1 already correct). Negative grep confirms all 6 old phrases absent from source. S05 visual comparison of 004_proyectos.png at 390×844 @2x confirms verbatim match.
- Notes: S02 corrected subtitle + 5 card descriptions. S05 confirmed visual match via screenshot comparison.

### R042 — En mobile, la fecha y empresa de cada item de experiencia deben aparecer en la misma línea (ej. `2022 — 2025 · Real Plaza`), no apilados verticalmente.
- Class: quality-attribute
- Status: validated
- Description: En mobile, la fecha y empresa de cada item de experiencia deben aparecer en la misma línea (ej. `2022 — 2025 · Real Plaza`), no apilados verticalmente.
- Why it matters: El diseño muestra el formato inline y la implementación actual los apila, creando una discrepancia visual notable.
- Source: user
- Primary owning slice: M009-lxoyrb/S03
- Supporting slices: none
- Validation: S03 restructured all 4 experience items to inline date+company with flex items-center gap-2 (grep count = 4). S05 visual comparison of 005_experiencia.png at 390×844 @2x confirms inline layout matching design.
- Notes: S03 restructured inline date+company. S05 confirmed visual match via screenshot comparison.

### R043 — La sección Contacto en mobile debe tener el header (label + título + subtítulo) alineado a la izquierda, y el formulario e info card deben ocupar el ancho completo de la pantalla, no estar centrados y estrechos.
- Class: quality-attribute
- Status: validated
- Description: La sección Contacto en mobile debe tener el header (label + título + subtítulo) alineado a la izquierda, y el formulario e info card deben ocupar el ancho completo de la pantalla, no estar centrados y estrechos.
- Why it matters: El diseño muestra layout left-aligned y full-width; la implementación actual centra el header y deja el form/info card al ~60-70% del ancho.
- Source: user
- Primary owning slice: M009-lxoyrb/S04
- Supporting slices: none
- Validation: S04 applied md:items-center md:text-center responsive classes. Grep confirms bare centering classes removed. S05 visual comparison of 006_contacto.png at 390×844 @2x confirms left-aligned header and full-width form/info cards on mobile.
- Notes: Comparar contra `_design/screenshots/design/006_contacto.png`.

### R044 — El contenido de texto de la sección Skills (Habilidades Técnicas) debe coincidir con el screenshot del diseño.
- Class: quality-attribute
- Status: validated
- Description: El contenido de texto de la sección Skills (Habilidades Técnicas) debe coincidir con el screenshot del diseño.
- Why it matters: Verificación de fidelidad de contenido — patrón conocido de textos reescritos que persisten sin detección (KNOWLEDGE.md M007).
- Source: user
- Primary owning slice: M009-lxoyrb/S01
- Supporting slices: none
- Validation: S01 removed extra sentences from Java Ecosystem and APIs & Integration cards (grep confirms 0 matches for removed phrases). S05 visual comparison of 003_skills.png at 390×844 @2x confirms all text matches design.
- Notes: S01 verified text matches design. S05 confirmed visual match via screenshot comparison.

### R045 — Las 7 secciones (Hero, Sobre Mí, Skills, Proyectos, Experiencia, Contacto, Footer) deben pasar una comparación visual final entre screenshots retomados del dev y los screenshots del diseño.
- Class: quality-attribute
- Status: validated
- Description: Las 7 secciones (Hero, Sobre Mí, Skills, Proyectos, Experiencia, Contacto, Footer) deben pasar una comparación visual final entre screenshots retomados del dev y los screenshots del diseño.
- Why it matters: Verificación integral de que todas las correcciones se aplicaron correctamente y no introdujeron regresiones.
- Source: user
- Primary owning slice: M009-lxoyrb/S05
- Supporting slices: none
- Validation: S05 retook all 7 mobile screenshots at 390×844 @2x retina (Hero, Sobre Mí, Skills, Proyectos, Experiencia, Contacto, Footer) and visually compared each against its design counterpart. 0 discrepancies found. Desktop sanity check at 1440×900 confirmed no regressions. npm run build exits 0.
- Notes: S05 retook all 7 screenshots and confirmed 0 discrepancies. Desktop sanity check at 1440×900 confirmed no regressions.

## Deferred

### R007 — Scroll-triggered entrance animations y micro-interacciones en hover, usando la librería Motion (anteriormente Framer Motion for Vanilla). Debe seguir el "Animation Guide" del `.pen`.
- Class: differentiator
- Status: deferred
- Description: Scroll-triggered entrance animations y micro-interacciones en hover, usando la librería Motion (anteriormente Framer Motion for Vanilla). Debe seguir el "Animation Guide" del `.pen`.
- Why it matters: Milestone explícito del usuario. Añade craft feel al portfolio.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Deferred per user request (D025). Animation library TBD.

### R020 — Botón "Descargar CV" en el header que descarga un PDF del CV.
- Class: launchability
- Status: deferred
- Description: Botón "Descargar CV" en el header que descarga un PDF del CV.
- Why it matters: El diseño tiene el botón; la funcionalidad real de generación/descarga es trabajo aparte.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: El botón existe en el diseño pero la generación del PDF no está en scope.

### R021 — El formulario de contacto debe enviar emails reales.
- Class: integration
- Status: deferred
- Description: El formulario de contacto debe enviar emails reales.
- Why it matters: El diseño tiene el form; el backend (Resend, Formspree, etc.) no fue discutido.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: M001 construye el HTML del form estático. Backend en milestone posterior si el usuario lo pide.

## Out of Scope

### R030 — No hay sección de blog ni CMS.
- Class: anti-feature
- Status: out-of-scope
- Description: No hay sección de blog ni CMS.
- Why it matters: Previene scope creep.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a

### R031 — El sitio es en español, no se requiere i18n.
- Class: anti-feature
- Status: out-of-scope
- Description: El sitio es en español, no se requiere i18n.
- Why it matters: El diseño está en español, no hay indicación de multi-idioma.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | primary-user-loop | validated | M001-ykiyqu/S01–S07 | none | All 9 homepage sections render faithfully in light mode — S02 visual QA compared every section against .pen frame KyT96 at 1440×900 with reference PNGs. 7 structural CSS fixes applied. 9/9 PASS. npm run build exits 0. |
| R002 | quality-attribute | validated | M001-ykiyqu/S01 | M002-0eaci5, M003-8vt8w6, M004-ahf7ia | All 36 .pen design variables verified against global.css @theme tokens in S01. Token verification script (verify-m06-s01-tokens.mjs) exits 0 with zero mismatches. Tailwind v4 via @tailwindcss/vite confirmed in astro.config.mjs. No tailwind.config.js present. |
| R003 | constraint | validated | M001-ykiyqu/S01 | todos | M006 QA confirmed all section components are .astro files in src/components/sections/. No React, Vue, or other framework imports found. All interactivity via script tags in Astro components. |
| R004 | core-capability | validated | M001-ykiyqu/S02 | none | Hero.astro references `/profile.webp` at 320×380px with rounded-lg; `public/profile.webp` exists; `dist/index.html` contains "profile.webp" after build; browser renders the photo in the hero section. |
| R005 | core-capability | validated | M002-0eaci5/S01 | M004-ahf7ia | All 9 sections dark mode match .pen frame j1mfs at 1440×900. Mobile dark at 390×844 against .pen frame euVyc also passes. |
| R006 | core-capability | validated | M003-8vt8w6/S01 | M004-ahf7ia | All 9 sections responsive at 390×844 match .pen mobile frames. |
| R007 | differentiator | deferred | none | none | unmapped |
| R008 | quality-attribute | validated | M006-5l0p96/S01–S04 | none | 36/36 section-mode combinations pass visual QA. Token audit script exits 0 with zero mismatches. |
| R020 | launchability | deferred | none | none | unmapped |
| R021 | integration | deferred | none | none | unmapped |
| R030 | anti-feature | out-of-scope | none | none | n/a |
| R031 | anti-feature | out-of-scope | none | none | n/a |
| R040 | quality-attribute | validated | M009-lxoyrb/S01 | none | Both Hero CTA buttons have flex-1 md:flex-initial text-center (grep count = 2). S05 + S06 visual comparison of retaken 001_hero.png at 390×844 @2x confirms equal-width buttons matching design proportions. Build passes. |
| R041 | quality-attribute | validated | M009-lxoyrb/S02 | none | S02 replaced subtitle and 5 card descriptions with design-verbatim text (Card 1 already correct). Negative grep confirms all 6 old phrases absent from source. S05 visual comparison of 004_proyectos.png at 390×844 @2x confirms verbatim match. |
| R042 | quality-attribute | validated | M009-lxoyrb/S03 | none | S03 restructured all 4 experience items to inline date+company with flex items-center gap-2 (grep count = 4). S05 visual comparison of 005_experiencia.png at 390×844 @2x confirms inline layout matching design. |
| R043 | quality-attribute | validated | M009-lxoyrb/S04 | none | S04 applied md:items-center md:text-center responsive classes. Grep confirms bare centering classes removed. S05 visual comparison of 006_contacto.png at 390×844 @2x confirms left-aligned header and full-width form/info cards on mobile. |
| R044 | quality-attribute | validated | M009-lxoyrb/S01 | none | S01 removed extra sentences from Java Ecosystem and APIs & Integration cards (grep confirms 0 matches for removed phrases). S05 visual comparison of 003_skills.png at 390×844 @2x confirms all text matches design. |
| R045 | quality-attribute | validated | M009-lxoyrb/S05 | none | S05 retook all 7 mobile screenshots at 390×844 @2x retina (Hero, Sobre Mí, Skills, Proyectos, Experiencia, Contacto, Footer) and visually compared each against its design counterpart. 0 discrepancies found. Desktop sanity check at 1440×900 confirmed no regressions. npm run build exits 0. |

## Coverage Summary

- Active requirements: 0
- Mapped to slices: 0
- Validated: 13 (R001, R002, R003, R004, R005, R006, R008, R040, R041, R042, R043, R044, R045)
- Unmapped active requirements: 0
