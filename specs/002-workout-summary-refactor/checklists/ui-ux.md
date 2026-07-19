# Specification Quality Checklist: Workout Summary UI/UX

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-07-12
**Feature**: [spec.md](../spec.md)

## UI Completeness & Consistency

- [ ] CHK001 - Are the specific icons to be used in Card 2 explicitly defined or referenced from a design token? [Completeness, Gap]
- [ ] CHK002 - Is the behavior of the "Start/End time" editor (Card 1) specified? For example, is it a modal, a bottom sheet, or an inline picker? [Clarity, Spec §FR-003]
- [ ] CHK003 - Are the visual states (e.g., empty state for notes) defined for Card 1? [Coverage, Gap]

## Scenario Coverage

- [ ] CHK004 - Are requirements specified for workouts that span across multiple days (e.g. crossing midnight)? [Edge Case, Gap]
- [ ] CHK005 - Is the behavior specified if the calculated duration is negative due to invalid manual time entry? [Exception Flow, Gap]
- [ ] CHK006 - Is the maximum length for the workout notes field defined? [Clarity, Gap]

## Data & Tonnage

- [ ] CHK007 - Is the formula or calculation rules for "Tonnage" explicitly defined or referenced? (e.g., what about bodyweight exercises?) [Clarity, Gap]
- [ ] CHK008 - How are "valid completed sets" defined? Are skipped or failed sets excluded? [Ambiguity, Spec §FR-004]

## List & BaseCards

- [ ] CHK009 - Are scroll behaviors defined if the list of exercises exceeds the screen height? [Completeness, Gap]
- [ ] CHK010 - Is the visual styling of the circular badge containing the set index clearly specified? [Clarity, Spec §FR-008]
