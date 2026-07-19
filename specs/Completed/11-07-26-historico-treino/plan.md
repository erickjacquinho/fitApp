# Technical Design: Histórico de Treino Redesign

## UI/UX Blueprint & Aesthetic Constraints (Trinca Design)

### 1. Visual Direction & Layout (Creative Director)
- **DESIGN_VARIANCE: LOW** | **MOTION_INTENSITY: LOW** | **VISUAL_DENSITY: HIGH**
- **Pattern:** Grouped List Box Pattern (`GroupedList`). Cards behave as a cohesive sheet.
  - `isFirst`: `rounded-t-lg`.
  - `isLast`: `rounded-b-lg`, no border.
  - Intermediate items: `border-b border-subtle`.
- **Typography & Hierarchy:**
  - **Workout Name (Primary):** `text-base font-medium text-primary`. Must be the most prominent element.
  - **Program Name (Secondary):** `text-sm text-secondary`.
  - **Date, Duration, Sets:** `text-sm text-secondary`.
  - **Reference Image Alignment:** The layout follows the image but adds the missing Program Name and Sets Completed.
    - **Top Row:** Workout Name (Left)
    - **Middle Row:** Program Name (Left)
    - **Bottom Row:** Date (Left), Sets Completed + Duration (Right)

### 2. Design System Tokens (System Engineer)
- **Palette:** Blue-First Mineral Warm.
  - Backgrounds: `bg-surface` for list items over `bg-background` screen.
  - Accents/Interactive: `primary`. No olive tokens.
- **Spacing:** Strict 4px grid. Items use `px-4 py-3`. Internal vertical gaps use `gap-1` or `gap-2`.
- **Component Rules:** 
  - `<Screen scrollable={false}>` if using `FlatList`.
  - No `StyleSheet.create` for standard UI, use NativeWind `className`.
  - No arbitrary tailwind values.

### 3. Usability & Accessibility (UX Architect)
- **Interaction States:** 
  - `Active/Pressed`: `active:opacity-80` over the Pressable/TouchableHighlight.
  - `Loading`: Skeleton screens mirroring the exact final layout.
- **A11y:**
  - Touch targets ensure `min-h-touch-target` (44px).
  - Wrapper gets `accessibilityRole="button"`.
  - Use a consolidated `accessibilityLabel` combining all fragmented text (e.g., "Treino Legday 1 do programa Hipertrofia, realizado quinta, 02 de julho. 2 horas e 36 minutos. 24 de 30 séries. Tocar para abrir detalhes.").
  - Chevron icons use `importantForAccessibility="no" aria-hidden={true}`.

## Component Architecture

We will implement this redesign in the relevant feature domain, likely `src/features/workouts/components/` or `src/features/history/components/`.

**`WorkoutHistoryList` (Orchestrator)**
- Renders the `FlatList` or `FlashList`.
- Maps data and passes `isFirst` / `isLast` flags.

**`WorkoutHistoryItem` (Presentation)**
- Follows the Grouped Box pattern logic.
- Props: `workout`, `isFirst`, `isLast`, `onPress`.

## Data Requirements
- `workoutName`: string
- `programName`: string (nullable)
- `completedAt`: Date
- `duration`: string (formatted `d:hh:mm`)
- `completedSets`: number
- `totalSets`: number
