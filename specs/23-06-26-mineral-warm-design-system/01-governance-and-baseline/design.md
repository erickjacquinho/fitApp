# Design: Governance and Baseline

## Technical Context

- **Project:** Expo 54, React Native 0.81, Expo Router, NativeWind 4, strict TypeScript.
- **Current token sources:** `global.css`, `tailwind.config.js`, and `src/tokens/*`.
- **Current guidance:** `.agents/rules/designsystem-*.md`, focused UI rules, and `docs/components.md`.
- **Observed baseline:** 19 routes, 30 shared UI files, 122 legacy/raw/weight-related occurrences, two live native Modal imports, and 13 uncommitted user files.
- **Validation baseline:** TypeScript, Expo dependency check, and Expo Doctor pass; lint/test scripts are absent; dependency audit has blocking high/critical findings.
- **Impact:** documentation, test infrastructure, dependency manifest, configuration; no product behavior.

## Architecture

Phase 1 establishes governance before runtime tokens change:

```text
Normative external palette
  -> docs/design-system/mineral-warm.md
    -> focused .agents/rules contracts
      -> migration inventory and deprecation ledger
        -> validation infrastructure and evidence template
```

No domain Types -> Services -> Hooks -> Components flow is introduced. The relevant one-way flow is `normative document -> rules -> validation policy -> later implementation`.

## Canonical Documentation Contract

Create `docs/design-system/mineral-warm.md` in English. It must preserve:

- all primitive color values and scale meanings;
- semantic light/dark mappings;
- blue-first precedence and reserved color meanings;
- typography hierarchy and allowed families/weights;
- surfaces, cards, borders, dividers, buttons, controls, messages, links, badges, loading, charts, images, contrast, and opacity rules;
- approved/prohibited combinations and required contrast evidence.

Update the design-system index, foundations, color, styling, accessibility, component, and governance rules only where needed. Focused files link to the canonical document rather than copying full tables.

## Inventory Model

The implementation evidence records:

```ts
interface MigrationInventoryEntry {
  path: string;
  layer: 'route' | 'primitive' | 'shared' | 'dashboard' | 'diet' | 'training' | 'token' | 'rule';
  legacyUses: string[];
  overlappingUserChange: boolean;
  targetPhase: 2 | 3 | 4 | 5 | 6 | 7;
  exception?: string;
}
```

The inventory belongs in `implementation/mineral-warm-design-system/inventory.md`; validation evidence belongs in the sibling `validation.md`.

## Validation Tooling Decision

Plan exact dev dependencies compatible with the current stack:

- `jest@29.7.0`
- `jest-expo@54.0.17`
- `@types/jest@29.5.14`
- `@testing-library/react-native@14.0.1`
- `react-test-renderer@19.1.0`
- `eslint@9.39.2`
- `eslint-config-expo@10.0.0`

Add `lint` and `test` scripts without changing production behavior. Apply only scoped, proven-compatible transitive overrides for blocking `shell-quote@1.8.4` and `ws@7.5.11`; do not run force fixes or upgrade Expo/React Native. Unchanged moderate findings require evidence and follow-up ownership.

## Existing SDD Reconciliation

- Read prior requirements/design/tasks but verify their claimed outcome against live files.
- Do not modify or archive prior packages.
- Record contradictions in the inventory and route remediation to the relevant new phase.
- Checked tasks do not waive new requirements or gates.

## Failure Handling and Rollback

- If the translation cannot be proven complete, Phase 1 stops before rules change.
- If a tooling dependency conflicts with Expo 54 peers, resolve the exact compatible version in this phase; do not defer a broken manifest.
- If an override breaks Metro, tests, or export, revert that override only and record the audit blocker.
- If user changes move during implementation, refresh the inventory before continuing.

## Verification

- Compare canonical section coverage against the external source.
- Verify every inventory path exists and every route/component is assigned once.
- Verify exact dependency versions and scripts.
- Run repository diff integrity and the mandatory automated gate because manifests/configuration change.
- No Android journey is required for documentation alone, but tooling/configuration changes receive a smoke check and explicit native-impact decision.

