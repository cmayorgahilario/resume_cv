---
estimated_steps: 5
estimated_files: 72
---

# T02: Compare all design↔dev pairs and confirm 0 discrepancies

**Slice:** S07 — Final Visual Verification
**Milestone:** M010-jgngfg

## Description

Visually compare all 36 design↔dev screenshot pairs (9 sections × 2 modes × 2 viewports) and check the 18 wide screenshots for max-width compliance. This is the final proof that S03–S06 fixes produce a pixel-faithful implementation matching the .pen design, satisfying requirement R056.

Process the comparisons in 4 batches of 9 pairs each, plus a max-width check pass on wide screenshots:

1. **Light desktop** — `_design/screenshots/design/light/desktop/*.png` ↔ `_design/screenshots/dev/light/desktop/*.png` (direct filename match)
2. **Light mobile** — `_design/screenshots/design/light/mobile/*.png` ↔ `_design/screenshots/dev/light/mobile/*.png` (**Note:** design has `002_header.png` but dev has `002_hero.png` — same section, legacy naming mismatch)
3. **Dark desktop** — `_design/screenshots/design/dark/desktop/*.png` ↔ `_design/screenshots/dev/dark/desktop/*.png` (direct filename match)
4. **Dark mobile** — `_design/screenshots/design/dark/mobile/*.png` ↔ `_design/screenshots/dev/dark/mobile/*.png` (direct filename match)
5. **Wide max-width check** — `_design/screenshots/dev/{light,dark}/wide/*.png` — verify content is constrained to 1440px while backgrounds span full 1600px viewport

For each pair, use the `read` tool to load both PNGs as images and visually assess structural fidelity: layout, spacing, colors, typography, stripe orientation, footer alignment. Document findings per pair.

If any discrepancy is found, document it precisely (section, mode, viewport, what's wrong). The slice goal is 0 discrepancies — if any exist, they must be reported as blocking issues.

## Steps

1. Load and compare all 9 light/desktop pairs (design vs dev). Document each as PASS or note discrepancy.
2. Load and compare all 9 light/mobile pairs. Remember: design `002_header.png` = dev `002_hero.png`. Document each.
3. Load and compare all 9 dark/desktop pairs. Document each.
4. Load and compare all 9 dark/mobile pairs. Document each.
5. Check all 18 wide (1600px) screenshots — confirm section content stays within 1440px boundaries while backgrounds extend to viewport edges. Document findings.

## Must-Haves

- [ ] All 36 design↔dev pairs visually compared
- [ ] Each pair documented as PASS or with specific discrepancy noted
- [ ] 18 wide screenshots checked for max-width compliance
- [ ] Final count: 0 remaining discrepancies (R056 validated)

## Verification

- Visual comparison report exists documenting all 36 pairs + 18 wide checks
- Total discrepancies: 0
- R056 requirement satisfied: all matching screenshot pairs pass visual comparison

## Inputs

- `_design/screenshots/design/light/desktop/*.png` — 9 light desktop design references
- `_design/screenshots/design/light/mobile/*.png` — 9 light mobile design references (note: `002_header.png` naming)
- `_design/screenshots/design/dark/desktop/*.png` — 9 dark desktop design references
- `_design/screenshots/design/dark/mobile/*.png` — 9 dark mobile design references
- `_design/screenshots/dev/light/desktop/*.png` — 9 light desktop dev screenshots (from T01)
- `_design/screenshots/dev/light/mobile/*.png` — 9 light mobile dev screenshots (from T01)
- `_design/screenshots/dev/dark/desktop/*.png` — 9 dark desktop dev screenshots (from T01)
- `_design/screenshots/dev/dark/mobile/*.png` — 9 dark mobile dev screenshots (from T01)
- `_design/screenshots/dev/light/wide/*.png` — 9 light wide dev screenshots (from T01)
- `_design/screenshots/dev/dark/wide/*.png` — 9 dark wide dev screenshots (from T01)

## Expected Output

- `.gsd/milestones/M010-jgngfg/slices/S07/S07-SUMMARY.md` — Slice summary with visual comparison results documenting 0 discrepancies
