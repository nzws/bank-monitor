import puppeteer from 'puppeteer';
import bankJs from '@nzws/bank-js';
import { errorController } from './common';
import state from '../../utils/state';
import { notificationSender } from '../../utils/notification';
import { logError } from '../../utils/logger';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const apiDepositRakuten = async ctx => {
  const { bankId, amount } = ctx.request.body;
  const UID = ctx.state.auth.UID;

  const authData = state.get(`${UID}_auth`);
  if (!authData || !authData[bankId]) {
    return errorController(ctx, 404, 'This bank is not found');
  }

  const { bank, username, password, options } = authData[bankId];

  try {
    const browser = await puppeteer.launch({
      headless: process.env.NODE_ENV !== 'development',
      slowMo: 200,
      args: [
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding'
      ]
    });
    const session = new bankJs(bank);

    await session.init(browser);
    await session.login(username, password, options);
    await sleep(3000);

    const logs = await session.action('DEPOSIT_FROM_JPBANK', {
      amount,
      PIN: authData[bankId].PIN
    });

    notificationSender(UID, 'deposit_requested_rakuten', {
      bankId,
      amount
    });

    ctx.body = { status: 'success', result: logs };
  } catch (e) {
    logError(e);
    errorController(ctx, 500, e.message);
  }
};

export default apiDepositRakuten;
