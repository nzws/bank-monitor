import * as Sentry from '@sentry/node';
import { logInfo, logWarn } from '../utils/logger';
import getIP from '../utils/ip';

const logger = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;

  const isWarn = ms >= 1000 || ctx.status >= 400;
  const msg = `(${ctx.status}) ${ctx.method} ${ctx.url} - ${ms}ms - ${getIP(
    ctx
  )}`;

  (isWarn ? logWarn : logInfo)(msg);
  if (isWarn) {
    Sentry.captureMessage(msg);
  }
};

export default logger;
