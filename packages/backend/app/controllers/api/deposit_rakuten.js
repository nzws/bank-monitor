import { errorController } from './common';
import state from '../../utils/state';
import { notificationSender } from '../../utils/notification';

const apiDepositRakuten = async ctx => {
  const { bankId, amount } = ctx.request.body;
  const UID = ctx.state.auth.UID;

  const authData = state.get(`${UID}_auth`);
  if (!authData || !authData[bankId]) {
    return errorController(ctx, 404, 'This bank is not found');
  }
  const session = state.get(`${UID}_${bankId}_page`);
  if (!session) {
    return errorController(ctx, 500, "puppeteer's page is not running.");
  }

  const logs = await session.action('DEPOSIT_FROM_JPBANK', {
    amount,
    PIN: authData[bankId].PIN
  });

  notificationSender(UID, 'deposit_requested_rakuten', {
    bankId,
    amount
  });

  ctx.body = { status: 'success', result: logs };
};

export default apiDepositRakuten;
