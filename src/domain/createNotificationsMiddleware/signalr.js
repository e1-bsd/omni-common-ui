import is from 'is_js';
import invariant from 'invariant';
import { hubConnection } from 'signalr-no-jquery';
import log from 'domain/log';
import Strategy from './strategy';

const _log = (line, method = 'info') => {
  log[method](`SignalRStrategy: ${line}`);
};

export class SignalRStrategy extends Strategy {
  constructor(config, accessToken) {
    super(config);

    invariant(is.string(config.hubUrl), 'hubUrl must be a string in config');
    invariant(is.string(config.hubName), 'hubName must be a string in config');
    invariant(is.string(config.incomingMethodName), 'incomingMethodName must be a string in config');

    const hubUrl = config.hubUrl.replace('{token}', accessToken);

    this.connection = hubConnection(hubUrl, {
      qs: { bearer_token: accessToken },
    });

    this.hubProxy = this.connection.createHubProxy(config.hubName);
    this.hubProxy.on(config.incomingMethodName, () => {
      _log('Push notification received.');
      this.emit('notification');
    });

    this.connection.start()
    .done(() => {
      _log('Connected to hub; waiting for notifications.');
    }).fail(() => {
      _log('Unable to connect to the hub!', 'warn');
    });
  }
}

export default SignalRStrategy;
