import { notificationSender } from '../../utils/notification';

const apiPing = async ctx => {
  const { message } = ctx.request.body;
  const UID = ctx.state.auth.UID;

  await notificationSender(
    UID,
    'ping',
    {
      message: message || 'Pong!'
    },
    'push'
  );

  ctx.body = { status: 'success' };
};

export default apiPing;
