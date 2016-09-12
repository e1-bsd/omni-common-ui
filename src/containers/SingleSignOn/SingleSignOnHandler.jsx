import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as singleSignOnActions from './actions';
import userManager from './userManager';
import Config from 'domain/Config';
import log from 'loglevel';
import routes from './routes';
import is from 'is_js';

const MockSingleSignOnHandler = (props) => props.children;

MockSingleSignOnHandler.propTypes = {
  children: React.PropTypes.node,
};

class SingleSignOnHandler extends Component {
  componentDidMount() {
    const { user, storeTokenLifeTime } = this.props;
    if (! user || user.expired) {
      this._setLastUrlPath();
      log.debug('SingleSignOnHandler - User is not valid', user);
      log.debug('SingleSignOnHandler - lastUrlPath', localStorage.lastUrlPath);
      userManager.signinRedirect();
      return null;
    } else if (user && user.expires_in) {
      storeTokenLifeTime(Config.defaultTokenLifeTime);
    }
  }

  _setLastUrlPath() {
    if (location.pathname === routes.path) {
      log.debug(`SingleSignOnHandler - New lastUrlPath is ${routes.path}. Will not modify it.`);
      return;
    }

    localStorage.lastUrlPath = location.pathname + location.search;
  }

  render() {
    const { user, userInfo, isExpiring, resetUserExpiring } = this.props;

    if (user &&
        ! user.expired &&
        user.expires_in &&
        this.props.tokenLifeTime > - 1 &&
        this.props.tokenLifeTime !== user.expires_in &&
        user.expires_in !== 60) {
      log.debug('SingleSignOnHandler - User expires in…', user);
      const expiresAt = parseInt((new Date().getTime() / 1000) + this.props.tokenLifeTime, 10);
      user.expires_at = expiresAt;
      userManager._storeUser(user);
      userManager.events.load(user);
    }

    if (user &&
        ! user.expired &&
        is.object(userInfo) &&
        Object.keys(userInfo).length > 0) {
      log.debug('SingleSignOnHandler - User is valid', user);
      return this.props.children;
    } else if (isExpiring) {
      log.debug('SingleSignOnHandler - isExpiring', isExpiring);
      resetUserExpiring();
      userManager.signoutRedirect();
    }

    return null;
  }
}

SingleSignOnHandler.propTypes = {
  children: React.PropTypes.node,
  resetUserExpiring: React.PropTypes.func.isRequired,
  tokenLifeTime: React.PropTypes.number,
  isExpiring: React.PropTypes.bool,
  storeTokenLifeTime: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
  userInfo: React.PropTypes.object,
};

function mapStateToProps(state) {
  const user = state.get('singleSignOn').get('oidc').user;
  const tokenLifeTime = state.get('singleSignOn').get('tokenLifeTime');
  const isExpiring = state.get('singleSignOn').get('subscriptions').isExpiring;
  return { user, tokenLifeTime, isExpiring, userInfo: null };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(singleSignOnActions, dispatch);
}

export default Config.featureLogin !== true ?
    MockSingleSignOnHandler :
    connect(mapStateToProps, mapDispatchToProps)(SingleSignOnHandler);
