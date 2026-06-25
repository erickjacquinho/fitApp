# Tasks: Diet Meal Drag & Drop

- [x] **Task 1: Simplify MealCard Morphia**
  - **Target:** [MealCard.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MealCard.tsx)
  - **Source:** Design Section 1 (Morphia Retention)
  - **Trace:** AC 2 (Morphia Preservation)
  - **Skill:** `frontend-developer`
  - **Description:** Remove `isReordering` and `drag` props, remove the conditional layout rendering, and simplify the main component output to always show the full meal cards.

- [x] **Task 2: Implement Haptics & Local State in MenuScreen**
  - **Target:** [MenuScreen.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MenuScreen.tsx)
  - **Source:** Design Section 2 (Gesture Controller & Animation Removal)
  - **Trace:** AC 1 (Long Press Activation), AC 5 (Vibration Feedback)
  - **Skill:** `frontend-developer`
  - **Description:** Import `expo-haptics`. Add `mealOrderIds` and `isUpdatingOrder` state variables. Initialize and synchronize `mealOrderIds` with the DB meals when not dragging. Trigger haptic feedback inside the long press event callback via `runOnJS`.

- [x] **Task 3: Remove Spring Transitions from DraggableMealItem**
  - **Target:** [MenuScreen.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MenuScreen.tsx)
  - **Source:** Design Section 2 (Gesture Controller & Animation Removal)
  - **Trace:** AC 3 (Instant Reordering)
  - **Skill:** `frontend-developer`
  - **Description:** Remove all occurrences of `withSpring` from `DraggableMealItem`'s gesture and styles. Position items instantly to eliminate sliding latency.

- [x] **Task 4: Implement Flicker-free Database Sync**
  - **Target:** [MenuScreen.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MenuScreen.tsx)
  - **Source:** Design Section 2 & Data Layer Semic-Lock
  - **Trace:** AC 4 (Flicker-free Persistence)
  - **Skill:** `frontend-developer`
  - **Description:** Adjust `handleDragEnd` to update `mealOrderIds` synchronously and set `activeId.value = null` on the JS thread to align Reanimated layout transitions with React state updates. Sort rendering elements based on `mealOrderIds`.

- [x] **Task 5: Final Validation Gate**
  - **Target:** Workspace Root
  - **Source:** Spec-Driven Development Orchestration
  - **Trace:** Full Validation Gate
  - **Skill:** `code-tester`
  - **Description:** Run compiler checks (`tsc --noEmit`), check dependencies (`expo install --check`), and run repository lint (`npm run lint`) and tests (`npm test`). Verify there are no type errors or linter warnings.
