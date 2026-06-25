# Tasks: Header Long Press Reorder

- [x] **Task 1: Import LongPressable & Wrap customTitle**
  - **Target:** [MenuScreen.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MenuScreen.tsx)
  - **Source:** Design Section 1 (Component Wrapping)
  - **Trace:** AC 1 (Long Press Activation), AC 2 (Haptic Feedback)
  - **Skill:** `frontend-developer`
  - **Description:** Add `LongPressable` import from `@/components/ui/long-pressable`. Wrap the `<DateSelector />` in `MainTabScreen`'s `customTitle` using `<LongPressable onLongPress={startReorder}>`.

- [x] **Task 2: Final Validation Gate**
  - **Target:** Workspace Root
  - **Source:** Spec-Driven Development Orchestration
  - **Trace:** Full Validation Gate
  - **Skill:** `code-tester`
  - **Description:** Run compiler checks (`tsc --noEmit`), linter (`npm run lint`), and tests (`npm test`). Confirm that no errors are introduced.
