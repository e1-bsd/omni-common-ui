import invariant from 'invariant';
import Strategy from './strategy';
// import signalr from 'signalr-no-jquery';
// import Store from 'domain/Store';

// const user = Store.get().getState().get('singleSignOn').user || {};
// const { access_token: accessToken } = user;

export class SignalRStrategy extends Strategy {
  constructor(config) {
    super(config);
    invariant(false, 'NOT IMPLEMENTED');
  }
}

export default SignalRStrategy;
