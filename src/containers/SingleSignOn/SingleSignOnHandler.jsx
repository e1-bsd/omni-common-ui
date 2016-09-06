import React, { Component } from 'react';
import { connect } from 'domain/connect';
import { bindActionCreators } from 'redux';
import * as singleSignOnActions from './actions';
import userManager from './userManager';
import Config from 'domain/Config';

const MockSingleSignOnHandler = (props) => props.children;

MockSingleSignOnHandler.propTypes = {
  children: React.PropTypes.node,
};

class SingleSignOnHandler extends Component {
  componentWillMount() {
    const { user, storeTokenLifeTime } = this.props;
    if (! user || user.expired) {
      localStorage.lastUrlPath = location.pathname + location.search;
      userManager.signinRedirect();
      return null;
    }

    if (user && user.expires_in) {
      storeTokenLifeTime(Config.defaultTokenLifeTime);
    }
  }

  render() {
    const { user, isExpiring, resetUserExpiring } = this.props;

    if (user && ! user.expired) {
      if (user.expires_in &&
          this.props.tokenLifeTime > - 1 &&
          this.props.tokenLifeTime !== user.expires_in &&
          user.expires_in !== 60) {
        const expiresAt = parseInt((new Date().getTime() / 1000) + this.props.tokenLifeTime, 10);
        user.expires_at = expiresAt;
        userManager._storeUser(user);
        userManager.events.load(user);
      }

      return this.props.children;
    }

    if (isExpiring) {
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
};

function mapStateToProps(state) {
  const user = state.get('singleSignOn').get('oidc').user;
  const tokenLifeTime = state.get('singleSignOn').get('tokenLifeTime');
  const isExpiring = state.get('singleSignOn').get('subscriptions').isExpiring;
  return { user, tokenLifeTime, isExpiring };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(singleSignOnActions, dispatch);
}

export default Config.featureLogin !== true ?
    MockSingleSignOnHandler :
    connect(mapStateToProps, mapDispatchToProps)(SingleSignOnHandler);
