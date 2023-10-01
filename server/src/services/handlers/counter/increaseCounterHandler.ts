import { Request, Response } from 'express';
import { databaseInstance } from '../../../database/database';
import { Counter } from '../../models/models';
import { logger } from '../../../logging/logger';

export const increaseCounterHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const username = req.body?.username;

  const result = await databaseInstance.withTransaction((client) =>
    client.query(
      'UPDATE counters SET count = count + 1 WHERE user_id = (SELECT id FROM users WHERE username = $1) RETURNING count',
      [username],
    ),
  );

  if (result.rowCount === 0) {
    res.status(500).json({ error: 'Error updating counter' });
    return;
  }

  const updatedCounter: Counter = {
    username,
    count: Number(result.rows[0].count),
  };

  logger.info(`Increased counter by 1 for user: ${username}`);
  res.status(200).json(updatedCounter);
};
