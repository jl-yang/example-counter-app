import { Request, Response } from 'express';
import { databaseInstance, find } from '../../../database/database';
import { Counter } from '../../models/models';
import { logger } from '../../../logging/logger';

export const getCountersHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const results = await databaseInstance.withConnection((client) =>
    find(
      client,
      'SELECT users.username AS username, counters.count AS count FROM users INNER JOIN counters ON counters.user_id = users.id;',
    ),
  );

  const counters = results.map(
    (result) =>
      ({
        username: String(result.username),
        count: Number(result.count),
      }) satisfies Counter,
  );

  logger.info(`Fetched counters: ${JSON.stringify(counters)}`);
  res.status(200).json({ counters });
};
