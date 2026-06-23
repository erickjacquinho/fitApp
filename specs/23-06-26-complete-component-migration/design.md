# Design: Complete Card and Popup Migration

## Context

The first Shadcn migration established canonical Card and AlertDialog primitives but left two incomplete areas: standalone card-like Views and popup flows backed by React Native `Modal` or `Alert.alert`. This design closes those gaps without changing domain behavior.

## Architecture

The implementation follows the required unidirectional dependency order:

1. **Types:** strict props for Dialog, sheet adapters, feedback state, actions, and controlled open state.
2. **Services:** existing domain services remain unchanged.
3. **Hooks:** hooks expose typed feedback or decision state only where current imperative alerts must become controlled UI.
4. **Components:** canonical primitives own overlay and card behavior; shared adapters preserve stable FitApp contracts; feature components compose them.
5. **Integration:** routes and screens consume the canonical components without importing registry internals or React Native popup APIs.

## Container Classification

Every decorated View must be classified before migration.

| Classification | Required implementation | Examples |
|---|---|---|
| Standalone related-content group | Canonical `Card` | Progress summary, profile/statistics placeholder, program block, top-level macro summary |
| Domain card | Feature composition rooted in canonical `Card` | Training, diet, meal, history, and session summaries |
| Structural layout | `View` | Flex rows, spacing wrappers, icon slots, screen shells |
| Inset region inside a Card | Structural `View` with semantic inset tokens | Compact details that must not create nested Cards |
| Interactive list row | Canonical Button/ListItem composition as appropriate | Selectable exercise or food rows |

The audit must include at least these current residual targets:

- `app/(tabs)/profile.tsx`
- `app/(tabs)/statistics.tsx`
- `src/features/training/components/WorkoutSessionScreen.tsx`
- `src/features/training/components/TrainingProgressBar.tsx`
- `src/features/training/components/ProgramForm.tsx`
- `src/features/dashboard/components/MacroTrackerCard.tsx`
- `src/features/diet/components/MealForm.tsx`
- `src/features/diet/components/ReorderMealsModal.tsx`

Containers inside an existing Card must not be converted mechanically. Their classification must preserve the no-nested-card rule.

## Popup Decision Matrix

| Current flow | Target | Decision |
|---|---|---|
| `ConfirmModal` | `AlertDialog` | Keep the existing thin adapter and verify all destructive consumers. |
| Program selection and destructive decisions in `ProgramListScreen` | `AlertDialog` or controlled Dialog | Replace `Alert.alert`; use AlertDialog for decisions and Dialog for option selection. |
| Program deletion in `useProgramList` | Controlled `AlertDialog` | Move presentation state to the consuming component; keep deletion in the hook/service. |
| Exercise picker | `Dialog` | Replace React Native `Modal` while preserving search, creation, selection, keyboard, and empty state. |
| Exercise execution sheet | Dialog-backed sheet adapter | Preserve bottom placement, keyboard avoidance, controlled visibility, and close behavior. |
| Food selector sheet | Dialog-backed sheet adapter | Preserve search, quantities, selection, fixed action area, and close behavior. |
| Meal reorder page sheet | `Dialog` composition | Preserve drag-and-drop, save/cancel, Android back, and full-height phone behavior. |
| Form validation errors | Inline error | Replace alerts when the user can fix the field in place. |
| Load or operation failures | Shared controlled feedback dialog | Use concise Portuguese copy and an explicit dismiss action. |
| Successful create/save actions | Non-blocking feedback plus navigation | Avoid blocking success dialogs. |

## Canonical Dialog Contract

Add the official React Native Reusables Dialog primitive to `src/components/ui/dialog.tsx` only if it is not already present. Review generated dependencies and replace every generic token with FitApp semantic tokens.

The canonical Dialog contract must provide:

- controlled `open` and `onOpenChange` behavior;
- portal-backed overlay behavior;
- accessible title and description primitives;
- Android back and backdrop dismissal;
- focus lifecycle delegated to the registry primitive;
- semantic surface, border, radius, spacing, and overlay tokens;
- no feature-specific props.

## Shared Adapter Contracts

### Dialog-backed sheet adapter

