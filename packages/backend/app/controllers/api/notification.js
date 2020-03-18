import db from '../../db';

const apiNotification = async ctx => {
  const { request } = ctx;
  const { page } = request.body;
  const UID = ctx.state.auth.UID;
  const PAGE_NUM = 30;

  const noti = await db.tables.Notification.findAll({
    limit: PAGE_NUM,
    offset: PAGE_NUM * (page || 0),
    order: [['createdAt', 'DESC']],
    where: { UID }
  });

  ctx.body = { result: noti };
};

export default apiNotification;
