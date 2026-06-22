# Design System Guide - FitApp

This is the design system index for FitApp.

FitApp is Android-first for MVP validation. iOS support comes after Android validation. Rules target phone screens only.

## Rule Files

- `designsystem-foundations.md`: tokens, colors, typography, spacing, radius, borders, shadows, sizes, motion, component tokens.
- `layout-guidelines.md`: safe area, phone grid, screen padding, section spacing, scroll, action placement.
- `accessibility-guidelines.md`: touch targets, contrast, roles, labels, disabled states, errors.
- `iconography-guidelines.md`: Lucide usage, sizes, stroke, semantic colors.
- `content-guidelines.md`: Brazilian Portuguese UI copy, CTAs, labels, errors, empty states.
- `component-guidelines.md`: shared component contracts for atoms, molecules, and organisms.
- `component-workflow.md`: registry-first discovery, equivalence decisions, generated component review, adapters, migration, and evidence.
- `form-guidelines.md`: field anatomy, validation, errors, submit behavior, keyboard behavior.
- `feedback-guidelines.md`: loading, skeleton, toast, inline error, success, warning, offline, empty states.
- `navigation-guidelines.md`: stack headers, bottom tabs, back actions, primary actions.
- `data-display-guidelines.md`: lists, workout cards, meal cards, macros, progress, charts, history.
- `designsystem-governance.md`: component creation, token changes, exceptions, PR checklist.

## Mandatory Principles

- Use NativeWind classes with tokens from `tailwind.config.js`.
- Do not use raw visual values in app components.
- Prefer extending existing shared components over creating duplicates.
- Keep feature-specific UI inside `src/features/<feature>/components/`.
- Follow Android-first phone behavior; keep iOS compatible.
- Do not add non-phone layout rules unless product scope changes.

## Source of Truth

- Token values: `global.css`.
- Token utilities: `tailwind.config.js`.
- Shared UI: `src/components/`.
- Feature UI: `src/features/`.
- Routes: `app/`.
