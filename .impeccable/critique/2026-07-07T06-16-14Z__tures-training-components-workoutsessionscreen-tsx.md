---
target: pagina de treino em andamento
total_score: 25
p0_count: 1
p1_count: 2
timestamp: 2026-07-07T06-16-14Z
slug: tures-training-components-workoutsessionscreen-tsx
---
# Crítica de Design: Tela de Treino em Andamento (Pós-Ajustes)

## Design Health Score

| # | Heurística | Nota | Problema Chave |
|---|-----------|:---:|-----------|
| 1 | Visibilidade do Status do Sistema | 2/4 | Falta de cronômetro de descanso em tempo real integrado entre as séries e de uma visualização global rápida de todas as tarefas do treino. |
| 2 | Compatibilidade com o Mundo Real | 4/4 | Terminologias de academia (Séries, reps, kg, RIR, Técnica Avançada) estão perfeitamente alinhadas com o vocabulário do usuário. |
| 3 | Controle e Liberdade do Usuário | 2/4 | Ausência de proteção contra gestos acidentais de arraste lateral nas colunas e falta de uma confirmação de saída (back guard) na sessão ativa. |
| 4 | Consistência e Padrões | 3/4 | **Melhoria significativa**: cartões sem sombras, uso correto de cores do tema e alertas customizados. Porém, inputs customizados quebram o alinhamento visual do anel de foco. |
| 5 | Prevenção de Erros | 3/4 | O botão "Segure para finalizar" é excelente, mas a validação de dados só é acionada no momento do salvamento da série. |
| 6 | Reconhecimento em vez de Recordação | 2/4 | A rolagem horizontal isola cada exercício. O usuário não consegue ver um checklist global com facilidade sem ter que rolar de coluna em coluna. |
| 7 | Flexibilidade e Eficiência de Uso | 2/4 | O auto-foco na próxima série é ótimo, mas trainees avançados enfrentam alta fricção para digitar valores repetidos de pesos e repetições em séries iguais. |
| 8 | Estética e Design Minimalista | 3/4 | Excelente tipografia em Helvetica Now e layout fiel ao tema Mineral Warm. Pequenos ajustes de inputs são necessários. |
| 9 | Ajuda na Recuperação de Erros | 3/4 | Excelente transição dos alertas nativos para a caixa de diálogo customizada FeedbackDialog. |
| 10 | Ajuda e Documentação | 1/4 | Ausência de dicas rápidas de uso dos gestos ou explicação prática sobre o RIR. |
| **Total** | | **25/40** | **Bom / Base Sólida com Fricções** |

---

## Anti-Patterns Verdict

**Verdict: AMBER (Baixo Slop)**

- **Avaliação de Design (LLM)**: O app evoluiu drasticamente. Não há sombras decorativas desnecessárias, botões e classes estão limpos. Restam pequenos ajustes:
  - **Inputs customizados desalinhados**: O card de séries em `SetCard.tsx` envolve o input em um `<View>` customizado e remove seus estilos nativos. Isso quebra a animação de foco padrão do design system.
  - **Valores fixos em StyleSheet**: A barra de progresso no `WorkoutSessionScreen.tsx` usa `#FFFFFF` fixo em vez de herdar a cor semântica do tema de contraste.
  - **Falta de confirmação de saída**: A navegação para trás (swipe ou botão voltar do sistema) fecha a tela imediatamente sem avisar, podendo causar perda de progresso.

- **Varredura Técnica (Detector)**: O detector estático reportou `0` infrações, confirmando que os problemas graves de tokens e elevações flat foram sanados.

- **Visual Overlays**: Pulado (plataforma mobile).

---

## Impressão Geral
A tela está muito mais polida e profissional, agora respeitando as regras fundamentais do Design System (Mineral Warm e flat layout). A maior oportunidade agora é aprimorar a UX adicionando proteção contra fechamentos acidentais da sessão, alinhar o anel de foco do input e introduzir um cronômetro de descanso pós-série.

## O Que Está Funcionando Bem
1. **Auto-Avanço de Série**: O avanço automático para o próximo set não preenchido torna o uso fluído e rápido.
2. **Hold to Finish**: O botão com progressão visual e resposta tátil háptica transmite um feedback físico e satisfatório de término.

---

## Problemas Prioritários

### [P0] UX / Segurança: Ausência de Confirmação de Saída
- **Por que importa**: Um gesto de voltar acidental do sistema fecha a tela inteira e perde todos os dados do treino em andamento.
- **Fix**: Adicionar um escutador de navegação/botão voltar para exibir um diálogo de confirmação de saída.
- **Comando sugerido**: `$impeccable polish`

### [P1] Técnico / Visual: Anel de Foco Quebrado no Input
- **Por que importa**: Modificar o input usando classes transparentes dentro de uma View customizada impede a correta visualização do foco.
- **Fix**: Ajustar o componente `SetCard.tsx` para passar o estado de foco ou aceitar um sufixo nativo.
- **Comando sugerido**: `$impeccable layout`

### [P1] UX / Produtividade: Ausência de Cronômetro de Descanso
- **Por que importa**: O descanso cronometrado é crucial para hipertrofia. Obrigar o usuário a sair do app quebra o fluxo de uso do caderno de registro analógico.
- **Fix**: Exibir um cronômetro flutuante discreto ao salvar uma série.
- **Comando sugerido**: `$impeccable animate`

### [P2] UX / Produtividade: Redundância de Digitação
- **Por que importa**: Trainees costumam repetir peso/repetições. Digitar e clicar em salvar para cada série adiciona atrito.
- **Fix**: Permitir copiar a série anterior com um toque rápido.
- **Comando sugerido**: `$impeccable delight`

### [P3] Layout: Isolamento de Exercícios
- **Por que importa**: O usuário perde a noção do progresso geral por ver apenas um exercício de cada vez.
- **Fix**: Criar uma folha/checklist de progresso resumido do treino.
- **Comando sugerido**: `$impeccable shape`

---

## Alertas de Persona

- **Alex (Power User)**:
  - *Alerta*: Cansaço de cliques para preencher sets repetidos de mesma carga.
  - *Alerta*: Falta de cronômetro de descanso integrado obriga a usar apps terceiros.
- **Casey (Mobile/Distraído)**:
  - *Alerta*: Arrastes acidentais no pager de exercícios mudam de tela ao suar ou segurar o celular de mal jeito.
  - *Alerta*: Pode perder todo o treino com um swipe lateral acidental do sistema que fecha a página.

---

## Observações Menores
- O status de salvo (`bg-success/5`) é muito sutil sob alta claridade de sol/academia; as bordas poderiam ser ligeiramente mais contrastantes.

## Perguntas para Considerar
1. Devemos travar a rolagem horizontal enquanto um campo de texto estiver focado?
2. Seria interessante enviar uma notificação local de fim de descanso para o usuário caso ele bloqueie o celular entre as séries?
3. Como deve ser a animação comemorativa do treino completo ao encher a barra de progresso?
