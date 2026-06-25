# Design: Shared UI and Dashboard

## Technical Context

Scope includes all `src/components/atoms`, `molecules`, `organisms`, `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, and `src/features/dashboard/components`. The phase preserves current route and data contracts.

## Layer Mapping

```text
Phase 3 primitive types
  -> shared composition props
    -> shell/navigation theme integration
      -> Dashboard feature compositions
        -> Dashboard route
```

Shared components may receive domain-neutral data only. Dashboard hooks/services remain unchanged unless typing is required to preserve an existing interface.

## Shared Component Classification

| Component | Integration form | Reason |
|---|---|---|
| `ProgressCircle` | custom atom | Circular SVG behavior is not linear Progress. |
| `LabeledInput`, `SearchBar` | thin composition | Combine canonical Input, Label/Text, and actions. |
| `ListItem`, `EmptyState`, `Header` | shared composition | Cross-feature presentation without domain state. |
| `DateSelector` | shared composition | Date navigation behavior composed from Button/Text. |
| `SwipeableCard` | custom gesture adapter | Gesture behavior has no registry equivalent. |
| `BottomSheetModal` | thin Dialog-backed adapter | Preserve sheet layout without recreating Dialog state. |
| `ConfirmModal`, `FeedbackDialog` | thin controlled adapters | Standardize confirmation/acknowledgment semantics. |
| `main-tab-screen` | structural composition | Safe-area and screen layout, not a Card. |

Every decorated region is recorded as Card, structural View, inset region, interactive row, or domain wrapper before editing.

## Shell and Navigation

- Root consumes system theme and font readiness from Phase 2.
- Tab options use `useThemeColors()` for native navigation properties.
- Active tabs use primary color plus selected semantics; inactive uses theme secondary content.
- Native numeric layout tokens remain centralized (`SIZES`, `SPACING`, border/radius tokens) until Phase 7 consolidation.
- Status bar stays `auto`; root and portal surfaces must update without flashing.

## Dashboard Mapping

- `DashboardScreen`: app background, loading/error/retry, refresh color from theme hook.
- `DietWidget`: general calories use primary/neutral; macro details use domain semantics.
- `MacroTrackerCard`: explicit protein/carbohydrate/fat tone contract.
- `TrainingWidget`: primary for action/progress, moss for completed status only.
- Existing metrics and destinations stay unchanged.

## State and Error Handling

- Shared popup components expose controlled `open`/`onOpenChange` or stable compatibility props backed by controlled primitives.
- Async adapters accept pending state and prevent duplicate actions.
- Theme changes do not reset local state.
- Shared components never swallow consumer errors or own business retry logic.

## Testing

- Component tests for controlled value flow, clear/search, swipe, date change, popup dismissal, pending guards, and accessibility.
- Shell integration tests for theme-derived navigation values and active-state semantics.
- Dashboard render tests for loading, populated, empty/error where supported, refresh, macro mapping, and route actions.
- Android smoke covers every tab, system theme change, shared overlays, swipe, and Dashboard refresh/navigation.

## Migration and Rollback

- Reconcile overlapping uncommitted files before modification and preserve their behavior with tests.
- Migrate shared components before Dashboard consumers.
- Roll back a single composition if behavior diverges; do not restore legacy tokens globally.
- Phase exit requires zero obsolete primitive APIs within scope and a complete classification ledger.

