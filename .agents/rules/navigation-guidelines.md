# Navigation Guidelines

FitApp is Android-first and iOS-compatible. Navigation should feel native on phones.

## Stack Header
- Use Expo Router screen options for route-level headers.
- Keep titles short.
- Header actions should be secondary or utility actions.
- Do not overload the header with primary workflow actions.
- Keep the default header visually light and compact.
- Main tab screens accessed from the bottom tab bar MUST NOT show a route header.
- Main tab screens must render their title and actions inside the content area when needed.
- Use dynamic headers only when the screen context benefits from it, such as edit, detail, search, or selection flows.

## Back Action
- Back action must be predictable.
- Unsaved destructive exits should ask for confirmation.
- Icon-only back buttons need accessible labels when custom.

## Bottom Tab Bar
- Use bottom tabs for top-level app areas only.
- FitApp uses 5 top-level tabs:
  - `Estatísticas`: charts, history, evolution, comparisons. Lucide icon: `ChartLine`.
  - `Treino`: workouts, exercises, loads, workout history. Lucide icon: `Dumbbell`.
  - `Dashboard`: centered tab for today's overview and quick summary. Lucide icon: `House`.
  - `Dieta`: meals, foods, macros, diet planning. Lucide icon: `Utensils`.
  - `Perfil`: user data, goals, settings. Lucide icon: `User`.
- Keep `Dashboard` as the center tab.
- Keep tab labels short.
- Active state must use more than color when possible.
- Do not use bottom tabs for temporary flows.
- Do not add more than 5 top-level tabs.
- Respect iOS bottom safe area.
- Keep the tab bar visually quiet: small radius, low contrast border, no heavy shadow.

## Primary Actions
- Prefer primary actions inside screen content.
- Floating actions should be rare.
- Destructive actions must not sit next to the primary save/continue action without separation.
- Avoid placing primary workflow actions only in the header.
- On main tab screens, primary actions must be inside the content area because those screens have no header.

## Platform Behavior
- Android behavior is validated first.
- iOS adjustments should preserve the same information architecture.
- Do not introduce non-phone navigation patterns.
