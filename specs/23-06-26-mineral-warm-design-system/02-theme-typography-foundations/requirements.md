# Requirements: Theme and Typography Foundations

## Goal

Implement a stable token, theme, and typography foundation that expresses Mineral Warm consistently across NativeWind utilities and React Native native-property consumers.

## Clarifications

### Session 2026-06-23

- Light and dark themes follow the operating-system preference without a manual override.
- Helvetica Now is copied from `C:/Users/Jacques/Desktop/font` into project assets during implementation.
- Display Bold is used for prominent headings; Text Regular, Medium, and Bold cover body and controls.
- Medium fulfills the semantic semibold role because the licensed family contains no Semibold file.
- Temporary legacy aliases may remain only until Phase 7 and cannot be used by migrated code.

## User Stories

### US1 - Consistent semantic color (P1)

As a user, I need every surface, action, status, macro, and chart color to retain the same meaning in light and dark themes.

### US2 - Reliable typography (P1)

As an Android user, I need the intended typeface to render without fallback flashes, synthesized-weight failures, or unreadable hierarchy.

### US3 - Native-property parity (P2)

As an implementer, I need theme-aware values for non-className properties so that charts, spinners, SVG, and navigation match component styling.

## Acceptance Criteria

- **P2-AC-001:** WHEN primitive color scales are implemented THEN the system SHALL expose every neutral, blue, amber, orange, moss, tomato, mustard, teal, and plum value defined by the normative source.
- **P2-AC-002:** WHEN semantic theme aliases are resolved THEN the system SHALL provide the specified background, surface, elevated surface, borders, text, focus, scrim, links, states, macros, and chart roles for both themes.
- **P2-AC-003:** WHEN a generic action or selection is emphasized THEN the system SHALL use the blue primary family unless an explicit macro or status meaning applies.
- **P2-AC-004:** WHEN the operating-system theme changes THEN the system SHALL update semantic values consistently without requiring an application setting or restart.
- **P2-AC-005:** WHEN a native property cannot consume a NativeWind class THEN the system SHALL obtain its value from one strict centralized theme contract rather than a component-local hexadecimal value.
- **P2-AC-006:** WHEN font assets are installed THEN the system SHALL bundle exactly the approved Display Bold and Text Regular/Medium/Bold files and expose semantic family utilities without synthesized weights.
- **P2-AC-007:** WHEN typography roles render THEN the system SHALL use display 32/37, title 24/29, subtitle 18/23, body 16/24, description 14/20, label 14/18, and caption 12/16 mappings.
- **P2-AC-008:** WHEN Android Text or TextInput receives typography styles THEN the system SHALL not receive numeric, CSS-variable-like, or otherwise invalid native `fontWeight` values.
- **P2-AC-009:** WHEN theme or font configuration affects native integration THEN the system SHALL rebuild the development client, replace the root APK, and prove matching SHA-256 hashes.
- **P2-AC-010:** WHEN Phase 2 completes THEN the system SHALL retain current feature behavior and provide a documented compatibility boundary for unmigrated consumers.

## Failure and Edge Scenarios

- A font file is missing, corrupt, renamed, or not licensed for inclusion.
- Font loading fails or the application root renders before the required family is available.
- System theme changes while an overlay or chart is mounted.
- CSS semantic aliases and native theme values drift.
- A dark semantic surface uses automatic scale inversion and loses its intended meaning.
- NativeWind passes an unsafe weight to Android TextInput.

## Non-Functional Requirements

- **Security:** Only approved local font files are included; no remote font loading or tracking request is allowed.
- **Maintainability:** Primitive values, semantic aliases, and native maps have explicit ownership and parity tests.
- **Scalability:** New semantic roles extend the theme contract without component-specific colors.
- **Reliability:** Application startup has a defined font failure path and no infinite splash state.
- **Performance:** Theme changes avoid remounting feature trees; bundled fonts add no network latency.

## Out of Scope

- Migrating shared primitives or feature screens to the new APIs.
- Adding a manual theme selector.
- Redesigning app icons, splash artwork, or brand imagery.
- Updating Expo or React Native versions.

## Success Criteria

- 100% parity between declared CSS semantics and native theme maps.
- 100% of normative text/background combinations meet their required contrast threshold.
- Zero Android invalid-font-weight runtime errors in foundation validation.
- One verified development APK contains the configured fonts.

