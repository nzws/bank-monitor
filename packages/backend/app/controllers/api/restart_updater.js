import db from '../../db';
import { errorController } from './common';
import updater from '../../utils/updater';

const apiRestartUpdater = async ctx => {
  const { bankId } = ctx.request.body;
  const UID = ctx.state.auth.UID;

  const status = await db.tables.Status.findOne({
    where: {
      UID,
      bankId
    }
  });
  if (!status) {
    return errorController(ctx, 404, 'This bank is not found.');
  }
  if (status.running) {
    return errorController(ctx, 400, 'This bank is already running.');
  }

  updater(UID, bankId);

  ctx.body = { status: 'success' };
};

export default apiRestartUpdater;
