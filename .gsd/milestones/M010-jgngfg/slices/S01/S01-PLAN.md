# S01: Dark Design Reference Export

**Goal:** 9 dark desktop + 9 dark mobile design reference PNGs exported from the `.pen` file into `_design/screenshots/design/dark/`, matching the `001–009` naming format used by the light references.
**Demo:** `find _design/screenshots/design/dark -name "*.png" | wc -l` returns 18, and each file has non-zero size.

## Must-Haves

- 9 dark desktop PNGs in `_design/screenshots/design/dark/desktop/` named `001_header.png` through `009_footer.png`
- 9 dark mobile PNGs in `_design/screenshots/design/dark/mobile/` named `001_header.png` through `009_footer.png`
- All files exported at 2x scale, consistent with the existing light references
- Naming convention matches light references: `{NNN}_{section}.png`

## Verification

- `find _design/screenshots/design/dark -name "*.png" | wc -l` returns `18`
- `ls _design/screenshots/design/dark/desktop/` shows exactly: `001_header.png 002_hero.png 003_sobre_mi.png 004_skills.png 005_proyectos.png 006_experience.png 007_education.png 008_contact.png 009_footer.png`
- `ls _design/screenshots/design/dark/mobile/` shows the same 9 filenames
- `find _design/screenshots/design/dark -name "*.png" -empty` returns nothing (no empty files)

## Tasks

- [ ] **T01: Export and rename dark design reference PNGs from .pen file** `est:15m`
  - Why: This is the entire slice — R050 requires dark design reference screenshots for all 9 sections in both desktop and mobile viewports. These PNGs serve as the comparison baseline for S07 visual verification.
  - Files: `_design/screenshots/design/dark/desktop/*.png`, `_design/screenshots/design/dark/mobile/*.png`
  - Do: Use MCP `export_nodes` to export 9 dark desktop sections (node IDs: `5k2YD`, `Dqyq3`, `mhbv8`, `UY9ax`, `2zSQY`, `qC3bc`, `HKXnu`, `G0U1V`, `E65Tr`) into `_design/screenshots/design/dark/desktop/`, then rename each `{nodeId}.png` → `{NNN}_{section}.png` per the node ID map. Repeat for 9 dark mobile sections (node IDs: `X9UaP`, `9BssS`, `hzWyd`, `XjPhO`, `637YK`, `V4F95`, `wUBYZ`, `6mo0U`, `rcjVM`) into `_design/screenshots/design/dark/mobile/`. Use `scale: 2` and `format: "png"`. If relative `outputDir` fails, use the absolute path `C:/Users/Makoto/WebstormProjects/carlosmayorga.me_astro/_design/screenshots/design/dark/{desktop|mobile}`.
  - Verify: `find _design/screenshots/design/dark -name "*.png" | wc -l` returns 18, and `find _design/screenshots/design/dark -name "*.png" -empty` returns nothing
  - Done when: All 18 PNGs exist with correct names and non-zero sizes

## Files Likely Touched

- `_design/screenshots/design/dark/desktop/001_header.png` through `009_footer.png`
- `_design/screenshots/design/dark/mobile/001_header.png` through `009_footer.png`
