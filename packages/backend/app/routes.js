import Router from 'koa-router';

import { notFoundController } from './controllers/api/common';
import auth from './middlewares/auth';

import authLogin from './controllers/api/auth/login';
import authLogout from './controllers/api/auth/logout';
import authRevoke from './controllers/api/auth/revoke';

import apiHistory from './controllers/api/history';
import apiNotification from './controllers/api/notification';
import apiRestartUpdater from './controllers/api/restart_updater';
import apiDepositRakuten from './controllers/api/deposit_rakuten';
import apiStatus from './controllers/api/status';
import apiPing from './controllers/api/ping';

const Route = () => {
  const router = new Router();

  const authAPI = new Router();
  authAPI.post('/auth/logout', authLogout);
  authAPI.post('/auth/revoke', authRevoke);

  authAPI.post('/history', apiHistory);
  authAPI.post('/notification', apiNotification);
  authAPI.post('/restart_updater', apiRestartUpdater);
  authAPI.post('/deposit_rakuten', apiDepositRakuten);
  authAPI.post('/status', apiStatus);
  authAPI.post('/ping', apiPing);

  authAPI.all('*', notFoundController);
  router.use('/api', auth, authAPI.routes(), authAPI.allowedMethods());

  router.post('/login', authLogin);

  return router;
};

export default Route;
