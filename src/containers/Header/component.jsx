import React from 'react';
import classnames from 'classnames';
import style from './style.postcss';
import { actions as impersonateActions } from 'containers/Impersonate';
import UserInfo from './UserInfo';
import log from 'loglevel';
import { connect } from 'domain/connect';

const Header = (props) => {
  log.debug('Header - impersonateData', props.impersonate);
  return <div className={classnames(style.header,
      { [style.impersonate]: props.impersonate })}>
    <div className={classnames(style.header_logo,
        { [style.impersonate]: props.impersonate })} />
    <UserInfo />
  </div>;
};

Header.propTypes = {
  impersonate: React.PropTypes.object,
};

function mapStateToProps() {
  return { impersonate: impersonateActions.getImpersonate() };
}

export default connect(mapStateToProps)(Header);
