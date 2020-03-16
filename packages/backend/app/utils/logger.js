import kleur from 'kleur';

export const logInfo = (...args) =>
  console.log(kleur.blue('[log]'), `PID:${process.pid}`, ...args);
export const logWarn = (...args) =>
  console.warn(kleur.yellow('[WARN]'), `PID:${process.pid}`, ...args);
export const logError = (...args) =>
  console.error(kleur.red('[ERR]'), `PID:${process.pid}`, ...args);
export const logDebug = (...args) =>
  process.env.NODE_ENV === 'development' ? logInfo(...args) : undefined;
