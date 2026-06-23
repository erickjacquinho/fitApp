# Design System Guide - FitApp

This is the design system index for FitApp.

FitApp is Android-first for MVP validation. iOS support comes after Android validation. Rules target phone screens only.

## Canonical Source

**`docs/design-system/mineral-warm.md`** is the single English normative specification for all visual rules.
All focused rule files below link to it rather than duplicate its tables.
Any conflict between a focused file and `mineral-warm.md` must be resolved in favor of `mineral-warm.md`.

## Phase Routing

| Phase | Focus | Files in scope |
|---|---|---|
| 1 | Governance and baseline | `.agents/rules/`, `docs/design-system/mineral-warm.md` |
| 2 | Theme and typography foundations | `global.css`, `tailwind.config.js`, `src/tokens/` |
| 3 | Canonical primitives | `src/components/ui/`, `app/style-guide.tsx` |
| 4 | Shared UI and dashboard | `src/components/atoms/`, `src/components/molecules/`, `src/components/organisms/`, `src/features/dashboard/` |
| 5 | Diet UI migration | `src/features/diet/` |
| 6 | Training UI migration | `src/features/training/` |
| 7 | Final migration and validation | residual routes, legacy alias removal, full gate |

## Rule Files

- `designsystem-foundations.md`: tokens, colors, typography, spacing, radius, borders, shadows, sizes, motion, component tokens. **See `mineral-warm.md` sections 1–5 for normative values.**
- `color-tokens-rules.md`: color semantic families and usage rules. **See `mineral-warm.md` sections 2–3 for normative values.**
- `designsystem-governance.md`: deprecation policy, no-new-legacy-use enforcement, exception ownership, component creation, token changes.
- `layout-guidelines.md`: safe area, phone grid, screen padding, section spacing, scroll, action placement.
- `accessibility-guidelines.md`: touch targets, contrast, roles, labels, disabled states, errors.
- `iconography-guidelines.md`: Lucide usage, sizes, stroke, semantic colors.
- `content-guidelines.md`: Brazilian Portuguese UI copy, CTAs, labels, errors, empty states.
- `component-guidelines.md`: shared component contracts for atoms, molecules, and organisms.
- `component-workflow.md`: registry-first discovery, equivalence decisions, generated component review, adapters, migration, and evidence. **See `mineral-warm.md` section 18 for token usage rules.**
- `form-guidelines.md`: field anatomy, validation, errors, submit behavior, keyboard behavior.
- `feedback-guidelines.md`: loading, skeleton, toast, inline error, success, warning, offline, empty states.
- `navigation-guidelines.md`: stack headers, bottom tabs, back actions, primary actions.
- `data-display-guidelines.md`: lists, workout cards, meal cards, macros, progress, charts, history.

## Mandatory Principles

- Use NativeWind classes with tokens from `tailwind.config.js`.
- Do not use raw visual values in app components.
- Prefer extending existing shared components over creating duplicates.
- Keep feature-specific UI inside `src/features/<feature>/components/`.
- Follow Android-first phone behavior; keep iOS compatible.
- Do not add non-phone layout rules unless product scope changes.
- All generic highlighted elements use blue first (`blue-500`). See the blue-first rule in `mineral-warm.md` section 2.

## Source of Truth

- Normative visual specification: `docs/design-system/mineral-warm.md`.
- Token values: `global.css`.
- Token utilities: `tailwind.config.js`.
- Shared UI: `src/components/`.
- Feature UI: `src/features/`.
- Routes: `app/`.
