# Design: Shadcn Component and Design System Alignment

## Context

FitApp already contains customized React Native Reusables `Button`, `Card`, `Input`, and `Text` primitives, alongside custom atoms and molecules that duplicate registry capabilities. The migration must preserve domain behavior, exact dependency versions, Android-first behavior, and existing uncommitted work.

## Inventory Decision Matrix

| Current component | Decision | Registry source | Reason |
|---|---|---|---|
| `Typography` | Replace | `Text` | Canonical text primitive can expose FitApp semantic variants. |
| `Icon` | Replace | `Icon` | Registry icon wrapper standardizes class-based icon styling. |
| `Badge` | Replace | `Badge` | Domain badges compose the canonical primitive directly. |
| `Switch` | Replace | `Switch` | Direct control equivalence. |
| `Divider` | Replace | `Separator` | Direct separator equivalence. |
| `Accordion` | Replace | `Accordion` | The unused duplicate is removed in favor of the canonical primitive. |
| `SegmentedControl` | Replace | `Tabs` | The unused duplicate is removed in favor of canonical tabs. |
| `IconButton` | Replace | `Button` plus `Icon` | Registry button already supports icon sizing and states. |
| `ConfirmModal` | Replace through adapter | `AlertDialog` | Confirmation semantics and accessibility map directly. |
| `TrainingProgressBar` | Compose | `Progress` | Domain label remains custom while the bar becomes canonical. |
| `LabeledInput` | Compose | `Label` plus `Input` | Field composition remains useful; primitives become canonical. |
| `SearchBar` | Compose | `Input`, `Button`, and `Icon` | Search behavior is application composition, not a registry primitive. |
| `BottomSheetModal` | Retain | None | Registry dialog does not preserve bottom-sheet placement and keyboard behavior. |
| `DateSelector` | Retain | None | No registry date-stepper or date-picker equivalent exists. |
| `SwipeableCard` | Retain | None | Swipe actions are specialized behavior. |
| `ProgressCircle` | Retain | None | Registry progress is linear. |
| Domain cards, summaries, headers, and screen shells | Retain | Composition only | They encode FitApp-specific information architecture. |

## Architecture

The migration follows the required unidirectional mapping:

1. **Types:** strict component props and semantic variant types.
2. **Services:** no service changes; component migration is presentation-only.
3. **Hooks:** no hook changes unless required to preserve existing controlled state.
4. **Components:** canonical registry primitives in `src/components/ui/`, FitApp compositions in Atomic Design folders, and feature components consuming only canonical primitives or compositions.

Feature components must not import registry internals or primitive packages directly. They import from `@/components/ui/*` or approved shared compositions.

## Registry Integration

- Add only registry components used by the current application.
- Use `npx @react-native-reusables/cli@latest add <component>` as required by project governance.
- Review every generated file before integration.
- Replace generic registry tokens such as `background`, `foreground`, `primary`, `destructive`, `muted`, `border`, and arbitrary sizes with FitApp semantic utilities.
- Preserve exact versions in `package.json` and `package-lock.json`.
- Do not upgrade Expo, React Native, NativeWind, or other existing stack packages.

## Component Contracts

- `Text` owns FitApp typography and semantic color variants and provides text class context for composed controls.
- `Icon` receives a Lucide component through `as` and uses semantic class names; direct raw color literals are prohibited.
- Thin adapters may preserve existing props while delegating behavior, state, and accessibility to registry primitives.
- Domain compositions may add labels, summaries, or gestures but must not recreate primitive visuals.
- Runtime styles are limited to calculated progress dimensions and safe-area values.

## Design-System Rule Changes

Update `designsystem-governance.md` with:

- a registry-first discovery order;
- objective behavioral-equivalence criteria;
- adapter acceptance and rejection criteria;
- mandatory generated-class token review;
- dependency and native-client impact checks;
- migration and validation evidence requirements;
- a retained-custom-component decision record.

Update `component-guidelines.md` with canonical primitive ownership and composition boundaries. Update `designsystem-guide.md` only if its index needs a direct reference to the new workflow.

## AGENTS.md Workflow

The workflow will require:

1. Read the design-system index and focused rule.
2. Search existing shared and feature components.
3. Search the React Native Reusables registry for behavioral equivalence.
4. Prefer an existing local registry component; otherwise install through the official CLI.
5. Review generated dependencies and exact versions.
6. Replace generic classes with semantic FitApp tokens.
7. Decide between direct use, thin adapter, domain composition, or documented custom implementation.
8. Migrate consumers and remove obsolete duplication.
9. Validate types, dependencies, Expo health, audit, export, and native-client impact.

## Security, Maintainability, and Scalability

- **Security:** Do not introduce unreviewed packages, version ranges, unsafe dynamic component lookup, or behavior changes in destructive confirmations.
- **Maintainability:** Keep a single primitive implementation per behavior and stable adapters only when they reduce coupling.
- **Scalability:** Centralize semantic variants so future screens consume existing contracts without copying classes.

## Validation

- Search for obsolete replaced-component imports and raw generic registry tokens.
- Run `npx tsc --noEmit`.
- Run `npx expo install --check`.
- Run `npx expo-doctor`.
- Run `npm audit --audit-level=moderate`.
- Run `npx expo export --platform web --output-dir dist-check`.
- Remove `dist-check/`.
- Run the mandatory SDD final gate: `npx tsc --noEmit && npm run lint`; if no lint script exists, record the repository-level gap without adding an unrequested stack tool.
- Rebuild the development APK only if added packages or configuration affect native code, Expo plugins, build settings, or dev-client compatibility.

## Validation Results

- `npx tsc --noEmit`: passed.
- `npx expo install --check`: passed; dependencies are compatible with the installed Expo SDK.
- `npx expo-doctor`: passed 18/18 checks.
- `git diff --check`: passed.
- Exact-version audit: passed; no declared dependency uses `^` or `~`.
- Migration searches: passed with zero obsolete component imports and zero raw hex colors in `src/` or `app/`.
- React Native Reusables doctor: required `PortalHost` and `inlineRem` issues were fixed. Its remaining theme and generic color-variable warnings are intentional because FitApp replaces registry-generic names with its semantic token system.
- `npm audit --audit-level=moderate`: blocked by 25 transitive findings in the existing Babel, Expo, and React Native dependency graph. Suggested forced fixes change the locked stack and are prohibited without explicit authorization.
- Web export: blocked in the existing WatermelonDB model layer because Babel rejects definite-assignment decorated fields in `src/db/models/MealItem.ts`. The temporary `dist-check/` directory was removed. The component migration does not change this model or the current user-modified Babel configuration.
- Final lint gate: TypeScript passed, but `npm run lint` is unavailable because the repository has no `lint` script.
- Native impact: no APK rebuild is required. Added primitives and portal support are JavaScript-only; `inlineRem` changes Metro styling compilation and does not alter the native development client.
