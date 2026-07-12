# Implementation Tasks: Select Component Redesign

## Pre-requisites
- [x] Design tokens and system foundations are fully understood.
- [x] `spec.md` and `plan.md` are approved.

## Tasks

### 1. Refactor Select Component
- **Description**: Update `src/components/ui/select.tsx` to align with the new design guidelines.
- **Subtasks**:
  - [x] Remove `min-h-[44px]` from `SelectTrigger` class.
  - [x] Remove `min-h-[44px]` from `SelectItem` class.
  - [x] Ensure all color tokens adhere to `Mineral Warm (Blue-First)`.
- **Target File**: `src/components/ui/select.tsx`
- **Assigned Skill**: `trinca-design`

### 2. Validation
- **Description**: Ensure the refactored component passes all codebase constraints.
- **Subtasks**:
  - [x] Run `npm run lint` to verify class order and rules.
  - [x] Run `npx tsc --noEmit` to verify type safety.
- **Assigned Skill**: `code-tester`
