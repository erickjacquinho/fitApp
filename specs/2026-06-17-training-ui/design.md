# Design - Step 5: Training Module - UI

## 1. Screen Structure
Location: `src/features/training/components/`

- **ProgramListScreen**: List of `Program`. Cards with blocks summary.
- **WorkoutSessionScreen**: Main execution view. Uses `FlatList` for exercises in the current block.
- **HistoryScreen**: List of `WorkoutSession` ordered by date descending.
- **SessionDetailsScreen**: Consolidated summary with total volume calculations.

## 2. Training UI Components
- **ExpandableBlock**: Fixed header + `Animated.View` for content. Use of `lucide-react-native` for the chevron.
- **ExecuteExerciseModal**: Vertical list of sets. Each row contains inputs for Weight and Reps, and a confirmation button.
- **TrainingProgressBar**: Progress bar based on the number of completed exercises vs. total.

## 3. Internal Navigation
- `training/index` -> Program List.
- `training/active` -> Ongoing session.
- `training/history` -> History.
- `training/details/[id]` -> Session details.

## 4. State Management
- Use of `SessionService` for reactive persistence.
- Local state to control which block is being viewed or which exercise is being edited.
- Zustand (optional) to keep the session timer active in the background.
