# Migration Inventory — Mineral Warm Design System

Source: Phase 1 codebase audit (2026-06-23)

---

## Route Inventory (T003)

19 routes total. Target phase assigned per feature area.

| Path | Layer | Target Phase | Overlap (user change) | Legacy Uses |
|---|---|---|---|---|
| `app/_layout.tsx` | route | 4 | no | none detected |
| `app/(tabs)/_layout.tsx` | route | 4 | no | none detected |
| `app/(tabs)/index.tsx` | route | 4 | no | none detected |
| `app/(tabs)/diet.tsx` | route | 5 | no | none detected |
| `app/(tabs)/training.tsx` | route | 6 | no | none detected |
| `app/(tabs)/profile.tsx` | route | 4 | no | none detected |
| `app/(tabs)/statistics.tsx` | route | 4 | no | none detected |
| `app/diet/add-food-to-meal.tsx` | route | 5 | no | none detected |
| `app/diet/calendar-summary.tsx` | route | 5 | no | none detected |
| `app/diet/create-food.tsx` | route | 5 | no | none detected |
| `app/diet/create-meal.tsx` | route | 5 | no | none detected |
| `app/diet/edit-meal-item.tsx` | route | 5 | no | none detected |
| `app/diet/food-bank.tsx` | route | 5 | no | none detected |
| `app/style-guide.tsx` | route | 3 | no | none detected |
| `app/training/active.tsx` | route | 6 | no | none detected |
| `app/training/create-program.tsx` | route | 6 | no | none detected |
| `app/training/details/[id].tsx` | route | 6 | no | none detected |
| `app/training/history.tsx` | route | 6 | no | none detected |
| `app/training/programs.tsx` | route | 6 | no | none detected |

---

## Shared UI Inventory (T004)

30 shared UI files in `src/components/`.

### Atoms (1)

| Path | Layer | Target Phase | Overlap | Notes |
|---|---|---|---|---|
| `src/components/atoms/ProgressCircle.tsx` | primitive | 4 | no | — |

### Molecules (8)

| Path | Layer | Target Phase | Overlap | Notes |
|---|---|---|---|---|
| `src/components/molecules/DailySummaryCard.tsx` | shared | 4 | no | — |
| `src/components/molecules/DateSelector.tsx` | shared | 4 | no | — |
| `src/components/molecules/EmptyState.tsx` | shared | 4 | no | — |
| `src/components/molecules/Header.tsx` | shared | 4 | no | — |
| `src/components/molecules/LabeledInput.tsx` | shared | 4 | **yes** | user-modified |
| `src/components/molecules/ListItem.tsx` | shared | 4 | no | — |
| `src/components/molecules/NutritionalInfoDisplay.tsx` | shared | 4 | no | — |
| `src/components/molecules/SearchBar.tsx` | shared | 4 | no | — |
| `src/components/molecules/SwipeableCard.tsx` | shared | 4 | **yes** | user-modified |

### Organisms (4)

| Path | Layer | Target Phase | Overlap | Notes |
|---|---|---|---|---|
| `src/components/organisms/BottomSheetModal.tsx` | shared | 4 | no | native Modal import — Phase 4 target |
| `src/components/organisms/ConfirmModal.tsx` | shared | 4 | **yes** | user-modified |
| `src/components/organisms/FeedbackDialog.tsx` | shared | 4 | **yes** | user-modified |
| `src/components/organisms/main-tab-screen.tsx` | shared | 4 | no | — |
| `src/components/organisms/popup.types.ts` | shared | 4 | no | types only |

### UI Primitives (16)

| Path | Layer | Target Phase | Overlap | Notes |
|---|---|---|---|---|
| `src/components/ui/accordion.tsx` | primitive | 3 | no | — |
| `src/components/ui/alert-dialog.tsx` | primitive | 3 | no | — |
| `src/components/ui/badge.tsx` | primitive | 3 | no | — |
| `src/components/ui/button.tsx` | primitive | 3 | no | — |
| `src/components/ui/card.tsx` | primitive | 3 | no | — |
| `src/components/ui/dialog.tsx` | primitive | 3 | no | — |
| `src/components/ui/icon.tsx` | primitive | 3 | no | — |
| `src/components/ui/input.tsx` | primitive | 3 | **yes** | user-modified |
| `src/components/ui/label.tsx` | primitive | 3 | no | — |
| `src/components/ui/native-only-animated-view.tsx` | primitive | 3 | no | — |
| `src/components/ui/progress.tsx` | primitive | 3 | no | — |
| `src/components/ui/separator.tsx` | primitive | 3 | no | — |
| `src/components/ui/switch.tsx` | primitive | 3 | no | — |
| `src/components/ui/tabs.tsx` | primitive | 3 | no | — |
| `src/components/ui/text.tsx` | primitive | 3 | no | — |

