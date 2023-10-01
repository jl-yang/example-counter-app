import { RequestHandler } from 'express-serve-static-core';
import { databaseInstance } from '../../../database/database';
import { v4 as uuidV4 } from 'uuid';
import { logger } from '../../../logging/logger';

export const isValidUser = (username: string, password: string): boolean =>
  !!username && !!password;

export const registerHandler: RequestHandler = async (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;

  if (!isValidUser(username, password)) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  await databaseInstance.withTransaction((client) =>
    client.query(
      'INSERT INTO users (id, username, password) VALUES ($1, $2, $3)',
      [uuidV4(), username, password],
    ),
  );

  logger.info(`User ${username} registered`);
  res.status(200).json();
};
