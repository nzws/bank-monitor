import platform from 'platform';
import config from '../../../../config';
import { errorController } from '../common';
import { logWarn } from '../../../utils/logger';
import { decrypt } from '../../../utils/crypto';
import state from '../../../utils/state';
import { notificationSender } from '../../../utils/notification';
import updater from '../../../utils/updater';
import getIP from '../../../utils/ip';

const createUpdater = async UID => {
  const auth = Object.keys(state.get(`${UID}_auth`));
  for (const bankId of auth) {
    await updater(UID, bankId, true);
  }
};

const authRelogin = async ctx => {
  const { request, header } = ctx;
  const ip = getIP(ctx);
  const { password } = request.body;
  const UID = ctx.state.auth.UID;

  if (!UID || !password) {
    return errorController(ctx, 400, 'missing value');
  }
  if (state.get(`${UID}_auth`)) {
    return errorController(ctx, 400, 'Already logged in.');
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

  const { description } = platform.parse(header['user-agent']);
  if (!data || !encrypted) {
    await notificationSender(UID, 'login_failed', {
      device: `${description} - relogin`,
      ip
    });

    return errorController(ctx, 403, 'user or password is incorrect');
  }

  notificationSender(UID, 'login', {
    device: `${description} - relogin`,
    ip
  });

  createUpdater(UID);

  ctx.body = { status: 'success' };
};

export default authRelogin;
