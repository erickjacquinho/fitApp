# Requirements - Diet Refactoring

## 1. Overview
Refactor the Diet module to isolate business logic, state management, and database operations into custom hooks. Remove direct database writes and queries from presentation components, ensure strict TypeScript typing, and scaffold a proper directory structure.

## 2. Functional Requirements
- **RF-01:** The system SHALL provide a `useFoodBank` hook to fetch, query, and search foods from WatermelonDB.
- **RF-02:** The system SHALL provide a `useMealForm` hook to handle food selection, item additions, and batch creation of meals.
- **RF-03:** The system SHALL provide a `useMenu` hook to fetch daily meals, calculate macros, and handle meal deletions.
- **RF-04:** The system SHALL enforce strict TypeScript types for all meals, foods, and items, eliminating `any` keywords.

## 3. Acceptance Criteria (EARS)
- **WHEN** the daily menu screen loads, **THEN** the system SHALL invoke the `useMenu` hook to calculate today's caloric balance reactively.
- **WHEN** a meal is deleted from the menu, **THEN** the system SHALL call the service through the `useMenu` hook.
- **WHEN** searching foods in the food bank, **THEN** the system SHALL delegate query filtering to the `useFoodBank` hook.
- **WHEN** saving a new meal, **THEN** the system SHALL validate the meal inputs through the `useMealForm` hook before calling the service.

## 4. Out of Scope
- Changing database schema or tables in `src/db/schema.ts`.
- Adding new UI screens or altering the routing hierarchy of `app/diet/`.
