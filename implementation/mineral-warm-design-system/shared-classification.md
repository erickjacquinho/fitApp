# Shared Component Classification

## Overview
This document classifies all shared components in `src/components/atoms`, `molecules`, and `organisms` that act as decorated containers for canonical primitives, ensuring they map to the new Mineral Warm semantics.

## 1. Atoms
- **ProgressCircle**: Custom SVG implementation. Needs mapping to canonical text and semantic colors.

## 2. Molecules
- **LabeledInput**: Combines `Label` and `Input`. Inherits semantic changes but needs behavior preservation.
- **SearchBar**: Input adapter.
- **ListItem**: Reusable row container. Needs semantic tokens for backgrounds, text, and borders.
- **EmptyState**: Layout wrapper combining icons and text.
- **Header**: Navigation bar adapter.
- **DateSelector**: Date navigation adapter.
- **SwipeableCard**: Uses pan gestures.
- **DailySummaryCard**: Complex data display.
- **NutritionalInfoDisplay**: Macro visualizer.

## 3. Organisms (Popup Adapters)
- **BottomSheetModal**: Should be a thin Dialog-backed adapter.
- **ConfirmModal**: AlertDialog adapter.
- **FeedbackDialog**: Dialog adapter.

## Retained Custom-Component Non-Equivalence (T003)
The following components are retained as custom implementations rather than being replaced by direct registry primitives due to their specialized behavior:
- **ProgressCircle**: Retained because it uses `react-native-svg` for a circular gauge, which isn't present in standard UI primitives.
- **SwipeableCard**: Retained because it implements `react-native-gesture-handler` pan gestures for swipe-to-delete.
- **DateSelector** & **Header**: Retained as custom layout adapters tailored for the app's navigation and date-switching needs.
- **Popup Adapters**: Retained to provide unified imperative/declarative APIs specific to FitApp's workflows.
