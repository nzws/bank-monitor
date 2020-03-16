import platform from 'platform';
import config from '../../../../config';
import { errorController } from '../common';
import { logWarn } from '../../../utils/logger';
import { decrypt } from '../../../utils/crypto';
import state from '../../../utils/state';
import { createToken } from '../../../utils/token';
import { notificationSender } from '../../../utils/notification';

const authLogin = async ctx => {
  const { ip, request, header } = ctx;
  const { UID, password, deviceToken } = request.body;
  if (!UID || !password) {
    return errorController(ctx, 400, 'missing value');
  }

  const data = config.encrypted_data[UID];
  let encrypted;
  try {
    if (data && data.banks) {
      const banks = data.banks;
      encrypted = JSON.parse(decrypt(banks.encrypted, banks.iv, password));
      state.set(`${UID}_auth`, encrypted);
    }
  } catch (e) {
    logWarn(e);
    logWarn('password is incorrect');
  }

  if (!data || !encrypted) {
    return errorController(ctx, 403, 'user or password is incorrect');
  }

  const { description } = platform.parse(header['user-agent']);
  notificationSender(UID, 'login', {
    device: description,
    ip
  });
  const token = await createToken(UID, description, ip, deviceToken);
  ctx.body = { status: 'success', token };
};

export default authLogin;
