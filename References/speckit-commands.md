# Spec Kit Commands

This reference summarizes the Spec Kit CLI and Codex skills installed in this repository.

## Before the workflow

| Command | Purpose |
| --- | --- |
| `specify init --here --integration codex --integration-options="--skills"` | Initialize or configure Spec Kit in the current repository with Codex skills. |
| `specify check` | Check whether the required Spec Kit and agent tools are available. |
| `specify integration status` | Report the active integration and missing or modified managed files. |
| `specify integration upgrade codex` | Restore or refresh the Codex integration while preserving customized shared files when possible. |

## Installed `/speckit-*` commands

| Skill | Brief explanation | Typical use |
| --- | --- | --- |
| `/speckit-constitution` | Create or update the project constitution and synchronize dependent templates. | Change project-wide principles or governance. |
| `/speckit-specify` | Create or update `spec.md` from a natural-language feature description. | Start a new feature specification. |
| `/speckit-clarify` | Find underspecified requirements and ask targeted questions, then encode the answers in the spec. | Resolve important ambiguities before planning. |
| `/speckit-checklist` | Generate a feature-specific quality checklist from the requirements. | Add a focused review checklist when needed. |
| `/speckit-plan` | Convert the approved specification into technical design artifacts such as `plan.md`, research, data model, contracts, and quickstart material. | Define how the feature should be built. |
| `/speckit-tasks` | Convert the design artifacts into dependency-ordered, executable `tasks.md` items. | Prepare implementation work. |
| `/speckit-analyze` | Run a read-only consistency and quality analysis across `spec.md`, `plan.md`, and `tasks.md`. | Review artifacts before implementation. |
| `/speckit-implement` | Execute the tasks defined in `tasks.md`. | Build the feature after the plan and tasks are approved. |
| `/speckit-converge` | Compare the codebase with the feature artifacts and append missing implementation work to `tasks.md`. | Reconcile incomplete work after an implementation pass. |
| `/speckit-taskstoissues` | Convert tasks into GitHub issues after validating the repository remote and checking for duplicates. | Track implementation tasks in GitHub. |

## Recommended execution order

### Standard feature cycle

```text
1. specify check
2. specify integration status
3. /speckit-specify <feature description>
4. /speckit-clarify <feature>                 (when ambiguities remain)
5. /speckit-checklist <feature>               (when a focused checklist is useful)
6. /speckit-plan <feature>
7. /speckit-tasks <feature>
8. /speckit-analyze <feature>
9. /speckit-implement <feature>
10. /speckit-converge <feature>                (when implementation gaps remain)
11. /speckit-tasks <feature>                 (after converge adds tasks)
12. /speckit-analyze <feature>
13. /speckit-implement <feature>
```

The `converge -> tasks -> analyze -> implement` loop is repeated only when the implementation is incomplete or the codebase has drifted from the artifacts.

### Optional GitHub tracking

Run `/speckit-taskstoissues <feature>` after `tasks.md` exists and has been reviewed. It can be placed before implementation when the team wants issues created first, or after implementation when issues are used for remaining work.

### Constitution changes

Run `/speckit-constitution` before starting a new feature cycle when project principles or governance rules need to change. Review the resulting template updates before running `/speckit-specify`.

## Important notes

- `/speckit-implement` must be the only step that executes the generated implementation tasks.
- `/speckit-analyze` is read-only and should not be used as a replacement for implementation.
- `/speckit-taskstoissues` creates external GitHub issues; use it only when GitHub tracking is intended.
- The feature argument should identify the active feature directory or provide the context required by the command.
