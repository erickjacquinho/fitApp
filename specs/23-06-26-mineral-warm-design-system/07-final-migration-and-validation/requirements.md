# Requirements: Final Migration and Validation

## Goal

Migrate residual routes, remove every temporary compatibility path, and produce complete automated and Android evidence that the Mineral Warm system is the sole visual system in FitApp.

## Clarifications

### Session 2026-06-23

- Profile and Statistics are included even if currently placeholders.
- Legacy aliases are removed only after repository-wide consumer searches return zero.
- Visual inspection supplements but never replaces automated and Android runtime validation.
- The final APK must contain the Phase 2 native font/theme integration; rebuild is required if that artifact is absent, stale, or affected by later native changes.

## User Stories

### US1 - Complete application consistency (P1)

As a user, I need every current route to use the same visual language and theme behavior.

### US2 - Verifiable accessibility (P1)

As a user, I need readable contrast, visible focus, non-color status identification, reduced motion, and operable controls throughout the application.

### US3 - Reproducible release evidence (P1)

As a maintainer, I need complete automated, runtime, dependency, and APK evidence before the migration can be declared complete.

## Acceptance Criteria

- **P7-AC-001:** WHEN Profile, Statistics, style-guide residuals, and any unassigned route render THEN the system SHALL use canonical Mineral Warm surfaces, typography, components, and theme behavior.
- **P7-AC-002:** WHEN repository cleanup runs THEN the system SHALL report zero obsolete olive/accent aliases, legacy primitive APIs, raw component hex values, unsupported arbitrary visual values, generic registry tokens, native Modal imports, and Alert calls in application scope.
- **P7-AC-003:** WHEN compatibility aliases have zero consumers THEN the system SHALL remove them from CSS, Tailwind, TypeScript tokens, documentation, and tests in one reviewed cleanup.
- **P7-AC-004:** WHEN contrast validation runs THEN the system SHALL record foreground, background, composed opacity, ratio, threshold, and result for every approved text, icon, control-border, focus, status, macro, link, and chart combination in both themes.
- **P7-AC-005:** WHEN chart accessibility is validated THEN the system SHALL record protanopia, deuteranopia, and grayscale evidence and SHALL preserve label, marker, or pattern identification independent of color.
- **P7-AC-006:** WHEN automated validation runs THEN the system SHALL pass TypeScript, lint, tests, Expo dependency check, Expo Doctor, dependency audit policy, and web export without temporary output remaining.
- **P7-AC-007:** WHEN Android runtime validation runs THEN the system SHALL cover every current route in light and dark themes plus applicable loading, empty, error, disabled, focus, keyboard, overlay, gesture, destructive, and recovery states.
- **P7-AC-008:** WHEN final runtime validation completes THEN the system SHALL show no red screen, uncaught rejection, render warning, missing key warning, console error, data loss, or behavior regression in affected journeys.
- **P7-AC-009:** WHEN native-impact review finds font/plugin/config changes or a stale client THEN the system SHALL rebuild, install, launch, copy, and SHA-256 verify the development APK.
- **P7-AC-010:** WHEN the package is declared complete THEN the system SHALL provide 100% requirement-to-task coverage, closed implementation tasks, final validation evidence, and no accepted high/critical blocker.

## Failure and Edge Scenarios

- A legacy alias has a dynamic or non-obvious consumer.
- A route is unreachable through normal navigation but remains registered.
- Light/dark screenshots use different data or state and hide regressions.
- Audit remediation proposes a breaking stack downgrade/upgrade.
- Emulator noise obscures whether the JS bundle or client is faulty.
- APK output differs from the root artifact.
- Validation output is generated after the recorded final timestamp.

## Non-Functional Requirements

- **Security:** High/critical dependency or destructive-flow findings block completion; evidence contains no secrets or private user data.
- **Maintainability:** One semantic system, one primitive layer, and one governance source remain after cleanup.
- **Scalability:** Final scans and tests can be rerun automatically as future UI is added.
- **Reliability:** The final result is reproducible from recorded commands and exact environment identity.
- **Performance:** No material regression is permitted in startup, route transition, list interaction, typing, or theme change.

## Out of Scope

- New product capabilities, routes, data models, analytics, or redesign of brand assets.
- Unrequested Expo or React Native version upgrades.
- Accepting visual similarity as a substitute for behavioral proof.

## Success Criteria

- 100% of current routes have comparable light/dark Android evidence.
- 100% of acceptance criteria across all seven SDDs map to completed tasks and evidence.
- Zero legacy visual-system consumers or unresolved high/critical findings remain.
- Final generated and root APK hashes match when rebuild is required.

