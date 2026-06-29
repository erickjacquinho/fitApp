# 05. UI Layout & Navigation

## 1. Page Conventions
- **Responsibility**: Routes in `app/` are slim orchestrators. They configure navigation, inject data, and compose UI. They MUST NOT contain business logic or complex internal styling.
- **Screen Layout**: Full-screen pages MUST use the `<Screen>` wrapper. 
- **Platform**: FitApp targets phone screens only. Android is validated first. Do not add non-phone layouts.

## 2. Layout Grid
- **Conceptual Grid**: Use a 4-column grid (`px-screen-x` margin, `gap-grid-gutter`). Forms/Cards span all 4. Stats can use 2-column.
- **Vertical Spacing**: Main scrollable content uses `gap-content-gap`. Major sections use `gap-section-gap`.

## 3. Navigation Guidelines
- **Stack Headers**: Keep titles short. Use Expo Router options. Header actions should be secondary utilities. Do not duplicate visual titles if present in the Header.
- **Bottom Tabs**: Used for 5 top-level areas: `Estatísticas`, `Treino`, `Dashboard` (center), `Dieta`, `Perfil`. Top-level tabs MUST NOT show a route header (title/actions must be inside content).
- **Primary Actions**: Prefer actions inside the screen content over floating or header actions.
- **Back Actions**: Unsaved destructive exits must ask for confirmation.
