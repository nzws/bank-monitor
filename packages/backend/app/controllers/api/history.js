import db from '../../db';

const apiHistory = async ctx => {
  const { request } = ctx;
  const { page, bankId } = request.body;
  const UID = ctx.state.auth.UID;

  const PAGE_NUM = 30;

  const where = { UID };
  if (bankId) {
    where.bankId = bankId;
  }

  const hist = await db.tables.History.findAll({
    limit: PAGE_NUM,
    offset: PAGE_NUM * (parseInt(page) || 0),
    order: [
      ['date', 'DESC'],
      ['id', 'DESC']
    ],
    where
  });

  ctx.body = { result: hist };
};

export default apiHistory;
