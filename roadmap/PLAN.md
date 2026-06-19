# fitApp - Implementation Plan

## 1. Plan Overview

This plan organizes the implementation of fitApp into **6 phases** following block dependencies:

| Phase | Blocks | Tasks | Dependencies |
|------|--------|-------|--------------|
| 1 | A - Foundations | A-1 to A-4 | None |
| 2 | B - Diet Data | B-1 to B-5 | A-1, A-4 |
| 3 | C - Diet UI | C-1 to C-7 | B-1 to B-5 |
| 4 | D - Training Data | D-1 to D-7 | A-1, A-4 |
| 5 | E - Training UI | E-1 to E-8 | D-1 to D-7 |
| 6 | F - Dashboard | F-1 to F-4 | C-1, E-1 |

**Total: 31 tasks**

---

## 2. Phase 1: Foundations and Infrastructure

### A-1: WatermelonDB Setup
**Description**: Configure diet and training schemas
**File**: `src/database/`
**Deliverables**:
- [x] Diet schema (Food, Meal, MealItem)
- [x] Training schema (Program, Block, Exercise, WorkoutSession, ExerciseExecution)
- [x] Database provider setup

### A-2: Navigation Header
**Description**: Reusable Header component
**File**: `src/components/Header.tsx`
**Deliverables**:
- [x] Props: title, showBackButton, onBackPress
- [x] Style consistent with design system
- [x] Safe area handling

### A-3: Base Components
**Description**: Fundamental UI components
**Files**: `src/components/ui/`
**Deliverables**:
- [x] Card.tsx - basic container with shadow
- [x] Button.tsx - primary, secondary, destructive
- [x] Input.tsx - text, number with validation
- [x] SwipeableCard.tsx - swipe gesture
- [x] ConfirmModal.tsx - confirmation pop-up

### A-4: Navigation System
**Description**: Stack and Tab navigation
**File**: `src/navigation/`
**Deliverables**:
- [x] TabNavigator - Diet, Training, Dashboard
- [x] StackNavigator per module
- [x] Typed navigation types

---

## 3. Phase 2: Diet Module - Data

### B-1: Food Schema
**Description**: Food model in WatermelonDB
**File**: `src/database/models/Food.ts`
**Deliverables**:
- [x] Fields: id, name, preparationWeight, description, protein, carbohydrate, fat
- [x] Timestamps: createdAt, updatedAt
- [x] Relations: none (leaf entity)

### B-2: Meal Schema
**Description**: Meal model
**File**: `src/database/models/Meal.ts`
**Deliverables**:
- [x] Fields: id, name, quantity, preparationState
- [x] Relations: hasMany MealItem
- [x] Timestamps

### B-3: MealItem Schema
**Description**: MealItem model (junction)
**File**: `src/database/models/MealItem.ts`
**Deliverables**:
- [x] Fields: id, quantity
- [x] Relations: belongsTo Meal, belongsTo Food

### B-4: Food Repository
**Description**: CRUD operations for foods
**File**: `src/database/repositories/foods.ts`
**Deliverables**:
- [x] create(data): Food
- [x] update(id, data): Food
- [x] delete(id): void
- [x] getAll(): Food[]
- [x] getById(id): Food
- [x] search(query): Food[]

### B-5: Meal Repository
**Description**: CRUD operations for meals
**File**: `src/database/repositories/meals.ts`
**Deliverables**:
- [x] create(data, items): Meal
- [x] update(id, data, items): Meal
- [x] delete(id): void
- [x] getAll(): Meal[]
- [x] getById(id): Meal (with loaded items)
- [x] getWithFoods(mealId): MealWithItems

---

## 4. Phase 3: Diet Module - UI

### C-1: Menu Screen
**Description**: List of day's meals
**File**: `src/screens/diet/MenuScreen.tsx`
**Deliverables**:
- [x] Header: "Menu" + total calories
- [x] Meal cards list with macros
- [x] "+ New Meal" button
- [x] "Food Bank" button
- [x] Pull-to-refresh

### C-2: Create/Edit Food Screen
**Description**: Complete food form
**File**: `src/screens/diet/CreateFoodScreen.tsx`
**Deliverables**:
- [x] Inputs: name, preparation weight, description
- [x] Macro inputs: protein, carbohydrate, fat
- [x] Preview calories (useMemo) - real-time calculation
- [x] Required fields validation
- [x] Buttons: Save, Cancel

### C-3: Create/Edit Meal Screen
**Description**: Meal form with selector
**File**: `src/screens/diet/CreateMealScreen.tsx`
**Deliverables**:
- [x] Inputs: name, quantity, preparation state
- [x] "Add Food" button → opens modal
- [x] List of selected foods with quantity
- [x] Total macros preview (useMemo)
- [x] Buttons: Save, Cancel

