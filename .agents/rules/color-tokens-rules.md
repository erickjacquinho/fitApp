# Color Token Rules

FitApp uses the Mineral Warm palette. All normative values, semantic mappings, contrast ratios, and approved/prohibited combinations are in `docs/design-system/mineral-warm.md`.

This file provides the usage interface and naming conventions. It does not duplicate the canonical tables.

## Primary Accent: Blue, Not Olive

**The primary accent color is blue (`blue-500` / `#0800FF`), not olive.**
All generic highlighted elements — CTAs, progress, selection, active state, focus, links — use the blue family first.
Olive/accent-olive tokens are legacy and must not be used in new or migrated components.

> See `mineral-warm.md` section 2 for the complete blue-first rule and all function-color assignments.

## Semantic Families

| Family | Purpose | Normative section |
|---|---|---|
| `neutral-*` | Backgrounds, surfaces, text, borders, disabled states | `mineral-warm.md` §1 |
| `blue-*` / primary | Primary action, selection, focus, info, protein, progress | `mineral-warm.md` §2 |
| `amber-*` | Carbohydrate data and contextual actions only | `mineral-warm.md` §2 |
| `orange-*` | Fat data and contextual actions only | `mineral-warm.md` §2 |
| `moss-*` / success | Completed state, positive confirmation | `mineral-warm.md` §2 |
| `tomato-*` / error | Error, danger, destructive action, hard limit | `mineral-warm.md` §2 |
| `mustard-*` / warning | Attention, near-limit state; never amber | `mineral-warm.md` §2 |
| `teal-*` | Chart data series 4; never used for status | `mineral-warm.md` §9 |
| `plum-*` | Chart data series 5 and visited links | `mineral-warm.md` §2, §11 |

## Usage Rules

- Use semantic tokens, not raw hex values.
- All generic highlights use blue first.
- Amber and orange are restricted to macronutrient data and contextual macro actions.
- Mustard is the warning color; amber must not represent warning.
- Tomato is reserved for error, danger, destructive actions, and hard limits.
- Moss is reserved for success and completion; do not use for primary actions.
- Teal and plum are chart-only (plus plum for visited links).
- New color families enter only when no existing family meets the function without semantic collision.
- Do not reduce the opacity of text, functional icons, borders, or dividers; use the appropriate scale step instead.

## Contrast Enforcement

> See `mineral-warm.md` section 15 for approved and prohibited combinations with ratios.
> See `mineral-warm.md` section 17 for the full contrast test checklist.

Key constraints:
- `neutral-0` (white) must not be used as text over `amber-500` (ratio `2.63:1`).
- `neutral-500` must not be used as text over `neutral-100` (ratio `4.21:1`).
- `amber-700` must not be text over `neutral-50` (ratio `4.24:1`); use `amber-900`.

## Legacy Groups

The following groups remain in `tailwind.config.js` for backwards compatibility during the migration window (Phases 2–7):

| Legacy group | Points to | Status |
|---|---|---|
| `accent-*` | olive (`#556B2F`) | **Deprecated** — no new use |
| `primary-*` (current) | olive via accent | **Deprecated** — no new use |
| `secondary-*` | olive-light | **Deprecated** — no new use |
| `white-*`, `black-*`, `gray-*` | neutrals | Available during migration; prefer `neutral-*` |

**No new component may use `accent-*`, `primary-*` (olive), or `secondary-*`.** These aliases are removed in Phase 7 after all consumers migrate to Mineral Warm tokens.

## Compatibility

Legacy groups are available only for existing code that predates Phase 2. Migration to Mineral Warm semantic tokens is tracked in `implementation/mineral-warm-design-system/inventory.md`.
