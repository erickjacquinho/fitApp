# Tasks: Screen Primitive

## Task 1: Create Interface and Base Structure
- **Target:** `src/components/ui/screen.tsx`
- **Source:** `design.md` -> Props Interface
- **Trace:** Requirements 2.1
- **Skill:** `frontend-developer`
- **Description:** Create the file. Define the `ScreenProps` interface. Setup the basic component returning a `KeyboardAvoidingView` wrapper with the app's default background color. 

## Task 2: Implement Safe Area and Header Logic
- **Target:** `src/components/ui/screen.tsx`
- **Source:** `design.md` -> Component Hierarchy
- **Trace:** Requirements 2.1, 2.3
- **Skill:** `frontend-developer`
- **Description:** Integrate `react-native-safe-area-context` to apply margins/padding based on `safeAreaEdges`. Add conditional rendering for the `Header` component using `headerTitle`, `headerShowBackButton`, etc.

## Task 3: Implement Scrollable and Padding Logic
- **Target:** `src/components/ui/screen.tsx`
- **Source:** `design.md` -> Component Hierarchy
- **Trace:** Requirements 2.2, 2.4
- **Skill:** `frontend-developer`
- **Description:** Add conditional rendering to wrap `children` in a `ScrollView` if `scrollable` is true, else a fixed `View`. Apply horizontal padding (`px-6`) if `withPadding` is true. Merge custom `contentClassName`.

## Task 4: Export and Validation
- **Target:** Validation
- **Source:** N/A
- **Trace:** General Architecture
- **Skill:** `frontend-developer`
- **Description:** Ensure the component is ready for use. Run `npx tsc --noEmit` and check for styling errors to validate the implementation.

**Final Validation Command:**
`npx tsc --noEmit`
