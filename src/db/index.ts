import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import Alimento from './models/Alimento';
import Refeicao from './models/Refeicao';
import ItemRefeicao from './models/ItemRefeicao';
import Programa from './models/Programa';
import Bloco from './models/Bloco';
import Exercicio from './models/Exercicio';
import SessaoTreino from './models/SessaoTreino';
import ExecucaoExercicio from './models/ExecucaoExercicio';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Alimento,
    Refeicao,
    ItemRefeicao,
    Programa,
    Bloco,
    Exercicio,
    SessaoTreino,
    ExecucaoExercicio,
  ],
});

export {
  Alimento,
  Refeicao,
  ItemRefeicao,
  Programa,
  Bloco,
  Exercicio,
  SessaoTreino,
  ExecucaoExercicio,
};