---

## Feature UI Inventory (T005)

### Dashboard (5 files)

| Path | Layer | Target Phase | Overlap | Notes |
|---|---|---|---|---|
| `src/features/dashboard/components/DashboardScreen.tsx` | dashboard | 4 | no | — |
| `src/features/dashboard/components/DietWidget.tsx` | dashboard | 4 | no | — |
| `src/features/dashboard/components/MacroTrackerCard.tsx` | dashboard | 4 | no | — |
| `src/features/dashboard/components/TrainingWidget.tsx` | dashboard | 4 | no | — |
| `src/features/dashboard/hooks/useDashboardMetrics.ts` | dashboard | 4 | no | hook only |

### Diet (21 files)

| Path | Layer | Target Phase | Overlap | Notes |
|---|---|---|---|---|
| `src/features/diet/components/AddFoodToMealScreen.tsx` | diet | 5 | **yes** | user-modified |
| `src/features/diet/components/CalendarSummaryScreen.tsx` | diet | 5 | no | — |
| `src/features/diet/components/DailyBalance.tsx` | diet | 5 | no | — |
| `src/features/diet/components/EditMealItemScreen.tsx` | diet | 5 | no | — |
| `src/features/diet/components/FoodBankScreen.tsx` | diet | 5 | **yes** | user-modified |
| `src/features/diet/components/FoodEntryCard.tsx` | diet | 5 | **yes** | user-modified |
| `src/features/diet/components/FoodForm.tsx` | diet | 5 | **yes** | user-modified |
| `src/features/diet/components/FoodSelectorModal.tsx` | diet | 5 | no | — |
| `src/features/diet/components/MacroBadge.tsx` | diet | 5 | no | — |
| `src/features/diet/components/MealCard.tsx` | diet | 5 | **yes** | user-modified |
| `src/features/diet/components/MealForm.tsx` | diet | 5 | no | — |
| `src/features/diet/components/MealMacrosSummary.tsx` | diet | 5 | no | — |
| `src/features/diet/components/MenuScreen.tsx` | diet | 5 | no | — |
| `src/features/diet/components/PreviewMacros.tsx` | diet | 5 | no | — |
| `src/features/diet/components/ReorderMealsModal.tsx` | diet | 5 | no | native Modal import |
| `src/features/diet/hooks/useCalendarSummary.ts` | diet | 5 | no | — |
| `src/features/diet/hooks/useFoodBank.ts` | diet | 5 | no | — |
| `src/features/diet/hooks/useFoodForm.ts` | diet | 5 | **yes** | user-modified |
| `src/features/diet/hooks/useMealForm.ts` | diet | 5 | no | — |
| `src/features/diet/hooks/useMenu.ts` | diet | 5 | no | — |
| `src/features/diet/utils/macro-utils.ts` | diet | 5 | **yes** | user-modified |

### Training (20 files)

| Path | Layer | Target Phase | Overlap | Notes |
|---|---|---|---|---|
| `src/features/training/components/DailyTrainingScreen.tsx` | training | 6 | no | — |
| `src/features/training/components/ExecuteExerciseModal.tsx` | training | 6 | no | — |
| `src/features/training/components/ExerciseListItem.tsx` | training | 6 | no | — |
| `src/features/training/components/ExerciseSelect.tsx` | training | 6 | no | native Modal import |
| `src/features/training/components/HistoryScreen.tsx` | training | 6 | no | — |
| `src/features/training/components/ProgramForm.tsx` | training | 6 | **yes** | user-modified |
| `src/features/training/components/ProgramListScreen.tsx` | training | 6 | no | — |
| `src/features/training/components/SessionDetailsScreen.tsx` | training | 6 | no | — |
| `src/features/training/components/SetInputRow.tsx` | training | 6 | no | — |
| `src/features/training/components/TrainingProgressBar.tsx` | training | 6 | no | — |
| `src/features/training/components/WorkoutSessionScreen.tsx` | training | 6 | no | — |
| `src/features/training/hooks/useProgramForm.ts` | training | 6 | no | — |
| `src/features/training/hooks/useProgramList.ts` | training | 6 | no | — |
| `src/features/training/hooks/useWorkoutDetails.ts` | training | 6 | no | — |
| `src/features/training/hooks/useWorkoutHistory.ts` | training | 6 | no | — |
| `src/features/training/hooks/useWorkoutSession.ts` | training | 6 | no | — |

