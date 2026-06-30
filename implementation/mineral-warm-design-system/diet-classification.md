# Diet Classification

## Containers and Main Screens
- `MenuScreen.tsx`, `app/(tabs)/diet.tsx`: Main Tab container. Handles dashboard-style display of daily diet progress.
- `FoodBankScreen.tsx`: List/Management screen for custom foods.
- `FoodForm.tsx`, `MealForm.tsx`: Standard edit/create forms.
- `AddFoodToMealScreen.tsx`, `EditMealItemScreen.tsx`: Quantity editing nested screens.
- `CalendarSummaryScreen.tsx`: Date picker and historical summary view.

## Overlays / Popups
- `FoodSelectorModal.tsx`: Search/select sheet (needs alignment with `BottomSheetModal` or `Dialog`).
- `ReorderMealsModal.tsx`: Drag-and-drop modal (needs alignment with `Dialog`).

## Decorated Molecules / Cards
- `MealCard.tsx`: Complex card with swipe-to-delete actions.
- `DailyBalance.tsx`, `MealMacrosSummary.tsx`, `PreviewMacros.tsx`: Read-only macro visualization cards/components.
- `MacroBadge.tsx`: Small read-only chip.
- `DailySummaryCard.tsx`: Historical card.
- `FoodEntryCard.tsx`: Simple list item card.
