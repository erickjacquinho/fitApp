# Sistema de cores — Mineral Quente

Paleta para tema claro de um aplicativo de dieta e treinamento. As escalas separam cores primitivas de funções semânticas, evitando aplicar hexadecimais diretamente nos componentes.

## Regras da escala

- `500` é a cor-base.
- `50`, `100` e `200` são variações claras para fundos, estados suaves, bordas e foco.
- `600`, `700` e `900` são variações escuras para hover, pressed, texto e ícones.
- Azul, âmbar e laranja são categorias de macronutrientes, não estados do sistema.
- Verde-musgo representa sucesso; vermelho-tomate representa erro.

## Escalas cromáticas

| Escala | Azul / proteína | Âmbar / carboidrato | Laranja / gordura | Musgo / sucesso | Tomate / erro | Uso geral |
|---|---|---|---|---|---|---|
| `50` | `#E4E1F7` | `#F8F0DD` | `#F5EADF` | `#EBECE5` | `#F6E8E2` | Fundo sutil e alertas suaves |
| `100` | `#C6C3F8` | `#F3E3C0` | `#EDD7C4` | `#D7DBD1` | `#F0D3CB` | Hover sobre fundos claros e seleção suave |
| `200` | `#9A96FA` | `#ECD194` | `#E1BA9C` | `#B9C1B2` | `#E6B2A8` | Bordas coloridas, gráficos suaves e halo de foco |
| `500` | `#0800FF` | `#D49300` | `#B85A14` | `#556B4D` | `#C44732` | Cor-base, preenchimento e dados principais |
| `600` | `#0C04DC` | `#BA8104` | `#A25115` | `#4E5F45` | `#AC412E` | Hover de elementos preenchidos |
| `700` | `#1008BA` | `#9F6F07` | `#8C4715` | `#46533D` | `#943A2A` | Pressed, stroke forte e ícones |
| `900` | `#160E8C` | `#7C580C` | `#6E3B16` | `#3D4433` | `#743225` | Texto sobre fundos `50–200` |

### Escalas auxiliares

Mostarda é exclusiva para warning. Teal e ameixa ampliam gráficos; ameixa também identifica links visitados. Essas famílias não substituem as cores principais.

| Escala | Mostarda / warning | Teal / dados | Ameixa / dados e link visitado |
|---|---|---|---|
| `50` | `#F1ECDD` | `#E8ECE8` | `#EFE9E9` |
| `100` | `#E3DAC0` | `#CFDBD7` | `#DFD5D8` |
| `200` | `#CEC094` | `#AAC2BE` | `#C6B6C0` |
| `500` | `#8A6A00` | `#2F6F6A` | `#76506F` |
| `600` | `#7B5E04` | `#2D635E` | `#6A4862` |
| `700` | `#6B5307` | `#2C5651` | `#5D4055` |
| `900` | `#57430C` | `#2A4641` | `#4D3644` |

## Escala neutra

Fundo, superfície, borda e texto pertencem à mesma família neutra. Criar uma escala independente para cada um duplicaria tokens sem adicionar função.

| Token | Hex | Uso recomendado |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Superfície elevada e modal |
| `neutral-50` | `#FCFAF6` | Cards e superfícies padrão |
| `neutral-100` | `#F3EFE7` | Fundo principal do aplicativo |
| `neutral-200` | `#DED8CF` | Divisor e borda sutil de card |
| `neutral-300` | `#C5BAAE` | Borda destacada de card |
| `neutral-400` | `#A3988F` | Estado desabilitado |
| `neutral-500` | `#7A7069` | Texto secundário sobre `neutral-50`; borda de controles |
| `neutral-600` | `#625851` | Texto secundário sobre `neutral-100`; stroke forte |
| `neutral-700` | `#4B413B` | Ícones e texto de média ênfase |
| `neutral-800` | `#352B26` | Títulos e botão secundário escuro |
| `neutral-900` | `#241C18` | Texto principal |
| `neutral-950` | `#18110E` | Máximo contraste |

## Tokens semânticos

Todos os aliases usam o formato `color.categoria.variante`. O nome descreve diretamente a função visual ou o dado representado.