`BottomSheetModal` may remain as a public compatibility name during migration, but its implementation must be backed by canonical Dialog primitives rather than React Native `Modal`.

The adapter may own:

- bottom alignment;
- phone-height constraints;
- keyboard-avoiding composition;
- a standard header and close action;
- stable `visible` and `onClose` compatibility props.

The adapter must not recreate portal, focus, overlay, or dismissal state already owned by Dialog.

### Feedback dialog adapter

Use one controlled shared adapter for non-field blocking failures that need acknowledgment. It must accept strict title, description, action label, open state, and dismissal props. Destructive decisions remain AlertDialog flows; fixable form errors remain inline.

## Hook State Migration

Hooks that currently invoke `Alert.alert` must stop rendering UI imperatively.

- Domain operations continue to return typed success or failure results.
- Components own controlled Dialog or AlertDialog visibility.
- Selection choices use typed identifiers and callbacks.
- Async actions expose pending state to prevent duplicate execution.
- Visible copy remains in the component or a typed presentation contract, not in services.

No database schema or domain model changes are required.

## Accessibility and Interaction

- Every Dialog and AlertDialog has an accessible title.
- Descriptions are provided when the title alone does not explain the consequence.
- Icon-only close controls include Portuguese accessibility labels.
- Destructive action text names the operation.
- Selected list items expose selected state beyond color.
- All actions retain at least the `min-h-touch-target` effective touch area.
- Backdrop, Android back, cancel, and close controls update the same controlled state.
- Async primary actions are disabled while pending.

## Design-System Compliance

- Use the canonical `Card`, `Dialog`, `AlertDialog`, `Button`, `Icon`, `Input`, `Text`, and `Progress` primitives.
- Feature code must not import `@rn-primitives/*` directly.
- Replace registry-generic utilities with FitApp semantic tokens.
- Do not add raw colors, arbitrary static dimensions, unsupported radii, or default shadows.
- Preserve the no-nested-card rule by using structural inset regions inside existing Cards.

## Security, Maintainability, and Scalability

- **Security:** destructive actions remain explicit, guarded against duplicate execution, and isolated from backdrop dismissal.
- **Maintainability:** one Dialog primitive and minimal shared adapters replace feature-level popup infrastructure.
- **Scalability:** typed controlled state allows future popup flows to reuse the same canonical contracts without imperative APIs.

## Native Impact

The expected implementation is JavaScript and TypeScript only. A development APK rebuild is unnecessary unless the official Dialog primitive introduces native dependencies, Expo plugins, native configuration, Android changes, or runtime dev-client incompatibility.

## Validation Plan

- Search `src/` and `app/` for React Native `Modal` imports and `Alert.alert` calls; both must return zero application usages.
- Search affected files for standalone card-like Views and review every result by classification.
- Search affected files for generic registry tokens and raw visual values.
- Validate accessible titles, descriptions, close labels, destructive labels, selected states, and pending states.
- Validate that all dependency declarations remain exact.
- Run `npx tsc --noEmit`.
- Run `npx expo install --check`.
- Run `npx expo-doctor`.
- Run `npm audit --audit-level=moderate`.
- Run `npx expo export --platform web --output-dir dist-check` and remove `dist-check/`.
- Run the mandatory final gate: `npx tsc --noEmit && npm run lint`; document a repository-level missing-script blocker without adding an unrequested lint stack.
- Rebuild and hash-verify `fitApp-dev.apk` only when the native-impact assessment requires it.

## Final Classification and Retained Structural Exceptions

During the migration, the following outcomes were achieved:
- **Zero Native Modals**: All `Modal` usages from `react-native` were completely replaced with `Dialog`, `AlertDialog`, or `BottomSheetModal`.
- **Zero Alert Calls**: All `Alert.alert` usages were successfully removed and converted into state-driven UI (like inline errors or `FeedbackDialog` / `ConfirmModal`).
- **Canonical Cards**: Standalone visual groups across the app were normalized to use the canonical `Card` primitive.
- **Structural Views**: Components that require grouping inside a `Card` were explicitly converted to use standard `<View>` blocks with appropriate padding, layout rules, and no `shadow`/`border` to prevent nested cards.

