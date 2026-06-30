# Design: Training UI Migration

## Technical Context

Scope includes Training routes under `app/(tabs)/training.tsx` and `app/training/*`, plus every `src/features/training/components/*.tsx`. Domain models, services, calculations, and persistence remain unchanged.

## Layer Mapping

```text
Existing Training domain types
  -> unchanged services and WatermelonDB operations
    -> existing hooks and typed presentation state
      -> canonical Training compositions
        -> Training routes
```

Imperative presentation must not live in services. Components own controlled dialog/feedback state; hooks return typed outcomes and pending state.

## Route and Component Inventory

- Routes: Training tab, active session, create program, program details, history, programs.
- Program flow: `ProgramListScreen`, `ProgramForm`, `ExerciseSelect`.
- Active flow: `WorkoutSessionScreen`, `ExecuteExerciseModal`, `ExerciseListItem`, `SetInputRow`, `TrainingProgressBar`.
- History/details: `HistoryScreen`, `SessionDetailsScreen`, `DailyTrainingScreen`.

`ProgramForm` has overlapping uncommitted work and must receive an isolated diff review before editing.

## Presentation Contracts

```ts
type TrainingFeedback =
  | { kind: 'error'; title: string; description: string }
  | { kind: 'success'; title: string; description: string }
  | null;

interface PendingTrainingAction {
  action: 'create' | 'delete' | 'start' | 'save-set' | 'finish' | null;
  targetId?: string;
}
```

Existing hook outputs may be normalized to these strict presentation types only when tests prove behavior parity. Error copy remains in components/presentation contracts, not services.

## Composition Decisions

- Programs, blocks, session summaries, exercises, and history entries use canonical Card only when standalone.
- Set rows, metrics, and block contents inside a Card use structural Views.
- Exercise selection uses canonical Dialog; execution retains a Dialog-backed bottom composition.
- Confirm finish/delete/select-active flows use controlled AlertDialog/ConfirmModal with pending guards.
- Generic progress/action is primary blue; completed status is moss plus explicit text/icon.

## Input and Session Reliability

- Inputs remain controlled and synchronous during rapid typing.
- Keyboard traversal and units remain visible.
- Saving one set updates only its existing domain state and cannot duplicate.
- Finishing a session requires explicit confirmation and disables repeat execution.
- Theme changes preserve current exercise, set drafts, saved states, overlay visibility, and navigation position.
- Android back follows existing guard semantics.

## Testing Matrix

| Journey | Required states |
|---|---|
| Program list | loading, empty, populated, active-session conflict, delete confirm/failure |
| Program form | empty, invalid names/sets/reps/rest, selected exercises, pending, save failure |
| Exercise picker | loading, search, no result, selected, create navigation, dismiss |
| Active workout | loading, empty exercises, current exercise, saved/unsaved sets, finish success/failure |
| History/details | loading, empty, populated, missing program, navigation |

Each applicable state is covered in light/dark, small phone, long copy, keyboard open, Android back, and system theme change.

## Rollback

- Migrate program, active-session, and history groups separately with narrow gates.
- A behavior regression restores the affected composition/hook pair, not the legacy design system.
- Any persistence, progress, session-transition, or calculation difference blocks Phase 6 and requires domain restoration.

## Exit Gate

All Training routes use canonical APIs, all destructive/session-ending flows are controlled and duplicate-safe, native popup scans are zero in scope, automated and Android journeys pass, and scoped legacy scans return zero.

