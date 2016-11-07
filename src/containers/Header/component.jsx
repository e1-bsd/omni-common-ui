import React, { Component } from 'react';
import classnames from 'classnames';
import style from './style.postcss';
import { actions as impersonateActions } from 'containers/Impersonate';
import UserInfo from './UserInfo';
import log from 'loglevel';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      impersonateData: impersonateActions.getImpersonate(),
    };
  }

  componentWillReceiveProps() {
    this.setState({ impersonateData: impersonateActions.getImpersonate() });
  }

  render() {
    log.debug('Header - impersonateData', this.state.impersonateData);
    return <div className={classnames(style.header,
        { [style.impersonate]: this.state.impersonateData })}>
      <div className={classnames(style.header_logo,
          { [style.impersonate]: this.state.impersonateData })} />
      <UserInfo />
    </div>;
  }
}

export default Header;
