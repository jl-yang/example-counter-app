import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { databaseInstance, findOne } from '../../../database/database';
import { isValidUser } from './registerHandler';
import { logger } from '../../../logging/logger';

export const loginHandler: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const username = req.body?.username;
  const password = req.body?.password;

  logger.info(`Trying to login user ${username}`);

  if (!isValidUser(username, password)) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  const user = await databaseInstance.withConnection((client) =>
    findOne(
      client,
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password],
    ),
  );

  if (!user) {
    res.status(400).json({ error: 'Username or password incorrect' });
  }

  await databaseInstance.withTransaction((client) =>
    client.query(
      'UPDATE users SET is_log_in = TRUE WHERE username = $1 AND password = $2',
      [username, password],
    ),
  );

  logger.info(`Successfully logged in user ${username}`);
  res.status(200).json();
};
