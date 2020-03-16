import Router from 'koa-router';

import { notFoundController } from './controllers/api/common';
import auth from './middlewares/auth';
import authLogin from './controllers/api/auth/login';
import authLogout from './controllers/api/auth/logout';

const Route = () => {
  const router = new Router();

  const authAPI = new Router();
  authAPI.get('/auth/logout', authLogout);

  authAPI.all('*', notFoundController);
  router.use('/api', auth, authAPI.routes(), authAPI.allowedMethods());

  router.post('/login', authLogin);

  return router;
};

export default Route;
