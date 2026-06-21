0- caso ainda nao tenhamos o lib, quero que instale o lucide icons

1- quero alterar o todays balance para algo mais completo. quero refatorar este componente e criar uma central de macronutrientes e calorias.
Nesta ordem, deve ser mostrada em apenas uma linha deste modo: P: [proteína em 'gramas']; C: [carboidratos em 'gramas']; G: [gorduras em 'gramas']; Kcal: [calorias em 'gramas'].

2- abaixo disso temos o botao de new meal e foodbank. eles sairao daí. quero recriar este espaço para que seja um menu de refeiçoes e assim eu consiga adicionar as comidas dentro delas. ao inves dos botoes quero um menu de refeicao, onde eu tenha quando vazio o botao de adicionar alimento [+ Adicionar Alimento] -> vai abrir o food bank

ao adicionar um alimento neste componente ele ia virar um card como parecido na UI de app\diet\food-bank.tsx (crie um novo componente, pois iremos mudar visualmente no futuro).

neste card podem aparecer meals ou alimentos soltos, depende como o usuario adiciona.

abaixo dos alimentos cadastrados nesta refeicao, deve haver os macros de todos os alimentos/meals cadastrados assim como no resumo diario [estes macros devem aparecer no inferior do card, porem ainda dentro dele].