---

## Token Files (T005)

| Path | Layer | Target Phase | Notes |
|---|---|---|---|
| `global.css` | token | 2 | Contains olive accent and legacy CSS vars; primary target for Phase 2 |
| `tailwind.config.js` | token | 2 | Exposes CSS vars as NativeWind utilities |
| `src/tokens/colors.ts` | token | 2 | 10 hardcoded hex values — legacy olive palette |
| `src/tokens/border.ts` | token | 2 | border token helpers |
| `src/tokens/font-weight.ts` | token | 2 | — |
| `src/tokens/line-height.ts` | token | 2 | — |
| `src/tokens/opacity.ts` | token | 2 | — |
| `src/tokens/rounded.ts` | token | 2 | — |
| `src/tokens/sizes.ts` | token | 2 | — |
| `src/tokens/spacing.ts` | token | 2 | — |
| `src/tokens/typography.ts` | token | 2 | — |
| `src/tokens/z-index.ts` | token | 2 | — |

---

## Raw Visual Values (T005)

| Location | Type | Description |
|---|---|---|
| `src/tokens/colors.ts` | hex × 10 | Full olive/rust palette as direct hex values |
| `global.css` | `rgba(...)` × 1 | `--shadow-floating: 0 2px 8px rgba(31, 27, 22, 0.08)` |
| `global.css` | olive CSS vars | `--color-olive-*`, `--color-accent-*` pointing to olive |

---

## Native Popup Usages (T005)

| Path | Import |
|---|---|
| `src/components/organisms/BottomSheetModal.tsx` | `Modal` from `react-native` |
| `src/features/diet/components/ReorderMealsModal.tsx` | `Modal` from `react-native` |
| `src/features/training/components/ExerciseSelect.tsx` | `Modal` from `react-native` |

---

## Legacy Alias Analysis (T005)

| Alias | Defined in | Conflicts with Mineral Warm |
|---|---|---|
| `--color-accent-*` | `global.css` | Points to olive (`#556B2F`); Mineral Warm primary is blue (`#0800FF`) |
| `--color-primary-*` | `global.css` | Alias of accent/olive; Mineral Warm primary is blue |
| `--color-secondary-*` | `global.css` | Alias of olive-light; no direct Mineral Warm equivalent |
| `primary.*` | `tailwind.config.js` | Maps to olive via accent; must change to blue |
| `accent.*` | `tailwind.config.js` | Olive-based; Mineral Warm replaces with blue |
| `COLORS.primary`, `COLORS.tabActive`, `COLORS.secondary` | `src/tokens/colors.ts` | Olive values |

---

## Existing SDD Reconciliation (T006)

| SDD | Claimed Outcome | Live Code Verification |
|---|---|---|
| `specs/Completed/22-06-26-shadcn-design-system` | Registry adoption and token compliance | `src/components/ui/` primitives exist but `input.tsx` has user modifications; behavioral equivalence re-verified in Phase 3 |
| `specs/Completed/23-06-26-complete-component-migration` | Card/popup migration | `BottomSheetModal`, `ReorderMealsModal`, `ExerciseSelect` still import native `Modal`; Phase 3–6 must verify |
| `specs/Completed/23-06-26-universal-validation-guardrail` | Full Gate tooling | `lint` and `test` scripts are absent from `package.json`; contradiction recorded; T018–T021 resolve this |

**Contradictions recorded:**
1. `universal-validation-guardrail` tasks were marked complete, but `npm run lint` and `npm test` do not exist in `package.json`. This phase adds them.
2. `complete-component-migration` was marked complete, but 3 native `Modal` imports remain in production code. These are tracked and assigned to Phases 4–6.
