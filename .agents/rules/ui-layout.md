---
description: Layout rules for Screen and Header components
---

# UI Layout Rules

## Screen and Header Instantiation
- `Screen` and `Header` components MUST ONLY be instantiated inside route files located in the `app/` directory (e.g., `app/(tabs)/training.tsx`).
- NEVER instantiate `Screen` or `Header` inside feature components located in `src/features/` (e.g., `src/features/training/components/TrainingHomeScreen.tsx`).
- Pass the `header` prop to the `Screen` component at the route level to handle the navigation header.
- Feature components should focus only on content, returning a simple wrapping `View` or `ScrollView`.

## Visual Titles
- Do not duplicate route headers as visual titles (e.g., `<Text variant="title">`) inside the page content if the same title is already present in the `Header`.
