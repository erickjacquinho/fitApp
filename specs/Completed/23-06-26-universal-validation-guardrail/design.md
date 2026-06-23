# Design: Universal Validation Guard Rail

## Decision

Use one global blocking rule referenced directly by `AGENTS.md`. Focused rules may extend it but cannot replace or weaken it.

## Baseline Decision

Use regression-aware validation:

- new failures always block;
- pre-existing non-critical failures require proof and follow-up;
- critical security, data-integrity, startup, and affected-journey failures always block.

This avoids falsely passing regressions while preventing unrelated historical debt from making all work impossible.

## Validation Flow

1. Classify affected layers and capture baseline.
2. Validate each task before checking it complete.
3. Require all tasks complete before the Full Gate.
4. Audit scope and diff integrity.
5. Run static, lint, test, Expo, audit, and export checks.
6. Run layer-specific frontend, state, service, data, security, configuration, and native checks.
7. Execute the affected journey on Android.
8. Rebuild and hash-verify the APK when native compatibility changes.
9. Fix failures and rerun the complete gate.
10. Persist reproducible evidence and only then allow completion.

## Architecture Coverage

- **Types:** compile-time contracts and strict typing.
- **Services:** inputs, outputs, failures, retries, idempotency, and security boundaries.
- **Hooks and state:** transitions, races, lifecycle, recovery, and stale state.
- **Components:** states, accessibility, interaction, navigation, and design-system compliance.
- **Persistence:** fresh database, upgrades, transactions, offline persistence, and restart behavior.
- **Integration:** complete Android user journeys and native-client compatibility.

## Decision Log

- A single rule was chosen over separate frontend and backend rules to prevent coverage gaps.
- Regression-aware baseline handling was chosen over requiring historical non-critical debt to be fixed by unrelated work.
- Missing validation tooling blocks behavior changes because unverified behavior cannot be called complete.
- Android runtime evidence is mandatory because static checks and web export cannot prove React Native behavior.
- Durable evidence is mandatory because unsupported completion claims are not auditable.

## Files

- `.agents/rules/full-validation-gate.md`: universal blocking rule.
- `AGENTS.md`: mandatory entrypoint reference.
- `specs/23-06-26-universal-validation-guardrail/`: requirements, design, tasks, and quality evidence.

## Validation

- Verify all acceptance criteria use EARS syntax.
- Verify the rule covers frontend and backend-relevant layers.
- Verify `AGENTS.md` references the rule as mandatory.
- Verify commands match the Windows/PowerShell project environment.
- Run `git diff --check` for the documentation changes.

