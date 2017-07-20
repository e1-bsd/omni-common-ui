import { PureComponent } from 'react';
import Timer from './Timer';
import { createUserManager } from 'data/SingleSignOn';
import log from 'domain/log';
import Config from 'domain/Config';
import is from 'is_js';
import PropTypes from 'prop-types';

export default class IdleTimeoutHandler extends PureComponent {
  componentWillMount() {
    if (is.not.number(Config.get('autoSignOutTimeout'))) {
      return false;
    }

    this.timer = new Timer();

    this._signOut = this._signOut.bind(this);
    this._invokeIdleTimer = this._invokeIdleTimer.bind(this);

    this._invokeIdleTimer();
    window.document.addEventListener('click', this._invokeIdleTimer);
    window.document.addEventListener('keypress', this._invokeIdleTimer);
  }

  componentWillUnmount() {
    if (is.not.number(Config.get('autoSignOutTimeout'))) {
      return false;
    }

    this.timer.cancel();
    window.document.removeEventListener('click', this._invokeIdleTimer);
    window.document.removeEventListener('keypress', this._invokeIdleTimer);
  }

  _invokeIdleTimer() {
    log.debug('IdleTimeoutHandler - Will start a new timer');
    this.timer.invoke(this._signOut, Config.get('autoSignOutTimeout') * 1000);
  }

  _signOut() {
    log.debug('IdleTimeoutHandler - Will sign out!');
    // SignOut should not be with the route hook.
    if (this.props.router) {
      this.props.router.setRouteLeaveHook(this._getCurrentRoute(), null);
    }
    createUserManager().forceSignOutRedirect();
  }

  _getCurrentRoute() {
    return this.props.routes[this.props.routes.length - 1];
  }

  render() {
    return this.props.children;
  }
}

IdleTimeoutHandler.propTypes = {
  children: PropTypes.node,
  router: PropTypes.any.isRequired,
  routes: PropTypes.array.isRequired,
};
