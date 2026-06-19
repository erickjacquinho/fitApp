# Design - Step 6: Dashboard

## 1. Screen Structure
Location: `src/features/dashboard/components/`

- **DashboardScreen**: Vertical layout using `ScrollView`. Sections for Diet, Training, and Insights.
- **DietWidget**: Informational card with `ProgressBar`.
- **TrainingWidget**: Summary of the active program and shortcut button.

## 2. Data Layer (Aggregation Hooks)
Location: `src/features/dashboard/hooks/`

- **useDashboardMetrics**: Hook that queries WatermelonDB for:
  - Sum of calories for the current day.
  - Training program marked as 'active'.
  - Last 3 training sessions for the progress chart (optional).

## 3. UI/UX
- Use of semantic colors for macros (e.g., Blue for Protein, Yellow for Carb, Red for Fat).
- Cards with visual completion feedback (e.g., checkmark if the day's workout was done).

## 4. State Management
- Dashboard reacts automatically to changes in WatermelonDB via `@withObservables`.
- Caloric goal settings can be read from a `User` table or `Zustand`.
