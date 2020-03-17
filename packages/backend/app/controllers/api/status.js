import db from '../../db';
import state from '../../utils/state';

const apiStatus = async ctx => {
  const UID = ctx.state.auth.UID;
  const authData = state.get(`${UID}_auth`);

  const status = await db.tables.Status.findAll({
    where: { UID }
  }).map(v => ({
    ...v.dataValues,
    display_name: authData[v.bankId].display_name
  }));

  ctx.body = { result: status };
};

export default apiStatus;
