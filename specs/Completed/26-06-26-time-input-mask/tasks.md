# Tasks: Time Input Mask

- [x] **Task 1: Add Helper Functions to MenuScreen**
  - **Description:** Implement `formatTimeInput` and `handleTimeChange` helpers inside `MenuScreen.tsx`.
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Source:** `design.md` -> Section 1 & 2
  - **Trace:** AC 3.1, AC 3.2, AC 3.3
  - **Skill:** `frontend-developer`

- [x] **Task 2: Update Input Component Props**
  - **Description:** Adjust the Horário `Input` component inside the Dialog on `MenuScreen.tsx` to use `keyboardType="numeric"`, `maxLength={5}`, and bind `onChangeText={handleTimeChange}`.
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Source:** `design.md` -> Section 3
  - **Trace:** AC 3.1, AC 3.2
  - **Skill:** `frontend-developer`

- [x] **Task 3: Refactor/Add Mask Tests**
  - **Description:** Add unit tests to `diet-components.test.ts` to assert that MenuScreen formats time inputs, clamps values to 23:59, and deletes colon separator characters correctly.
  - **Target:** `src/features/diet/__tests__/diet-components.test.ts`
  - **Source:** `design.md` -> Section 1 & 2
  - **Trace:** AC 3.1, AC 3.2, AC 3.3
  - **Skill:** `code-tester`

- [x] **Task 4: Complete Validation**
  - **Description:** Run typescript validation check and execute tests.
  - **Target:** System Command (`npx tsc --noEmit && npx jest src/features/diet/`)
  - **Source:** Core Quality Gate
  - **Trace:** Full Gate Compliance
  - **Skill:** `code-tester`
