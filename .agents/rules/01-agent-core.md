# 01. Agent Core & Component Workflow

## 1. Execution Directives
- **Deep Understanding**: Read all required context and `01` to `07` rules before executing ANY task. Never guess requirements.
- **Skill Usage**: ALWAYS invoke the best installed skill. Follow `sdd` skill if applicable.
- **Code Quality**: Strict TypeScript (no `any`). Use `PascalCase` for Components/Types, `camelCase` for vars/funcs, `kebab-case` for files. Keep changes focused.

## 2. Component Workflow (Registry-First)
1. **Discovery**: Search domain `src/features/`, then shared `src/components/`, then `@react-native-reusables` registry.
2. **Installation**: Missing primitives MUST be added via `npx @react-native-reusables/cli@latest add <component>`.
3. **Integration**: Choose ONE:
   - Direct primitive usage.
   - Thin adapter (preserves FitApp API, delegates behavior).
   - Domain composition (combines primitives).
   - Custom (ONLY if no registry equivalent exists).
4. **Validation & Refinement**: 
   - Review generated files. Keep EXACT dependency versions (no `^` or `~`). Ensure generic registry classes map correctly to FitApp tokens.
   - **CRITICAL ANTI-SLOP**: Never leave the default `react-native-reusables` animations (e.g. `entering={ZoomIn}`). Immediately replace them with intentional, physically-correct motion tailored to the component type:
     - **Dropdowns/Selects/Popovers**: Use "Scale in + Fade in" (from `0.96` to `1.0`) via deterministic `timing` ease-out (no spring bounce/wiggle).
     - **Drawers/BottomSheets**: Use physical `spring` animations (Slide up).
     - **Dialogs/Modals**: Use subtle Pop-in (Spring with strict `overshootClamping`).
     - **All**: Must wrap in `AnimatePresence` for mid-flight interruptibility and MUST respect `useReducedMotion()` by converting spatial movement into pure cross-fades. Do not wait for user complaints.

## 3. UI Constraints
- **Zero Hardcoded Styles**: Never use inline styles, `StyleSheet.create`, or arbitrary Tailwind values (e.g., `bg-[#FFF]`, `p-[13px]`). Use strict `tailwind.config.js` tokens. **Exceção**: `Reanimated.View` / `Animated.View` (ver `03-ui-foundations.md` §4).
- **Screen Wrapper**: Full-screen pages in `app/` MUST use the `<Screen>` wrapper (`src/components/ui/screen.tsx`). NEVER render `<Screen>` inside feature components. Use `scrollable={false}` for FlatLists. Do not duplicate headers.
