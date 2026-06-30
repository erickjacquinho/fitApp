# Design: Diet UI Migration

## Technical Context

Scope includes Diet routes under `app/(tabs)/diet.tsx` and `app/diet/*`, plus every `src/features/diet/components/*.tsx`. Hooks, utilities, and services may be touched only to preserve strict presentation contracts or current local work; domain behavior is frozen.

## Layer Mapping

```text
Existing Diet domain types and macro values
  -> unchanged services and observables
    -> existing hooks with presentation-safe outputs
      -> canonical Diet compositions
        -> Diet routes
```

No visual token or component API may flow into services or database code.

## Route and Component Inventory

- Routes: Diet tab, add food, calendar summary, create food, create meal, edit meal item, food bank.
- Primary screens: `MenuScreen`, `FoodBankScreen`, `CalendarSummaryScreen`, `AddFoodToMealScreen`, `EditMealItemScreen`.
- Forms/overlays: `FoodForm`, `MealForm`, `FoodSelectorModal`, `ReorderMealsModal`.
- Domain display: `MealCard`, `FoodEntryCard`, `DailyBalance`, `MacroBadge`, `MealMacrosSummary`, `NutritionalInfoDisplay`, `PreviewMacros`, `DailySummaryCard`.

Each file receives a pre-edit classification and consumer trace. Existing uncommitted Diet diffs are reviewed separately before migration.

## Macro Contract

```ts
type MacroTone = 'protein' | 'carbohydrate' | 'fat';

interface MacroPresentation {
  tone: MacroTone;
  label: string;
  abbreviatedLabel: string;
  unit: 'g';
  accessibilityLabel: string;
}
```

`macro-utils.ts` may centralize presentation metadata but cannot change calculations. Protein maps to blue, carbohydrate to amber, fat to orange. Calories use primary for emphasis or neutral for supporting data. Macro graphs/bars retain labels or markers.

## Composition Decisions

- Top-level meal, food, daily summary, and historical objects use canonical Card.
- Internal macro rows and form groups use structural/inset Views, never nested Cards.
- Forms use canonical Text, Label, Input, Button, inline error, and controlled feedback.
- Food selector and reorder interfaces use the Phase 4 Dialog-backed adapter and retain keyboard/drag behavior.
- Swipe actions use the shared gesture adapter with destructive tone and explicit accessible action.

## State Preservation

- Do not alter WatermelonDB models, schema, queries, or transaction boundaries.
- Controlled form values remain synchronous; theme changes cannot reset them.
- Search selections and quantities survive theme changes and keyboard transitions.
- Pending save/delete/reorder actions disable duplicate execution.
- Empty/load/error states remain driven by existing hooks and services.

## Testing Matrix

| Journey | Required states |
|---|---|
| Menu | loading, no meals, meals, delete confirm/failure, reorder cancel/save |
| Food bank | loading, empty search, populated, selection mode, bulk delete |
| Food form | default, invalid fields, valid save, pending, service failure |
| Meal form | empty foods, selected foods, remove, totals, save failure |
| Add/edit item | invalid quantity, valid quantity, recalculated display, save failure |
| Calendar | loading, empty history, populated history, navigation |

Run each applicable state in light/dark, small phone, long copy, keyboard open, Android back, and theme switch. Automated tests verify behavior; runtime evidence verifies integration.

## Rollback

- Commit/validate by screen group; a failed screen rolls back without restoring shared legacy tokens.
- If a current local change conflicts with the approved contract, preserve behavior and document the conflict before refactoring.
- Any persistence or calculation difference blocks Phase 5 and requires restoring the previous domain implementation.

## Exit Gate

All Diet routes must use canonical APIs, every macro role must be correct and non-color-reliant, behavior tests must pass, Android journeys must pass in both themes, and scoped legacy scans must return zero.

