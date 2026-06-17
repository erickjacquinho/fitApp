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
- [ ] Diet schema (Food, Meal, MealItem)
- [ ] Training schema (Program, Block, Exercise, WorkoutSession, ExerciseExecution)
- [ ] Database provider setup

### A-2: Navigation Header
**Description**: Reusable Header component
**File**: `src/components/Header.tsx`
**Deliverables**:
- [ ] Props: title, showBackButton, onBackPress
- [ ] Style consistent with design system
- [ ] Safe area handling

### A-3: Base Components
**Description**: Fundamental UI components
**Files**: `src/components/ui/`
**Deliverables**:
- [ ] Card.tsx - basic container with shadow
- [ ] Button.tsx - primary, secondary, destructive
- [ ] Input.tsx - text, number with validation
- [ ] SwipeableCard.tsx - swipe gesture
- [ ] ConfirmModal.tsx - confirmation pop-up

### A-4: Navigation System
**Description**: Stack and Tab navigation
**File**: `src/navigation/`
**Deliverables**:
- [ ] TabNavigator - Diet, Training, Dashboard
- [ ] StackNavigator per module
- [ ] Typed navigation types

---

## 3. Phase 2: Diet Module - Data

### B-1: Food Schema
**Description**: Food model in WatermelonDB
**File**: `src/database/models/Food.ts`
**Deliverables**:
- [ ] Fields: id, name, preparationWeight, description, protein, carbohydrate, fat
- [ ] Timestamps: createdAt, updatedAt
- [ ] Relations: none (leaf entity)

### B-2: Meal Schema
**Description**: Meal model
**File**: `src/database/models/Meal.ts`
**Deliverables**:
- [ ] Fields: id, name, quantity, preparationState
- [ ] Relations: hasMany MealItem
- [ ] Timestamps

### B-3: MealItem Schema
**Description**: MealItem model (junction)
**File**: `src/database/models/MealItem.ts`
**Deliverables**:
- [ ] Fields: id, quantity
- [ ] Relations: belongsTo Meal, belongsTo Food

### B-4: Food Repository
**Description**: CRUD operations for foods
**File**: `src/database/repositories/foods.ts`
**Deliverables**:
- [ ] create(data): Food
- [ ] update(id, data): Food
- [ ] delete(id): void
- [ ] getAll(): Food[]
- [ ] getById(id): Food
- [ ] search(query): Food[]

### B-5: Meal Repository
**Description**: CRUD operations for meals
**File**: `src/database/repositories/meals.ts`
**Deliverables**:
- [ ] create(data, items): Meal
- [ ] update(id, data, items): Meal
- [ ] delete(id): void
- [ ] getAll(): Meal[]
- [ ] getById(id): Meal (with loaded items)
- [ ] getWithFoods(mealId): MealWithItems

---

## 4. Phase 3: Diet Module - UI

### C-1: Menu Screen
**Description**: List of day's meals
**File**: `src/screens/diet/MenuScreen.tsx`
**Deliverables**:
- [ ] Header: "Menu" + total calories
- [ ] Meal cards list with macros
- [ ] "+ New Meal" button
- [ ] "Food Bank" button
- [ ] Pull-to-refresh

### C-2: Create/Edit Food Screen
**Description**: Complete food form
**File**: `src/screens/diet/CreateFoodScreen.tsx`
**Deliverables**:
- [ ] Inputs: name, preparation weight, description
- [ ] Macro inputs: protein, carbohydrate, fat
- [ ] Preview calories (useMemo) - real-time calculation
- [ ] Required fields validation
- [ ] Buttons: Save, Cancel

### C-3: Create/Edit Meal Screen
**Description**: Meal form with selector
**File**: `src/screens/diet/CreateMealScreen.tsx`
**Deliverables**:
- [ ] Inputs: name, quantity, preparation state
- [ ] "Add Food" button → opens modal
- [ ] List of selected foods with quantity
- [ ] Total macros preview (useMemo)
- [ ] Buttons: Save, Cancel

