import puppeteer from 'puppeteer';
import bankJs from '@nzws/bank-js';
import { errorController } from './common';
import state from '../../utils/state';
import { notificationSender } from '../../utils/notification';
import { logError } from '../../utils/logger';
import { currencyToString } from '../../utils/currency';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const apiDepositRakuten = async ctx => {
  const { bankId, amount } = ctx.request.body;
  const UID = ctx.state.auth.UID;

  const authData = state.get(`${UID}_auth`);
  if (!authData || !authData[bankId]) {
    return errorController(ctx, 404, 'This bank is not found');
  }

  const { bank, username, password, options } = authData[bankId];

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

  (async () => {
    try {
      await session.init(browser);
      await session.login(username, password, options);
      await sleep(3000);

      const e = await session.action('DEPOSIT_FROM_JPBANK', {
        amount,
        PIN: authData[bankId].PIN
      });

      const date = new Date(e.schedule).toLocaleDateString(null, {
        month: 'long',
        day: 'numeric'
      });

      await notificationSender(UID, 'deposit_requested_rakuten', {
        bankId,
        amount: currencyToString(e.amount),
        fee: currencyToString(e.fee),
        schedule: date
      });
    } catch (e) {
      logError(e);

      await notificationSender(UID, 'deposit_requested_rakuten_failed', {
        bankId,
        message: e.message
      });
    } finally {
      await session.close();
      await browser.close();
    }
  })();

  ctx.body = { status: 'success' };
};

export default apiDepositRakuten;
