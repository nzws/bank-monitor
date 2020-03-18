import Sequelize from 'sequelize';
import db from '../../../db';
import { notificationSender } from '../../../utils/notification';

const Op = Sequelize.Op;

const authRevoke = async ctx => {
  const UID = ctx.state.auth.UID;

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
