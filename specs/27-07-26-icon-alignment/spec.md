# Feature Specification: Icon UI/UX Alignment & Accessibility Standard

## Summary
Audit and refactor all icon usages across FitApp components and screens to strictly comply with Mineral Warm design rules and mobile UI/UX standards (`/ui-ux-pro-max`). This includes enforcing standard sizing tokens (`icon-sm`: 16px, `icon-md`: 20px, `icon-lg`: 24px), minimum 44px touch targets (`min-h-touch-target` / `hitSlop`), non-shifting opacity-based press feedback (`active:opacity-80`), haptic feedback on destructive actions, and mandatory screen reader accessibility (`accessibilityRole` & `accessibilityLabel`).

---

## User Scenarios & Flows

### Scenario 1: Precise Touch Targets on Small Screens
- **Given** a trainee using FitApp on a compact device during an intense workout session,
- **When** the user taps icon-only buttons (such as header back/action buttons, date navigation arrows, exercise drag handles, or meal filter icons),
- **Then** the touch gesture succeeds reliably without miss-taps because every icon-only control guarantees an interactive tap region of at least 44x44pt.

### Scenario 2: Screen Reader Accessibility
- **Given** a visually impaired user navigating FitApp with a screen reader (TalkBack/VoiceOver),
- **When** the screen reader focus lands on an icon-only interactive control,
- **Then** the device announces the control's purpose clearly (e.g., "Deletar treino, botão" or "Voltar, botão") using localized `accessibilityLabel` and `accessibilityRole="button"`.

### Scenario 3: Clean Press Feedback Without Visual Jitter
- **Given** a user tapping a ghost icon control (such as a search clear button or menu dropdown trigger),
- **When** pressing down on the icon,
- **Then** the icon displays subtle, immediate opacity feedback (`active:opacity-80`) without applying background color fills or shifting layout bounds.

---

## Functional Requirements

### 1. Unified Icon Rules Documentation
- Update `.agents/rules/04-ui-components.md` to formalize the consolidated Icon Discipline section (sizing tokens, touch target minimums, ghost icon opacity feedback, stroke consistency, and haptics).

### 2. Touch Target Compliance (>= 44x44pt)
- Audit all icon-only interactive components across `src/components/`, `src/features/`, and `app/`.
- Ensure icon-only buttons apply `min-h-[44px] min-w-[44px]` container padding or `hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}` whenever the icon size is smaller than 44px.

### 3. Icon Sizing Token Standard
- Standardize all icon instances to use canonical Lucide size tokens (`icon-sm`: 16px, `icon-md`: 20px, `icon-lg`: 24px).
- Eliminate hardcoded arbitrary icon dimensions (e.g., 18px, 22px, 28px) across feature components.

### 4. Press Feedback & Interaction Discipline
- Ensure ghost/outline icon buttons implement pure opacity press states (`active:opacity-80`) with zero background color fills or layout shifts.
- Ensure gesture-driven destructive icon actions invoke `expo-haptics`.

### 5. Accessibility Roles & Labels
- Every icon-only interactive element must define `accessibilityRole="button"` and a clear Brazilian Portuguese `accessibilityLabel` (e.g., `accessibilityLabel="Voltar ao início"`).
- Decorative icons must use `accessibilityElementsHidden={true}` or `importantForAccessibility="no"`.

---

## Non-Functional Requirements
- **Performance**: Zero main-thread lag or layout shifts during press transitions.
- **Consistency**: Strict compliance with Mineral Warm color tokens and NativeWind utility classes.

---

## Success Criteria
- **Touch Accuracy**: 100% of interactive icon-only controls meet the 44x44pt minimum touch target requirement.
- **Accessibility Coverage**: 100% of icon-only interactive elements possess `accessibilityRole="button"` and `accessibilityLabel`.
- **Styling Discipline**: 0 hardcoded arbitrary icon size values or prohibited background color fills on ghost icon presses.
