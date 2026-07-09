---
target: pagina de treino em andamento
total_score: 22
p0_count: 3
p1_count: 3
timestamp: 2026-07-07T05-40-42Z
slug: tures-training-components-workoutsessionscreen-tsx
---
# FitApp UX/UI Design Critique: Workout Session Screen

Method: dual-agent (A: 3bf33ea3-38dd-4c54-850e-04e10c48575f · B: a4e83e44-c3d8-452a-af0c-0bea3bea82d3)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Lacks a real-time rest timer between sets or a clear checklist overview of the entire workout. |
| 2 | Match System / Real World | 4/4 | Gym terminologies (Série, Reps, kg, RIR) are natural and correct. |
| 3 | User Control and Freedom | 2/4 | No lock or swipe protection on exercise horizontal navigation; no confirmation dialog on accidental exit. |
| 4 | Consistency and Standards | 1/4 | Severe design system violations: shadows on list cards, non-semantic Tailwind colors, incorrect press states, and native OS alerts. |
| 5 | Error Prevention | 3/4 | "Hold to Finish" is an excellent pattern for preventing accidental ends, though validation happens late. |
| 6 | Recognition Rather Than Recall | 2/4 | Horizontal sliding column isolates the screen, forcing users to swipe repeatedly to remember their progress. |
| 7 | Flexibility and Efficiency | 2/4 | Next set auto-expansion is helpful, but the lack of batch/swipe quick operations creates high touch friction. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Clean grotesque typography Pairing, but degraded by inconsistent shadows and non-theme blue colors. |
| 9 | Error Recovery | 1/4 | Standard OS native alert popups offer no constructive instructions or form state preservation. |
| 10 | Help and Documentation | 1/4 | No inline tips or RIR reference guidelines. |
| **Total** | | **22/40** | **Acceptable** |

## Anti-Patterns Verdict

**Verdict: RED (High Probability of AI-Generated Slop)**

