import styles from './style.postcss';

import React, { Component } from 'react';
import connect from 'domain/connect';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import Impersonate from 'containers/Impersonate';
import userManager from 'containers/SingleSignOn/userManager';
import is from 'is_js';
import Config from 'domain/Config';
import StudentPicture from 'components/StudentPicture';
import testClass from 'domain/testClass';
import DropdownBox from 'components/DropdownBox';
import PrivilegeChecker from 'domain/PrivilegeChecker';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isShowImpersonate: false,
    };
  }

  _onLogoutButtonClicked() {
    event.preventDefault();
    userManager.signoutRedirect();
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
    this.props.unimpersonate();
    this.props.removeImpersonate();
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

  _handleImpersonateSuccess(data) {
    this.props.setImpersonate(data);
    this._redirectToPortal();
  }

  _renderImpersonateDialog() {
    if (! this.state.isShowImpersonate) {
      return null;
    }

    return <Dialog isOpen={this.state.isShowImpersonate}>
      <Impersonate close={() => this._closeImpersonateDialog()}
          success={(data) => this._handleImpersonateSuccess(data)} />
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
    if (this.state.isDropdownOpen !== true) {
      return null;
    }

    return <DropdownBox className={styles.UserInfo_features}>
      {this._renderImpersonateOption()}
      <DropdownBox.Item onClick={this._onLogoutButtonClicked}>Log Out</DropdownBox.Item>
    </DropdownBox>;
  }

  _renderUser() {
    return <StudentPicture className={styles.UserInfo_container_user_img}
        src={this.props.user.profile.avatar_url}
        gender={this.props.user.profile.gender} />;
  }

  _renderImpersonatedUser() {
    if (! this.props.impersonate) {
      return null;
    }

    return <StudentPicture src={this.props.impersonate.avatarUrl}
        className={classnames(styles.UserInfo_container_user_img, styles.__impersonated)}
        gender={this.props.impersonate.gender} />;
  }

  render() {
    /* eslint no-return-assign: "off" */
    const { privileges, unimpersonateState } = this.props;
    const errorCode = unimpersonateState ? unimpersonateState.get('error') : undefined;
    const data = unimpersonateState ? unimpersonateState.get('data') : undefined;

    if (errorCode || data) {
      this._redirectToPortal();
    }

    if (is.not.object(this.props.user) || ! privileges) {
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
        <div className={classnames(styles.UserInfo_container_expand)} />
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
  setImpersonate: React.PropTypes.func.isRequired,
  removeImpersonate: React.PropTypes.func.isRequired,
  unimpersonate: React.PropTypes.func,
  impersonate: React.PropTypes.object,
  privileges: React.PropTypes.object,
  unimpersonateState: React.PropTypes.object,
  user: React.PropTypes.object,
  canImpersonate: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    privileges: state.get('privileges').items,
    user: state.get('singleSignOn').user,
    canImpersonate: PrivilegeChecker.hasPrivilege(state, Config.get('impersonatePermission')),
    unimpersonateState: state.get('impersonate')
      .get('unimpersonate')
      .get('unimpersonate'),
  };
}

export default connect(mapStateToProps)(UserInfo);
