# Implementation Plan: Refatoração de Arquivos Grandes

**Branch**: `[refactor-large-files]` | **Date**: 2026-07-10 | **Spec**: [spec.md](file:///C:/Programmer/fitApp/specs/10-07-26-refactor-large-files/spec.md)

## Summary

Refatorar os maiores arquivos `.ts`, `.tsx`, `.js` e `.css` do repositório para atingir a codebase mínima possível. A meta é seguir os padrões ouro do projeto, garantindo nenhuma regressão, nenhum crash e melhoria na manutenibilidade. Arquivos `.md` e dependências como `package-lock.json` são estritamente ignorados.

## Technical Context

**Language/Version**: TypeScript / React Native
**Primary Dependencies**: React Native, Expo, WatermelonDB, Zustand, TailwindCSS (NativeWind)
**Project Type**: Mobile App
**Performance Goals**: Nenhuma regressão de performance; código mais enxuto (redução no bundle size e parse time)
**Constraints**: Não quebrar código existente, manter total retrocompatibilidade, 0 crashes
**Scale/Scope**: ~15 arquivos chave na camada UI, Services e Styles

## Constitution Check

*GATE: Pass - A refatoração visa aderir aos padrões de código limpo e arquitetura do projeto.*

## Project Structure

### Documentation (this feature)

```text
specs/10-07-26-refactor-large-files/
├── spec.md
├── plan.md
└── tasks.md
```

### Source Code Impact
```text
src/
├── components/
│   ├── molecules/SwipeableRow.tsx
│   └── ui/dropdown-menu.tsx
├── features/
│   ├── training/
│   └── diet/
├── db/migrations.ts
tailwind.config.js
global.css
```
