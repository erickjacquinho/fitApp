# Design - Diet Refactoring

## 1. Directory Restructuring
Create the `hooks` directory inside the Diet feature:
- `src/features/diet/hooks/`

## 2. Hook Contracts

### 2.1. `useFoodBank.ts`
- **Hook Input:** None
- **Hook State/Return:**
  - `foods: Food[]`
  - `search: string`
  - `setSearch: (query: string) => void`
  - `isSelectionMode: boolean`
  - `setIsSelectionMode: (mode: boolean) => void`
  - `bulkSelections: Set<string>`
  - `toggleBulkSelection: (id: string) => void`
  - `deleteFood: (id: string) => Promise<void>`
  - `deleteSelectedFoods: () => Promise<void>`
  - `isLoading: boolean`

### 2.2. `useMenu.ts`
- **Hook Input:** `meals: Meal[]` (from withObservables wrapper)
- **Hook State/Return:**
  - `dailyTotalKcal: number`
  - `isLoading: boolean`
  - `deleteMeal: (id: string) => Promise<void>`

### 2.3. `useMealForm.ts`
- **Hook Input:** None
- **Hook State/Return:**
  - `mealName: string`
  - `setMealName: (name: string) => void`
  - `quantity: number`
  - `setQuantity: (q: number) => void`
  - `prepState: string`
  - `setPrepState: (s: string) => void`
  - `selectedItems: { food: Food; quantity: number }[]`
  - `addFoodItem: (food: Food, quantity: number) => void`
  - `removeFoodItem: (foodId: string) => void`
  - `saveMeal: () => Promise<void>`
  - `isSaving: boolean`

### 2.4. `useFoodForm.ts`
- **Hook Input:** None
- **Hook State/Return:**
  - `name: string`
  - `setName: (name: string) => void`
  - `calories: string`
  - `setCalories: (c: string) => void`
  - `protein: string`
  - `setProtein: (p: string) => void`
  - `carbs: string`
  - `setCarbs: (c: string) => void`
  - `fat: string`
  - `setFat: (f: string) => void`
  - `weight: string`
  - `setWeight: (w: string) => void`
  - `description: string`
  - `setDescription: (d: string) => void`
  - `saveFood: () => Promise<void>`
  - `isSaving: boolean`

## 3. Strict Type Safety
Ensure component parameters use strict type declarations instead of `any`.
- Replace `items: any[]` with `items: MealItem[]` in observed components.