### Regra azul primeiro

- Todo elemento genérico em destaque usa azul como primeira escolha.
- CTA principal, seleção, item ativo, foco, link, indicador de progresso e dado enfatizado usam a família azul.
- Outra família só substitui o azul quando o elemento possui significado explícito: macronutriente, sucesso, warning, erro ou série de dados.
- Cor decorativa nunca substitui o azul em um destaque funcional.
- Para evitar excesso visual, limitar a um destaque azul dominante por região; os demais elementos usam azul em stroke, texto ou fundo `50`.

### Cores de função

| Token | Valor |
|---|---|
| `color.primary` | `blue-500` |
| `color.protein` | `blue-500` |
| `color.carbohydrate` | `amber-500` |
| `color.fat` | `orange-500` |
| `color.info` | `blue-500` |
| `color.warning` | `mustard-500` |
| `color.success` | `moss-500` |
| `color.error` | `tomato-500` |
| `color.link` | `blue-700` |
| `color.link.visited` | `plum-700` |
| `color.data.4` | `teal-500` |
| `color.data.5` | `plum-500` |

### Estrutura

| Token | Valor |
|---|---|
| `color.background` | `neutral-100` |
| `color.surface` | `neutral-50` |
| `color.surface.elevated` | `neutral-0` |
| `color.border.subtle` | `neutral-200` |
| `color.border.strong` | `neutral-300` |
| `color.border.control` | `neutral-500` |
| `color.border.control.hover` | `neutral-600` |
| `color.border.focus` | `blue-500` |
| `color.text.primary` | `neutral-900` |
| `color.text.secondary.surface` | `neutral-500` |
| `color.text.secondary.background` | `neutral-600` |
| `color.text.disabled` | `neutral-400` |

### Cards

| Tipo | Background | Borda | Conteúdo |
|---|---|---|---|
| Padrão | `neutral-50` | `neutral-200` | `neutral-900` |
| Elevado/modal | `neutral-0` | `neutral-200` | `neutral-900` |
| Destacado | `neutral-50` | `neutral-300` | `neutral-900` |
| Selecionado | `blue-50` | `blue-500` | `neutral-900` |
| Proteína | `blue-50` | `blue-200` | `blue-900` |
| Carboidrato | `amber-50` | `amber-200` | `amber-900` |
| Gordura | `orange-50` | `orange-200` | `orange-900` |
| Sucesso | `moss-50` | `moss-200` | `moss-900` |
| Erro | `tomato-50` | `tomato-200` | `tomato-900` |

Uma borda `neutral-200` é decorativa. Inputs, seleções ou controles que dependem da borda para serem reconhecidos devem usar `neutral-500` ou uma cor `500`.

### Botões preenchidos

| Variante | Default | Hover | Pressed | Texto |
|---|---|---|---|---|
| Primário | `blue-500` | `blue-600` | `blue-700` | `#FFFFFF` |
| Secundário | `neutral-900` | `neutral-800` | `neutral-950` | `#FFFFFF` |
| Destrutivo | `tomato-500` | `tomato-600` | `tomato-700` | `#FFFFFF` |
| Sucesso | `moss-500` | `moss-600` | `moss-700` | `#FFFFFF` |
| Carboidrato contextual | `amber-500` | `amber-600` | `amber-700` | `neutral-900` |
| Gordura contextual | `orange-500` | `orange-600` | `orange-700` | `#FFFFFF` |

Botões âmbar ou laranja só devem aparecer em ações diretamente ligadas ao macronutriente. O CTA geral permanece azul.

### Botões apenas com stroke

| Variante | Texto | Stroke | Hover | Pressed |
|---|---|---|---|---|
| Neutro | `neutral-900` | `neutral-500` | `neutral-100` | `neutral-200` |
| Primário | `blue-700` | `blue-500` | `blue-50` | `blue-100` |
| Destrutivo | `tomato-700` | `tomato-500` | `tomato-50` | `tomato-100` |
| Sucesso | `moss-700` | `moss-500` | `moss-50` | `moss-100` |
| Carboidrato | `amber-900` | `amber-700` | `amber-50` | `amber-100` |
| Gordura | `orange-700` | `orange-500` | `orange-50` | `orange-100` |

