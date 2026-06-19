# Requirements - Step 2: Diet Module - Data

## 1. Overview
This step focuses on implementing specific data logic for the Diet module, including finalizing WatermelonDB models and creating services/repositories for CRUD operations.

## 2. User Scenarios
- **Scenario 1: Food Management**
  - The system allows saving, editing, and deleting food items in the database.
- **Scenario 2: Meal Assembly**
  - The user can create a meal by associating multiple food items with it.
- **Scenario 3: Quick Query**
  - The system returns the list of registered foods for searching or selection.

## 3. Functional Requirements

### 3.1 Data Models (WatermelonDB)
- **RF-01:** The system SHALL implement the `Food` Model with all nutritional fields.
- **RF-02:** The system SHALL implement the `Meal` Model.
- **RF-03:** The system SHALL implement the `MealItem` Model to manage the Many-to-Many relationship between Food and Meal.

### 3.2 Repositories (Services)
- **RF-04:** The system SHALL provide the `FoodService` with methods: `create`, `update`, `delete`, `getAll`, `search`.
- **RF-05:** The system SHALL provide the `MealService` with methods to create meals and manage their items atomically (batch operations).
- **RF-06:** The system SHALL ensure all writes are made via `@writer` or `database.write`.

## 4. Acceptance Criteria (EARS)
- **WHEN** a new food item is saved, **THEN** the system SHALL persist the data in WatermelonDB.
- **WHEN** a meal is deleted, **THEN** the system SHALL also delete the associated `MealItem` records (manual or automatic cascading).
- **WHEN** searching for a food item, **THEN** the system SHALL return results filtered by name.

## 5. Success Criteria
- Diet repositories implemented and tested (even if via console log).
- Table relationships working correctly.
- Write operations respecting WatermelonDB guidelines (batching and writers).
