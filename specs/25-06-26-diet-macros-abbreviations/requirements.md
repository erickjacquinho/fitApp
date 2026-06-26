# Requirements: Diet Daily Summary Abbreviations (Revision 1)

## 1. Overview
Revert the macro labels style to use the original secondary text color (`text-text-secondary`) and set the abbreviation labels to:
- Protein: "Prot" (styled with `text-text-secondary font-medium`)
- Carbohydrate: "Carb" (styled with `text-text-secondary font-medium`)
- Fat: "Gord" (styled with `text-text-secondary font-medium`, representing "Gordura" in PT-BR, replacing "Fat")

## 2. Acceptance Criteria (EARS Pattern)

### 2.1 Protein Label and Color
- **WHEN** the `DailyBalance` component is rendered **THEN** the system SHALL display the protein abbreviation as "Prot".
- **WHEN** the protein abbreviation is displayed **THEN** the system SHALL style it using the secondary text color `text-text-secondary`.

### 2.2 Carbohydrate Label and Color
- **WHEN** the `DailyBalance` component is rendered **THEN** the system SHALL display the carbohydrate abbreviation as "Carb".
- **WHEN** the carbohydrate abbreviation is displayed **THEN** the system SHALL style it using the secondary text color `text-text-secondary`.

### 2.3 Fat Label and Color
- **WHEN** the `DailyBalance` component is rendered **THEN** the system SHALL display the fat abbreviation as "Gord".
- **WHEN** the fat abbreviation is displayed **THEN** the system SHALL style it using the secondary text color `text-text-secondary`.

## 3. Failure Scenarios & Edge Cases
- None.

## 4. Out of Scope
- Changing styles or labels in other macro displays.
