import { errorController } from '../controllers/api/common';
import { authToken } from '../utils/token';

const auth = async (ctx, next) => {
  const token = ctx.request.headers.authorization;
  if (!token) {
    return errorController(ctx, 403, 'require_auth');
  }

  const t = await authToken(token);
  if (!t) {
    return errorController(ctx, 400, 'invalid_token');
  }
  ctx.state.auth = t;

  return next();
};

export default auth;
