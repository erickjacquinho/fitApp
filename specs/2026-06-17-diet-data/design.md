# Design - Step 2: Diet Module - Data

## 1. Entity Mapping
Location: `src/db/models/`

- **Food.ts**:
  - `@field('name') name!: string`
  - `@field('protein') protein!: number`
  - ... (other fields)
- **Meal.ts**:
  - `@field('name') name!: string`
  - `@children('meal_items') items!: Query<MealItem>`
- **MealItem.ts**:
  - `@relation('meals', 'meal_id') meal!: Relation<Meal>`
  - `@relation('foods', 'food_id') food!: Relation<Food>`
  - `@field('quantity') quantity!: number`

## 2. Service Layer
Location: `src/features/diet/services/`

- **food-service.ts**:
  - `create(data: FoodDTO)`
  - `update(id: string, data: Partial<FoodDTO>)`
  - `delete(id: string)`
  - `search(query: string)`
- **meal-service.ts**:
  - `createWithItems(mealData: MealDTO, items: ItemDTO[])`: Use of `database.batch`.

## 3. Types
Location: `src/features/diet/types.ts`

- `FoodDTO`, `MealDTO`, `ItemDTO`.

## 4. Integration
- Registration of new models in `src/db/index.ts`.
- Export of services via `src/features/diet/index.ts`.