### C-4: Food Bank Screen
**Description**: Full list with management
**File**: `src/screens/diet/FoodBankScreen.tsx`
**Deliverables**:
- [ ] Search bar with filter
- [ ] Food list in cards
- [ ] Swipeable for edit/delete
- [ ] Bulk selection mode (checkbox)
- [ ] Buttons: + New, ☑ Select, 🗑️ Delete

### C-5: SwipeableCard Component
**Description**: Reusable swipe gesture
**File**: `src/components/ui/SwipeableCard.tsx`
**Deliverables**:
- [ ] Swipe left reveals actions
- [ ] Configurable: Edit, Delete
- [ ] Confirmation on delete
- [ ] Haptic feedback

### C-6: Food Selector Modal
**Description**: Modal to select foods
**File**: `src/components/diet/FoodSelectorModal.tsx`
**Deliverables**:
- [ ] Food list with search
- [ ] Quantity input per item
- [ ] Selection checkbox
- [ ] "Confirm" button adds to meal

### C-7: PreviewMacros Component
**Description**: Display of calculated macros
**File**: `src/components/diet/PreviewMacros.tsx`
**Deliverables**:
- [ ] Props: foods[], quantities[]
- [ ] useMemo calculation: protein, carb, fat, calories
- [ ] Formatted display

---

## 5. Phase 4: Training Module - Data

### D-1: Program Schema
**Description**: Program model
**File**: `src/database/models/Program.ts`
**Deliverables**:
- [ ] Fields: id, name, createdAt
- [ ] Relations: hasMany Block
- [ ] Timestamps

### D-2: Block Schema
**Description**: Block model (training day)
**File**: `src/database/models/Block.ts`
**Deliverables**:
- [ ] Fields: id, programId, name, order
- [ ] Relations: belongsTo Program, hasMany Exercise

### D-3: Exercise Schema
**Description**: Exercise model
**File**: `src/database/models/Exercise.ts`
**Deliverables**:
- [ ] Fields: id, blockId, name, sets, repetitionsMin, repetitionsMax, advancedTechnique, repsInReserve
- [ ] Relations: belongsTo Block

### D-4: WorkoutSession Schema
**Description**: WorkoutSession model
**File**: `src/database/models/WorkoutSession.ts`
**Deliverables**:
- [ ] Fields: id, programId, startTime, endTime, status
- [ ] Relations: belongsTo Program, hasMany ExerciseExecution

### D-5: ExerciseExecution Schema
**Description**: ExerciseExecution model
**File**: `src/database/models/ExerciseExecution.ts`
**Deliverables**:
- [ ] Fields: id, workoutSessionId, exerciseId, setNumber, repsDone, weight, repsInReserveDone
- [ ] Relations: belongsTo WorkoutSession, belongsTo Exercise

### D-6: Program Repository
**Description**: CRUD for programs
**File**: `src/database/repositories/programs.ts`
**Deliverables**:
- [ ] create(data, blocks): Program
- [ ] update(id, data, blocks): Program
- [ ] delete(id): void
- [ ] getAll(): Program[]
- [ ] getById(id): Program (with blocks and exercises)

### D-7: Session Repository
**Description**: CRUD for training sessions
**File**: `src/database/repositories/sessions.ts`
**Deliverables**:
- [ ] create(programId): WorkoutSession
- [ ] update(id, data): WorkoutSession
- [ ] finalize(id): WorkoutSession (status: completed)
- [ ] getAll(): WorkoutSession[] (history)
- [ ] getById(id): WorkoutSession (with executions)
- [ ] addExecution(sessionId, exerciseId, set, data): ExerciseExecution

---

## 6. Phase 5: Training Module - UI

### E-1: Program List Screen
**Description**: Training module home
**File**: `src/screens/training/ProgramListScreen.tsx`
**Deliverables**:
- [ ] List of programs in chronological order
- [ ] Expandable cards (expand/blocks)
- [ ] "New Program" button
- [ ] "Start" button on each program
- [ ] "History" button

