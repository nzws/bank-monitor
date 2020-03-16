const headers = async (ctx, next) => {
  if (process.env.NODE_ENV === 'development') {
    ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    ctx.set('Pragma', 'no-cache');
    ctx.set('Expires', 0);
  }

  ctx.set('X-Robots-Tag', 'noindex, nofollow');
  ctx.set('Server', 'neko');
  ctx.set('X-Frame-Options', 'DENY');
  ctx.set('Service-Worker-Allowed', '/');

  return next();
};

export default headers;
