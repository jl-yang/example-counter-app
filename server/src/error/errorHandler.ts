import { ErrorRequestHandler } from 'express';
import { logger } from '../logging/logger';

export const errorHandler: ErrorRequestHandler = async (
  error: Error,
  req,
  res,
  next,
) => {
  logger.error('Unexpected error', error);
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
    },
  });
};