### LLM Assessment
The interface exhibits typical AI coding tells:
- **Visual styling rules ignored**: Uses card drop shadows (`shadow-sm`) on [SetCard.tsx:L68](file:///c:/Programmer/fitApp/src/features/training/components/SetCard.tsx#L68) despite the flat-by-default system rules.
- **Inconsistent button press states**: Custom hover/press background-color states (`active:bg-error/5`) are declared instead of opacity changes on transparent buttons in [SetCard.tsx:L153](file:///c:/Programmer/fitApp/src/features/training/components/SetCard.tsx#L153).
- **Hardcoded animations**: Expanded set cards use a fixed `140px` height inside `useAnimatedStyle` in [SetCard.tsx:L48](file:///c:/Programmer/fitApp/src/features/training/components/SetCard.tsx#L48), causing immediate clipping issues if the user configures larger system font sizes.
- **Broken validation UX**: Bypasses proper UI dialogues, opting for crude, native system `alert()` calls.

### Deterministic Scan
- The CLI scanner returned `0` findings on the codebase target since it scans primarily for static web HTML structures.
- However, the manual engineering audit successfully isolated severe violations:
  - **Rule 29 (Reanimated styling)**: Positional styles (`absolute left-0 top-0 bottom-0`) are set via NativeWind `className` on an `Animated.View` inside [WorkoutSessionScreen.tsx:L142-L145](file:///c:/Programmer/fitApp/src/features/training/components/WorkoutSessionScreen.tsx#L142-L145), causing fragile UI layout rendering in native clients.
  - **Rule 21 (Semantic Priority)**: Pure Tailwind color classes (`bg-blue-500/10` and `text-blue-500`) are used in [ExerciseColumn.tsx:L154-L155](file:///c:/Programmer/fitApp/src/features/training/components/ExerciseColumn.tsx#L154-L155).
  - **Rule 18 (Class Order)**: Utility styles are improperly sorted, placing layouts at the end of the strings.

### Visual Overlays
- **Status**: Skipped. Visual overlays are not loaded because FitApp is a mobile client running on React Native/Metro. No web HMR script injection was performed.

## Overall Impression
The active workout page represents a functional, gesture-based mobile screen (auto-expansion of cards, horizontal swiping between exercises) but suffers from high friction and local design system deviations. The interface looks modern but feels rigid during high physical fatigue (e.g. shaking hands navigating small list cards and dismiss-only OS alerts). The biggest opportunity lies in fixing core code styling rules and embedding proper layout safety.

## What's Working
1. **Hold to Finish Button**: The animated progress overlay is extremely intuitive and completely prevents accidental completion of workouts.
2. **Auto-Expanding Unsaved Sets**: Spares the user several clicks by automatically focusing the inputs of the next pending set after saving.

## Priority Issues

### [P0] Visuals: Invalid Shadow Layering
- **Why it matters**: [SetCard.tsx:L68](file:///c:/Programmer/fitApp/src/features/training/components/SetCard.tsx#L68) uses `shadow-sm`. Under **The Layer-Not-Shadow Rule**, shadows are banned on cards to ensure a clean, natural parchment aesthetic.
- **Fix**: Remove `shadow-sm` and rely purely on the existing `bg-surface` border contrast.
- **Suggested command**: `$impeccable layout`

### [P0] Colors: Banned Tailwind Palette
- **Why it matters**: Technique tags in [ExerciseColumn.tsx:L154](file:///c:/Programmer/fitApp/src/features/training/components/ExerciseColumn.tsx#L154) use `bg-blue-500/10` and `text-blue-500`. This breaks the **Prioridade Semântica Absoluta** rule and makes styling hard to maintain under dark mode.
- **Fix**: Replace with semantic tokens `bg-primary/10` and `text-primary`.
- **Suggested command**: `$impeccable colorize`

### [P0] Visuals: Incorrect Pressed State
- **Why it matters**: The remove button uses `active:bg-error/5` for pressed feedback. Design system components must only use opacity changes (`active:opacity-80`) for clean ghost/outline action states.
- **Fix**: Remove background transition utility and apply standard press opacity feedback.
- **Suggested command**: `$impeccable polish`

### [P1] UX / A11y: System Dialog Interruption
- **Why it matters**: Native OS `alert()` is called for inputs validation. These block execution, display ugly system frames, and require high precision tapping to dismiss.
- **Fix**: Integrate inline form validation states, or a custom modal Dialog component.
- **Suggested command**: `$impeccable harden`

### [P1] Technical: Broken Reanimated View Styling
- **Why it matters**: Positional class properties are specified inline on an `Animated.View` on [WorkoutSessionScreen.tsx:L142-L145](file:///c:/Programmer/fitApp/src/features/training/components/WorkoutSessionScreen.tsx#L142-L145). NativeWind styling behaves unpredictably under Reanimated v4.
- **Fix**: Transfer layout/positional styles to a stylesheet or `useAnimatedStyle`.
- **Suggested command**: `$impeccable polish`

### [P1] Technical: Hardcoded Card Heights
- **Why it matters**: Card expand height is hardcoded to `140px` in Reanimated heightStyle in [SetCard.tsx:L48](file:///c:/Programmer/fitApp/src/features/training/components/SetCard.tsx#L48). This crops text if fonts scale up.
- **Fix**: Read container heights dynamically or run scale/fade animations instead of height-bound layouts.
- **Suggested command**: `$impeccable layout`

### [P2] Interaction: Missing Haptics on Actions
- **Why it matters**: The "Hold to Finish" gesture and destructive set removals offer no physical feedback, which is crucial in a loud gym environment.
- **Fix**: Trigger `expo-haptics` impact responses upon successful hold threshold crossovers.
- **Suggested command**: `$impeccable animate`

### [P2] Colors: Inconsistent Hold Action Color
- **Why it matters**: The "Hold to Finish" button uses success green (`bg-success`), violating the brand's blue-first active color guidelines.
- **Fix**: Change background style to `bg-primary` or `bg-text-primary`.
- **Suggested command**: `$impeccable colorize`

### [P3] Layout: Exercise Isolation Trap
- **Why it matters**: Horizontal swiping forces the user to swipe continuously to recall which exercises are next or completed, increasing cognitive load.
- **Fix**: Provide a lightweight workout overview modal showing a list of all exercises and completion ticks.
- **Suggested command**: `$impeccable shape`

## Persona Red Flags

- **Alex (Impatient Power User)**:
  - *Red Flag*: Must manually select, input, and tap "Salvar" for every single set. No bulk-complete button exists for identical weights/reps, causing frustration during heavy lifting.
  - *Red Flag*: Lacks a rest timer. Alex has to switch out of the app to time rest intervals, disrupting the offline workout experience.
- **Casey (Distracted Mobile User)**:
  - *Red Flag*: Horizontal swiping is active across the entire screen.Casey will easily trigger accidental swipes while wiping sweat or handling the phone with sweaty hands.
  - *Red Flag*: Dismissing native OS popups is extremely difficult when hands are shaking.
- **Riley (Heavy Lifter)**:
  - *Red Flag*: Cannot add exercise-specific notes or logs directly from this screen. Riley has no place to note down equipment settings or form changes.

## Minor Observations
- The pagination dots at the top of the columns are very small, making it difficult to swipe directly to a specific exercise.
- Visual feedback on set completion is subtle (`bg-success/5`); a bolder visual accent on the row boundary would enhance recognition.

## Questions to Consider
1. Should we lock horizontal navigation when text inputs are focused to prevent accidental swipes?
2. Should we automatically trigger an in-app rest timer sheet/toast once a set is saved?
3. How should the app visually celebrate a fully completed workout to maximize user reward?
