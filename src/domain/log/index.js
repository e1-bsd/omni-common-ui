import Raven from 'raven-js';

const methods = ['error', 'info', 'log', 'warn', 'debug'];
const log = Object.freeze(methods.reduce((object, method) => {
  object[method] = buildLogMethod(method); // eslint-disable-line no-param-reassign
  return object;
}, {}));

function buildLogMethod(method) {
  const logToRaven = buildLogToRaven(method);
  if ((! PRODUCTION || method === 'error') && console && console[method]) { // eslint-disable-line no-console
    return (...args) => {
      logToRaven(...args);
      console[method](...args); // eslint-disable-line no-console
    };
  }

  return (...args) => logToRaven(...args);
}

function buildLogToRaven(level) {
  if (level === 'error') {
    return (message) => {
      if (message instanceof Error) {
        Raven.captureException(message, { level });
      } else {
        Raven.captureMessage(message, { level });
      }
    };
  }

  return (message) => Raven.captureBreadcrumb({ message, level: level === 'warn' ? level : 'info' });
}

export default log;
