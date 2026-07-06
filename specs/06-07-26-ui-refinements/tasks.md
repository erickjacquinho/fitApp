# Implementation Tasks: UI Design System Refinements

This task list deconstructs the UI design system refinement plan into granular, actionable, and testable tasks.

---

## 🛠️ Phase 1: Setup & Baseline Verification

- [ ] T001 Verify baseline by running the existing component test suite using `npm run test`

---

## 🎨 Phase 2: Card Border Radius Refinement (User Story 1)
*Goal: Align Card border radius to design guidelines.*
*Story: US1*

- [ ] T002 [US1] Update the default variant border radius class of the Card component from `rounded-md` to `rounded-xl` in `src/components/ui/card.tsx`
- [ ] T003 [US1] Verify card variants style by running Card component tests using `npm run test src/components/ui/__tests__/card.test.tsx`

---

## ⌨️ Phase 3: Input Focus Visual Correction (User Story 2)
*Goal: Fix missing blue focus states on the Input component.*
*Story: US2*

- [ ] T004 [US2] Update focus border color class of the Input text field from `focus:border-border-control` to `focus:border-border-focus` in `src/components/ui/input.tsx`
- [ ] T005 [US2] Update the native animated focus ring border class from `border-border-subtle` to `border-border-focus` in `src/components/ui/input.tsx`
- [ ] T006 [US2] Update the web-specific focus classes from `focus-visible:border-border-control focus-visible:ring-border-subtle` to `focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/20` in `src/components/ui/input.tsx`
- [ ] T007 [US2] Verify input functionality by running Input component tests using `npm run test src/components/ui/__tests__/input.test.tsx`

---

## 🔍 Phase 4: Final Validation & Verification

- [ ] T008 Run the full test suite in `src/components/ui/__tests__` to ensure no visual token regressions
- [ ] T010 Manually check form text fields (e.g. Profile, Food Bank) to verify blue focus outline visibility

---

## Dependencies & Strategy
*   **Execution Strategy**: Implement Card radius first (US1) as it is a visual-only static refinement. Then implement Input focus styles (US2), verifying with the respective unit tests.
*   **Story Dependencies**:
    *   US2 depends on baseline setup but is independent of US1.
