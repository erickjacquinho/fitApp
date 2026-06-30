# Tasks - Diet Meal Dropdown Menu

## Tasks List

### Phase 1: Registry Installation & Theme Review
- [x] **Task 1.1:** Run CLI command to add `dropdown-menu` from `@react-native-reusables`.
  - **Target:** `src/components/ui/dropdown-menu.tsx`
  - **Skill:** `command` / `npx`
  - **Trace:** AC 2
- [x] **Task 1.2:** Clean up and review `dropdown-menu.tsx` to align with FitApp semantic color tokens. Remove any generic styling or olive accents.
  - **Target:** `src/components/ui/dropdown-menu.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 2 / design.md

### Phase 2: Database and Service Layer
- [x] **Task 2.1:** Implement `updateWithItems` method in `MealService` to support atomic meal and item updates.
  - **Target:** `src/features/diet/services/meal-service.ts`
  - **Skill:** `backend-architect`
  - **Trace:** AC 6 / design.md

### Phase 3: Form Hook & Component Support for Editing
- [x] **Task 3.1:** Update `useMealForm` hook to accept optional `mealId`. If provided, fetch existing meal and items from WatermelonDB and populate state.
  - **Target:** `src/features/diet/hooks/useMealForm.ts`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 5 / AC 6
- [x] **Task 3.2:** Modify `MealForm` component to display edit-appropriate text headers (e.g. "Editar refeição" instead of "Nova refeição") when a `mealId` is present.
  - **Target:** `src/features/diet/components/MealForm.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 5
- [x] **Task 3.3:** Create edit meal screen route `app/diet/edit-meal.tsx` passing `mealId` from router params to `MealForm`.
  - **Target:** `app/diet/edit-meal.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 5

### Phase 4: UI Integration in MealCard
- [x] **Task 4.1:** Import `EllipsisVertical` icon from `lucide-react-native` and replace the direct trash icon trigger in `MealCard` with the custom styled `DropdownMenu` component.
  - **Target:** `src/features/diet/components/MealCard.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 1 / AC 2 / AC 3 / AC 4 / AC 5

### Phase 5: Verification and Testing
- [x] **Task 5.1:** Update/add unit tests for the editing functionality and `MealCard` integration in existing test suite.
  - **Target:** `src/features/diet/__tests__/`
  - **Skill:** `code-tester`
  - **Trace:** design.md
- [x] **Task 5.2:** Execute Full Validation Gate:
  ```powershell
  npx tsc --noEmit
  npm run lint
  npm test
  ```
  - **Skill:** `command`
  - **Trace:** full-validation-gate.md
