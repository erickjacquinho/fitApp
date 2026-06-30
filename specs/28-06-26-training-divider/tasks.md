# Tasks: Training Divider Fix

**Final Validation Command:**
`npx tsc --noEmit && npx expo-doctor`

## - [ ] 1. UI Components (Skill: frontend-developer)
- **Target:** `src/features/training/components/TrainingHomeScreen.tsx`
- **Source:** Design Step 1
- **Trace:** AC "display a separator above the Other programs list"
- **Action:** Update the condition for rendering the `<Separator />` to just `{otherPrograms.length > 0 && (<Separator className="my-2 mb-8" />)}` around line 155.

