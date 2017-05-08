import buildLogToRaven from './buildLogToRaven';

const methods = ['error', 'info', 'log', 'warn', 'debug'];
const log = Object.freeze(methods.reduce((object, method) => {
  object[method] = buildLogMethod(method); // eslint-disable-line no-param-reassign
  return object;
}, {}));

function buildLogMethod(method) {
  if (! PRODUCTION) {
    return console[method]; // eslint-disable-line no-console
  }

  const logToRaven = buildLogToRaven(method);
  return (...args) => logToRaven(...args);
}

export default log;
