# Tasks: Screen Migration

## [x] Task 1: Add Standardization Rule
- **Target:** `C:\Programmer\fitApp\AGENTS.md`
- **Source:** `design.md` -> 3. Rule Implementation
- **Trace:** Requirements 2.3
- **Skill:** `frontend-developer`
- **Description:** Append the "Screen Primitive Rule" to the FitApp working rules inside `AGENTS.md`.

## [x] Task 2: Migrate `app/(tabs)` Routes
- **Target:** `app/(tabs)/*.tsx` (`diet.tsx`, `index.tsx`, `profile.tsx`, `statistics.tsx`, `training.tsx`)
- **Source:** `design.md` -> 2.2
- **Trace:** Requirements 2.1
- **Skill:** `frontend-developer`
- **Description:** Replace `<View className="flex-1">` and manual `SafeAreaView`/`ScrollView` with `<Screen>`.

## [x] Task 3: Migrate `app/diet/*` Routes
- **Target:** `app/diet/*.tsx`
- **Source:** `design.md` -> 2.2
- **Trace:** Requirements 2.1
- **Skill:** `frontend-developer`
- **Description:** Replace ad-hoc wrappers and pass `<Header>` elements directly to the `header` prop of `<Screen>`.

## [x] Task 4: Migrate `app/training/*` Routes
- **Target:** `app/training/*.tsx`
- **Source:** `design.md` -> 2.2
- **Trace:** Requirements 2.1
- **Skill:** `frontend-developer`
- **Description:** Replace ad-hoc wrappers and pass `<Header>` elements to the `header` prop of `<Screen>`.

## [x] Task 5: Migrate Feature Screens (`src/features/diet/`)
- **Target:** `src/features/diet/components/*Screen.tsx`
- **Source:** `design.md` -> 2.2
- **Trace:** Requirements 2.2
- **Skill:** `frontend-developer`
- **Description:** Refactor internal `<ScrollView>` usage, delegating scrolling to the `Screen` component where applicable, or setting `scrollable={false}` if a `FlatList` is used. Remove manual padding if `Screen` handles it.

## [x] Task 6: Migrate Feature Screens (`src/features/training/` & `dashboard`)
- **Target:** `src/features/training/components/*Screen.tsx`, `src/features/dashboard/components/*Screen.tsx`
- **Source:** `design.md` -> 2.2
- **Trace:** Requirements 2.2
- **Skill:** `frontend-developer`
- **Description:** Remove redundant scrolling, padding, and safe area logic inside these components, assuming they will be wrapped by `Screen`.

## [x] Task 7: Validation
- **Target:** Validation
- **Source:** N/A
- **Trace:** Quality Gate
- **Skill:** `frontend-developer`
- **Description:** Run `npx tsc --noEmit` and verify visually that layouts remain correct.

**Final Validation Command:**
`npx tsc --noEmit`
