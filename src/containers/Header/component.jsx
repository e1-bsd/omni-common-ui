import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import styles from './style.postcss';
import log from 'domain/log';
import { connect } from 'domain/connect';
import Icon from 'components/Icon';
import is from 'is_js';
import Config from 'domain/Config';
import testClass from 'domain/testClass';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import NotificationsTray from './NotificationsTray';

const Header = (props) => {
  log.debug('Header - impersonateData', props.impersonate);
  const classes = classnames(styles.Header,
      testClass('header'),
      { [styles.__impersonating]: props.impersonate });
  return <div className={classes}>
    <div className={classnames(styles.Header_burger, testClass('hamburger'))}
        onClick={(e) => is.function(props.onHamburgerClick) && props.onHamburgerClick(e)}>
      <Icon id="burger" />
    </div>
    <div className={styles.Header_logo} />
    <div className={styles.Header_wrap}>
      {Config.get('notificationsTray') && ! props.impersonate ?
        <NotificationsTray /> :
        null}
      <UserInfo impersonate={props.impersonate}
          router={props.router}
          routes={props.routes} />
    </div>
  </div>;
};

Header.propTypes = {
  router: PropTypes.any.isRequired,
  routes: PropTypes.array.isRequired,
  impersonate: PropTypes.object,
  onHamburgerClick: PropTypes.func,
};

function mapStateToProps(state) {
  const userProfile =
      state.get('singleSignOn').get('user') &&
      state.get('singleSignOn').get('user').get('profile');
  let impersonate;
  if (! userProfile.impersonated_user_email) return { impersonate };

  impersonate = {
    email: userProfile.impersonated_user_email,
    sub: userProfile.impersonated_user_id,
    avatarUrl: userProfile.impersonated_user_avatar_url,
    gender: userProfile.impersonated_user_gender,
    name: userProfile.impersonated_user_name,
    familyName: userProfile.impersonated_user_family_name,
    middleName: userProfile.impersonated_user_middle_name,
    givenName: userProfile.impersonated_user_given_name,
  };
  return { impersonate };
}

export default connect(mapStateToProps, null)(pure(Header));
