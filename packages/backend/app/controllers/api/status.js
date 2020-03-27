import db from '../../db';
import state from '../../utils/state';

const apiStatus = async ctx => {
  const UID = ctx.state.auth.UID;
  const authData = state.get(`${UID}_auth`);

  if (!authData) {
    ctx.body = { result: [] };
    return;
  }

  const status = await db.tables.Status.findAll({
    where: { UID }
  }).map(v => {
    const bankData = authData[v.bankId];

    return {
      ...v.dataValues,
      display_name: bankData.display_name,
      bank: bankData.bank
    };
  });

  ctx.body = { result: status };
};

export default apiStatus;
