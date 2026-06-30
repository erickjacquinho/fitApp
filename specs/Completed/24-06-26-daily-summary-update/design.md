# Design: DailyBalance Improvements

## Architecture
- **Component Layer**: We will introduce a new `MacroRadialChart` component in `src/components/ui/` specifically designed to handle segmented SVG donuts.
- **Styling**: Tailwind `text-protein`, `text-carbohydrate`, `text-fat` will be used for percentages. Values will be `font-bold`.

## Contracts
```typescript
interface MacroRadialChartProps {
  protein: number;
  carbs: number;
  fat: number;
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
}
```

## Technical Details
- `MacroRadialChart` uses `react-native-svg`.
- It will calculate the proportion of each macro to the total.
- It will render three `Circle` elements overlapping, but each rotated by an accumulated angle and constrained by `strokeDashoffset` corresponding to their percentage of the circumference.
- `DailyBalance.tsx` will be updated to replace `RadialProgress` with `MacroRadialChart` and adjust typography to match the requirements.
