# Task Breakdown

## - [x] Task 1: Refactor `TrainingHomeScreen.tsx` and `app/(tabs)/training.tsx`
- **Target:** `src/features/training/components/TrainingHomeScreen.tsx` and `app/(tabs)/training.tsx`
- **Source:** `design.md` section 3
- **Trace:** AC2
- **Action:**
  - In `TrainingHomeScreen.tsx`: Remove `Screen`, `Header`, `Button`, `Icon`, `History`, `Plus` imports that belong to the header. Modify the component to return only the `View` wrapping the content, not `<Screen>`.
  - In `app/(tabs)/training.tsx`: Import `Screen`, `Header`, `Button`, `Icon`, `History`, `Plus`, `router` and wrap `<TrainingHomeScreen />` inside `<Screen header={<Header ... />}>` using the same header definition previously found in the component.
- **Skill:** `frontend-developer`

## - [x] Task 2: Refactor `MenuScreen.tsx` and `app/(tabs)/diet.tsx`
- **Target:** `src/features/diet/components/MenuScreen.tsx` and `app/(tabs)/diet.tsx`
- **Source:** `design.md` section 2
- **Trace:** AC1
- **Action:**
  - In `MenuScreen.tsx`: Add a `forwardRef` to expose the `startReorder` method via `useImperativeHandle`. Remove the `Screen`, `Header`, `LongPressable`, `DateSelector`, `Button`, `Icon`, `ArrowUpDown`, `CalendarDays`, `Apple` from the render tree and move them up. Return just the inner `<View>` (and the `<GestureHandlerRootView>`).
  - In `app/(tabs)/diet.tsx`: Import all those header components. Create a `ref` for `MenuScreen`. Wrap the component in `<Screen>` and pass the extracted header, hooking `onLongPress` of `DateSelector` to `menuRef.current?.startReorder()`.
- **Skill:** `frontend-developer`

## - [x] Task 3: Remove duplicate header in `HistoryScreen.tsx`
- **Target:** `src/features/training/components/HistoryScreen.tsx`
- **Source:** `design.md` section 4
- **Trace:** AC3
- **Action:**
  - Locate the `<Text variant="title">Histórico de treinos</Text>`.
  - Remove this element, as the title is already provided by the route's `Screen` header.
- **Skill:** `frontend-developer`

## - [x] Task 4: Delete unused `main-tab-screen.tsx`
- **Target:** `src/components/organisms/main-tab-screen.tsx`
- **Source:** `design.md` section 5
- **Trace:** AC4
- **Action:**
  - Delete the file entirely as it represents a deprecated pattern that wraps `Header` inside a generic view instead of using `Screen`.
- **Skill:** `frontend-developer`

## - [x] Task 5: Add UI Layout Rule
- **Target:** `.agents/rules/ui-layout.md`
- **Source:** `design.md` section 6
- **Trace:** AC5
- **Action:**
  - Create this file defining the strict rule that `Screen` and `Header` must only be instantiated in `app/` routes, not in `src/features/` components, and that visual titles inside content should not duplicate route headers.
- **Skill:** `frontend-developer`

## Final Validation
- **Action:** Run `npx tsc --noEmit && npm run lint` (or equivalent) to ensure no typing errors or unused imports were introduced.


**Final Validation Command:**
`npx tsc --noEmit && npm run lint`
