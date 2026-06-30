# Tasks: Final Edit Meal Popup

- [x] **Task 1: Add onEdit Callback to MealCard**
  - **Description:** Implement `onEdit` callback in `MealCard.tsx` props, connect it to the edit dropdown option, and update the memo optimization checklist.
  - **Target:** `src/features/diet/components/MealCard.tsx`
  - **Source:** `design.md` -> Section 1.1
  - **Trace:** AC 3.1
  - **Skill:** `frontend-developer`

- [x] **Task 2: Implement Popup Dialog inside MenuScreen**
  - **Description:** Add edit states, handlers, and the `<Dialog>` popup markup with the correct visual tokens and buttons on `MenuScreen.tsx`. Set `overlayActive` on the `Screen` component.
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Source:** `design.md` -> Section 1.2
  - **Trace:** AC 3.1, AC 3.2, AC 3.3
  - **Skill:** `frontend-developer`

- [x] **Task 3: Refactor Unit Tests**
  - **Description:** Adjust the `diet-components.test.ts` to assert that `MenuScreen` implements the edit popup modal and checks that the `MealCard` triggers the `onEdit` callback prop.
  - **Target:** `src/features/diet/__tests__/diet-components.test.ts`
  - **Source:** `design.md` -> Section 1
  - **Trace:** AC 3.1, AC 3.2
  - **Skill:** `code-tester`

- [x] **Task 4: Complete Validation**
  - **Description:** Verify strict TypeScript types and execute tests.
  - **Target:** System Command (`npx tsc --noEmit && npx jest src/features/diet/`)
  - **Source:** Core Quality Gate
  - **Trace:** Full Gate Compliance
  - **Skill:** `code-tester`
