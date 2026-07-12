# Feature Specification: Histórico de Treino (Workout History List Redesign)

## Overview
The current workout history list displays inconclusive information and lacks visual grouping. This feature redesigns the list to use a linked cards format (GroupedList pattern) similar to the `foodbank`, improving data density, hierarchy, and clarity.

## Goals
- Convert the flat list into a linked card format (Grouped Box Pattern).
- Improve the visual hierarchy of the workout titles and program names.
- Make the date formats more contextual (relative vs absolute).
- Clarify workout duration and completed sets.
- Maintain existing icons.

## Functional Requirements
1. **List Pattern:** Must use the Grouped List Box Pattern (`GroupedList`), where `isFirst` and `isLast` calculate borders and border-radii dynamically.
2. **Title Hierarchy:** 
   - Display the Workout Name in greater evidence (Primary Text).
   - Display the Program Name below or alongside as secondary information.
3. **Date Formatting:**
   - For dates within the current year: "quinta, 02 de julho".
   - For dates from past years: "02 de julho, 2026".
4. **Duration:** 
   - Format as `d:hh:mm`.
5. **Sets Summary:** 
   - Display completed sets over total sets in numeric format (e.g., `24/30`).
6. **Icons:** 
   - Keep the existing icons.

## Non-Functional Requirements
- **Language:** Portuguese (pt-BR) for user-facing text.
- **Aesthetic:** FitApp Mineral Warm (Blue-first), following `03-ui-foundations.md`.
- **Accessibility:** Ensure touch targets are at least 44px. 
