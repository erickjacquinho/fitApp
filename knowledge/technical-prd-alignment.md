# Technical PRD Alignment

Date: 2026-05-13

## Decisions

- FitApp uses separate WatermelonDB databases for diet and training, preserving domain isolation from the original product input.
- The training module flow is: create a training sheet, add workouts to that sheet, add exercises to each workout, press play on a workout, then record performed sets as the logbook over repeated sessions.
- Diet supports two menu modes: date-specific daily meals and a fixed recurring menu with per-day completion tracking.
- Food deletion removes the food from meal definitions and the current day's diet after confirmation, but never mutates past registered days.
- Advanced exercise technique uses a dropdown with default options and user-created custom options.
- Expo Router is the required navigation system; React Navigation should not be referenced as an alternative in requirements.
- Persistent domain data belongs in WatermelonDB. Zustand is reserved for global UI state or derived cross-feature state.
- App routes in `app/` must stay as slim orchestrators.
- Business logic and database writes must live in feature services, hooks, or model writers.
- The technical PRD should define routes, data model, services, hooks, validation rules, and integrity rules.

## Rationale

These decisions align the product requirements with the original product input and keep implementation compatible with offline-first development.