### C-4: Food Bank Screen
**Description**: Full list with management
**File**: `src/screens/diet/FoodBankScreen.tsx`
**Deliverables**:
- [x] Search bar with filter
- [x] Food list in cards
- [x] Swipeable for edit/delete
- [x] Bulk selection mode (checkbox)
- [x] Buttons: + New, ☑ Select, 🗑️ Delete

### C-5: SwipeableCard Component
**Description**: Reusable swipe gesture
**File**: `src/components/ui/SwipeableCard.tsx`
**Deliverables**:
- [x] Swipe left reveals actions
- [x] Configurable: Edit, Delete
- [x] Confirmation on delete
- [x] Haptic feedback

### C-6: Food Selector Modal
**Description**: Modal to select foods
**File**: `src/components/diet/FoodSelectorModal.tsx`
**Deliverables**:
- [x] Food list with search
- [x] Quantity input per item
- [x] Selection checkbox
- [x] "Confirm" button adds to meal

### C-7: PreviewMacros Component
**Description**: Display of calculated macros
**File**: `src/components/diet/PreviewMacros.tsx`
**Deliverables**:
- [x] Props: foods[], quantities[]
- [x] useMemo calculation: protein, carb, fat, calories
- [x] Formatted display

---

## 5. Phase 4: Training Module - Data

### D-1: Program Schema
**Description**: Program model
**File**: `src/database/models/Program.ts`
**Deliverables**:
- [x] Fields: id, name, createdAt
- [x] Relations: hasMany Block
- [x] Timestamps

### D-2: Block Schema
**Description**: Block model (training day)
**File**: `src/database/models/Block.ts`
**Deliverables**:
- [x] Fields: id, programId, name, order
- [x] Relations: belongsTo Program, hasMany Exercise

### D-3: Exercise Schema
**Description**: Exercise model
**File**: `src/database/models/Exercise.ts`
**Deliverables**:
- [x] Fields: id, blockId, name, sets, repetitionsMin, repetitionsMax, advancedTechnique, repsInReserve
- [x] Relations: belongsTo Block

### D-4: WorkoutSession Schema
**Description**: WorkoutSession model
**File**: `src/database/models/WorkoutSession.ts`
**Deliverables**:
- [x] Fields: id, programId, startTime, endTime, status
- [x] Relations: belongsTo Program, hasMany ExerciseExecution

### D-5: ExerciseExecution Schema
**Description**: ExerciseExecution model
**File**: `src/database/models/ExerciseExecution.ts`
**Deliverables**:
- [x] Fields: id, workoutSessionId, exerciseId, setNumber, repsDone, weight, repsInReserveDone
- [x] Relations: belongsTo WorkoutSession, belongsTo Exercise

### D-6: Program Repository
**Description**: CRUD for programs
**File**: `src/database/repositories/programs.ts`
**Deliverables**:
- [x] create(data, blocks): Program
- [x] update(id, data, blocks): Program
- [x] delete(id): void
- [x] getAll(): Program[]
- [x] getById(id): Program (with blocks and exercises)

### D-7: Session Repository
**Description**: CRUD for training sessions
**File**: `src/database/repositories/sessions.ts`
**Deliverables**:
- [x] create(programId): WorkoutSession
- [x] update(id, data): WorkoutSession
- [x] finalize(id): WorkoutSession (status: completed)
- [x] getAll(): WorkoutSession[] (history)
- [x] getById(id): WorkoutSession (with executions)
- [x] addExecution(sessionId, exerciseId, set, data): ExerciseExecution

---

## 6. Phase 5: Training Module - UI

### E-1: Program List Screen
**Description**: Training module home
**File**: `src/screens/training/ProgramListScreen.tsx`
**Deliverables**:
- [x] List of programs in chronological order
- [x] Expandable cards (expand/blocks)
- [x] "New Program" button
- [x] "Start" button on each program
- [x] "History" button

### E-2: Create/Edit Program Screen
**Description**: Program builder with blocks
**File**: `src/screens/training/CreateProgramScreen.tsx`
**Deliverables**:
- [x] Program name input
- [x] List of blocks (add/remove)
- [x] Expandable block (shows exercises)
- [x] "Add Exercise" button per block
- [x] Buttons: Save, Cancel

### E-3: ExpandableBlock Component
**Description**: Block with toggle
**File**: `src/components/training/ExpandableBlock.tsx`
**Deliverables**:
- [x] Header: block name + chevron
- [x] Chevron toggle (expand/collapse)
- [x] Animated height transition
- [x] Exercises list inside
- [x] Add exercise button

