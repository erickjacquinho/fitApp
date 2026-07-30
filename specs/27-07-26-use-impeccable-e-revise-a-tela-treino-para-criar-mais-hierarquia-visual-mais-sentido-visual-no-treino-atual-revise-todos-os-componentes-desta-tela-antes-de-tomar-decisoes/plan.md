# Technical Plan: Training Screen & Component Visual Hierarchy Redesign

**Feature**: `training-screen-redesign`  
**Target Path**: `specs/27-07-26-use-impeccable-e-revise-a-tela-treino-para-criar-mais-hierarquia-visual-mais-sentido-visual-no-treino-atual-revise-todos-os-componentes-desta-tela-antes-de-tomar-decisoes`  
**Created**: 2026-07-27  

## 1. Technical Context & Stack Alignment

- **Stack**: React Native (Expo), NativeWind v4, WatermelonDB, Lucide Icons, Reanimated.
- **Color System**: Mineral Warm palette (`primary` blue-first, `surface`, `surface-elevated`, `border-subtle`, `border-strong`, `text-primary`, `text-secondary`, `error`).
- **Component Standard**: Atomic Design / Registry-first (`src/components/ui/`, `@react-native-reusables`).

---

## 2. Component Review & Structural Decisions

Following a comprehensive audit of all components on the Training screen and active workout flow:

### A. `TrainingHomeScreen` (`src/features/training/components/TrainingHomeScreen.tsx`)
- **Current Issue**: When an active workout session exists, it only shows a small bottom bar attached to the specific `ProgramCard`. It lacks immediate visual dominance when the user lands on the Training tab.
- **Redesign Strategy**:
  1. Add a dedicated **`ActiveSessionHeroCard`** at the top of `TrainingHomeScreen` when `activeSession` is present.
  2. The Hero Card features a prominent `primary` border highlight, live elapsed timer badge, progress status (completed sets/exercises), and a high-visibility "Continuar Treino" primary button.
  3. Visual grouping below: "Programas Ativos" (pinned) and "Outros Planos" (unpinned), separated with clean spacing using standard tokens.

### B. `ProgramCard` (`src/features/training/components/ProgramCard.tsx`)
- **Current Issue**: Styles rely on inline ternary logic and redundant conditional text colors.
- **Redesign Strategy**:
  1. Simplify visual states: clean card elevation, explicit `primary` border when active/pinned, subtle `border-subtle` when unpinned.
  2. Standardize icon buttons (pin and delete) using ghost variant and opacity feedback (`active:opacity-80`), avoiding background color fill on press as required by `04-ui-components.md`.

### C. `WorkoutSessionScreen` & `MacroExerciseListItem` (`src/features/training/components/...`)
- **Current Issue**: In-session exercise list items do not clearly contrast between completed, current, and remaining exercises.
- **Redesign Strategy**:
  1. Differentiate exercise states: Completed exercises use subtle `primary/5` background and `primary/30` border; active item uses elevated surface and strong border.
  2. Maintain grouped box list pattern (`rounded-t-xl`, `rounded-b-xl`, `border-subtle`) for consecutive items.
  3. Ensure drag handles (`GripVertical` / press) and menu triggers meet the 44px min touch target rule.

---

## 3. Architecture & File Impacts

### Affected Files
1. `[NEW] src/features/training/components/ActiveSessionHeroCard.tsx`: Dedicated hero card component for ongoing workout sessions.
2. `[MODIFY] src/features/training/components/TrainingHomeScreen.tsx`: Integrate `ActiveSessionHeroCard` at top, refine section typography and list spacing.
3. `[MODIFY] src/features/training/components/ProgramCard.tsx`: Refine visual tokens, borders, and ghost action buttons to match blue-first Mineral Warm design.
4. `[MODIFY] src/features/training/components/MacroExerciseListItem.tsx`: Clean up status colors, borders, and touch targets according to FitApp rules.

---

## 4. Verification & Quality Gates

- **Static Analysis**: `npx tsc --noEmit` & `npm run lint`.
- **FitApp Rule Alignment**:
  - Blue-first Mineral Warm tokens strictly used (`bg-surface`, `border-primary`, `text-primary`). No pure Tailwind or olive tokens.
  - Zero inline styles (`style={...}`) except Reanimated dynamic styles.
  - All interactive elements use PT-BR accessibility labels and roles.
