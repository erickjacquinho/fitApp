# Tasks: Daily Diet Log & Reusable Calendar

## 1. Database & Types
- [ ] 1.1 Update `meals` Schema
  - **Skill:** `database-architect`
  - **Target:** `src/db/schema.ts`, `src/db/migrations.ts`
  - **Source:** `design.md` -> Schema & Migrations
  - **Trace:** AC1, AC2
  - **Details:** Add `target_date` (string, isIndexed: true, isOptional: true) to `meals` schema. Increment to `version: 4` and write the migration in `migrations.ts`.

- [ ] 1.2 Update `Meal` Model
  - **Skill:** `database-architect`
  - **Target:** `src/db/models/Meal.ts`
  - **Source:** `design.md` -> Model
  - **Trace:** AC1, AC2
  - **Details:** Add `@field('target_date') targetDate!: string;` to `Meal` model.

## 2. Services
- [ ] 2.1 Update `MealService`
  - **Skill:** `backend-architect`
  - **Target:** `src/features/diet/services/meal-service.ts`
  - **Source:** `design.md` -> Services
  - **Trace:** AC3, AC5
  - **Details:** Modify `createWithItems` to accept `targetDate: string` and assign it to the model.

## 3. Components
- [ ] 3.1 Create `CalendarStrip` Component
  - **Skill:** `frontend-developer`
  - **Target:** `src/components/molecules/CalendarStrip.tsx`
  - **Source:** `design.md` -> CalendarStrip.tsx
  - **Trace:** AC1, AC6
  - **Details:** Create a highly reusable horizontal date selector. Accepts `selectedDate: string` and `onSelectDate: (date: string) => void`.

- [ ] 3.2 Refactor `MenuScreen` state
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/diet/components/MenuScreen.tsx`, `app/(tabs)/diet.tsx`
  - **Source:** `design.md` -> MenuScreen.tsx
  - **Trace:** AC2, AC3
  - **Details:** 
    - Lift state out of `MenuScreenComponent` to a wrapper (`app/(tabs)/diet.tsx`) holding `selectedDate` state.
    - Render `<CalendarStrip />` between the Header and the `MenuScreen`.
    - `MenuScreen` accepts `selectedDate` prop.
    - Update the `withObservables` query: `database.get('meals').query(Q.where('target_date', props.selectedDate), ...)`
    - Handle fallback for old data where `target_date` is `null`. We can either run an explicit fix function on load, or query `Q.or(Q.where('target_date', props.selectedDate), Q.where('target_date', null))`. The best approach is a fallback migration script on startup, but a query fallback is safer for now. Wait, if we use a query fallback, all old meals show on ALL days. It's better to update old meals' `target_date` to `created_at` formatted date on first launch.

- [ ] 3.3 Pass `selectedDate` to `handleAddMeal`
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Source:** `design.md` -> MenuScreen.tsx
  - **Trace:** AC3
  - **Details:** Update `handleAddMeal` to pass the current `selectedDate` to `MealService.createWithItems`.

## 4. Validation
- [ ] 4.1 Type check and lint
  - **Skill:** `code-reviewer`
  - **Target:** Terminal
  - **Command:** `npx tsc --noEmit`
