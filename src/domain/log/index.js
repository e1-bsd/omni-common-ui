import buildLogToRaven from './buildLogToRaven';

class log {}
const methods = ['error', 'info', 'log', 'warn', 'debug'];

methods.forEach((method) => {
  log[method] = buildLogMethod(method); // eslint-disable-line no-param-reassign
});

function buildLogMethod(method) {
  if (! PRODUCTION) {
    /* eslint-disable no-console */
    return (console && console[method]) ?
        console[method] :
        () => {};
    /* eslint-enable no-console */
  }

  const logToRaven = buildLogToRaven(method);
  return (...args) => logToRaven(...args);
}

export default log;
