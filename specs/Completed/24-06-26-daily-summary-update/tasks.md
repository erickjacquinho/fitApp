# Tasks: DailyBalance Improvements

1. **Create MacroRadialChart Component (Skill: frontend-developer)**
   - Target: `src/components/ui/macro-radial-chart.tsx`
   - Source: `design.md` -> Architecture
   - Trace: `requirements.md` -> Radial chart SHALL be a segmented donut chart
   - Effort: 10 mins
   - Details: Implement `MacroRadialChart` using `react-native-svg` capable of showing 3 segments (protein, carbs, fat) with correct dash offsets and rotations.

2. **Update DailyBalance Typography and Component Usage (Skill: frontend-developer)**
   - Target: `src/features/diet/components/DailyBalance.tsx`
   - Source: `design.md` -> Styling & Component Layer
   - Trace: `requirements.md` -> Macro values bold, Labels capitalized properly, Percentages colored, use segmented chart.
   - Effort: 5 mins
   - Details: Replace `RadialProgress` with `MacroRadialChart`. Apply `font-bold` to values. Update labels to "Proteína", "Carboidrato", "Gordura", "Calorias". Apply `text-protein`, `text-carbohydrate`, `text-fat` to the percentage labels.

3. **Final Validation (Skill: spec-driven-development)**
   - Target: Terminal
   - Command: `npx tsc --noEmit`

- [x] All tasks completed and verified.

