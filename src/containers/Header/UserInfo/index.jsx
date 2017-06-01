import styles from './style.postcss';

import React, { PureComponent } from 'react';
import connect from 'domain/connect';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import Impersonate, { actions as impersonateActions } from 'containers/Impersonate';
import userManager from 'containers/SingleSignOn/userManager';
import is from 'is_js';
import alertifyjs from 'alertifyjs';
import Config from 'domain/Config';
import AdultPicture from 'components/AdultPicture';
import testClass from 'domain/testClass';
import DropdownBox from 'components/DropdownBox';
import PrivilegeChecker from 'domain/PrivilegeChecker';
import { bindActionCreators } from 'redux';
import { actions as privilegesActions } from 'containers/Privileges';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';

require('alertifyjs/build/css/alertify.css');

const LOGOUT_POPUP_TITLE =
    'Log out';
const LOGOUT_POPUP_MSG =
    'Are you sure you want to leave this page and lose unsaved changes?';

class UserInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isShowImpersonate: false,
    };
    this._checkImpersonation(this.props);
  }

  componentWillReceiveProps(props) {
    this._checkImpersonation(props);

    if (props.hasImpersonateFailed) {
      this.setState({ isShowImpersonate: false });
    }
  }

  _checkImpersonation(props) {
    if (props.hasUnimpersonated) {
      this._redirectToPortal();
    }
  }

  _onLogoutButtonClicked() {
    event.preventDefault();
    alertifyjs.confirm()
    .setting({
      movable: false,
      transition: 'fade',
      labels: {
        ok: 'Leave',
        cancel: 'Stay',
      },
      message: LOGOUT_POPUP_MSG,
      title: LOGOUT_POPUP_TITLE,
      onok: () => {
        // don't show the unsaved changes warning
        if (this.props.router) {
          this.props.router.setRouteLeaveHook(this._getCurrentRoute(), null);
        }
        userManager.forceSignoutRedirect();
      },
    }).show();
  }

  _getCurrentRoute() {
    return this.props.routes[this.props.routes.length - 1];
  }

  _redirectToPortal() {
    const url = Config.get('afterImpersonationRedirectTo');
    if (is.url(url)) {
      window.location = url;
    } else {
      window.location.reload();
    }
  }

  _onSwitchBackClicked() {
    this.props.postImpersonate(undefined, this.props.token);
    this.setState({ impersonateData: undefined });
  }

  _toggleDropdown(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ isDropdownOpen: ! this.state.isDropdownOpen });
  }

  _showImpersonateDialog() {
    this.setState({ isShowImpersonate: true, isDropdownOpen: false });
  }

  _closeImpersonateDialog() {
    this.setState({ isShowImpersonate: false });
  }

  _handleImpersonateSuccess() {
    this._redirectToPortal();
  }

  _renderImpersonateDialog() {
    if (! this.state.isShowImpersonate) {
      return null;
    }

    return <Dialog isOpen={this.state.isShowImpersonate} className={testClass('impersonate-dialog')}>
      <Impersonate close={() => this._closeImpersonateDialog()}
          success={() => this._handleImpersonateSuccess()} />
    </Dialog>;
  }

  _renderImpersonateOption() {
    const { canImpersonate } = this.props;
    if (this.props.impersonate) {
      return <DropdownBox.Item className={testClass('header-user-dropdown-switch-back')}
          onClick={() => this._onSwitchBackClicked()}>
        Switch Back
      </DropdownBox.Item>;
    }

    return <DropdownBox.Item className={testClass('header-user-dropdown-switch-user')}
        onClick={() => this._showImpersonateDialog()}
        show={canImpersonate}>
      Switch User
    </DropdownBox.Item>;
  }

  _renderDropdown() {
    return <DropdownBox className={styles.UserInfo_features} open={this.state.isDropdownOpen}>
      {this._renderImpersonateOption()}
      <DropdownBox.Item onClick={() => this._onLogoutButtonClicked()}>Log Out</DropdownBox.Item>
    </DropdownBox>;
  }

  _renderUser() {
    const classes = classnames(styles.UserInfo_container_user_img, testClass('user-picture'));
    return <AdultPicture className={classes}
        src={this.props.user.profile.avatar_url}
        gender={this.props.user.profile.gender}
        userFirstName={this.props.user.profile.given_name}
        userLastName={this.props.user.profile.family_name}
        displayUserInitialsAsDefaultAvatar />;
  }

  _renderImpersonatedUser() {
    if (! this.props.impersonate) {
      return null;
    }

    const classes = classnames(styles.UserInfo_container_user_img,
        styles.__impersonated,
        testClass('impersonated-user-picture'));
    return <AdultPicture src={this.props.impersonate.avatarUrl}
        className={classes}
        gender={this.props.impersonate.gender}
        userFirstName={this.props.impersonate.givenName}
        userLastName={this.props.impersonate.familyName}
        displayUserInitialsAsDefaultAvatar />;
  }

  render() {
    const { havePrivilegesLoaded } = this.props;
    if (! havePrivilegesLoaded()) {
      return null;
    }

    const classes = classnames(styles.UserInfo, {
      [styles.__impersonating]: this.props.impersonate,
      [styles.__open]: this.state.isDropdownOpen,
    });

    return <DropdownBox.Container className={classes}
        onClickOutside={() => this.setState({ isDropdownOpen: false })}>
      <div className={classnames(styles.UserInfo_container, testClass('header-user-dropdown'))}
          onClick={(e) => this._toggleDropdown(e)}>
        <div className={classnames(styles.UserInfo_container_expand)}>
          <Icon id="chevron-small-down" />
        </div>
        <div className={classnames(styles.UserInfo_container_user)}>
          {this._renderUser()}
          {this._renderImpersonatedUser()}
        </div>
      </div>
      {this._renderDropdown()}
      {this._renderImpersonateDialog()}
    </DropdownBox.Container>;
  }
}

UserInfo.propTypes = {
  router: PropTypes.any.isRequired,
  routes: PropTypes.array.isRequired,
  havePrivilegesLoaded: PropTypes.func.isRequired,
  postImpersonate: PropTypes.func,
  token: PropTypes.string,
  impersonate: PropTypes.object,
  privileges: PropTypes.object,
  hasUnimpersonated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  canImpersonate: PropTypes.bool,
  hasImpersonateFailed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const postedImpersonate = state.get('impersonate').get('postedImpersonate').get('impersonate');
  return {
    arePrivilegesLoaded: state.get('privileges').items,
    user: state.get('singleSignOn').user,
    canImpersonate: PrivilegeChecker.hasPrivilege(state, Config.get('impersonatePermission')),
    hasUnimpersonated: !! (postedImpersonate && (postedImpersonate.get('error') || postedImpersonate.get('data'))),
    hasImpersonateFailed: !! (postedImpersonate && postedImpersonate.get('error')),
    token: state.get('singleSignOn').user.id_token,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(privilegesActions, dispatch),
    bindActionCreators(impersonateActions, dispatch)
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
