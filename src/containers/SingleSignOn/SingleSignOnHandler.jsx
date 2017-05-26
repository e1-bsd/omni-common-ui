import PureComponent from 'domain/PureComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as privilegesActions } from 'containers/Privileges';
import log from 'domain/log';
import routes from './routes';
import userManager from './userManager';
import Config from 'domain/Config';
import ReactGA from 'react-ga';
import Raven from 'raven-js';
import PropTypes from 'prop-types';

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
    if (! this._isUserValid()) {
      return userManager.signinRedirectWithValidation();
    }

    this._logUser(props);
    log.debug('SingleSignOnHandler - Will call fetchPrivilegesIfNeeded()');
    props.fetchPrivilegesIfNeeded();
  }

  _logUser(props) {
    if (! props.user) {
      return;
    }

    const user = props.user.profile;
    const userId = user.sub;
    const { email } = user;

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

  _isUserValid() {
    const { user } = this.props;
    return user && ! user.expired;
  }

  render() {
    if (this._isUserValid()) {
      log.debug('SingleSignOnHandler - User is valid', this.props.user);
      return this.props.children;
    }

    return null;
  }
}

SingleSignOnHandlerImpl.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  fetchPrivilegesIfNeeded: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const user = state.get('singleSignOn').user;
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(privilegesActions, dispatch);
}

export const SingleSignOnHandler = Config.get('featureLogin') !== true ?
    MockSingleSignOnHandler :
    SingleSignOnHandlerImpl;

export default connect(mapStateToProps, mapDispatchToProps)(SingleSignOnHandler);
