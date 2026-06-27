# Tasks: Training Home Redesign

1. **[Database/Schema]** Update `schema.ts` to add `is_pinned` (boolean) to `training_programs` table. Create migration file in `src/db/migrations`.
   - Skill: `database-architect`
   - Target: `src/db/schema.ts`, `src/db/migrations/...`
   - Source: Design (State & Data)
   - Trace: Pinned programs requirement

2. **[Database/Model]** Update `TrainingProgram.ts` model to include `@field('is_pinned') isPinned!: boolean`.
   - Skill: `frontend-developer`
   - Target: `src/db/models/TrainingProgram.ts`
   - Source: Design (State & Data)
   - Trace: Pinned programs requirement

3. **[Hooks]** Update `useProgramList.ts` to fetch programs and separate them into `pinnedPrograms` and `otherPrograms`. Add a function to toggle pin status.
   - Skill: `frontend-developer`
   - Target: `src/features/training/hooks/useProgramList.ts`
   - Source: Design (State & Data)
   - Trace: Pinned and Other programs requirement

4. **[Components]** Create/Refactor `TrainingHomeScreen.tsx` (based on `ProgramListScreen.tsx`) to implement the new layout: Header with icons, Pinned section, Quick Train button, Other programs section.
   - Skill: `frontend-developer`
   - Target: `src/features/training/components/TrainingHomeScreen.tsx`
   - Source: Design (UI Components)
   - Trace: Header, Sections, Buttons requirement

5. **[Integration/Routing]** Update `app/(tabs)/training.tsx` to render `TrainingHomeScreen` instead of the old content. Update `app/training/programs.tsx` if no longer used.
   - Skill: `frontend-developer`
   - Target: `app/(tabs)/training.tsx`, `app/training/programs.tsx`
   - Source: Design (Architecture)
   - Trace: Main Training Tab requirement

6. **[Validation]** Run `tsc && lint` and test the flow.
   - Skill: `frontend-developer`
