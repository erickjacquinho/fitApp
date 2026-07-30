# Requirements Quality Checklist: Training Screen UX & Visual Hierarchy

**Purpose**: Unit tests for requirement quality and completeness on the Training screen redesign  
**Created**: 2026-07-27  
**Feature**: [spec.md](../spec.md)  

## Requirement Completeness

- [x] CHK001 - Are visual hierarchy requirements defined for the Active Workout Hero card? [Completeness, Spec §FR-01]
- [x] CHK002 - Are requirements specified for distinguishing pinned active programs from secondary programs? [Completeness, Spec §FR-02]
- [x] CHK003 - Are accessibility requirements (roles, labels in PT-BR, min touch targets) specified for all interactive components? [Completeness, Spec §NFR]

## Requirement Clarity

- [x] CHK004 - Is the placement and visual prominence of the Active Workout Hero card explicitly specified at the top of the Training tab? [Clarity, Spec §FR-01]
- [x] CHK005 - Are component styling tokens explicitly defined using Mineral Warm blue-first standards without arbitrary Tailwind colors? [Clarity, Spec §NFR]

## Requirement Consistency

- [x] CHK006 - Do `ProgramCard` visual states align consistently with `MacroExerciseListItem` grouped box list patterns? [Consistency, Spec §FR-02, §FR-03]
- [x] CHK007 - Are empty states for zero programs and zero active sessions consistent in visual layout and tone? [Consistency, Spec §FR-04]

## Scenario & Edge Case Coverage

- [x] CHK008 - Are requirements defined for when an active workout session exists while browsing unpinned programs? [Coverage, Spec §FR-01]
- [x] CHK009 - Are requirements specified for fast execution and drag-and-drop reordering feedback? [Coverage, Spec §NFR]
