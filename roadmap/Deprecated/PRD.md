# Product Requirements Document (PRD) - fitApp

## 1. Overview
fitApp is a modular health management application focusing on two main fronts: Diet and Training. The app unifies these two fronts in a central Dashboard to provide a measurable view of the user's progress. The architecture is fully modular and offline-first (utilizing WatermelonDB).

## 2. Product Scope

### 2.1 Diet Module
A simple yet complete system for nutritional tracking.
- **Daily Menu:** Main screen with the day's meals. Displays macronutrients and calories for each meal, as well as the daily total consumed.
- **Food Management:** Creation and editing of food items containing: name, preparation weight, optional description, macros (protein, carbohydrate, fat), and calculated calories.
- **Combos/Meals:** Creation of saved meals (combos) grouping multiple foods and their respective quantities, with preparation state indication.
- **Food Bank:** A directory listing all registered items. Allows searching, creation, editing, bulk selection, and bulk deletion (with a confirmation pop-up).
- **UI Interactions:** Side swipe gestures on cards to reveal quick actions (edit/delete).

### 2.2 Training Module
Advanced system for organizing and executing bodybuilding workouts.
- **Training Programs:** Chronological list of created programs.
- **Block Structure:** The workout is divided into "blocks" (specific days or divisions). In the interface, these are collapsible boxes (with chevrons) that reveal the exercises.
- **Exercises:** Each registered exercise contains: name, number of sets, repetition range (min and max), repetitions in reserve (RIR), and an advanced technique selector.
- **Active Session:** Interface for workout execution. Allows recording the weight (load), repetitions performed, and repetitions in reserve executed set by set.
- **History:** Log of all completed sessions and details of the volume executed (total sets, reps, and load).

### 2.3 Dashboard
The initial view that integrates both worlds.
- **Integration:** Joins the current diet and current workout.
- **Statistics:** Presents measurable data, caloric summary consumed vs. goal, and the status of the ongoing training plan.

---

## 3. Implementation Steps

Construction is divided into 6 steps, organized by dependencies:

### Step 1: Foundations and Infrastructure
- Initial database setup (WatermelonDB) and data schemas.
- Creation of the standard Header for navigation (title and back button).
- Implementation of base UI components (Cards, Inputs, Buttons, SwipeableCard, Modals).
- Configuration of navigation routes (Tab and Stack).

### Step 2: Diet Module - Data
- Schema Modeling: Food, Meal, and MealItem (WatermelonDB).
- Creation of repositories with CRUD (Create, Read, Update, Delete) functions for food data management.

### Step 3: Diet Module - UI
- Development of the Menu Screen (reading and daily summary).
- Creation of forms: Create/Edit Food and Create/Edit Meal.
- Development of the Food Bank screen and implementation of bulk management logic.
- Implementation of real-time macro preview logic.

### Step 4: Training Module - Data
- Schema Modeling: Program, Block, Exercise, WorkoutSession, and ExerciseExecution.
- Creation of repositories and CRUD logic for workout structuring and saving session history.

### Step 5: Training Module - UI
- Development of Training Program List and Creation screens.
- Construction of the "Expandable Block" UI component with chevrons.
- Development of the Workout Session interface (active workout) with inputs per set.
- Creation of History and Detailed view screens for executed sessions.

### Step 6: Dashboard
- Creation of the app's Main Screen.
- Development of Diet Summary Widgets (calories, progress bar).
- Development of Training Summary Widgets (active program, workouts of the week).
- Finalization of integrated navigation connecting all flows.

---

## 4. Non-Functional Requirements
- **Global Header:** All pages must have a header indicating the current context.
- **Smart Navigation:** Modular flows, where diet and training work independently.
- **Performance:** Macro calculations should use appropriate hooks (e.g., `useMemo`) for instant feedback.
- **Local Persistence:** Ensure the app works primarily offline using WatermelonDB logic.
