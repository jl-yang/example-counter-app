import { Pool, PoolClient, PoolConfig } from 'pg';
import { logger } from '../logging/logger';
import config from '../bootstrap/config';

const withConnection = async <T>(
  pool: Pool,
  func: (client: PoolClient) => Promise<T>,
) => {
  const client = await pool.connect();
  try {
    return await func(client);
  } finally {
    client.release();
  }
};

export const find = async <T = Record<string, unknown>>(
  client: PoolClient,
  sql: string,
  values?: any[],
): Promise<T[]> => {
  const res = await client.query(sql, values);
  return res.rows;
};

export const findOne = async <T = Record<string, unknown>>(
  client: PoolClient,
  sql: string,
  values?: any[],
): Promise<T | undefined> => {
  const rows = await find<T>(client, sql, values);
  return rows.length > 0 ? rows[0] : undefined;
};

export class Database {
  public readonly pool: Pool;

  constructor(poolConfig: PoolConfig) {
    this.pool = new Pool(poolConfig);
    this.pool.on('error', (error) => {
      logger.error('Caught unexpected Postgres error', { error });
    });
  }

  withConnection<T>(func: (client: PoolClient) => Promise<T>) {
    return withConnection(this.pool, func);
  }

  withTransaction<T>(func: (client: PoolClient) => Promise<T>) {
    return withConnection(this.pool, async (conn) => {
      await conn.query('BEGIN');
      try {
        const result = await func(conn);
        await conn.query('COMMIT');
        return result;
      } catch (err: unknown) {
        await conn.query('ROLLBACK');
        throw err;
      }
    });
  }
}

export const databaseInstance = new Database(config.POSTGRES_URI);
