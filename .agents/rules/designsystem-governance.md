# Design System Governance

These rules control how the FitApp design system evolves.

**Normative source:** `docs/design-system/mineral-warm.md`.

## Deprecation Policy

The following are deprecated as of Phase 1 (Governance and Baseline):

| Deprecated element | Reason | Removal target |
|---|---|---|
| `--color-olive-*` CSS variables | Replaced by Mineral Warm blue-first palette | Phase 7 |
| `--color-accent-*` (olive) | Replaced by blue semantic tokens | Phase 7 |
| `--color-primary-*` (olive alias) | Replaced by `blue-*` family | Phase 7 |
| `--color-secondary-*` (olive-light) | No Mineral Warm equivalent; remove at Phase 7 | Phase 7 |
| `accent-*` NativeWind tokens | Olive-backed; replaced by `blue-*` | Phase 7 |
| `primary-*` NativeWind tokens (olive) | Olive-backed; replaced by `blue-*` | Phase 7 |
| `secondary-*` NativeWind tokens | Olive-backed; replaced by neutral/moss as appropriate | Phase 7 |
| `COLORS.tabActive`, `COLORS.primary`, `COLORS.secondary` in `src/tokens/colors.ts` | Olive hex values; must be migrated to Mineral Warm | Phase 2 |

**No-new-legacy-use enforcement:** No new or migrated component may introduce, reference, or extend any deprecated element listed above. Existing consumers are tracked in `implementation/mineral-warm-design-system/inventory.md` and must migrate before Phase 7.

## Exception Documentation

Exceptions must be rare, documented near the code, and recorded in the active implementation artifact.

Allowed exceptions:
- Third-party components that cannot use NativeWind.
- React Native props that require direct values, centralized in a small token helper (`src/tokens/colors.ts`). The values in that file must be Mineral Warm values after Phase 2.
- Platform-specific native behavior with no semantic token equivalent.

Each exception must record:
1. Which rule is being excepted.
2. Why no compliant alternative is available.
3. Who owns remediation and when.

## Exception Ownership

| Exception category | Owner | Review at |
|---|---|---|
| `src/tokens/colors.ts` direct hex values | Phase 2 implementation | Phase 2 completion |
| Native `Modal` imports in 3 files | Phases 4–6 implementation | Per-phase completion |
| Moderate npm audit findings (js-yaml, uuid) | Phase 7 or stack upgrade decision | Phase 7 |

## Creating Components

Follow `component-workflow.md` before applying the criteria below.

Create a new shared component only when:
- The pattern appears in 3 or more places.
- The pattern is cross-feature.
- The behavior and variants can be clearly named.

Keep feature-specific components inside `src/features/<feature>/components/`.

Every retained custom shared component must have a recorded behavioral non-equivalence reason. Missing registry parity, required domain composition, or specialized gesture behavior are acceptable reasons; visual preference is not.

## Extending Components

Prefer extending an existing atom or molecule when:
- The new behavior fits the component purpose.
- The variant can be named clearly.
- The API remains simple.

Do not add feature-specific props to shared components.

## Token Changes

- Add tokens before using new visual values.
- All new tokens must use Mineral Warm semantics; olive-derived values are forbidden.
- Prefer semantic names over visual names.
- Keep existing token names stable unless migration is worth it.
- Component tokens should represent component contracts, not one-off screens.

## Naming

- Components, types, interfaces: `PascalCase`.
- Functions, variables, hooks: `camelCase`.
- Files and directories: `kebab-case`.
- Token names: semantic, lowercase, grouped by purpose.

## Exceptions

Exceptions must be rare and documented near the code.

Allowed exceptions:
- Third-party components that cannot use NativeWind.
- React Native props that require direct values, centralized in a small token helper.
- Platform-specific native behavior.

## PR Checklist

Before merging UI work:
- No raw hex values in components (centralized token helper is the only exception).
- No arbitrary spacing unless justified.
- No inline visual styles.
- No use of deprecated legacy token groups (`accent-*`, `primary-*` olive, `secondary-*`).
- New components checked against existing atoms/molecules.
- Touch targets are sufficient.
- Empty/loading/error states are handled.
- Android behavior validated first.
- Contrast ratios validated per `mineral-warm.md` section 15 and 17.

## Validation Commands

Run when relevant:
- `npx tsc --noEmit`
- `npx expo install --check`
- `npx expo-doctor`
- `npm audit --audit-level=moderate`
- `npm run lint`
- `npm test`
- `npx expo export --platform web --output-dir dist-check`

Remove temporary validation output such as `dist-check/`.
