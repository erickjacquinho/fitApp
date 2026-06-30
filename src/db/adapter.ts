import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import migrations from './migrations';

export const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'fitapp_db_v3',
  jsi: true,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error', error);
  },
});
