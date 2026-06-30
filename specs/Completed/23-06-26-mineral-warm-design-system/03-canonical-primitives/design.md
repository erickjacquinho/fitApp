# Design: Canonical Primitives

## Technical Context

Phase 3 migrates `src/components/ui/*` and expands `app/style-guide.tsx`. It consumes only Phase 2 semantic contracts. It does not own feature data or domain behavior.

## Layer Mapping

```text
Theme and typography types
  -> variant type definitions
    -> canonical primitives
      -> style-guide compositions
        -> later shared/feature consumers
```

## Registry Equivalence Process

For Accordion, AlertDialog, Badge, Button, Card, Dialog, Input, Label, Progress, Separator, Switch, Tabs, Text, and Icon:

1. inspect the local contract and consumers;
2. check the current React Native Reusables registry behavior;
3. classify direct primitive, thin adapter, domain composition, or custom;
4. review generated diff and exact dependency changes before accepting CLI output;
5. replace generic classes with Mineral Warm semantics;
6. document non-equivalence for retained custom behavior.

## Public Contracts

```ts
type ButtonAppearance = 'filled' | 'outline' | 'ghost' | 'link';
type ButtonTone = 'primary' | 'neutral' | 'destructive' | 'success' | 'carbohydrate' | 'fat';

type CardVariant =
  | 'default' | 'elevated' | 'highlighted' | 'selected'
  | 'protein' | 'carbohydrate' | 'fat' | 'success' | 'error';

type BadgeTone =
  | 'neutral' | 'info' | 'warning' | 'success'
  | 'error' | 'protein' | 'carbohydrate' | 'fat';
type BadgeEmphasis = 'soft' | 'strong';

type TextRole =
  | 'display' | 'title' | 'subtitle' | 'body'
  | 'description' | 'label' | 'caption' | 'strong';
type TextTone =
  | 'primary' | 'secondarySurface' | 'secondaryBackground'
  | 'disabled' | 'inverse' | 'link' | 'success' | 'warning'
  | 'error' | 'protein' | 'carbohydrate' | 'fat';
```

Existing compatibility props are migrated repository-wide by later phases and deleted in Phase 7. Phase 3 adds no feature-specific tone or variant.

## Component Rules

- Buttons: minimum 44px target, 10-12px radius, one filled primary action per visual region, amber text uses neutral-900.
- Cards: 16px canonical radius, explicit border role, selected uses 2px primary border; no nested cards.
- Inputs: synchronous controlled updates, 1px control border, 2px focus border plus 3px halo, explicit error/disabled semantics.
- Text: role owns family, size, line height, and normal weight; consumers may set alignment/truncation but not visual typography.
- Badges: soft is default; strong only for urgency/current selection; status always has text.
- Dialogs: controlled state and registry primitives own focus/portal/dismissal; adapters cannot recreate them.
- Progress/loading: generic blue; macros use domain tone; reduced motion removes decorative shimmer.

## Style Guide

`app/style-guide.tsx` becomes an interactive catalog covering:

- primitive scales and semantic mappings;
- typography roles and allowed emphasis;
- all component variants/sizes/states;
- light/dark inspection instructions;
- status, macro, chart, loading, link, image-overlay, contrast, and prohibited examples;
- accessible labels and reduced-motion states.

The style guide imports production primitives and never forks implementation.

## Testing

- Variant matrix tests verify resolved classes/props and forbidden combinations.
- Interaction tests cover press, focus, controlled input, invalid, disabled, selected, pending, open/close, Android back abstraction, and reduced motion.
- Static scans reject raw hex, generic registry utilities, feature imports, unsafe weights, and ranged dependencies.
- Android runtime validates TextInput typing, dialogs, tabs, switch, progress, and theme changes.

## Migration and Rollback

- Update one primitive and its tests at a time.
- Do not remove old props until later consumers migrate.
- If a registry upgrade changes behavior, restore the customized local primitive and document non-equivalence; do not patch consumers around a broken primitive.
- Phase handoff requires stable public types and style-guide evidence.

