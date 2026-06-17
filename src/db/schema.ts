import { appSchema, tableSchema } from '@nozbe/watermelondb/Schema';

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'alimentos',
      columns: [
        { name: 'nome', type: 'string' },
        { name: 'peso_preparo', type: 'number' },
        { name: 'descricao', type: 'string', isOptional: true },
        { name: 'proteina', type: 'number' },
        { name: 'carboidrato', type: 'number' },
        { name: 'gordura', type: 'number' },
        { name: 'calorias', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'refeicoes',
      columns: [
        { name: 'nome', type: 'string' },
        { name: 'quantidade', type: 'number' },
        { name: 'estado_preparo', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'item_refeicao',
      columns: [
        { name: 'refeicao_id', type: 'string', isIndexed: true },
        { name: 'alimento_id', type: 'string', isIndexed: true },
        { name: 'quantidade', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'programas',
      columns: [
        { name: 'nome', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'blocos',
      columns: [
        { name: 'programa_id', type: 'string', isIndexed: true },
        { name: 'nome', type: 'string' },
        { name: 'ordem', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'exercicios',
      columns: [
        { name: 'bloco_id', type: 'string', isIndexed: true },
        { name: 'nome', type: 'string' },
        { name: 'series', type: 'number' },
        { name: 'repeticoes_min', type: 'number' },
        { name: 'repeticoes_max', type: 'number' },
        { name: 'tecnica_avancada', type: 'string', isOptional: true },
        { name: 'reps_reserva', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'sessao_treino',
      columns: [
        { name: 'programa_id', type: 'string', isIndexed: true },
        { name: 'data_inicio', type: 'number' },
        { name: 'data_fim', type: 'number', isOptional: true },
        { name: 'status', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'execucao_exercicio',
      columns: [
        { name: 'sessao_treino_id', type: 'string', isIndexed: true },
        { name: 'exercicio_id', type: 'string', isIndexed: true },
        { name: 'serie_numero', type: 'number' },
        { name: 'reps_feitas', type: 'number' },
        { name: 'quilagem', type: 'number' },
        { name: 'reps_reserva_feitas', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
