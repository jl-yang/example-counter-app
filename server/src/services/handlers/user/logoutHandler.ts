import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { databaseInstance } from '../../../database/database';
import { isValidUser } from './registerHandler';
import { logger } from '../../../logging/logger';

export const logoutHandler: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const username = req.body?.username;
  const password = req.body?.password;

  if (!isValidUser(username, password)) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  await databaseInstance.withTransaction((client) =>
    client.query(
      'UPDATE users SET is_log_in = FALSE WHERE username = $1 AND password = $2',
      [username, password],
    ),
  );

  logger.info(`User ${username} logged out`);
  res.status(200).json();
};
