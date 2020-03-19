import bankJs from '@nzws/bank-js';
import db from '../db';
import state from './state';
import { logError, logWarn } from './logger';
import { notificationSender } from './notification';
import { currencyToString } from './currency';

const objToUniqueStr = (name, amount, balance, date) =>
  name + amount + balance + new Date(date).toLocaleString();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const updater = async (UID, bankId) => {
  const authData = state.get(`${UID}_auth`);
  if (!authData || !authData[bankId]) {
    logError(`UID: ${UID} auth data is not found`);
    return;
  }

  const status = await db.tables.Status.findOne({
    where: {
      UID,
      bankId
    }
  });
  if (status && status.running) {
    logWarn('This bank is already running.');
    return;
  }

  const update = {
    running: true,
    lastUpdatedAt: new Date()
  };
  if (status) {
    await db.tables.Status.update(update, {
      where: {
        UID,
        bankId
      }
    });
  } else {
    await db.tables.Status.create({
      ...update,
      UID,
      bankId,
      balance: 0
    });
  }

  try {
    let session = state.get(`${UID}_${bankId}_page`);
    if (!session) {
      const { bank, username, password, options } = authData[bankId];

      const b = new bankJs(bank);
      await b.init(state.get('browser'));
      await b.login(username, password, options);
      state.set(`${UID}_${bankId}_page`, b);
      session = b;

      await sleep(3000);
    }

    const log = await session.getLogs();
    setTimeout(() => updater(UID, bankId), 1000 * 60 * 40);
    await db.tables.Status.update(
      {
        balance: parseInt(log[0].balance)
      },
      {
        where: {
          UID,
          bankId
        }
      }
    );

    // 比較用ハッシュの配列
    let oldHash = state.get(`${UID}_${bankId}_hash`);
    if (!oldHash) {
      const hist = (
        await db.tables.History.findAll({
          limit: 100,
          order: [
            ['date', 'DESC'],
            ['createdAt', 'DESC']
          ],
          where: {
            UID,
            bankId
          }
        })
      ).map(v => objToUniqueStr(v.name, v.amount, v.balance, v.date));
      state.set(`${UID}_${bankId}_hash`, hist);
      oldHash = hist;
    }

    // 比較、"新鮮なデータ"がハッシュ一覧になかった場合差分として抽出
    const newLogs = log
      .filter(
        v =>
          oldHash.indexOf(
            objToUniqueStr(
              v.name,
              v.amount * (v.type === 'withdrawal' ? -1 : 1),
              v.balance,
              v.date
            )
          ) === -1
      )
      .map(v => ({
        UID,
        bankId,
        name: v.name,
        balance: v.balance,
        date: v.date,
        amount: v.amount * (v.type === 'withdrawal' ? -1 : 1)
      }));
    if (!newLogs[0]) {
      return;
    }

    // ハッシュ更新
    oldHash.push(
      ...newLogs.map(v => objToUniqueStr(v.name, v.amount, v.balance, v.date))
    );
    state.set(`${UID}_${bankId}_hash`, oldHash);

    // bank-jsから降ってくるデータのソートは 新しい→古い なので 古い→新しい にする
    // * 古い履歴から順番にDBに積まないといけないため
    newLogs.reverse();

    // データ作成
    db.tables.History.bulkCreate(newLogs);

    // プッシュ通知
    (async () => {
      for (const v of newLogs) {
        await notificationSender(
          UID,
          'newDeal',
          {
            bankId,
            name: v.name,
            amount: currencyToString(v.amount),
            balance: currencyToString(v.balance)
          },
          'push'
        );
      }
    })();
  } catch (e) {
    logError(e);
    db.tables.Status.update(
      {
        running: false,
        lastUpdatedAt: new Date()
      },
      {
        where: {
          UID,
          bankId
        }
      }
    );
    notificationSender(UID, 'updateError', {
      bankId,
      message: e.message
    });
  }
};

export default updater;
