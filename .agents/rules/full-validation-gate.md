# Full Validation Gate

This rule is a mandatory guard rail for every future implementation in FitApp. It applies to frontend, state, services, persistence, dependencies, configuration, native integration, and documentation that changes executable workflows.

No validation process can guarantee a defect-free implementation. This gate maximizes defect detection by requiring risk-based tests, regression evidence, real runtime validation, and a complete final rerun.

## Authority

- This rule is mandatory and cannot be replaced by a task-specific validation list.
- Feature rules may add stricter checks but cannot remove checks required here.
- An implementation MUST NOT be declared complete, handed off, merged, or released until this gate passes.
- Validation summaries without command output or runtime evidence do not count as completion evidence.
- After any code, configuration, dependency, schema, migration, or generated-file change made following the gate, the affected checks and the complete final gate MUST run again.

## Regression Policy

Every implementation must establish a relevant pre-change baseline before modifying behavior.

- Every new failure or regression blocks completion.
- A pre-existing non-critical failure may be accepted only when it is reproduced without the implementation, is unchanged by the implementation, and is recorded with evidence and a follow-up action.
- A pre-existing issue never qualifies for acceptance when it can cause data loss, security compromise, authorization bypass, secret exposure, corrupted migrations, startup failure, or a crash in an affected user journey.
- Missing validation tooling is not a passing result. Behavior changes require the smallest compatible test or validation mechanism to be added as an explicit implementation task, with exact dependency versions.

## Required Validation Record

Every implementation must maintain `implementation/<feature-name>/validation.md`. If an active SDD package defines a different implementation evidence path, use that path consistently and link it from `tasks.md`.

The record must contain:

- implementation scope and affected layers;
- pre-change baseline results;
- risk classification;
- automated commands with exit codes;
- tests added or changed and scenarios covered;
- manual runtime scenarios with expected and observed results;
- Android/native impact decision;
- accepted pre-existing non-critical failures with proof;
- final gate timestamp and result.

Do not place secrets, tokens, credentials, private user data, or full sensitive logs in validation evidence.

## Step 1: Classify Impact Before Implementation

Classify every task against all applicable areas:

- **UI:** rendering, styling, accessibility, navigation, forms, overlays, gestures, keyboard, loading, empty, error, disabled, and destructive states.
- **State:** Zustand stores, hooks, cache, async state, concurrency, stale state, retries, and lifecycle behavior.
- **Service:** validation, business rules, errors, retries, idempotency, timeouts, and external boundaries.
- **Data:** WatermelonDB models, schema, migrations, queries, transactions, offline persistence, upgrade paths, and destructive operations.
- **Security:** authentication, authorization, tenant or ownership boundaries, untrusted input, secrets, storage, dependencies, and sensitive logging.
- **Configuration:** Expo, Metro, Babel, TypeScript, Tailwind, environment variables, plugins, build settings, and package manifests.
- **Native:** `android/`, native dependencies, Expo plugins, permissions, development-client compatibility, and APK behavior.
- **Documentation-only:** no executable behavior, configuration, command, dependency, or generated artifact changes.

The implementation plan must list the checks triggered by this classification. Unclassified affected areas block task completion.

## Step 2: Per-Task Gate

Before marking any implementation task complete:

1. Inspect the task diff and confirm it contains only intended changes.
2. Run the narrowest relevant type, lint, and automated tests.
3. Add or update tests for every changed behavior and fixed defect.
4. Cover the success path and applicable invalid, empty, loading, failure, retry, offline, and concurrent paths.
5. Validate error propagation; never silently swallow failures.
6. Confirm no temporary code, mocks, debug logs, disabled checks, skipped tests, TODO bypasses, or hardcoded production data remain.
7. Record evidence before checking the task as complete.

A task cannot be marked complete when its behavior lacks a reliable validation mechanism.

## Step 3: Full Gate Entry Conditions

Run the Full Gate only after implementation tasks are finished.

- All required `tasks.md` implementation checkboxes are complete.
- No unresolved clarification, TODO, placeholder, temporary bypass, or known implementation defect remains.
- Generated files and dependency manifests are included when their sources changed.
- Unrelated user changes remain preserved and are explicitly excluded from implementation claims.
- The validation record identifies every changed file and affected layer.

Failure of an entry condition stops the gate immediately.

## Step 4: Repository and Diff Integrity

Run and record:

```powershell
git status --short
git diff --check
git diff --stat
git diff --name-only
```

Then verify:

- no unintended file, generated output, build artifact, secret, or local environment file is included;
- no unrelated refactor widened the requested scope;
- no user change was reverted;
- no conflict marker, debug statement, commented-out implementation, or unsafe suppression was introduced;
- files follow project naming, language, architecture, and component rules.

## Step 5: Mandatory Automated Gate

For every code, configuration, dependency, schema, or migration change, run:

```powershell
npx.cmd tsc --noEmit
npx.cmd expo install --check
npx.cmd expo-doctor
npm.cmd audit --audit-level=moderate
npx.cmd expo export --platform web --output-dir dist-check
```

Also run the repository lint and test scripts:

```powershell
npm.cmd run lint
npm.cmd test
```

Rules:

