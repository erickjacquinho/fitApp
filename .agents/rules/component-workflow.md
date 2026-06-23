# Component Workflow

This rule defines the mandatory registry-first workflow for every new or modified FitApp UI component.

## Discovery Order

1. Read `designsystem-guide.md` and the focused rule files for the affected UI.
2. Search the target feature for an existing domain component.
3. Search `src/components/` for an existing shared composition or canonical primitive.
4. Check the current React Native Reusables registry.
5. Create custom UI only after the previous checks prove there is no behavioral equivalent.

## Behavioral Equivalence Gate

A registry component is equivalent only when it can preserve:

- the required interaction and controlled or uncontrolled state;
- accessibility role, label, focus, disabled, selected, and error behavior;
- Android phone behavior and iOS compatibility;
- overlay, keyboard, gesture, and dismissal behavior when applicable;
- the required public contract directly or through a thin adapter.

Visual similarity alone does not establish equivalence.

## Integration Decision

Choose exactly one:

- **Direct primitive:** use the canonical `src/components/ui/` export.
- **Thin adapter:** preserve a stable FitApp API while delegating all primitive behavior to the canonical component.
- **Domain composition:** combine canonical primitives for feature-specific information or workflow.
- **Custom component:** allowed only when no registry component preserves the required behavior.

Adapters MUST NOT recreate registry state, focus, selection, overlay, or press behavior. Feature-specific props MUST NOT be added to canonical primitives.

## Registry Installation

Add missing primitives with:

```powershell
npx @react-native-reusables/cli@latest add <component>
```

After the command:

1. Review every created or overwritten file.
2. Review `package.json` and `package-lock.json`.
3. Restore exact dependency versions; ranges using `^` or `~` are forbidden.
4. Do not overwrite an existing customized primitive without an explicit diff review.
5. Do not update existing stack versions unless the user explicitly requests it.

## Generated Component Token Review

Every generated or modified component MUST replace generic registry utilities with FitApp Mineral Warm semantics:

- `background` -> `surface-*` (`neutral-100` app bg, `neutral-50` card, `neutral-0` elevated) or a component background token;
- `foreground` -> `text-main` (`neutral-900`) or `text-inverse` (`neutral-0`);
- `primary` -> `blue-*` tokens (NOT olive/accent). Primary action, selection, focus, and progress use `blue-500`;
- `destructive` -> `tomato-*`;
- `muted` -> `surface-muted` (`neutral-50`) or `text-muted` (`neutral-500`/`neutral-600`) according to role;
- `border` and `ring` -> `border-subtle` (`neutral-200`), `border-strong` (`neutral-300`), `border-control` (`neutral-500`), or focus `blue-500`;
- generic sizes -> `icon-*`, `control-*`, `input-*`, `touch-target`, or another declared token;
- `secondary` (registry) -> `neutral-900` (dark secondary) or `neutral-50` (soft surface), never olive;
- `accent` (registry) -> `blue-500` per Mineral Warm blue-first rule.

> See `docs/design-system/mineral-warm.md` section 18 for the mandatory token usage rules and section 2 for the blue-first rule.

Also enforce the focused radius, shadow, typography, layout, iconography, content, and accessibility rules. Static arbitrary values are forbidden when a token can represent the role.

## Migration Requirements

- Migrate every consumer before removing a duplicate component.
- Remove obsolete imports and unused duplicate files.
- Keep feature-specific UI in `src/features/<feature>/components/`.
- Keep third-party gesture, chart, calendar, and native-prop exceptions minimal and sourced from centralized tokens.
- Record the non-equivalence reason for every retained custom shared component in the active feature design or implementation artifact.

## Required Evidence

Before completion, provide:

- a search proving obsolete component imports are gone;
- a search proving generic registry tokens and raw visual literals are gone from affected files;
- a search proving zero `Modal` imports from `react-native`;
- a search proving zero `Alert.alert` usages in application code;
- explicit documentation in the design artifact of every Card classification vs structural View decision;
- TypeScript validation;
- dependency exact-version validation;
- Expo dependency and project diagnostics;
- dependency audit and web export validation;
- a native-impact decision and development APK rebuild when required by `AGENTS.md`.