Para o estado desabilitado: texto `neutral-400`, stroke `neutral-300` e fundo transparente.

### Inputs e controles

| Estado | Background | Borda | Texto/ícone |
|---|---|---|---|
| Default | `neutral-50` | `neutral-500` | `neutral-900` |
| Hover | `neutral-50` | `neutral-600` | `neutral-900` |
| Focus | `neutral-50` | `blue-500` | `neutral-900` |
| Erro | `tomato-50` | `tomato-500` | `tomato-900` |
| Disabled | `neutral-100` | `neutral-300` | `neutral-400` |

No foco, usar stroke de `2px blue-500` e halo externo de `3px blue-100`.

## Macronutrientes e gráficos

| Macro | Dado principal | Fundo suave | Borda | Texto/ícone |
|---|---|---|---|---|
| Proteína | `blue-500` | `blue-50` | `blue-200` | `blue-900` |
| Carboidrato | `amber-500` | `amber-50` | `amber-200` | `amber-900` |
| Gordura | `orange-500` | `orange-50` | `orange-200` | `orange-900` |

Em gráficos, acompanhar a cor com rótulo, ícone ou padrão. Não depender apenas da diferença entre âmbar e laranja.

## Contraste e restrições

- Branco sobre `blue-500`, `orange-500`, `moss-500` e `tomato-500` atende WCAG AA para texto comum.
- `neutral-900` sobre `amber-500` atende WCAG AA; branco sobre âmbar não atende.
- Para texto pequeno em fundo claro, usar tons `700–900`; não usar `50–200`.
- `amber-700` funciona como stroke, mas texto âmbar em superfície clara deve usar `amber-900`.
- `neutral-500` serve como texto secundário em cards; sobre o fundo do app, preferir `neutral-600`.
- A cor não deve ser o único indicador de erro, sucesso, seleção ou macronutriente.
- O âmbar não deve representar simultaneamente carboidrato e warning. Caso warnings se tornem frequentes, crie uma família semântica própria.

## Regras normativas do design system

### Hierarquia de texto

| Elemento | Cor | Peso | Tamanho | Entrelinha |
|---|---|---:|---:|---:|
| Título de página | `neutral-900` | `700` | `32–40px` | `115%` |
| Título de seção | `neutral-900` | `700` | `24–28px` | `120%` |
| Título de card | `neutral-900` | `600` | `16–18px` | `130%` |
| Subtítulo | `neutral-700` | `600` | `14–16px` | `140%` |
| Corpo | `neutral-700` | `400` | `16px` | `150%` |
| Descrição em card | `neutral-500` | `400` | `14px` | `145%` |
| Descrição sobre fundo do app | `neutral-600` | `400` | `14px` | `145%` |
| Label e metadado | `neutral-700` | `600` | `12–14px` | `130%` |
| Texto de botão | Conforme o botão | `600` | `14–16px` | `100%` |
| Texto negativo | `neutral-0` | `400–700` | Conforme a função | `130–150%` |

Regras:

- Usar somente pesos `400`, `600` e `700`.
- Não usar peso para compensar contraste insuficiente.
- Títulos usam `neutral-900`; azul em títulos fica reservado para links ou estados selecionados.
- Descrições nunca usam `neutral-400`, exceto em conteúdo desabilitado.
- Texto negativo usa branco integral sobre azul, laranja, musgo, tomate e chocolate.
- Não usar texto branco sobre âmbar; usar `neutral-900`.

### Fundos e superfícies

| Contexto | Fundo | Regra |
|---|---|---|
| Aplicativo | `neutral-100` | Fundo global |
| Card padrão | `neutral-50` | Superfície principal |
| Modal, dropdown e popup | `neutral-0` | Superfície elevada |
| Área agrupada | `neutral-50` | Usar borda para separar do card pai |
| Área selecionada | `blue-50` | Sempre acompanhar com borda `blue-500` |
| Área desabilitada | `neutral-100` | Reduzir contraste do conteúdo |

