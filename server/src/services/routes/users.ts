import { Router } from 'express';
import { loginHandler } from '../handlers/user/loginHandler';
import { registerHandler } from '../handlers/user/registerHandler';
import { logoutHandler } from '../handlers/user/logoutHandler';

export const userRoutes: Router = Router()
  .post('/register', registerHandler)
  .post('/login', loginHandler)
  .post('/logout', logoutHandler);
