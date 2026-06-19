# Design System Governance

These rules control how the FitApp design system evolves.

## Creating Components
Create a new shared component only when:
- The pattern appears in 3 or more places.
- The pattern is cross-feature.
- The behavior and variants can be clearly named.

Keep feature-specific components inside `src/features/<feature>/components/`.

## Extending Components
Prefer extending an existing atom or molecule when:
- The new behavior fits the component purpose.
- The variant can be named clearly.
- The API remains simple.

Do not add feature-specific props to shared components.

## Token Changes
- Add tokens before using new visual values.
- Prefer semantic names over visual names.
- Keep existing token names stable unless migration is worth it.
- Component tokens should represent component contracts, not one-off screens.

## Naming
- Components, types, interfaces: `PascalCase`.
- Functions, variables, hooks: `camelCase`.
- Files and directories: `kebab-case`.
- Token names: semantic, lowercase, grouped by purpose.

## Exceptions
Exceptions must be rare and documented near the code.

Allowed exceptions:
- Third-party components that cannot use NativeWind.
- React Native props that require direct values, centralized in a small token helper.
- Platform-specific native behavior.

## PR Checklist
Before merging UI work:
- No raw hex values in components.
- No arbitrary spacing unless justified.
- No inline visual styles.
- New components checked against existing atoms/molecules.
- Touch targets are sufficient.
- Empty/loading/error states are handled.
- Android behavior validated first.

## Validation Commands
Run when relevant:
- `npx tsc --noEmit`
- `npx expo install --check`
- `npx expo-doctor`
- `npm audit --audit-level=moderate`
- `npx expo export --platform web --output-dir dist-check`

Remove temporary validation output such as `dist-check/`.
