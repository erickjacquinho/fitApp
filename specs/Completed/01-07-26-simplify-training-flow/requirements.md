# Requirements: Simplified Training Flow & Connected Active Session Tab

Provide a unified and streamlined training experience by introducing hold-to-trigger gestures on the program summary screen and replacing the top home screen banner with a program-connected session tab.

## 1. Action Button Hold-to-Trigger Gesture

- **Summary screen action button**: The primary action button on `ProgramSummaryScreen` (which toggles between starting, pausing, and resuming a training block) must transition from simple press interaction to a **hold-to-trigger gesture**.
- **Visual Feedback**:
  - The button must contain a progress bar overlay that fills from left to right as the user holds down.
  - The hold duration must be exactly 1.5 seconds.
  - The button text should reflect the action: "Segure para iniciar treino", "Segure para pausar treino", or "Segure para retomar treino".
  - If the user releases their finger before the progress bar is filled, the progress resets to 0% immediately.
  - Once full, the respective action (Start, Pause, or Resume) must execute automatically.

## 2. Connected Active Session Tab on Training Home

- **Top banner removal**: The existing active session banner at the top of `TrainingHomeScreen` must be removed.
- **Connected program indicator**:
  - When a training session is currently active, the application must identify which program matches the session's `programId`.
  - The matching program card on `TrainingHomeScreen` must display a connected button/tab directly below the card.
  - The tab must sit flush with the card body (sharing the visual container structure with `border-t-0` and connected rounded corners) to feel like a cohesive extension of the program card.
  - The tab text must be "Sessão de treino atual".
- **Navigation**: Tapping this connected tab navigates the user directly to the active workout session screen (`/training/active`).

## 3. Scope & Exclusions

- Modifying the underlying database models or services (they already support pause/resume/active session states).
- Changing the workout session completion or execution flow (which already uses a hold gesture).