### E-2: Create/Edit Program Screen
**Description**: Program builder with blocks
**File**: `src/screens/training/CreateProgramScreen.tsx`
**Deliverables**:
- [ ] Program name input
- [ ] List of blocks (add/remove)
- [ ] Expandable block (shows exercises)
- [ ] "Add Exercise" button per block
- [ ] Buttons: Save, Cancel

### E-3: ExpandableBlock Component
**Description**: Block with toggle
**File**: `src/components/training/ExpandableBlock.tsx`
**Deliverables**:
- [ ] Header: block name + chevron
- [ ] Chevron toggle (expand/collapse)
- [ ] Animated height transition
- [ ] Exercises list inside
- [ ] Add exercise button

### E-4: Create/Edit Exercise Screen
**Description**: Exercise form
**File**: `src/screens/training/CreateExerciseScreen.tsx`
**Deliverables**:
- [ ] Inputs: name, sets, min/max repetitions
- [ ] Advanced technique select (optional)
- [ ] Reps in reserve input (optional)
- [ ] Buttons: Save, Cancel

### E-5: Start Session Screen
**Description**: Block progression during workout
**File**: `src/screens/training/WorkoutSessionScreen.tsx`
**Deliverables**:
- [ ] Header: program name + progress (block X/Y)
- [ ] List of exercises for current block
- [ ] "Execute" button on each exercise
- [ ] "Finish" button (appears when completing block)
- [ ] Confirmation on finish

### E-6: Execute Exercise Modal
**Description**: Execution logging per set
**File**: `src/components/training/ExecuteExerciseModal.tsx`
**Deliverables**:
- [ ] Header: exercise name, current/total set
- [ ] Info: programmed reps, range
- [ ] List of inputs per set:
  - [ ] Weight (kg)
  - [ ] Reps done
  - [ ] Reps in reserve
- [ ] "Done" button per set
- [ ] Buttons: Previous, Next

### E-7: Training History Screen
**Description**: List of completed sessions
**File**: `src/screens/training/HistoryScreen.tsx`
**Deliverables**:
- [ ] List of sessions (reverse chronological)
- [ ] Card: date, program, duration
- [ ] Tap → navigation to details

### E-8: Session Details Screen
**Description**: Full session summary
**File**: `src/screens/training/SessionDetailsScreen.tsx`
**Deliverables**:
- [ ] Header: date, program
- [ ] List of executed blocks
- [ ] Exercises with metrics (weight, reps)
- [ ] Consolidated summary:
  - Total sets
  - Total reps
  - Total weight

---

## 7. Phase 6: Dashboard

### F-1: Dashboard Screen
**Description**: Unified view
**File**: `src/screens/DashboardScreen.tsx`
**Deliverables**:
- [ ] Layout: diet and training cards
- [ ] Diet summary widget (C-2)
- [ ] Training summary widget (F-3)
- [ ] Basic statistics (F-4)
- [ ] Navigation links to modules

### F-2: Diet Summary Widget
**Description**: Food summary card
**File**: `src/components/dashboard/DietWidget.tsx`
**Deliverables**:
- [ ] Calories consumed / goal
- [ ] Caloric progress bar
- [ ] Day's macros summary

### F-3: Training Summary Widget
**Description**: Training summary card
**File**: `src/components/dashboard/TrainingWidget.tsx`
**Deliverables**:
- [ ] Active program name
- [ ] Workouts of the week
- [ ] Last workout performed

### F-4: Integrated Navigation
**Description**: Dashboard ↔ Diet/Training links
**Deliverables**:
- [ ] "See more" button in widgets
- [ ] Navigation to specific modules

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

- [ ] Phase 1 complete: App compiles and navigates
- [ ] Phase 2 complete: Food/meal CRUD works
- [ ] Phase 3 complete: Diet UI complete and functional
- [ ] Phase 4 complete: Program/exercise CRUD works
- [ ] Phase 5 complete: Training UI complete and functional
- [ ] Phase 6 complete: Integrated Dashboard
- [ ] All user flows tested
- [ ] Data persists between sessions