- Não empilhar superfícies da mesma cor sem borda, espaçamento ou elevação.
- Sombras não substituem bordas em controles interativos.
- Cards coloridos usam somente tons `50` como fundo.
- Tons `500–900` como fundo ficam restritos a CTA, status forte e blocos com texto negativo.

### Cards

- Card padrão: fundo `neutral-50`, borda `1px neutral-200`.
- Card elevado: fundo `neutral-0`, borda `1px neutral-200` e sombra discreta.
- Card destacado: fundo `neutral-50`, borda `1px neutral-300`.
- Card selecionado: fundo `blue-50`, borda `2px blue-500`.
- Card de macro: fundo da família `50`, borda `200`, título/ícone `900` e dado principal `500`.
- Raio recomendado: `12–16px`; usar o mesmo raio em cards equivalentes.
- Hover de card clicável: borda sobe de `neutral-200` para `neutral-300`.
- Cards não clicáveis não recebem efeito de hover.

### Bordas

| Finalidade | Cor | Espessura |
|---|---|---:|
| Card e agrupamento | `neutral-200` | `1px` |
| Card destacado | `neutral-300` | `1px` |
| Input e controle | `neutral-500` | `1px` |
| Hover de controle | `neutral-600` | `1px` |
| Seleção | `blue-500` | `2px` |
| Foco | `blue-500` + halo `blue-100` | `2px + 3px` |
| Erro | `tomato-500` | `1–2px` |
| Desabilitado | `neutral-300` | `1px` |

- Bordas decorativas podem ter baixo contraste; bordas necessárias para reconhecer controles devem manter contraste mínimo de `3:1`.
- Não aplicar opacidade adicional aos tokens de borda.
- Não usar bordas de macronutrientes em componentes sem relação com nutrição.

### Dividers

- Divider padrão: `1px neutral-200`.
- Divider forte entre seções: `1px neutral-300`.
- Divider dentro de superfície colorida clara: usar o tom `200` da mesma família.
- Dividers nunca usam `neutral-500` ou cores-base `500`; devem permanecer visualmente secundários.
- Preferir espaçamento a divider quando a separação já estiver clara.

### Botões

- Altura mínima: `44px`; raio: `10–12px`; peso do label: `600`.
- Primário preenchido: `blue-500`; hover `blue-600`; pressed `blue-700`; texto branco.
- Secundário preenchido: `neutral-900`; hover `neutral-800`; pressed `neutral-950`; texto branco.
- Primário com stroke: borda `blue-500`, texto `blue-700`, hover `blue-50`, pressed `blue-100`.
- Secundário com stroke: borda `neutral-500`, texto `neutral-900`, hover `neutral-100`, pressed `neutral-200`.
- Destrutivo preenchido: `tomato-500`; hover `tomato-600`; pressed `tomato-700`; texto branco.
- Desabilitado: fundo `neutral-200`, borda `neutral-300`, texto `neutral-500`; sem hover.
- Apenas uma ação primária preenchida por região visual.
- Âmbar e laranja só podem colorir botões diretamente relacionados a carboidrato ou gordura.

### Popups e mensagens de erro

#### Erro recuperável

- Fundo: `tomato-50`.
- Borda: `1px tomato-200`.
- Ícone: `tomato-700`.
- Título: `tomato-900`, peso `600`.
- Descrição: `neutral-700`, peso `400`.
- Ação: botão com stroke `tomato-500` e texto `tomato-700`.

#### Erro crítico

- Fundo: `tomato-500`.
- Título e descrição: `neutral-0`.
- Título: peso `700`; descrição: peso `400`.
- Ação principal: fundo branco com texto `tomato-700`.
- Ação secundária: stroke branco com texto branco.
- Sempre incluir ícone e mensagem textual; nunca comunicar erro apenas pela cor.

### Tema

Os componentes usam os mesmos tokens semânticos nos dois temas; somente os valores mudam.

