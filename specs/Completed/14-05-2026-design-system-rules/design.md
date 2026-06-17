# Design: Design System Rules

## Approach
Split design system rules into focused files under `.agents/rules/` and keep `designsystem-guide.md` as the entry point.

The rule system must support Android-first phone UI, later iOS launch, NativeWind styling, strict TypeScript, Expo Router, Atomic Design, and token-driven UI.

## Target Rule Files

### `.agents/rules/designsystem-guide.md`
Purpose: index and high-level overview.

Responsibilities:
- Link focused rule files.
- State design system scope.
- State Android-first and phone-only layout scope.
- Point to token sources.

### `.agents/rules/designsystem-foundations.md`
Purpose: foundational visual rules.

Sections:
- Token architecture.
- Color usage.
- Typography usage.
- Spacing scale.
- Radius.
- Borders.
- Shadows.
- Size tokens.
- Motion tokens.
- Component token rules.

### `.agents/rules/layout-guidelines.md`
Purpose: screen and layout composition.

Sections:
- Android-first phone scope.
- iOS compatibility.
- Safe area.
- Screen padding.
- 4-column conceptual grid.
- Section and content gaps.
- Scroll behavior.
- Full-width, two-column, and three-column constraints.
- Primary action placement.

### `.agents/rules/accessibility-guidelines.md`
Purpose: practical mobile accessibility.

Sections:
- Touch targets.
- Contrast.
- Roles.
- Labels.
- Disabled states.
- Selected/focus states.
- Error announcements.
- Icon-only controls.

### `.agents/rules/iconography-guidelines.md`
Purpose: Lucide icon rules.

Sections:
- Library standard.
- Sizes.
- Stroke.
- Semantic colors.
- Icon-only usage.
- Icon with text usage.

### `.agents/rules/content-guidelines.md`
Purpose: product copy consistency.

Sections:
- Brazilian Portuguese UI copy.
- CTAs.
- Labels.
- Error messages.
- Empty states.
- Confirmation and destructive text.

### `.agents/rules/component-guidelines.md`
Purpose: shared component contracts.

Components:
- Typography.
- Button.
- Input.
- Badge.
- IconButton.
- Card.
- ListItem.
- SegmentedControl.
- SearchBar.
- BottomSheet.
- Skeleton.
- EmptyState.

Each component section:
- Purpose.
- Variants.
- States.
- Tokens.
- Accessibility.
- Misuse cases.

### `.agents/rules/form-guidelines.md`
Purpose: form structure and validation.

Sections:
- Field anatomy.
- Label.
- Helper text.
- Error.
- Disabled.
- Validation timing.
- Field spacing.
- Submit action.
- Keyboard behavior.

### `.agents/rules/feedback-guidelines.md`
Purpose: user feedback patterns.

Sections:
- Loading.
- Skeleton.
- Toast.
- Inline error.
- Success.
- Warning.
- Offline.
- Empty.
- Partial data.

### `.agents/rules/navigation-guidelines.md`
Purpose: navigation consistency.

Sections:
- Android-first behavior.
- iOS compatibility.
- Five top-level bottom tabs: Estatísticas, Treino, Dashboard, Dieta, Perfil.
- Stack header.
- No route header on main bottom tab screens.
- Back action.
- Bottom tab bar.
- Active state.
- Header actions.
- Primary screen actions.

### `.agents/rules/data-display-guidelines.md`
Purpose: fitness and diet data UI.

Sections:
- Lists.
- Workout cards.
- Meal cards.
- Macro summaries.
- Progress.
- Charts.
- History.
- Comparisons.
- Empty/partial data.

### `.agents/rules/designsystem-governance.md`
Purpose: maintenance rules.

Sections:
- New component criteria.
- Extend existing component criteria.
- Token naming.
- Component naming.
- Exception process.
- PR checklist.
- Validation commands.

## Existing File Decisions
- Keep `docs/components.md` as a broad personal reference, not an implementation rule.
- Replace `.agents/rules/color-tokens-rules.md` content because it describes the old palette.
- Update `.agents/rules/page-conventions.md` examples to use current tokens.
- Keep `.agents/rules/styling-conventions.md`, but align examples with current tokens.

## Validation Design
Use these checks after implementation:
- `npx tsc --noEmit`
- `npx expo export --platform web --output-dir dist-check`
- Remove `dist-check/`
- Search for stale terms: `tablet`, `desktop`, `retro-future`, `neon`, `lime`, `slate-50`, raw hex in components.

## Risk Controls
- Keep rules concise to reduce context overhead.
- Avoid creating implementation obligations for components that do not exist yet.
- Do not change app feature behavior during rule writing.
- Preserve current token names unless a rename is clearly required.
