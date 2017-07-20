import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import Raven from 'raven-js';
import { actions as privilegesActions } from 'containers/Privileges';
import log from 'domain/log';
import routes from './routes';
import Config from 'domain/Config';

const MockSingleSignOnHandler = (props) => props.children;

MockSingleSignOnHandler.propTypes = {
  children: PropTypes.node,
};

class SingleSignOnHandlerImpl extends PureComponent {
  componentWillMount() {
    this._setLastUrlPath();
  }

  componentDidMount() {
    this._checkUserAndPrivileges(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._checkUserAndPrivileges(nextProps);
  }

  _checkUserAndPrivileges(props) {
    if (! this._isUserValid(props)) return;
    this._logUser(props);
    log.debug('SingleSignOnHandler - Will call fetchPrivilegesIfNeeded()');
    props.fetchPrivilegesIfNeeded();
  }

  _logUser(props = this.props) {
    if (! props.user) {
      return;
    }

    const profile = props.user.get('profile');
    const userId = profile.sub;
    const email = profile.email;

    ReactGA.set({ userId });
    Raven.setUserContext({ email, id: userId });
  }

  _setLastUrlPath() {
    if (location.pathname === routes.path) {
      log.debug(`SingleSignOnHandler - New lastUrlPath is ${routes.path}. Will not modify it.`);
      return;
    }

    sessionStorage.lastUrlPath = location.pathname + location.search;
  }

  _isUserValid(props = this.props) {
    const { user } = props;
    return user && ! user.expired;
  }

  render() {
    const { isLoadingUser } = this.props;
    if (isLoadingUser || ! this._isUserValid()) return null;
    return this.props.children;
  }
}

SingleSignOnHandlerImpl.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  isLoadingUser: PropTypes.bool,
  fetchPrivilegesIfNeeded: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const user = state.get('singleSignOn').get('user');
  const isLoadingUser = state.get('singleSignOn').get('isLoadingUser');
  return { user, isLoadingUser };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(privilegesActions, dispatch);
}

export const SingleSignOnHandler = Config.get('featureLogin') !== true ?
    MockSingleSignOnHandler :
    SingleSignOnHandlerImpl;

export default connect(mapStateToProps, mapDispatchToProps)(SingleSignOnHandler);
