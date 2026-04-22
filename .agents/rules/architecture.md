# Architecture Rules - FitApp

This document defines the mandatory architectural rules for FitApp development. Adherence to these patterns ensures scalability, maintainability, and offline-first reliability.

## 1. Core Tech Stack
- **Framework:** React Native with Expo (Managed Workflow).
- **Language:** TypeScript (Strict typing required, zero `any` tolerance).
- **Routing:** Expo Router (File-based navigation in `app/`).
- **Global State:** Zustand.
- **Local Database:** WatermelonDB (Offline-first source of truth).
- **Styling:** NativeWind v4 (Tailwind utility classes).
- **Charts:** `react-native-gifted-charts`.

## 2. Feature-First Modular Organization
Code MUST be grouped by business domain (features) rather than technical type.

### 2.1. Directory Structure
- `src/features/<feature-name>/`: Self-contained business logic.
  - `components/`: Feature-specific UI components.
  - `hooks/`: Business logic hooks (data fetching, mutations).
  - `services/`: API or heavy computation logic.
  - `store/`: Zustand slices or local feature state.
  - `types.ts`: Feature-specific TypeScript definitions.
  - `index.ts`: Public API (export only what other features need).
- `src/components/`: Shared UI Design System (Atoms, Molecules, Organisms).
- `src/db/`: WatermelonDB configuration and schemas.
- `app/`: Expo Router route definitions (Slim Orchestrators).

## 3. State Management Hierarchy
To prevent redundancy, use the narrowest scope possible:

1. **Local State (`useState` / `useReducer`):** Single component or screen. Use for UI-only states (toggles, input control, local loading).
2. **Context API:** Structural communication (Compound Components) or ephemeral multi-step flows. **NEVER** use for global data caching.
3. **Zustand:** Global cross-feature state or persistent UI state (User profile, active workout session, macro daily totals).
4. **WatermelonDB:** Persistent domain data (Workouts, Foods, Historical data). **The Ground Truth.**

## 4. Engineering Standards

### 4.1. Single Responsibility Principle (SRP)
- Components > 250 lines MUST be refactored.
- Logic (useEffect, callbacks, state) MUST be extracted into custom hooks.
- UI files should focus on declaration, not implementation.

### 4.2. Prop Drilling Constraint
- **Max Depth:** 2 levels.
- **Solution:** If data is needed deeper, use **Composition** (`children`) or a **Feature Hook** that accesses the Store/DB directly.

### 4.3. Naming Conventions
- `PascalCase`: Components, Types, Interfaces.
- `camelCase`: Functions, Variables, Hooks.
- `kebab-case`: Files, Directories.

## 5. Anti-Patterns (Negative Constraints)
- **DO NOT** create `src/hooks/` or `src/pages/` (use features or app/).
- **DO NOT** use `any` or `@ts-ignore` without critical justification.
- **DO NOT** perform direct DB writes inside UI components (use Services/Actions).
- **DO NOT** use inline styles or `StyleSheet.create` (use NativeWind).
