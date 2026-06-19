# Design - Step 3: Diet Module - UI

## 1. Screen Structure
Location: `src/features/diet/components/` (or `app/diet/` if using Expo Router deeply)

- **MenuScreen**: Reactive list of `Meal`. Use of `@withObservables` to update totals.
- **FoodBankScreen**: FlatList with `SearchBar` at the top. Support for `selectable` mode.
- **FoodForm**: Reusable component for Create/Edit Food.
- **MealForm**: Composition of text fields + List of selected items.

## 2. Diet UI Components
- **MacroBadge**: Small component to display P/C/F (Protein, Carb, Fat).
- **PreviewMacros**: `useMemo` hook to sum `food.protein * (quantity/100)`.
- **FoodSelectorModal**: Filterable list with numeric input for each item.

## 3. Internal Navigation
- `diet/index` -> Menu.
- `diet/food-bank` -> Food Bank.
- `diet/create-food` -> Food Form.
- `diet/create-meal` -> Meal Form.

## 4. State Management
- Use of WatermelonDB for persistent data.
- Local state (`useState`) for forms in progress.
- Zustand (optional) if there is a need to share temporary food selection between screens.
