# Technical Design: Refactor Edit Meal Header Popup

## 1. Directory Structure Changes
The following files will be added or modified:
- `src/features/diet/components/EditMealScreenComponent.tsx` (New - Screen component containing layout, header actions, and edit Dialog)
- `app/diet/edit-meal.tsx` (Modified - Route wrapper using `withObservables` and rendering the container)
- `src/features/diet/components/MealForm.tsx` (Modified - Conditionally hide name/time inputs when `mealId` is passed)

## 2. Component Design

### 2.1 `EditMealScreenComponent.tsx`
This component will manage:
- Local state for the Edit Dialog visibility (`dialogOpen`) and inputs (`editName`, `editTime`).
- Synchronization of local states with WatermelonDB model props (`meal.name` and `meal.preparationState`).
- The custom `Screen` root wrapper rendering the dynamic header.
- The `Dialog` modal triggering on pressing the edit header icon:
  - Width: `w-4/5 max-w-[400px]` with no inline styles.
  - Overlay: Conditionally activated backdrop shading.
  - Form validation: Disable save if meal name is empty.
  - Color themes: Use explicit semantic tokens to avoid native stylesheet compilation or Tailwind Merge conflicts.

### 2.2 `edit-meal.tsx` (Route)
- Retrieve `mealId` from route search parameters.
- Define a container wrapping `EditMealScreenComponent` with `withObservables` observing `meal` updates via `findAndObserve(mealId)`.
- Render the observed container once the `mealId` is resolved.

### 2.3 `MealForm.tsx`
- Accept optional prop `mealId`.
- Wrap the basic details details `Card` with a check: `{!mealId && (...) }`. This ensures the inputs are shown when creating a new meal (since we don't have a header-based edit path during creation) but hidden when editing an existing meal.

## 3. WatermelonDB Service Layer
Ensure `MealService.updateBasicInfo` exists and is implemented correctly:
```typescript
static async updateBasicInfo(mealId: string, name: string, time: string): Promise<void> {
  const meal = await database.get<Meal>('meals').find(mealId);
  await database.write(async () => {
    await meal.update((m) => {
      m.name = name;
      m.preparationState = time;
    });
  });
}
```

## 4. Visual Compliance (Mineral Warm UI)
- Dialog Background: `bg-surface` (matches dark/light popover theme).
- Dialog Overlay: `bg-black-main/20` mapped directly to the Screen overlay backdrop.
- Text: `text-text-primary` for general inputs, `text-text-secondary` for subtitles.
- Primary Button: Solid Tomato colored primary button (`bg-tomato-main`) with inverse text color (`text-text-inverse`).
- Outline Button: Transparent base with border (`border border-border-subtle`) and standard text (`text-text-primary`).
- Avoid arbitrary spacing or inline layout `style={{ ... }}` objects.
