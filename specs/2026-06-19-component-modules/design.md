# Design - Component Modules (Molecular Refactoring)

## 1. Directory Structure
Introduce the following components:
- Shared Atoms:
  - `src/components/atoms/ProgressCircle.tsx`
- Dashboard Feature Components:
  - `src/features/dashboard/components/MacroTrackerCard.tsx`
- Training Feature Components:
  - `src/features/training/components/SetInputRow.tsx`
  - `src/features/training/components/ExerciseListItem.tsx`

## 2. Component Contracts

### 2.1. `ProgressCircle.tsx`
- **Props:**
  - `percentage: number`
  - `size?: number`
  - `color?: string`
  - `label?: string`
- **Details:** Uses Tailwind/NativeWind rounded values and displays percentage in the center.

### 2.2. `MacroTrackerCard.tsx`
- **Props:**
  - `name: string`
  - `current: number`
  - `target: number`
  - `colorClass: string` (e.g. `text-sky-600`, `bg-sky-500`)
  - `progress: number`

### 2.3. `SetInputRow.tsx`
- **Props:**
  - `setNumber: number`
  - `weight: string`
  - `reps: string`
  - `isSaved: boolean`
  - `onInputChange: (field: 'weight' | 'reps', value: string) => void`
  - `onSave: () => void`
  - `onRemove?: () => void`

### 2.4. `ExerciseListItem.tsx`
- **Props:**
  - `name: string`
  - `setsCount: number`
  - `targetSets: number`
  - `repsMin: number`
  - `repsMax: number`
  - `advancedTechnique?: string`
  - `isCompleted: boolean`
  - `onPress: () => void`
