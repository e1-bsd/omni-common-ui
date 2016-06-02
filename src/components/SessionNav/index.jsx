import styles from './style.postcss';

import React from 'react';
import back from './back.png';
import forward from './forward.png';

const SessionNav = (props) =>
  <div className={styles.SessionNav}>
    <img src={back} role="presentation" onClick={() => props.onBack()} />
    <ul className={styles.SessionNav_content}>
      <li>{props.name}</li>
      <li>{props.date}</li>
    </ul>
    <img src={forward} role="presentation" onClick={() => props.onForward()} />
  </div>;

SessionNav.propTypes = {
  name: React.PropTypes.string,
  date: React.PropTypes.string,
  onBack: React.PropTypes.func,
  onForward: React.PropTypes.func,
};

export default SessionNav;
