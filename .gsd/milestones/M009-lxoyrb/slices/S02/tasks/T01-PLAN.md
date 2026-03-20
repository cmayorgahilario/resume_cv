---
estimated_steps: 4
estimated_files: 1
---

# T01: Replace Proyectos subtitle and 5 card descriptions with design-verbatim text

**Slice:** S02 — Proyectos Content Fidelity
**Milestone:** M009-lxoyrb

## Description

The Proyectos section subtitle and 5 of 6 card descriptions in `Proyectos.astro` diverge from the design. Extra sentences and clauses were added during M001 implementation. This task performs 6 surgical `edit` replacements to match the design verbatim. Card 1 (Plataforma E-commerce Omnicanal) already matches — no change needed.

**Relevant skill:** `astro` — the file is an Astro component.

## Steps

1. **Replace subtitle text** — Use `edit` to replace:
   - Old: `Proyectos clave que demuestran mi capacidad para diseñar e implementar soluciones de software\n        complejas en distintos sectores de la industria.`
   - New: `Proyectos clave donde apliqué arquitectura, liderazgo y tecnología para resolver problemas reales`

2. **Replace Card 2 description (Gestión de Espacios Publicitarios)** — Use `edit` to replace:
   - Old: `Middleware para cotización y administración de espacios publicitarios con soporte para video\n            y contenido estático. Gestión integral de perfiles, presupuestos y validaciones multi-nivel.`
   - New: `Middleware para cotización y administración de espacios publicitarios con soporte para video\n            y contenido estático.`

3. **Replace Card 3 description (Core de Facturación de Servicios)** — Use `edit` to replace:
   - Old: `Mejora del sistema central de administración y facturación para servicios de agua, electricidad\n            y aire acondicionado. Optimización de procesos core del negocio.`
   - New: `Mejora del sistema central de administración y facturación para servicios de agua, electricidad\n            y aire acondicionado.`

4. **Replace Card 4 description (Nómina y Cálculo Presupuestal)** — Use `edit` to replace:
   - Old: `Sistema de cálculo de presupuesto anual y procesamiento de pagos a empleados desarrollado\n            con Java, Spring Boot y Angular. Automatización del ciclo completo de nómina.`
   - New: `Sistema de cálculo de presupuesto anual y procesamiento de pagos a empleados\n            con Java, Spring Boot y Angular.`

5. **Replace Card 5 description (Inspección Vehicular Automatizada)** — Use `edit` to replace:
   - Old: `Automatización del proceso de check-in vehicular con captura fotográfica en múltiples talleres,\n            reemplazando completamente el proceso manual anterior.`
   - New: `Automatización del proceso de check-in vehicular con captura fotográfica en múltiples talleres.`

6. **Replace Card 6 description (Sistema de Balanced Scorecard)** — Use `edit` to replace:
   - Old: `Modernización de sistema legacy de cuadro de mando integral, migrando a tecnologías actuales\n            con Java Spring y Angular para mejor rendimiento y mantenibilidad.`
   - New: `Modernización de sistema legacy de cuadro de mando integral, migrando a tecnologías actuales\n            con Java Spring y Angular.`

7. **Verify** — Run `npm run build` and grep checks.

## Must-Haves

- [ ] Subtitle text matches design verbatim: `Proyectos clave donde apliqué arquitectura, liderazgo y tecnología para resolver problemas reales`
- [ ] Card 2 description ends at `contenido estático.` — no trailing sentence
- [ ] Card 3 description ends at `aire acondicionado.` — no trailing sentence
- [ ] Card 4 description says `pagos a empleados con Java` (no `desarrollado`), ends at `Angular.` — no trailing sentence
- [ ] Card 5 description ends at `múltiples talleres.` — no trailing clause
- [ ] Card 6 description ends at `Java Spring y Angular.` — no trailing clause
- [ ] `npm run build` exits 0

## Verification

- `npm run build` exits 0
- `grep -c "que demuestran mi capacidad" src/components/sections/Proyectos.astro` returns 0
- `grep -c "Gestión integral de perfiles" src/components/sections/Proyectos.astro` returns 0
- `grep -c "Optimización de procesos core" src/components/sections/Proyectos.astro` returns 0
- `grep -c "Automatización del ciclo completo" src/components/sections/Proyectos.astro` returns 0
- `grep -c "reemplazando completamente" src/components/sections/Proyectos.astro` returns 0
- `grep -c "para mejor rendimiento y mantenibilidad" src/components/sections/Proyectos.astro` returns 0
- `grep -c "donde apliqué arquitectura" src/components/sections/Proyectos.astro` returns 1
- `grep -c "en múltiples talleres\." src/components/sections/Proyectos.astro` returns 1

## Inputs

- `src/components/sections/Proyectos.astro` — current file with 6 text discrepancies to correct

## Expected Output

- `src/components/sections/Proyectos.astro` — all 6 text blocks replaced with design-verbatim content
