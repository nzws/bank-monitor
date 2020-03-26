import db from '../../db';
import { errorController } from './common';
import updater from '../../utils/updater';
import state from '../../utils/state';

const apiRestartUpdater = async ctx => {
  const { bankId } = ctx.request.body;
  const UID = ctx.state.auth.UID;

  if (!state.get(`${UID}_auth`)) {
    return errorController(
      ctx,
      503,
      'Please re-enter the encryption password.'
    );
  }

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

  updater(UID, bankId, true);

  ctx.body = { status: 'success' };
};

export default apiRestartUpdater;
