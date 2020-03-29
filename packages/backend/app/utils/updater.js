import bankJs from '@nzws/bank-js';
import puppeteer from 'puppeteer';
import db from '../db';
import state from './state';
import { logError, logWarn } from './logger';
import { notificationSender } from './notification';
import { currencyToString } from './currency';

const objToUniqueStr = (name, amount, balance, date, optionData) => {
  if (optionData.type === 'debit' && optionData.transactionNo) {
    name = optionData.transactionNo;
  }

  return [name, amount, balance, new Date(date).toLocaleString()].join('/');
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const updater = async (UID, bankId, isFirst = false) => {
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
  if (status && status.running && isFirst === true) {
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

  try {
    await session.init(browser);
    await session.login(username, password, options);
    await sleep(3000);

    const log = (await session.getLogs()).map(v => ({
      ...v,
      data: v.addData
    }));
    setTimeout(() => updater(UID, bankId, false), 1000 * 60 * 30);
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
      const hist = {};
      (
        await db.tables.History.findAll({
          limit: 100,
          order: [['id', 'DESC']],
          where: {
            UID,
            bankId
          }
        })
      ).forEach(v => {
        const key = objToUniqueStr(v.name, v.amount, v.balance, v.date, v.data);
        hist[key] = v.dataValues;
      });
      state.set(`${UID}_${bankId}_hash`, hist);
      oldHash = hist;
    }

    // 比較、"新鮮なデータ"がハッシュ一覧になかった場合差分として抽出
    const newLogs = log
      .filter(
        v =>
          Object.keys(oldHash).indexOf(
            objToUniqueStr(
              v.name,
              v.amount * (v.type === 'withdrawal' ? -1 : 1),
              v.balance,
              v.date,
              v.data
            )
          ) === -1
      )
      .map(v => ({
        UID,
        bankId,
        name: v.name,
        balance: v.balance,
        date: v.date,
        amount: v.amount * (v.type === 'withdrawal' ? -1 : 1),
        data: v.data || {}
      }));

    // デビットの場合、取引名=承認番号であるが、
    // 電文が銀行に届いてマーチャント名が更新されている可能性があるため、
    // 同じ取引番号&金額でマーチャント名が異なる場合、更新を行う
    const updatedMerchant = log.filter(v => {
      const hashId = objToUniqueStr(
        v.name,
        v.amount * (v.type === 'withdrawal' ? -1 : 1),
        v.balance,
        v.date,
        v.data
      );
      if (
        Object.keys(oldHash).indexOf(hashId) === -1 ||
        v?.data?.type !== 'debit'
      ) {
        return false;
      }

      return oldHash[hashId]?.data?.merchant !== v?.data?.merchant;
    });

    if (updatedMerchant[0]) {
      updatedMerchant.forEach(v => {
        const key = objToUniqueStr(
          v.name,
          v.amount * (v.type === 'withdrawal' ? -1 : 1),
          v.balance,
          v.date,
          v.data
        );
        oldHash[key] = v;
      });
      state.set(`${UID}_${bankId}_hash`, oldHash);

      for (const d of updatedMerchant) {
        await db.tables.History.update(
          {
            name: d.name,
            data: d.data
          },
          {
            where: {
              UID,
              bankId,
              balance: d.balance,
              date: d.date,
              amount: d.amount * (d.type === 'withdrawal' ? -1 : 1),
              'data.transactionNo': d.data.transactionNo
            }
          }
        );

        await notificationSender(
          UID,
          'merchant_updated',
          {
            bankId,
            name: d.name,
            amount: currencyToString(d.amount),
            balance: currencyToString(d.balance)
          },
          'notification'
        );
      }
    }

    if (!newLogs[0]) {
      return;
    }

    // ハッシュ更新
    newLogs.forEach(v => {
      const key = objToUniqueStr(v.name, v.amount, v.balance, v.date, v.data);
      oldHash[key] = v;
    });
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
  } finally {
    await session.close();
    await browser.close();
  }
};

export default updater;
