# Technical Design - Diet Meal Dropdown Menu

## 1. Directory Structure Changes
The following files will be added or modified:
- `src/components/ui/dropdown-menu.tsx` (New - Installed from `@react-native-reusables/cli`)
- `src/features/diet/services/meal-service.ts` (Modified - Add update method)
- `src/features/diet/hooks/useMealForm.ts` (Modified - Add edit support)
- `src/features/diet/components/MealForm.tsx` (Modified - Add edit loading & headers support)
- `src/features/diet/components/MealCard.tsx` (Modified - Replace trash icon with dropdown)
- `app/diet/edit-meal.tsx` (New - Route for editing meals)

## 2. Component Design & Tokens Mapping
When installing `dropdown-menu`, we must adapt the styles to FitApp Mineral Warm design tokens:
- Trigger container and items: Replace generic classes with:
  - `bg-popover` -> `bg-surface`
  - `text-popover-foreground` -> `text-text-primary`
  - `border-border` -> `border-border-subtle`
  - Active/hover state: `bg-accent` -> `bg-surface-hover` or `bg-blue-500` (per blue-first rule)
- Icon: Use `EllipsisVertical` from `lucide-react-native`.

## 3. Database Layer (WatermelonDB) & Service Changes
We need a clean way to update a Meal and its items atomically:
Add `MealService.updateWithItems(mealId, mealData, items)`:
- Retrieve `Meal` by `mealId`.
- Fetch existing `MealItem` records for this meal.
- Perform an atomic database write batch:
  - Update `Meal` details.
  - Diff existing items against new items:
    - If a food is removed: mark as deleted.
    - If a food is updated: update its quantity.
    - If a food is new: prepare create.

## 4. UI Layer Routing Changes
- Add `app/diet/edit-meal.tsx` which imports `MealForm`.
- Retrieve `mealId` using `useLocalSearchParams<{ mealId: string }>()`.
- Pass `mealId` down to `MealForm`.

## 5. Security & Validation
- **Input Validation:** Ensure edited meal names are non-empty.
- **Cascading Deletions:** Ensure removed items during editing are marked as deleted correctly in WatermelonDB.
