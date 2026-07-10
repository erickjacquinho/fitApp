<!--
Sync Impact Report:
- Version change: [None] → 1.0.0
- List of modified principles:
  * Established Core Principles I to V for the FitApp ecosystem (Offline-First, Feature-First, Registry-First, Blue-First, Validation Gate).
- Added sections:
  * Task Generation & Workflow Rules (Mandating the trinca-design skill for frontend tasks).
- Templates requiring updates:
  * .specify/templates/plan-template.md (✅ updated)
  * .specify/templates/spec-template.md (✅ updated)
  * .specify/templates/tasks-template.md (✅ updated)
-->

# FitApp Constitution

## Core Principles

### I. Offline-First Architecture
FitApp targets heavy gym trainees with an offline-first approach. All primary domain data, logging, and metrics must be written locally first and synchronized asynchronously. WatermelonDB acts as the absolute ground truth for all local state. Never fetch data directly during render phases.

### II. Feature-First Organization
Code must be strictly grouped by domain in `src/features/<feature-name>/`, containing its own components, hooks, services, and zustand store. Shared components belong to `src/components/`. Routes in `app/` are thin orchestrators and must not contain business logic or complex styling.

### III. Strict Registry-First Components
All canonical primitives must live in `src/components/ui/` and originate from the `@react-native-reusables` registry. Non-registry custom components are only allowed if no equivalent primitive exists.

### IV. Mineral Warm Palette (Blue-First)
We enforce a strict Blue-First visual policy. All active states, primary buttons, and accent indicators must use primary blue tokens. Custom Tailwind color utilities (e.g. `bg-blue-500`) or hardcoded hex values are strictly forbidden. Use semantic tokens like `bg-background`, `text-primary`, and `text-error`.

### V. Rigid Test and Validation Gate
Before any implementation task is marked complete, it must pass pre-commit checks: `npx tsc --noEmit`, `npx expo-doctor`, `npm run lint`, and `npm test`. Schema or model changes require runtime smoke testing database preservation and offline synchronization.

## Task Generation & Workflow Rules

ALL tasks relating to frontend development, UI components, layouts, or screen design MUST explicitly mandate the use of the `trinca-design` skill in their description. This ensures visual and UX excellence during implementation.

## Governance
This Constitution supersedes all general coding practices. Any deviations or amendments require documented revision, team approval, and a corresponding version bump in this file. All PRs and reviews must verify compliance.

**Version**: 1.0.0 | **Ratified**: 2026-07-10 | **Last Amended**: 2026-07-10
