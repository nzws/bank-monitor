import { revokeToken } from '../../../utils/token';

const authLogout = async ctx => {
  await revokeToken(ctx.state.auth.token);
  ctx.body = { status: 'success' };
};

export default authLogout;
