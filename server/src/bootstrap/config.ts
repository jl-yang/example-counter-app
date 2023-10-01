import assert from 'assert';
import { ConnectionOptions, parse } from 'pg-connection-string';
import { ConnectionConfig } from 'pg';

const numberFromEnv = (name: string, defaultValue: number): number => {
  const value = process.env[name];

  const num = Number(value || defaultValue);
  assert(!isNaN(num), `Invalid number value ${process.env[name]} for ${name}`);

  return num;
};

const stringFromEnv = (name: string, defaultValue: string): string =>
  process.env[name] || defaultValue;

const getConnectionConfig = (
  connection: ConnectionOptions,
): ConnectionConfig => {
  if (connection.database == null) {
    throw new Error('Missing database name');
  }

  return {
    ...connection,
    database: connection.database,
  } as ConnectionConfig;
};

const pgConnection: ConnectionConfig = getConnectionConfig(
  parse(
    stringFromEnv('DATABASE_URL', 'postgresql://postgres@localhost:19910/elo'),
  ),
);

export default {
  port: numberFromEnv('PORT', 4000),
  POSTGRES_URI: pgConnection,
  knex: {
    client: 'pg',
    connection: pgConnection,
    migrations: {
      directory: 'src/database/migrations',
      tableName: 'knex_migrations',
    },
  },
};
