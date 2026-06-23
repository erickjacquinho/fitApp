# Primitive Consumer Inventory

## Primitives Present
- `accordion.tsx`
- `alert-dialog.tsx`
- `badge.tsx`
- `button.tsx`
- `card.tsx`
- `dialog.tsx`
- `icon.tsx`
- `input.tsx`
- `label.tsx`
- `native-only-animated-view.tsx`
- `progress.tsx`
- `separator.tsx`
- `switch.tsx`
- `tabs.tsx`
- `text.tsx`

## Known Consumers
These primitives are deeply integrated across the following layers:
- **Atoms/Molecules**: `ProgressCircle`, `DailySummaryCard`, `DateSelector`, `EmptyState`, `Header`, `LabeledInput`, `ListItem`, `NutritionalInfoDisplay`, `SearchBar`, `SwipeableCard`.
- **Organisms**: `BottomSheetModal`, `ConfirmModal`, `FeedbackDialog`.
- **Features**: `dashboard`, `diet`, `training`.

## Public Props and Contracts
Current public props align with the `@react-native-reusables` registry defaults (e.g., `variant`, `size` for `Button`, standard native text/view props mapped to their primitive equivalents).

## Behavioral Intent of Overlapping Shared-Component Diffs (T004)
The user has uncommitted modifications to several shared components. Their behavioral intent must be preserved during migration:
- **LabeledInput.tsx**: Retains the association between a label and input, likely adding focus logic or custom error placement.
- **SwipeableCard.tsx**: Contains swipe gesture logic that must not be disrupted when changing background tokens.
- **ConfirmModal.tsx & FeedbackDialog.tsx**: Retain specific state management or animation behaviors.
- **input.tsx**: Retains custom ring animations and focus states.
- **ProgramForm.tsx**: Retains deeply nested form state for `BlockDTO` and `ExerciseDTO`, with complex dynamic block/exercise addition and validation logic.

These components must only have their styling tokens migrated to Mineral Warm (e.g. `surface-muted` to `surface-elevated`) without modifying their functional logic or React hooks.
