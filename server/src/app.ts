import express, { Express } from 'express';
import cors from 'cors';
import { errorHandler } from './error/errorHandler';
import config from './bootstrap/config';
import { logger } from './logging/logger';
import { userRoutes } from './services/routes/users';
import { counterRoutes } from './services/routes/counters';

const app: Express = express();
const port = config.port;

app
  .use(express.json())

  .options(
    '*',
    cors({
      optionsSuccessStatus: 200,
    }),
  )
  .use(cors())

  .use('/api/users', userRoutes)
  .use('/api/counters', counterRoutes)

  .use(errorHandler)

  .listen(port, () => logger.info(`Started server at port ${port}`));
