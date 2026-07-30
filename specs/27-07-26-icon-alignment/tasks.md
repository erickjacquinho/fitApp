# Tasks: Icon UI/UX Alignment & Accessibility Standard

## Phase 1: Setup & Governance
- [x] T001 [skill: impeccable] Update `.agents/rules/04-ui-components.md` to formalize Icon Discipline rules (sizing tokens, 44px touch targets, ghost press feedback, stroke width, and haptics)
- [x] T002 [skill: impeccable] Update `.agents/rules/06-ui-content-a11y.md` to reinforce mandatory icon accessibility roles and labels

## Phase 2: User Story 1 - Shared UI Molecules Touch Target & Sizing Compliance (P1)
- [x] T003 [P] [US1] [skill: impeccable] Audit and update `src/components/molecules/Header.tsx` to enforce 44px touch target (`min-h-[44px] min-w-[44px]`), `active:opacity-80` press feedback, `accessibilityRole="button"`, and localized `accessibilityLabel`
- [x] T004 [P] [US1] [skill: impeccable] Audit and update `src/components/molecules/DateSelector.tsx` to enforce 44px touch targets on chevron buttons and localized accessibility labels ("Dia anterior", "Próximo dia")
- [x] T005 [P] [US1] [skill: impeccable] Audit and update `src/components/molecules/SearchBar.tsx` to ensure search and clear action icons preserve 44px hit areas and non-shifting opacity feedback
- [x] T006 [P] [US1] [skill: impeccable] Audit and update `src/components/molecules/EmptyState.tsx` and `src/components/molecules/SwipeableRow/SwipeableRowActions.tsx` for icon token compliance and press feedback

## Phase 3: User Story 2 - Feature Components Icon Audit (P2)
- [x] T007 [P] [US2] [skill: impeccable] Audit and update `src/features/diet/components/MealCard.tsx` and `src/features/diet/components/BulkSelectionMenu.tsx` for 44px touch targets and accessibility labels
- [x] T008 [P] [US2] [skill: impeccable] Audit and update `src/features/training/components/ExerciseDraggableItem.tsx` and `src/features/training/components/WorkoutListItem.tsx` for drag touch targets and haptics
- [x] T009 [P] [US2] [skill: impeccable] Audit and update `src/features/training/components/WorkoutSession/WorkoutSessionListHeader.tsx` and `src/features/dashboard/components/DietWidget.tsx` for icon sizing tokens and opacity press states

## Phase 4: Polish & Validation
- [x] T010 [skill: general] Run `npx tsc --noEmit` and `npm run lint` to validate TypeScript type safety and linting compliance
- [x] T011 [skill: general] Perform runtime smoke check of icon interaction states and touch target alignment
