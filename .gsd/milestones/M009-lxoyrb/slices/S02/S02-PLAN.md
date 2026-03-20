# S02: Proyectos Content Fidelity

**Goal:** Subtitle and all 6 project card descriptions in `Proyectos.astro` match the design screenshot verbatim.
**Demo:** `npm run build` exits 0; grep confirms all 6 design texts present and all 6 old (removed) phrases absent.

## Must-Haves

- Section subtitle replaced with design-verbatim text
- 5 card descriptions corrected to match design (Card 1 already matches)
- No structural or styling changes — only text content
- Build passes with zero errors

## Verification

- `npm run build` exits 0
- Negative grep — none of these old phrases exist in `src/components/sections/Proyectos.astro`:
  - `"que demuestran mi capacidad"`
  - `"Gestión integral de perfiles"`
  - `"Optimización de procesos core"`
  - `"Automatización del ciclo completo"`
  - `"reemplazando completamente"`
  - `"para mejor rendimiento y mantenibilidad"`
- Positive grep — these design phrases exist:
  - `"donde apliqué arquitectura"`
  - `"soporte para video y contenido estático."`  (ends with period, no trailing sentence)
  - `"servicios de agua, electricidad y aire acondicionado."`  (ends with period, no trailing sentence)
  - `"pagos a empleados con Java"` (no "desarrollado" before "con")
  - `"en múltiples talleres."` (ends with period, no trailing clause)
  - `"con Java Spring y Angular."` (ends with period, no trailing clause)

## Tasks

- [x] **T01: Replace Proyectos subtitle and 5 card descriptions with design-verbatim text** `est:15m`
  - Why: R041 requires subtitle + 6 card descriptions to match the design screenshot verbatim. 5 of 6 descriptions and the subtitle diverge from the design.
  - Files: `src/components/sections/Proyectos.astro`
  - Do: Use `edit` (exact text replacement) for 6 surgical replacements: subtitle, Card 2, Card 3, Card 4, Card 5, Card 6 descriptions. Card 1 already matches — skip it. Each replacement removes trailing sentences or extra words added during M001. No structural or styling changes. **Skill: astro** — the file is an `.astro` component.
  - Verify: `npm run build` exits 0; grep for 6 removed phrases returns no matches; grep for 6 design phrases returns matches
  - Done when: All 6 text corrections applied, build passes, positive and negative grep checks all pass

## Files Likely Touched

- `src/components/sections/Proyectos.astro`

## Observability / Diagnostics

This slice is a static content-only change with no runtime behavior. Observability is limited to build-time verification:

- **Build signal:** `npm run build` exit code — non-zero indicates a syntax or template error introduced by text edits.
- **Content verification:** grep-based positive/negative checks confirm exact text presence/absence in the source file.
- **Failure visibility:** If any text replacement breaks Astro template syntax, the build will surface the error with file and line number. No runtime logs, endpoints, or structured error output apply — this is a static site with no server-side code.
- **Diagnostic failure check:** `npx astro check` can verify TypeScript/template integrity if the build fails for non-obvious reasons.
