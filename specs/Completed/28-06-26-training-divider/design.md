# Design: Training Divider Fix

## 1. Components (`src/features/training/components/TrainingHomeScreen.tsx`)
- Update the conditional rendering logic for the `<Separator />` component.
- Current logic: `{pinnedPrograms.length > 0 && otherPrograms.length > 0 && (<Separator className="my-2 mb-8" />)}`
- Proposed logic: `{otherPrograms.length > 0 && (<Separator className="my-2 mb-8" />)}`

## Core Pillars
- **Security:** N/A
- **Maintainability:** Simplifies the conditional logic and improves UI consistency.
- **Scalability:** N/A
