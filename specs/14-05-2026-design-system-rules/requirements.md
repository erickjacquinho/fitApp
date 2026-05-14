# Requirements: Design System Rules

## Scope
Create complete app rules for FitApp design system usage, documentation, and governance.

FitApp is Android-first for MVP validation. iOS will be supported after Android validation. The app targets phone screens only. Tablet, desktop, and web layouts are out of scope.

## Acceptance Criteria

### AC-001 Rule structure
WHEN the design system rules are created THEN the system SHALL organize them into focused `.agents/rules/` files to reduce context size and improve maintainability.

### AC-002 Index rule
WHEN focused rule files exist THEN the system SHALL keep `.agents/rules/designsystem-guide.md` as the design system index.

### AC-003 Foundation rules
WHEN foundation rules are documented THEN the system SHALL cover colors, typography, spacing, radius, borders, shadows, sizes, motion, and token creation.

### AC-004 Layout rules
WHEN layout rules are documented THEN the system SHALL define Android-first phone layouts, iOS compatibility, safe area usage, scroll behavior, screen padding, 4-column conceptual grid, section spacing, and action placement.

### AC-005 Platform scope
WHEN layout rules are documented THEN the system SHALL explicitly exclude tablet, desktop, and responsive web layout rules.

### AC-006 Accessibility rules
WHEN accessibility rules are documented THEN the system SHALL define touch target minimums, contrast expectations, screen reader labels, roles, focus/selected states, disabled states, and error announcement guidance.

### AC-007 Iconography rules
WHEN iconography rules are documented THEN the system SHALL define Lucide as the default icon library with allowed sizes, stroke usage, semantic colors, and icon-only constraints.

### AC-008 Content rules
WHEN content rules are documented THEN the system SHALL define Brazilian Portuguese UI copy rules for CTAs, labels, errors, empty states, destructive actions, and confirmations.

### AC-009 Component rules
WHEN component rules are documented THEN the system SHALL define purpose, variants, states, tokens, accessibility, and misuse guidance for shared components.

### AC-010 Form rules
WHEN form rules are documented THEN the system SHALL define field structure, label placement, helper text, errors, disabled fields, validation timing, spacing, submit placement, and keyboard behavior.

### AC-011 Feedback rules
WHEN feedback rules are documented THEN the system SHALL define loading, skeleton, toast, inline error, success, warning, offline, empty, and partial data states.

### AC-012 Navigation rules
WHEN navigation rules are documented THEN the system SHALL define Android-first navigation behavior, iOS-compatible adjustments, stack headers, back actions, bottom tab bar, active states, and header actions.

### AC-013 Data display rules
WHEN data display rules are documented THEN the system SHALL define lists, workout cards, meal cards, macro summaries, progress indicators, charts, history views, comparisons, empty data, and partial data states.

### AC-014 Governance rules
WHEN governance rules are documented THEN the system SHALL define new component criteria, extension criteria, naming, token changes, exceptions, PR checklist, and validation commands.

### AC-015 Existing docs
WHEN rules are created THEN the system SHALL preserve `docs/components.md` as a broad reminder document and not treat it as an implementation rule.

### AC-016 Old palette cleanup
WHEN foundation rules are finalized THEN the system SHALL remove or replace outdated retro-future palette guidance.

### AC-017 Validation
WHEN all rule changes are complete THEN the system SHALL pass `npx tsc --noEmit` and `npx expo export --platform web --output-dir dist-check`, then remove `dist-check/`.

## Failure Scenarios
- WHEN a rule conflicts with Android-first phone scope THEN the system SHALL update or remove that rule.
- WHEN a rule references tablet, desktop, or web layout behavior THEN the system SHALL mark it out of scope or remove it.
- WHEN component guidance conflicts with token usage THEN the system SHALL prioritize tokenized NativeWind usage.
- WHEN a new rule would require implementation changes outside documentation and tokens THEN the system SHALL defer that implementation unless explicitly requested.

## Out of Scope
- Implementing all shared components.
- Reworking feature screens.
- Creating tablet, desktop, or responsive web layouts.
- Replacing `docs/components.md` unless explicitly requested.
