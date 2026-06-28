# Requirements: Training Divider Fix

## Overview
The divider in the Training screen (TrainingHomeScreen) currently only appears if there are both pinned programs and other programs. This causes layout issues when there are only "other programs", as the "Treino Rápido" button is not visually separated from the list of other programs.

## Acceptance Criteria
- WHEN the user has "Other programs" (regardless of pinned programs) THEN the system SHALL display a separator above the "Other programs" list.
- WHEN the user has no "Other programs" THEN the system SHALL NOT display a separator above the empty "Other programs" area.

## Failure Scenarios (Edge/Errors)
- N/A (UI layout fix only).

## Out of Scope
- Adding or removing actual programs.
- Changing the "Treino Rápido" button functionality.
