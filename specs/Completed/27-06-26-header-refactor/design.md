# Technical Design

## 1. Context
We are refactoring the application to ensure that `<Screen>` and `<Header>` are always defined at the route level (`app/`) and never inside feature components (`src/features/`), as per the project architecture rules.

## 2. Refactoring MenuScreen (`diet.tsx`)
Currently, `MenuScreen` wraps itself in `<Screen header={<Header />}>`.
We will:
- Move `<Screen>` and `<Header>` to `app/(tabs)/diet.tsx`.
- `MenuScreen` needs to interact with the header (e.g. `startReorder` via `onLongPress` on `DateSelector`, and buttons for `calendar` and `food-bank`).
- Since `app/(tabs)/diet.tsx` already holds `selectedDate` and `setSelectedDate`, we can pass `DateSelector` inside the `customTitle` of `<Header>`.
- However, `MenuScreen` has internal state `isReordering`, `tempMeals`, and functions like `startReorder` that are triggered from the header.
- To keep things clean without passing a ref, we can expose these UI triggers. Wait, if `startReorder` is in `MenuScreen`, how does `diet.tsx` call it?
- *Design choice:* We can lift `startReorder` to a global state/context OR pass the `Header` component itself as a prop from the route to the component?
Wait, the rule says: "Pass headers via the header prop" of `Screen`. This implies `Screen` wraps the component. If `diet.tsx` renders `<Screen header={...}><MenuScreen /></Screen>`, `diet.tsx` must supply the header. 
- *Alternative:* We can create a callback prop in `MenuScreen` like `setMenuActions` that passes the `startReorder` function back to the parent, or we can use `React.useImperativeHandle` with a `forwardRef`.
- *Simpler alternative:* We can move the reorder state up to `diet.tsx`? No, reorder state is closely tied to the `DraggableFlatList` and `meals` array. 
- Let's use `forwardRef` on `MenuScreen` to expose `startReorder` to the parent `diet.tsx`, so the parent can attach it to the `onLongPress` of the `DateSelector`.

## 3. Refactoring TrainingHomeScreen (`training.tsx`)
Currently, `TrainingHomeScreen` wraps itself in `<Screen header={<Header />}>`.
We will:
- Move `<Screen>` and `<Header>` to `app/(tabs)/training.tsx`.
- The header here only uses `router.push('/training/history')` and `router.push('/training/create-program')`.
- This is trivial to move to the route since `router.push` does not depend on the component's internal state.

## 4. Refactoring HistoryScreen (`HistoryScreen.tsx`)
- Simply remove the `<Text variant="title" className="mb-4 font-bold">Histórico de treinos</Text>` block from `HistoryScreen.tsx`.
- Ensure the padding and spacing still look correct (the `Screen` will provide the actual `Header`).

## 5. Deleting main-tab-screen.tsx
- Use standard `rm` or file deletion tool to remove `src/components/organisms/main-tab-screen.tsx`.

## 6. Creating the Rule
- Add a new Markdown file `.agents/rules/ui-layout.md` or append to `AGENTS.md` a rule stating:
  "Layout Rule: `Screen` and `Header` components MUST ONLY be instantiated in `app/` route files. Feature components (`src/features/`) must only return their content and never wrap themselves in `Screen` or define `Header`s. Do not duplicate screen titles as `<Text>` inside the page content."
