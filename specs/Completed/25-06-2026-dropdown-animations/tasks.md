# Tasks - Dropdown Animation and Dismissal

## Tasks List

### Phase 1: Implementation
- [x] **Task 1.1:** Import ZoomIn and Easing from `react-native-reanimated` in `dropdown-menu.tsx`.
  - **Target:** `src/components/ui/dropdown-menu.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 1 / AC 2
- [x] **Task 1.2:** Configure `enteringAnimation` using `ZoomIn.duration(150).easing(Easing.ease)`.
  - **Target:** `src/components/ui/dropdown-menu.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 2
- [x] **Task 1.3:** Enable `closeOnPress={true}` on `DropdownMenuPrimitive.Overlay` within `DropdownMenuContent`.
  - **Target:** `src/components/ui/dropdown-menu.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 4
- [x] **Task 1.4:** Apply `asChild` on dropdown content and render the animation view wrapping explicit children, forwarding layout properties to ensure geometric scale centering.
  - **Target:** `src/components/ui/dropdown-menu.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** AC 3
- [x] **Task 1.5:** Add `insets` margin safety padding to prevent boundary collision.
  - **Target:** `src/components/ui/dropdown-menu.tsx`
  - **Skill:** `frontend-developer`
  - **Trace:** design.md

### Phase 2: Verification
- [x] **Task 2.1:** Verify TypeScript compiler check.
  - **Target:** project
  - **Skill:** `command`
  - **Trace:** full-validation-gate.md
- [x] **Task 2.2:** Verify ESLint check.
  - **Target:** project
  - **Skill:** `command`
  - **Trace:** full-validation-gate.md
- [x] **Task 2.3:** Run Jest unit tests for the diet feature.
  - **Target:** `src/features/diet/__tests__/`
  - **Skill:** `command`
  - **Trace:** full-validation-gate.md
