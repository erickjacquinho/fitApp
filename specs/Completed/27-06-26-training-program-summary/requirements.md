# Requirements: Training Program Summary

## Overview
Screen to display a summary of a selected training program, listing all its workouts in the correct order, with options to reorder and edit.

## Acceptance Criteria
- WHEN the user taps a training program in the Training screen THEN the system SHALL navigate to the Program Summary screen.
- WHEN the Program Summary screen loads THEN the system SHALL display all workouts belonging to the program in their correct sequence.
- WHEN the user views the screen THEN the system SHALL display a "Reorder" button.
- WHEN the user views the screen THEN the system SHALL display an "Edit" button.
- WHEN the user taps the "Reorder" button THEN the system SHALL enable drag-and-drop reordering of the workouts.
- WHEN the user taps the "Edit" button THEN the system SHALL navigate to the program edit screen.

## Failure Scenarios (Edge/Errors)
- WHEN the program has no workouts THEN the system SHALL display an empty state message.
- WHEN the program data fails to load THEN the system SHALL display an error message with a retry option.

## Out of Scope
- Actually executing the workouts from this screen.
- Creating a new program from this screen.
