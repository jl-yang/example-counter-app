import { Router } from 'express';
import { getCountersHandler } from '../handlers/counter/getCountersHandler';
import { increaseCounterHandler } from '../handlers/counter/increaseCounterHandler';

export const counterRoutes: Router = Router()
  .get('/', getCountersHandler)
  .post('/increase', increaseCounterHandler);
