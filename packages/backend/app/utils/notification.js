import axios from 'axios';
import Sequelize from 'sequelize';
import db from '../db';
import { FCM_SERVER_KEY } from '../../config';
import { logError, logInfo } from './logger';
import { localeRunner } from './locale';
import locale from './messages';

const Op = Sequelize.Op;
const Auth = db.tables.Auth;

export const FCMDeviceGroup = async (UID, deviceToken, type) => {
  const hasSub = await db.tables.FCMGroup.findOne({
    where: {
      UID
    }
  });
  if (!hasSub && type === 'add') {
    type = 'create';
  }
  if (!hasSub && type === 'remove') {
    return;
  }

  const isOnce = typeof deviceToken === 'string';
  const msg = {
    operation: type,
    notification_key_name: UID,
    registration_ids: isOnce ? [deviceToken] : deviceToken
  };
  if (hasSub) {
    msg.notification_key = hasSub.token;
  }

  const result = await axios.post(
    'https://android.googleapis.com/gcm/notification',
    JSON.stringify(msg),
    {
      headers: {
        Authorization: `key=${FCM_SERVER_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (type === 'create' && result.data.notification_key) {
    return db.tables.FCMGroup.create({
      UID,
      token: result.data.notification_key
    });
  }

  if (type === 'remove') {
    await Auth.update(
      {
        deviceToken: null
      },
      {
        where: {
          deviceToken: isOnce
            ? deviceToken
            : {
                [Op.or]: deviceToken
              },
          UID
        }
      }
    );

    const hasSubscriber = await Auth.findOne({
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
    if (!hasSubscriber) {
      return db.tables.FCMGroup.destroy({
        where: {
          UID
        }
      });
    }
  }
};

const sendFCM = async (UID, type, options = {}) => {
  const sub = await db.tables.FCMGroup.findOne({
    where: {
      UID
    }
  });
  if (!sub) {
    return;
  }

  const msg = locale[type];
  const firebaseMessage = {
    to: sub.token,
    priority: 'high',
    notification: {
      title: localeRunner(msg.title, options),
      body: localeRunner(msg.body, options),
      // "icon": "fcm_" + notification_mode,
      color: '#ffffff'
    }
  };

  axios
    .post(
      'https://fcm.googleapis.com/fcm/send',
      JSON.stringify(firebaseMessage),
      {
        headers: {
          Authorization: `key=${FCM_SERVER_KEY}`,
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
