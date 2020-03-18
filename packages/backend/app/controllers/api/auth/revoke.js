import Sequelize from 'sequelize';
import db from '../../../db';
import {
  FCMDeviceGroup,
  notificationSender
} from '../../../utils/notification';

const Op = Sequelize.Op;

const authRevoke = async ctx => {
  const UID = ctx.state.auth.UID;

  const tokens = await db.tables.Auth.findAll({
    where: {
      UID,
      deviceToken: {
        [Op.not]: null
      },
      token: {
        [Op.not]: ctx.state.auth.token
      },
      isDeleted: {
        [Op.is]: null
      }
    }
  }).map(v => v.deviceToken);
  await FCMDeviceGroup(UID, tokens, 'remove');

  if (!ctx.state.user.deviceToken) {
    await db.tables.FCMGroup.destroy({
      where: {
        UID
      }
    });
  }

  await db.tables.Auth.update(
    {
      isDeleted: new Date()
    },
    {
      where: {
        UID,
        token: {
          [Op.not]: ctx.state.auth.token
        },
        isDeleted: {
          [Op.is]: null
        }
      }
    }
  );

  notificationSender(UID, 'revoked', {
    ip: ctx.ip
  });

  ctx.body = { status: 'success' };
};

export default authRevoke;
