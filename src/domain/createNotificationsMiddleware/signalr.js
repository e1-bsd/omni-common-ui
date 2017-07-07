import { hubConnection } from 'signalr-no-jquery';
import log from 'domain/log';
import Store from 'domain/Store';
import Strategy from './strategy';

export class SignalRStrategy extends Strategy {
  constructor(config) {
    super(config);
    const user = Store.get().getState().get('singleSignOn').user || {};
    const { access_token: accessToken } = user;
    const hubUrl = config.hubUrl.replace('{token}', accessToken);
    this.connection = hubConnection(hubUrl, config.options);
    this.hubProxy = this.connection.createHubProxy(config.hubName);
    this.hubProxy.on('message', () => {
      this.emit('notification');
    });
    this.connection.start()
    .done(() => {
      log.info('SignalRStrategy: Connected to hub; waiting for notifications');
    }).fail(() => {
      log.warn('SignalRStrategy: Unable to connect to the hub!');
    });
  }
}

export default SignalRStrategy;
