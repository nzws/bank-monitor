import { logWarn, logDebug } from '../../utils/logger';

export const errorController = (
  ctx,
  code = 500,
  error = 'unknown',
  errorData = null
) => {
  logWarn(`(${code}) ${ctx.method} ${ctx.url} - ${error}`);
  logDebug(errorData);
  ctx.throw(code, JSON.stringify({ code, error }));
};

export const notFoundController = ctx => errorController(ctx, 404, 'not_found');
