import axios from 'axios';
import Sequelize from 'sequelize';
import db from '../db';
import { logError, logInfo } from './logger';
import { localeRunner } from './locale';
import locale from './messages';

const Op = Sequelize.Op;
const Auth = db.tables.Auth;

const sendFCM = async (UID, type, options = {}) => {
  const sub = await db.tables.Auth.findAll({
    where: {
      UID,
      deviceToken: {
        [Op.not]: null
      },
      isDeleted: {
        [Op.is]: null
      }
    }
  });
  if (!sub[0]) {
    return;
  }

  const msg = locale[type];
  const firebaseMessage = {
    to: sub.map(v => v.deviceToken),
    priority: 'high',
    title: localeRunner(msg.title, options),
    body: localeRunner(msg.body, options)
  };

  axios
    .post(
      'https://exp.host/--/api/v2/push/send',
      JSON.stringify(firebaseMessage),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(({ data, status }) => {
      logInfo('[FCM]', status, data);

      if (data.failure !== 0) {
        Auth.update(
          { deviceToken: null },
          { where: { token: { [Op.or]: data.failed_registration_ids } } }
        );
      }
    })
    .catch(error => {
      logError('[FCM ERR]', error.response.status, error.response.data);
    });
};

export const notificationSender = async (
  UID,
  type,
  options = {},
  sendTo = 'all'
) => {
  if (sendTo === 'all' || sendTo === 'push') {
    sendFCM(UID, type, options);
  }

  if (sendTo === 'all' || sendTo === 'notification') {
    db.tables.Notification.create({
      UID,
      type,
      data: options
    });
  }
};
