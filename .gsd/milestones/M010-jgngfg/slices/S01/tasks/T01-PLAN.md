---
estimated_steps: 5
estimated_files: 18
---

# T01: Export and rename dark design reference PNGs from .pen file

**Slice:** S01 — Dark Design Reference Export
**Milestone:** M010-jgngfg

## Description

Export all 18 dark design reference PNGs (9 desktop + 9 mobile) from the `.pen` file using the `pencil` MCP server's `export_nodes` tool. The `.pen` file contains dark mode frames: desktop parent `j1mfs` ("Homepage Dark", 1440px) and mobile parent `euVyc` ("Homepage Mobile Dark", 390px). Each section within these frames has a known node ID. After export, rename files from `{nodeId}.png` to the `{NNN}_{section}.png` naming convention matching the existing light references.

This task uses the `pencil` MCP server — call `mcp_call(server="pencil", tool="export_nodes", args={...})`.

## Steps

1. **Export dark desktop sections.** Call `mcp_call` with:
   - `server`: `"pencil"`
   - `tool`: `"export_nodes"`
   - `args`: `{ "filePath": "_design/carlos_mayorga_cv.pen", "nodeIds": ["5k2YD", "Dqyq3", "mhbv8", "UY9ax", "2zSQY", "qC3bc", "HKXnu", "G0U1V", "E65Tr"], "outputDir": "_design/screenshots/design/dark/desktop", "format": "png", "scale": 2 }`
   - If it fails with a path error, retry with absolute `outputDir`: `"C:/Users/Makoto/WebstormProjects/carlosmayorga.me_astro/_design/screenshots/design/dark/desktop"`

2. **Rename desktop files.** Rename each exported file from its node-ID name to the semantic name:
   - `5k2YD.png` → `001_header.png`
   - `Dqyq3.png` → `002_hero.png`
   - `mhbv8.png` → `003_sobre_mi.png`
   - `UY9ax.png` → `004_skills.png`
   - `2zSQY.png` → `005_proyectos.png`
   - `qC3bc.png` → `006_experience.png`
   - `HKXnu.png` → `007_education.png`
   - `G0U1V.png` → `008_contact.png`
   - `E65Tr.png` → `009_footer.png`

3. **Export dark mobile sections.** Call `mcp_call` with:
   - `server`: `"pencil"`
   - `tool`: `"export_nodes"`
   - `args`: `{ "filePath": "_design/carlos_mayorga_cv.pen", "nodeIds": ["X9UaP", "9BssS", "hzWyd", "XjPhO", "637YK", "V4F95", "wUBYZ", "6mo0U", "rcjVM"], "outputDir": "_design/screenshots/design/dark/mobile", "format": "png", "scale": 2 }`
   - If it fails with a path error, retry with absolute `outputDir`: `"C:/Users/Makoto/WebstormProjects/carlosmayorga.me_astro/_design/screenshots/design/dark/mobile"`

4. **Rename mobile files.** Rename each exported file:
   - `X9UaP.png` → `001_header.png`
   - `9BssS.png` → `002_hero.png`
   - `hzWyd.png` → `003_sobre_mi.png`
   - `XjPhO.png` → `004_skills.png`
   - `637YK.png` → `005_proyectos.png`
   - `V4F95.png` → `006_experience.png`
   - `wUBYZ.png` → `007_education.png`
   - `6mo0U.png` → `008_contact.png`
   - `rcjVM.png` → `009_footer.png`

5. **Verify all 18 files.** Run:
   - `find _design/screenshots/design/dark -name "*.png" | sort` — should list 18 files
   - `find _design/screenshots/design/dark -name "*.png" -empty` — should return nothing
   - `ls -la _design/screenshots/design/dark/desktop/` — should show 9 PNG files
   - `ls -la _design/screenshots/design/dark/mobile/` — should show 9 PNG files

## Must-Haves

- [ ] 9 PNGs in `_design/screenshots/design/dark/desktop/` named `001_header.png` through `009_footer.png`
- [ ] 9 PNGs in `_design/screenshots/design/dark/mobile/` named `001_header.png` through `009_footer.png`
- [ ] All files exported at 2x scale (default for `export_nodes`)
- [ ] No leftover `{nodeId}.png` files after renaming
- [ ] All files have non-zero size

## Verification

- `find _design/screenshots/design/dark -name "*.png" | wc -l` returns `18`
- `find _design/screenshots/design/dark -name "*.png" -empty` returns nothing (no zero-byte files)
- `ls _design/screenshots/design/dark/desktop/` lists exactly 9 files: `001_header.png 002_hero.png 003_sobre_mi.png 004_skills.png 005_proyectos.png 006_experience.png 007_education.png 008_contact.png 009_footer.png`
- `ls _design/screenshots/design/dark/mobile/` lists the same 9 filenames

## Inputs

- `_design/carlos_mayorga_cv.pen` — Source design file containing dark desktop frame `j1mfs` and dark mobile frame `euVyc` with the 18 section nodes to export

## Expected Output

- `_design/screenshots/design/dark/desktop/001_header.png` — Dark desktop header section
- `_design/screenshots/design/dark/desktop/002_hero.png` — Dark desktop hero section
- `_design/screenshots/design/dark/desktop/003_sobre_mi.png` — Dark desktop sobre mí section
- `_design/screenshots/design/dark/desktop/004_skills.png` — Dark desktop skills section
- `_design/screenshots/design/dark/desktop/005_proyectos.png` — Dark desktop proyectos section
- `_design/screenshots/design/dark/desktop/006_experience.png` — Dark desktop experience section
- `_design/screenshots/design/dark/desktop/007_education.png` — Dark desktop education section
- `_design/screenshots/design/dark/desktop/008_contact.png` — Dark desktop contact section
- `_design/screenshots/design/dark/desktop/009_footer.png` — Dark desktop footer section
- `_design/screenshots/design/dark/mobile/001_header.png` — Dark mobile header section
- `_design/screenshots/design/dark/mobile/002_hero.png` — Dark mobile hero section
- `_design/screenshots/design/dark/mobile/003_sobre_mi.png` — Dark mobile sobre mí section
- `_design/screenshots/design/dark/mobile/004_skills.png` — Dark mobile skills section
- `_design/screenshots/design/dark/mobile/005_proyectos.png` — Dark mobile proyectos section
- `_design/screenshots/design/dark/mobile/006_experience.png` — Dark mobile experience section
- `_design/screenshots/design/dark/mobile/007_education.png` — Dark mobile education section
- `_design/screenshots/design/dark/mobile/008_contact.png` — Dark mobile contact section
- `_design/screenshots/design/dark/mobile/009_footer.png` — Dark mobile footer section
