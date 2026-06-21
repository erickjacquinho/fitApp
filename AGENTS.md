# FitApp Agent Instructions

## Language
- Reply to the user in Brazilian Portuguese.
- Write code comments, documentation, commit messages, branch names, and technical artifacts in English.
- 100% of the files written (code, docs, specs, etc.) must be in English.

## Project Stack
- React Native with Expo Managed Workflow.
- Expo Router for navigation.
- NativeWind v4 with Tailwind CSS v3.
- Zustand for global state.
- WatermelonDB for offline-first persistence.
- Atomic Design for shared UI components.
- IMPORTANT: Use exact versions for dependencies. No `^` or `~` in `package.json`.
- IMPORTANT: Never change or update stack versions unless explicitly requested.

## Project Structure
- App routes live in `app/`.
- Shared UI lives in `src/components/`.
- Feature code lives in `src/features/`.
- Database code lives in `src/db/`.
- Product and architecture docs live in `docs/`.
- Implementation artifacts live in `implementation/<feature-name>/`.
- Long-term project knowledge lives in `knowledge/`.

## Working Rules
- Read relevant docs before implementing: `docs/`, `.agents/rules/`, and `.agents/workflows/`.
- **Component Source Rule:** `@react-native-reusables` (Shadcn UI for React Native) is the primary source for components. Before creating any custom component, ALWAYS analyze if there is an existing component in this library that fulfills the requirement. Use `npx @react-native-reusables/cli@latest add <component>` to add it.
- Before creating a new UI component, check existing components in `src/components/` and feature folders.
- Prefer extending existing atoms/molecules over creating duplicates.
- Keep changes focused. Do not refactor unrelated code.
- Use strict TypeScript. Do not use `any`.
- Use `PascalCase` for components, types, and interfaces.
- Use `camelCase` for functions and variables.
- Use `kebab-case` for files and directories.
- Use design tokens from `tailwind.config.js` and `global.css`; avoid hardcoded visual values when a token exists.

## Rule Lookup
- Use `.agents/rules/designsystem-guide.md` as the design system index.
- When a task touches UI, styling, layout, accessibility, icons, content, components, forms, feedback, navigation, or data display, open only the focused rule file that matches the task.
- Prefer focused rule files over broad docs when there is overlap.
- Do not load every rule file by default; read only what is needed for the current change.
- If rules conflict, follow the most specific `.agents/rules/*.md` file first, then `designsystem-guide.md`, then broader docs in `docs/`.

## SDD SKILL
- Execute tudo exatamente como a skill `sdd` descreve. 

## Validation
- Validate changes before finishing.
- Prefer these checks when relevant:
  - `npx tsc --noEmit`
  - `npx expo install --check`
  - `npx expo-doctor`
  - `npm audit --audit-level=moderate`
  - `npx expo export --platform web --output-dir dist-check`
- Remove temporary validation output such as `dist-check/` after use.

## Git
- Use feature branches for new work.
- Do not merge to `main` until the implementation is complete and validated.
- Do not revert user changes unless explicitly requested.
