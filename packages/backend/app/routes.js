import Router from 'koa-router';

import { notFoundController } from './controllers/api/common';
import auth from './middlewares/auth';

import authLogin from './controllers/api/auth/login';
import authLogout from './controllers/api/auth/logout';
import authRevoke from './controllers/api/auth/revoke';

import apiHistory from './controllers/api/history';
import apiNotification from './controllers/api/notification';
import apiStatus from './controllers/api/status';

const Route = () => {
  const router = new Router();

  const authAPI = new Router();
  authAPI.get('/auth/logout', authLogout);
  authAPI.get('/auth/revoke', authRevoke);

  authAPI.post('/history', apiHistory);
  authAPI.post('/notification', apiNotification);
  authAPI.get('/status', apiStatus);

  authAPI.all('*', notFoundController);
  router.use('/api', auth, authAPI.routes(), authAPI.allowedMethods());

  router.post('/login', authLogin);

  return router;
};

export default Route;
