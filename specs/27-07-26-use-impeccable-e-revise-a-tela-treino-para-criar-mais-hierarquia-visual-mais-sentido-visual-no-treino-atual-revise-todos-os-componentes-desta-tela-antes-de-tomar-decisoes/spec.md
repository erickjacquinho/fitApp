# Feature Specification: Training Screen Visual Hierarchy & Active Workout Redesign

**Feature Name**: `training-screen-redesign`  
**Created**: 2026-07-27  
**Status**: Draft  

## 1. Feature Overview & Objectives
The primary goal of this feature is to redesign the main Training screen (`Planos de Treino`) and its core component ecosystem to provide superior visual hierarchy, unmistakable visual prominence for any currently active workout session ("Treino Atual"), and enhanced scannability across all training programs and exercises.

### User Value
- **Immediate Context**: When a user opens the app during or before a workout, they immediately see if a workout session is currently active and can resume it with a single tap.
- **Visual Hierarchy & Scannability**: Gym trainees can immediately distinguish between active/pinned programs, secondary programs, and current workout progress without visual noise or ambiguity.
- **Impeccable Visual Craft**: Every component follows the Mineral Warm design system (blue-first, flat elevation, grouped box patterns, refined typography) ensuring a fast, focused offline-first experience.

---

## 2. User Scenarios & Key Journeys

### Scenario 1: Resuming an Active Workout Session
- **Given** a user has an ongoing workout session that has not been finalized,
- **When** the user navigates to the Training tab,
- **Then** a prominent, top-priority Active Workout Hero banner/card is rendered at the top of the screen displaying the current workout name, elapsed time, completed sets count, and an explicit "Continuar Treino" primary action button.

### Scenario 2: Browsing and Managing Pinned & Active Programs
- **Given** a user is on the Training tab with multiple programs (pinned and unpinned),
- **When** viewing the program list,
- **Then** pinned active programs appear in a dedicated high-priority section with distinct visual boundaries, while secondary plans are cleanly grouped below with subtle separators.

### Scenario 3: In-Session Workout Hierarchy
- **Given** a user is inside an active workout session screen,
- **When** viewing the exercise list,
- **Then** completed exercises, current exercise, and upcoming exercises are visually differentiated (e.g. status indicators, completed set counters, smooth reordering handles) using the canonical grouped list box pattern.

---

## 3. Functional Requirements

### FR-01: Active Workout Hero Component
- The system MUST display a dedicated Active Workout Hero component at the very top of the Training tab whenever `activeSession` is present.
- The Hero card MUST show:
  1. Workout / Program title & current block name.
  2. Live duration timer or elapsed time indicator.
  3. Real-time progress metric (e.g., "3/6 exercícios" or set completion status).
  4. Primary CTA button ("Continuar Treino") with immediate touch response.

### FR-02: Program List Visual Hierarchy
- Pinned/Active programs MUST be displayed above unpinned programs in a clearly titled "Programas Ativos" section.
- Each `ProgramCard` MUST display program title, block count, block summary, pin toggle, and delete actions with zero visual clutter.
- If a program contains an active session, its card MUST link visually to the active session status without breaking the card layout.

### FR-03: Workout Session Screen Hierarchy
- The Active Workout Session screen header MUST present total workout progress (completed sets vs total sets, elapsed time) at a glance.
- Exercise items (`MacroExerciseListItem`) MUST indicate order, completion state, and set count using consistent color tokens (`primary`, `surface`, `border-subtle`).
- Item drag handles and dropdown option triggers MUST meet touch target standards (minimum 44px) and exhibit feedback on press.

### FR-04: Empty States & Guidance
- Empty states for zero programs or zero active workouts MUST follow non-decorative guidance: concise copy, primary action to create/start, and structural consistency without illustration slop.

---

## 4. Non-Functional Requirements & Design System Alignment

- **Design System Rules**: STRICT adherence to Mineral Warm palette (blue-first `primary` tokens; no legacy olive tokens). Zero arbitrary Tailwind colors.
- **Typography & Layout**: Standard 4px grid spacing, standard font tokens, grouped box list pattern (`rounded-t-xl`, `rounded-b-xl`, `border-subtle`).
- **Touch Target & Accessibility**: All interactive controls MUST satisfy `min-h-touch-target` (44px) with valid accessibility roles and labels in PT-BR.
- **Performance & Motion**: Reanimated transitions must stay between 150-250ms. Drag and drop reordering must perform at 60 FPS on Android device clients.

---

## 5. Success Criteria

1. **Hierarchy Clarity**: Active session is visible within 100ms of entering the Training tab with top-of-page placement.
2. **Design Audit Compliance**: 100% adherence to Mineral Warm blue-first rules, zero arbitrary style overrides, zero broken touch targets.
3. **Accessibility**: All list items and buttons possess proper PT-BR accessibility labels and roles.
4. **Codebase Hygiene**: All updated training components reside in `src/features/training/components/` and adhere strictly to TypeScript rules without `any`.

---

## 6. Assumptions & Bounded Scope

### Assumptions
- WatermelonDB models (`Program`, `TrainingBlock`, `WorkoutSession`, `Exercise`) remain unchanged in schema.
- Navigation routes (`app/(tabs)/training.tsx`, `app/training/active.tsx`) retain their existing tab structure and route paths.

### Out of Scope
- Backend/Database schema migrations.
- Modification of Diet or Statistics tabs.

---

## Clarifications
### Session 2026-07-27
- Q: Clarification status? → A: No critical ambiguities detected worth formal clarification. Scope and requirements are clear.

