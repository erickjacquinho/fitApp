# Testing Strategy Roadmap

This document outlines the recommended testing strategy for the FitApp stack (React Native, Expo, Zustand, WatermelonDB).

## 1. Unit Testing (Jest)
- **Target**: Utility functions, Zustand store logic, and isolated helpers.
- **Benefits**: Ensures core business logic and state mutations work correctly without rendering the UI. It provides fast feedback and prevents logic regressions.
- **Setup**:
  ```bash
  npx expo install jest jest-expo
  npm install --save-dev @types/jest
  ```
  Add `"preset": "jest-expo"` to `jest.config.js`.

## 2. Component Testing (React Native Testing Library)
- **Target**: UI Components (Atoms, Molecules, Organisms).
- **Benefits**: Validates that components render correctly based on props and that user interactions (taps, inputs) trigger the expected callbacks. Ensures accessibility standards are met.
- **Setup**:
  ```bash
  npm install --save-dev @testing-library/react-native @testing-library/jest-native
  ```
  Add `setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect']` to Jest config.

## 3. Database Testing
- **Target**: WatermelonDB models, schemas, and migrations.
- **Benefits**: Guarantees offline-first persistence reliability. Ensures that database schemas and complex queries return the expected data formats.
- **Setup**:
  Uses the existing Jest setup. Ensure WatermelonDB is mocked or configured for a Node/SQLite memory database during tests.

## 4. End-to-End (E2E) Testing (Maestro)
- **Target**: Complete user flows (e.g., adding a workout, creating a diet plan).
- **Benefits**: Simulates real user behavior across the entire app stack (UI + State + DB + Navigation). Catches integration issues that isolated tests might miss.
- **Setup**:
  ```bash
  curl -Ls "https://get.maestro.mobile.dev" | bash
  ```
  Create a `.maestro` folder for your YAML flow files.

## 5. Navigation Testing
- **Target**: Expo Router flows and deep links.
- **Benefits**: Ensures users are routed to the correct screens under different states (e.g., authenticated vs. unauthenticated) and that URL parameters are parsed correctly.
- **Setup**:
  Included with `@testing-library/react-native` and `jest-expo`. Use `expo-router/testing-library` to render navigation.