### E-4: Create/Edit Exercise Screen
**Description**: Exercise form
**File**: `src/screens/training/CreateExerciseScreen.tsx`
**Deliverables**:
- [x] Inputs: name, sets, min/max repetitions
- [x] Advanced technique select (optional)
- [x] Reps in reserve input (optional)
- [x] Buttons: Save, Cancel

### E-5: Start Session Screen
**Description**: Block progression during workout
**File**: `src/screens/training/WorkoutSessionScreen.tsx`
**Deliverables**:
- [x] Header: program name + progress (block X/Y)
- [x] List of exercises for current block
- [x] "Execute" button on each exercise
- [x] "Finish" button (appears when completing block)
- [x] Confirmation on finish

### E-6: Execute Exercise Modal
**Description**: Execution logging per set
**File**: `src/components/training/ExecuteExerciseModal.tsx`
**Deliverables**:
- [x] Header: exercise name, current/total set
- [x] Info: programmed reps, range
- [x] List of inputs per set:
  - [x] Weight (kg)
  - [x] Reps done
  - [x] Reps in reserve
- [x] "Done" button per set
- [x] Buttons: Previous, Next

### E-7: Training History Screen
**Description**: List of completed sessions
**File**: `src/screens/training/HistoryScreen.tsx`
**Deliverables**:
- [x] List of sessions (reverse chronological)
- [x] Card: date, program, duration
- [x] Tap → navigation to details

### E-8: Session Details Screen
**Description**: Full session summary
**File**: `src/screens/training/SessionDetailsScreen.tsx`
**Deliverables**:
- [x] Header: date, program
- [x] List of executed blocks
- [x] Exercises with metrics (weight, reps)
- [x] Consolidated summary:
  - Total sets
  - Total reps
  - Total weight

---

## 7. Phase 6: Dashboard

### F-1: Dashboard Screen
**Description**: Unified view
**File**: `src/screens/DashboardScreen.tsx`
**Deliverables**:
- [x] Layout: diet and training cards
- [x] Diet summary widget (C-2)
- [x] Training summary widget (F-3)
- [x] Basic statistics (F-4)
- [x] Navigation links to modules

### F-2: Diet Summary Widget
**Description**: Food summary card
**File**: `src/components/dashboard/DietWidget.tsx`
**Deliverables**:
- [x] Calories consumed / goal
- [x] Caloric progress bar
- [x] Day's macros summary

### F-3: Training Summary Widget
**Description**: Training summary card
**File**: `src/components/dashboard/TrainingWidget.tsx`
**Deliverables**:
- [x] Active program name
- [x] Workouts of the week
- [x] Last workout performed

### F-4: Integrated Navigation
**Description**: Dashboard ↔ Diet/Training links
**Deliverables**:
- [x] "See more" button in widgets
- [x] Navigation to specific modules

---

## 8. Recommended Implementation Order

```
WEEK 1: Foundations
├── A-1: WatermelonDB Setup
├── A-2: Header
├── A-3: Base Components
└── A-4: Navigation

WEEK 2-3: Diet (Data + UI)
├── B-1 to B-3: Diet schemas
├── B-4 to B-5: Diet repositories
├── C-1: Menu
├── C-2: Create Food
├── C-3: Create Meal
├── C-5: SwipeableCard
├── C-6: Selector Modal
└── C-7: PreviewMacros

WEEK 4-5: Training (Data + UI)
├── D-1 to D-5: Training schemas
├── D-6 to D-7: Training repositories
├── E-1: Program List
├── E-2: Create Program
├── E-3: Expandable Block
├── E-4: Create Exercise
├── E-5: Start Session
├── E-6: Execute Exercise
├── E-7: History
└── E-8: Session Details

WEEK 6: Dashboard
├── F-1: Dashboard
├── F-2: Diet Widget
├── F-3: Training Widget
└── F-4: Navigation
```

---

## 9. Task Dependencies

```
A-1 → (B-1, B-2, B-3, D-1, D-2, D-3, D-4, D-5)
A-4 → (B-4, B-5, D-6, D-7)

B-1, B-2, B-3, B-4, B-5 → (C-1, C-2, C-3, C-4, C-5, C-6, C-7)
D-1, D-2, D-3, D-4, D-5, D-6, D-7 → (E-1, E-2, E-3, E-4, E-5, E-6, E-7, E-8)

C-1, E-1 → (F-1)
```

---

## 10. Completion Criteria

- [x] Phase 1 complete: App compiles and navigates
- [x] Phase 2 complete: Food/meal CRUD works
- [x] Phase 3 complete: Diet UI complete and functional
- [x] Phase 4 complete: Program/exercise CRUD works
- [x] Phase 5 complete: Training UI complete and functional
- [x] Phase 6 complete: Integrated Dashboard
- [x] All user flows tested
- [x] Data persists between sessions
