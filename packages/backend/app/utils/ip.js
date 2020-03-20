const getIP = ctx =>
  ctx.request?.header['x-real-ip'] || ctx.request?.ip || ctx.ip;

export default getIP;
