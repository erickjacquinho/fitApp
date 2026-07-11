# Trinca-Design: FocusRing Component

**Feature:** Centralized Focus Ring Component
**Date:** 2026-07-11

---

## 1. Creative Direction (jax-creative-director)

**Aesthetic Direction:**
- **DESIGN_VARIANCE:** Low. This is a foundational UI primitive. Absolute consistency is paramount.
- **MOTION_INTENSITY:** Calibrated. Must perfectly match the existing `motionPatterns.formControl` (150-250ms with subtle ease). No bouncy or overshoot physics.
- **VISUAL_DENSITY:** Zero-impact. The ring sits outside the Box Model of the parent component to avoid layout shifts.
- **Palette Guidelines:** 
  - Strict adherence to the Blue-First Mineral Warm palette. 
  - The ring color must strictly use the `border-focus` token (which maps to the primary blue/active state).

**Layout Bans Enforced:**
- No hardcoded pixel widths for the ring. It must be 100% fluid, adopting the exact `layoutFrame` of its parent.
- No absolute positioning hacks that break React Native's standard z-indexing (must be injected seamlessly behind the parent).

---

## 2. Systematic Extraction (jax-design-system-engineer)

**Tokens & Metrics:**
- **Border Width:** 3px (calculated via `focusAnim.value * 3`).
- **Base Border Radius:** 8px. The animated radius must scale proportionately (`8 + ringWidth`) to prevent corner clipping during expansion.
- **Color Token:** `border-border-focus` applied via NativeWind v4 utility classes.
- **Animation Engine:** `react-native-reanimated` (SharedValues and `useAnimatedStyle`). No standard `Animated` or `Moti` here to maintain native thread performance.

**Platform Constraints:**
- **Web:** Must be entirely disabled (`Platform.OS !== 'web'`). The web relies on native CSS `:focus-visible` pseudo-classes to draw the ring.
- **Native:** The ring requires a calculated frame via `onLayout` from the parent to draw an absolute view with negative margins (or precise left/top offsets).

---

## 3. UX & Accessibility Architecture (jax-ux-architect)

**User Flow & Interaction States:**
- **Default (Blurred):** Ring is invisible (`opacity: 0`, `borderWidth: 0`).
- **Focused (Active):** Ring expands outward (`opacity: 1`, `borderWidth: 3`).
- **Accessibility Integration:** The `<FocusRing>` component itself is purely presentational (`pointerEvents="none"`, `aria-hidden={true}`). It does not take focus; it only visually represents the focus state of its parent.

**Integration Strategy:**
- The component must accept `isFocused` as a boolean. The parent component manages the focus lifecycle (e.g., via `onFocus`/`onBlur` or open state for Selects).
- The parent component must wrap itself and the `<FocusRing>` in a `View` with `className="relative"` to contain the absolute positioning of the ring.