- A missing required lint or test script blocks behavior-changing work until validation tooling is added in scope.
- Do not add `--force`, suppress diagnostics, weaken compiler settings, skip tests, or lower audit thresholds to obtain a pass.
- Remove `dist-check/` after evidence is captured.
- All dependency declarations must use exact versions; `^`, `~`, wildcard, Git branch, and unpinned URL ranges are forbidden.
- A moderate pre-existing audit finding may follow the Regression Policy. New findings and every high or critical finding affecting the changed boundary block completion.

Documentation-only changes may skip application commands only when they do not change executable commands, configuration, generated artifacts, or runtime contracts. They must still pass diff integrity and verify every changed link, path, example, and command.

## Step 6: Test Requirements by Layer

### Frontend and UI

Validate every affected journey for:

- initial, loading, populated, empty, error, disabled, and retry states when applicable;
- small phone layout, long Brazilian Portuguese copy, keyboard open, Android back, and overlay dismissal;
- navigation destination, route parameters, back behavior, and state restoration;
- touch targets, roles, labels, selected state, focus behavior, readable errors, and destructive confirmation;
- duplicate submission prevention and pending-state behavior;
- no red screen, uncaught promise rejection, render warning, missing key warning, or console error;
- design tokens, canonical components, and absence of raw visual values where a token exists.

Visual inspection alone is insufficient. Changed behavior requires automated component, hook, or integration coverage plus Android runtime validation.

### State, Hooks, and Async Work

Validate:

- initial state and every allowed transition;
- stale closures, repeated mounting, cancellation, race conditions, and duplicate actions;
- success, typed failure, retry, and recovery behavior;
- state consistency after navigation away and return;
- no state update after disposal and no unhandled async rejection.

### Services and Business Rules

Validate:

- valid and invalid inputs at the boundary;
- success, expected failure, unexpected failure, and recovery paths;
- idempotency for repeatable commands and duplicate requests;
- transaction boundaries, partial failure behavior, and rollback expectations;
- stable typed contracts between services, hooks, and components;
- authorization and ownership checks whenever protected data or actions exist.

### Data and WatermelonDB

Schema, model, query, migration, or persistence changes require tests for:

- a fresh database;
- upgrade from the previous schema version;
- existing data preservation;
- required defaults, nullability, relations, and indexes;
- transaction success and rollback on failure;
- offline write, application restart, reload, and observable refresh;
- deletion and cascade behavior;
- malformed or legacy records when the changed boundary can receive them.

Never edit a released schema without an ordered migration. Data-loss risk blocks completion regardless of baseline status.

### Security

Inspect changed boundaries for:

- secrets or private data committed, logged, or exposed to UI errors;
- missing input validation or unsafe dynamic execution;
- authorization, ownership, or privilege bypass;
- insecure local storage of sensitive data;
- dependency or configuration changes that weaken security;
- destructive actions without explicit confirmation and duplicate-execution protection.

Security checks must test denial paths, not only permitted paths.

## Step 7: Real Runtime Gate

Every behavior-changing implementation requires a real Android runtime smoke test using the development client or generated APK.

Test the complete changed journey from entry to completion, including at least one failure or recovery path. Record:

- device or emulator and Android version;
- application build or development-client identity;
- exact steps;
- expected result;
- observed result;
- runtime logs for failures without sensitive data.

Mock-only, web-only, static-analysis-only, or screenshot-only validation cannot replace Android runtime validation.

## Step 8: Native and APK Gate

Rebuild the Android development client when changes affect native dependencies, Expo plugins or configuration, `android/`, permissions, native build settings, or dev-client compatibility.

After a successful build:

1. Replace root `fitApp-dev.apk` with `android/app/build/outputs/apk/debug/app-debug.apk`.
2. Calculate SHA-256 for both paths.
3. Verify the hashes match.
4. Install or launch the rebuilt client and execute the affected runtime smoke test.

JavaScript or TypeScript-only work may skip rebuilding only when runtime validation confirms client compatibility and the validation record explains the decision.

## Step 9: Final Review and Rerun

After fixes from any gate:

1. Review the complete diff again.
2. Rerun every affected narrow test.
3. Rerun the entire Mandatory Automated Gate.
4. Rerun the complete affected Android journey.
5. Update validation evidence with final results only; preserve earlier failures as history.

The final result must be reproducible from the recorded commands and steps.

## Blocking Conditions

Completion is forbidden when any of these is true:

- a required task remains open;
- a new or migration-caused check fails;
- changed behavior has no automated test;
- a required lint or test mechanism is absent;
- TypeScript, lint, tests, Expo diagnostics, build/export, or affected runtime validation fails;
- the affected journey crashes, logs an uncaught error, loses data, or produces inconsistent state;
- a migration lacks fresh-install and upgrade evidence;
- a secret, authorization bypass, critical vulnerability, or destructive-action flaw exists;
- dependency versions are not exact;
- validation relies only on code inspection or claims without evidence;
- temporary validation output remains;
- code changed after the final gate without a complete rerun.

## Completion Statement

The final handoff must state:

- what changed;
- automated checks that passed;
- tests and runtime journeys executed;
- native/APK decision;
- accepted pre-existing non-critical issues with proof;
- the validation evidence path.

Never state that an implementation is fully validated when a blocking condition remains.

