# Design - Training Refactoring

## 1. Directory Restructuring
Create the `hooks` directory inside the Training feature:
- `src/features/training/hooks/`

## 2. Hook Contracts

### 2.1. `useProgramList.ts`
- **Hook State/Return:**
  - `programsData: { program: Program; blocks: TrainingBlock[] }[]`
  - `activeSession: WorkoutSession | null`
  - `isLoading: boolean`
  - `deleteProgram: (id: string, name: string) => Promise<void>`
  - `startSession: (programId: string, blockId: string) => Promise<void>`
  - `loadPrograms: () => Promise<void>`

### 2.2. `useProgramForm.ts`
- **Hook State/Return:**
  - `programName: string`
  - `setProgramName: (name: string) => void`
  - `blocks: BlockInput[]`
  - `addBlock: () => void`
  - `removeBlock: (blockId: string) => void`
  - `changeBlockName: (blockId: string, name: string) => void`
  - `addExercise: (blockId: string) => void`
  - `removeExercise: (blockId: string, exerciseId: string) => void`
  - `changeExercise: (blockId: string, exerciseId: string, field: keyof ExerciseDTO, value: any) => void`
  - `saveProgram: () => Promise<void>`

### 2.3. `useWorkoutSession.ts`
- **Hook Inputs:** `sessionId?: string`, `blockId?: string`
- **Hook State/Return:**
  - `session: WorkoutSession | null`
  - `block: TrainingBlock | null`
  - `exercises: Exercise[]`
  - `executions: ExerciseExecution[]`
  - `isLoading: boolean`
  - `saveSet: (exerciseId: string, setNumber: number, reps: number, weight: number) => Promise<void>`
  - `deleteSet: (exerciseId: string, setNumber: number) => Promise<void>`
  - `finishSession: () => Promise<WorkoutSession>`

### 2.4. `useWorkoutHistory.ts`
- **Hook State/Return:**
  - `history: WorkoutSession[]`
  - `isLoading: boolean`
  - `loadHistory: () => Promise<void>`

### 2.5. `useWorkoutDetails.ts`
- **Hook Input:** `id: string`
- **Hook State/Return:**
  - `session: WorkoutSession | null`
  - `programName: string`
  - `exercisesSummary: ExerciseSummary[]`
  - `totalVolume: number`
  - `isLoading: boolean`