| Token semântico | Tema claro | Tema escuro |
|---|---|---|
| `color.background` | `#F3EFE7` | `#15110F` |
| `color.surface` | `#FCFAF6` | `#211A17` |
| `color.surface.elevated` | `#FFFFFF` | `#2B221E` |
| `color.border.subtle` | `#DED8CF` | `#443832` |
| `color.border.strong` | `#C5BAAE` | `#5A4C45` |
| `color.border.control` | `#7A7069` | `#766860` |
| `color.text.primary` | `#241C18` | `#F8F3EB` |
| `color.text.secondary` | `#625851` | `#C9BFB5` |
| `color.text.disabled` | `#A3988F` | `#82776F` |
| `color.focus` | `blue-500` | `blue-200` |
| `color.link` | `blue-700` | `blue-200` |
| `color.link.visited` | `plum-700` | `plum-200` |
| `color.scrim` | `neutral-950` a `56%` | `#000000` a `68%` |

Superfícies semânticas no tema escuro:

| Função | Fundo | Borda | Texto/ícone |
|---|---|---|---|
| Info/proteína | `#211F3B` | `blue-500` | `blue-200` |
| Carboidrato | `#2C2415` | `amber-500` | `amber-200` |
| Gordura | `#2A1D15` | `orange-500` | `orange-200` |
| Warning | `#292413` | `mustard-500` | `mustard-200` |
| Sucesso | `#1D251B` | `moss-500` | `moss-200` |
| Erro | `#2C1B18` | `tomato-500` | `tomato-200` |
| Dados teal | `#162725` | `teal-500` | `teal-200` |
| Dados ameixa | `#281B24` | `plum-500` | `plum-200` |

Regras:

- Não inverter escalas automaticamente.
- No tema escuro, destaques genéricos usam `blue-200`; texto sobre eles usa `neutral-950`.
- Hover e pressed no tema escuro caminham para tons mais claros: `200 → 100 → 50`.
- Botões semânticos escuros usam fundo da família `200` e texto `neutral-950`.
- Imagens, gráficos e cores transparentes devem ser validados separadamente em cada tema.
- O tema segue a preferência do sistema somente depois de ambos estarem implementados e testados.

### Informação e warning

| Função | Fundo claro | Borda | Ícone | Título | Descrição |
|---|---|---|---|---|---|
| Informação | `blue-50` | `blue-200` | `blue-700` | `blue-900` | `neutral-700` |
| Warning | `mustard-50` | `mustard-200` | `mustard-700` | `mustard-900` | `neutral-700` |

- Informação reutiliza azul porque é o destaque padrão do sistema.
- Warning usa mostarda escura e nunca âmbar, evitando conflito com carboidrato.
- Ambos exigem ícone e título textual; a cor não comunica o estado sozinha.
- Warning indica risco recuperável. Erro indica falha já ocorrida.

### Links

| Estado | Tema claro | Tema escuro |
|---|---|---|
| Default | `blue-700` | `blue-200` |
| Hover | `blue-900` | `blue-100` |
| Pressed | `blue-900` | `blue-50` |
| Visitado | `plum-700` | `plum-200` |
| Desabilitado | `neutral-400` | `#82776F` |

- Links dentro de texto são sempre sublinhados.
- Hover não depende apenas de mudança de cor; aumentar a espessura do sublinhado.
- Links em navegação podem dispensar sublinhado quando posição e estado ativo forem evidentes.
- Link ativo de navegação segue a regra azul primeiro.
- Foco usa o mesmo indicador definido para controles.

### Badges e status

| Tipo | Fundo | Borda | Texto/ícone |
|---|---|---|---|
| Neutro/inativo | `neutral-100` | `neutral-200` | `neutral-700` |
| Info/ativo | `blue-50` | `blue-200` | `blue-900` |
| Warning/pendente | `mustard-50` | `mustard-200` | `mustard-900` |
| Sucesso/concluído | `moss-50` | `moss-200` | `moss-900` |
| Erro/bloqueado | `tomato-50` | `tomato-200` | `tomato-900` |
| Proteína | `blue-50` | `blue-200` | `blue-900` |
| Carboidrato | `amber-50` | `amber-200` | `amber-900` |
| Gordura | `orange-50` | `orange-200` | `orange-900` |

