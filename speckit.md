# Fluxo de Trabalho do /speckit

Este documento descreve o processo de desenvolvimento estruturado usando o conjunto de skills do `/speckit`, projetado para levar uma ideia desde a concepção até a implementação de forma organizada.

## A Ordem Principal do Fluxo

A sequência principal de comandos é: **`specify` -> `plan` -> `tasks` -> `implement`**.

---

### Fase 1: Ideia -> Especificação (O Quê?)

1.  **Skill:** `/speckit.specify`
    *   **Objetivo:** Transformar uma descrição em linguagem natural de uma funcionalidade em um documento de especificação formal.
    *   **Entrada:** Uma descrição da funcionalidade (ex: `/speckit.specify quero um login com email e senha`).
    *   **Saída:** Um arquivo `spec.md` focado nos requisitos funcionais, cenários de usuário e critérios de sucesso. Este arquivo define o **"o quê"** e o **"porquê"** da funcionalidade, evitando detalhes técnicos.

---

### Fase 2: Especificação -> Plano Técnico (Como?)

2.  **Skill:** `/speckit.plan`
    *   **Objetivo:** Pegar a especificação (`spec.md`) e criar um plano de implementação técnico detalhado.
    *   **Entrada:** O arquivo `spec.md`.
    *   **Saída:** Um arquivo `plan.md` e, potencialmente, outros artefatos de design como `data-model.md`. É nesta fase que as decisões de arquitetura e tecnologia são tomadas, definindo o **"como"**.

---

### Fase 3: Plano -> Tarefas Acionáveis (O Passo a Passo)

3.  **Skill:** `/speckit.tasks`
    *   **Objetivo:** Quebrar o plano técnico em uma lista de tarefas pequenas, acionáveis e ordenadas por dependência.
    *   **Entrada:** O `spec.md` e o `plan.md`.
    *   **Saída:** Um arquivo `tasks.md` que funciona como um checklist detalhado para a implementação.

---

### Fase 4: Tarefas -> Código (Mãos à Obra)

4.  **Skill:** `/speckit.implement`
    *   **Objetivo:** Ler e executar as tarefas definidas no `tasks.md` para construir a funcionalidade.
    *   **Entrada:** O arquivo `tasks.md`.
    *   **Saída:** A implementação real: código, testes e outras modificações no projeto.

---

## Skills Auxiliares

Existem também skills de suporte que podem ser usadas em pontos específicos do fluxo:

*   **`/speckit.clarify`**: Usada após a fase `specify` se o `spec.md` contiver ambiguidades ou pontos que precisam de mais detalhes do usuário.
*   **`/speckit.analyze`**: Usada para verificar a consistência e a qualidade entre os diferentes artefatos (`spec.md`, `plan.md`, `tasks.md`).
*   **`/speckit.constitution`**: Define os princípios e regras de alto nível do projeto, que guiam as decisões tomadas em todas as outras fases.
