# Design - Etapa 2: Módulo Dieta - Dados

## 1. Mapeamento de Entidades
Localização: `src/db/models/`

- **Alimento.ts**:
  - `@field('nome') nome!: string`
  - `@field('proteina') proteina!: number`
  - ... (demais campos)
- **Refeicao.ts**:
  - `@field('nome') nome!: string`
  - `@children('item_refeicao') itens!: Query<ItemRefeicao>`
- **ItemRefeicao.ts**:
  - `@relation('refeicoes', 'refeicao_id') refeicao!: Relation<Refeicao>`
  - `@relation('alimentos', 'alimento_id') alimento!: Relation<Alimento>`
  - `@field('quantidade') quantidade!: number`

## 2. Camada de Serviços
Localização: `src/features/diet/services/`

- **alimento-service.ts**:
  - `create(data: AlimentoDTO)`
  - `update(id: string, data: Partial<AlimentoDTO>)`
  - `delete(id: string)`
  - `search(query: string)`
- **refeicao-service.ts**:
  - `createWithItems(refeicaoData: RefeicaoDTO, items: ItemDTO[])`: Uso de `database.batch`.

## 3. Tipos
Localização: `src/features/diet/types.ts`

- `AlimentoDTO`, `RefeicaoDTO`, `ItemDTO`.

## 4. Integração
- Registro dos novos modelos no `src/db/index.ts`.
- Exportação dos serviços via `src/features/diet/index.ts`.