- Badge genérico em destaque usa azul.
- Badge de status exige texto explícito; não usar apenas ponto colorido.
- Badges preenchidos usam o tom `500` com texto branco; âmbar usa `neutral-900`.
- Usar preenchimento forte somente para urgência ou seleção atual.
- No tema escuro, usar os fundos e textos definidos na tabela de superfícies semânticas.

### Loading, progresso e skeleton

| Elemento | Tema claro | Tema escuro |
|---|---|---|
| Spinner ativo | `blue-500` | `blue-200` |
| Track do spinner | `neutral-200` | `#443832` |
| Barra de progresso | `blue-500` | `blue-200` |
| Track de progresso | `neutral-200` | `#443832` |
| Skeleton base | `neutral-200` | `#3A302B` |
| Skeleton highlight | `neutral-50` | `#514640` |

- Loading genérico segue a regra azul primeiro.
- Progresso de macronutriente usa a cor da respectiva família.
- Skeleton usa gradiente entre base e highlight, sem alterar a opacidade do container.
- Com `prefers-reduced-motion`, remover shimmer e manter skeleton estático.
- Nunca representar sucesso apenas transformando a barra em verde; incluir mensagem ou ícone.

### Gráficos com múltiplas séries

Ordem padrão das séries:

| Série | Tema claro | Tema escuro |
|---:|---|---|
| `1` | `blue-500` | `blue-200` |
| `2` | `orange-500` | `orange-200` |
| `3` | `amber-700` | `amber-200` |
| `4` | `teal-500` | `teal-200` |
| `5` | `plum-500` | `plum-200` |
| `6` | `neutral-600` | `neutral-300` |

- Gráficos específicos de macros preservam proteína azul, carboidrato âmbar e gordura laranja.
- Não usar musgo, tomate ou mostarda em séries neutras; essas cores permanecem reservadas para status.
- Linhas e contornos precisam de contraste mínimo `3:1`; por isso carboidrato usa `amber-700` no tema claro.
- Áreas preenchidas usam a cor da série a `18%`, mantendo linha sólida.
- Gridlines: `neutral-200` no tema claro e `#443832` no escuro.
- Eixos e rótulos: `neutral-600` no tema claro e `#C9BFB5` no escuro.
- Acima de seis séries, usar padrões, marcadores, rótulos diretos ou separar o gráfico.
- Tooltips usam superfície elevada, borda forte e texto principal do tema.

### Cores sobre imagens

- Texto sobre imagem exige scrim ou área sólida; nunca confiar somente na luminosidade percebida.
- Texto negativo usa `neutral-0` sobre scrim `neutral-950` entre `56–72%`.
- Texto escuro usa `neutral-950` sobre scrim branco entre `78–90%`.
- O gradiente do scrim deve atingir sua maior opacidade atrás do texto.
- Títulos e descrições continuam sujeitos a `4.5:1`; texto grande, `3:1`.
- CTA sobre imagem usa botão sólido azul. Botão apenas com stroke não é permitido sobre imagem variável.
- Badges sobre imagem usam fundo sólido, não translúcido.
- Testar a imagem mais clara, mais escura e mais detalhada prevista para o componente.

### Contraste

| Elemento | Contraste mínimo |
|---|---:|
| Texto comum abaixo de `24px` | `4.5:1` |
| Texto grande a partir de `24px`, ou `18.66px` em peso `700` | `3:1` |
| Ícone funcional | `3:1` |
| Borda necessária para reconhecer controle | `3:1` |
| Indicador de foco | `3:1` contra cores adjacentes |
| Texto desabilitado | Sem mínimo, mas deve permanecer legível |

Combinações aprovadas para texto comum:

