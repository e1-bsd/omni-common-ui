import React, { Component } from 'react';
import classnames from 'classnames';
import style from './style.postcss';
import UserInfo, { getImpersonate } from 'containers/UserInfo';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      impersonateData: getImpersonate(),
    };
  }

  componentWillReceiveProps() {
    this.setState({ impersonateData: getImpersonate() });
  }

  render() {
    return <div className={classnames(
        style.header,
        this.state.impersonateData ? style.impersonate : null)}>
      <div className={classnames(
          style.header_logo,
          this.state.impersonateData ? style.impersonate : null)} />
      <UserInfo />
    </div>;
  }
}

export default Header;
