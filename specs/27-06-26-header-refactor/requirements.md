# Requirements

## 1. Context and Objective
We need to ensure that 100% of the application's screens follow the standard architectural layout defined by the project rules: 
- `Screen` must be the root wrapper.
- The screen's header must be passed strictly via the `header` prop of the `Screen` component (`<Screen header={<Header />} />`).
- The `<Screen>` and `<Header>` combination must be defined at the route level (`app/`), NOT inside feature components (`src/features/`).
- Feature components must not duplicate the header title inside their content (e.g., redundant `<Text variant="title">`).

## 2. Identified Violations
After a complete audit of the `app/` and `src/features/` directories, the following issues were found:
1. **`src/features/diet/components/MenuScreen.tsx`**: Renders `<Screen>` and `<Header>` internally. The header contains complex state interactions (`startReorder`, `selectedDate`).
2. **`src/features/training/components/TrainingHomeScreen.tsx`**: Renders `<Screen>` and `<Header>` internally.
3. **`src/features/training/components/HistoryScreen.tsx`**: Contains a redundant visual header (`<Text variant="title">Histórico de treinos</Text>`) that duplicates the route's `<Header>`.
4. **`src/components/organisms/main-tab-screen.tsx`**: Unused legacy component that renders a `<Header>` manually inside a `<View>` instead of using `<Screen>`.

## 3. Acceptance Criteria
- **AC1:** `app/(tabs)/diet.tsx` must wrap `<MenuScreen>` in a `<Screen header={...}>` component. `MenuScreen` must only render its internal list/content.
- **AC2:** `app/(tabs)/training.tsx` must wrap `<TrainingHomeScreen>` in a `<Screen header={...}>` component. `TrainingHomeScreen` must only render its internal content.
- **AC3:** `HistoryScreen.tsx` must no longer render the hardcoded "Histórico de treinos" text.
- **AC4:** `main-tab-screen.tsx` is deleted from the codebase.
- **AC5:** A new explicit rule is added to `.agents/rules/ui-layout.md` (or `AGENTS.md` if the layout rule file doesn't exist) enforcing that `Screen` and `Header` should ONLY be instantiated in `app/` route files, and that title texts shouldn't duplicate the Header.

## 4. Out of Scope
- Redesigning the `Header` or `Screen` components themselves.
- Altering the visual styling of the headers, except for moving them to the correct architectural location.