| Texto | Fundo | Contraste |
|---|---|---:|
| `neutral-0` | `blue-500` | `8.56:1` |
| `neutral-900` | `amber-500` | `6.36:1` |
| `neutral-0` | `orange-500` | `4.66:1` |
| `neutral-0` | `moss-500` | `5.84:1` |
| `neutral-0` | `tomato-500` | `4.89:1` |
| `neutral-0` | `mustard-500` | `5.07:1` |
| `neutral-0` | `teal-500` | `5.83:1` |
| `neutral-0` | `plum-500` | `6.67:1` |
| `mustard-900` | `mustard-50` | `8.03:1` |
| `teal-900` | `teal-50` | `8.58:1` |
| `plum-700` | `neutral-50` | `8.65:1` |
| `neutral-900` | `neutral-50` | `16.06:1` |
| `neutral-500` | `neutral-50` | `4.63:1` |
| `neutral-600` | `neutral-100` | `6.04:1` |
| `#F8F3EB` | `#15110F` | `16.99:1` |
| `#C9BFB5` | `#15110F` | `10.37:1` |
| `neutral-950` | `blue-200` | `7.21:1` |
| `plum-200` | `#15110F` | `9.70:1` |

Combinações proibidas para texto comum:

- `neutral-0` sobre `amber-500`: `2.63:1`.
- `neutral-500` sobre `neutral-100`: `4.21:1`.
- `amber-700` sobre `neutral-50`: `4.24:1`; usar `amber-900`.
- Tons `50–200` como texto sobre superfícies claras.

### Opacidade

| Uso | Valor permitido |
|---|---:|
| Scrim atrás de modal | `neutral-950` a `56%` |
| Sombra de card | `neutral-900` entre `6–10%` |
| Sombra de modal | `neutral-950` entre `12–18%` |
| Elemento decorativo | Cor da família entre `8–12%` |
| Área de gráfico | Cor da série a `18%` |
| Scrim escuro sobre imagem | `56–72%` |
| Scrim claro sobre imagem | `78–90%` |
| Halo de foco | `blue-100` a `100%` |

Regras:

- Texto, ícones funcionais, bordas e dividers usam cores sólidas; não reduzir opacidade.
- Estados disabled usam a escala neutra, não `opacity` no componente inteiro.
- Hover e pressed usam tons `600` e `700`, não sobreposição preta ou branca.
- Opacidade nunca pode ser usada para corrigir uma cor fora da paleta.
- O contraste deve ser calculado após a composição da transparência sobre o fundo real.
- Não acumular transparências em elementos aninhados.

### Testes de contraste

Todo componente novo ou alterado deve validar:

1. Texto comum com mínimo `4.5:1`.
2. Texto grande, ícones funcionais, bordas de controles e foco com mínimo `3:1`.
3. Estados default, hover, pressed, focus, disabled e erro.
4. Componente sobre todas as superfícies permitidas nos temas claro e escuro.
5. Resultado final de cores com opacidade, considerando o fundo real.
6. Macronutrientes com rótulo ou ícone, sem depender apenas da cor.
7. Simulação de protanopia, deuteranopia e escala de cinza para gráficos.
8. Links default, hover, pressed, visited e focus nos dois temas.
9. Warning, informação, badges, loading, skeleton e popups nos dois temas.
10. Texto e controles sobre os extremos de luminosidade previstos para imagens.

Critérios de aprovação:

- Nenhuma combinação abaixo do mínimo correspondente.
- Nenhum controle identificado apenas pela cor.
- Foco visível em todas as superfícies permitidas.
- Borda de input e botão com stroke permanece reconhecível sem sombra.
- Séries de gráficos continuam identificáveis sem depender exclusivamente da cor.
- Nenhuma mudança de tema altera o significado semântico de uma cor.
- Resultados dos testes devem registrar foreground, background e razão calculada.

### Uso obrigatório dos tokens

1. Todo destaque genérico usa azul primeiro.
2. Componentes usam tokens semânticos; hexadecimais não entram diretamente em componentes.
3. Escalas `50–900` são primitivas; a função visual define qual nível usar.
4. Hover e pressed seguem a progressão definida para o tema ativo.
5. Fundo global, superfícies, cards e elementos elevados devem permanecer visualmente distinguíveis.
6. Cores de macronutrientes ficam restritas a dados e ações contextuais.
7. Mostarda, musgo e tomate ficam restritos a warning, sucesso e erro.
8. Teal e ameixa ficam restritos a séries adicionais; ameixa também representa link visitado.
9. Novas cores só entram na paleta quando nenhuma família existente atende à função sem colisão semântica.
