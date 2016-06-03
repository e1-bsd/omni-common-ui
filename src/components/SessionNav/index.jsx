import styles from './style.postcss';

import React from 'react';
import back from './back.png';
import forward from './forward.png';

const SessionNav = (props) => {
  const { current, onBack, onForward, items } = props;
  const currentSession = items[current];
  return <div className={styles.SessionNav}>
    {renderBack(current, onBack)}
    <ul className={styles.SessionNav_content}>
      <li>{currentSession.name}</li>
      <li>{currentSession.date}</li>
    </ul>
    {renderForward(current, onForward)}
  </div>;

  function renderBack() {
    return current === 0 ? '' : <img src={back} role="presentation" onClick={() => onBack()} />;
  }
  function renderForward() {
    return current + 1 === items.length ?
      '' : <img src={forward} role="presentation" onClick={() => onForward()} />;
  }
};
SessionNav.propTypes = {
  items: React.PropTypes.array,
  current: React.PropTypes.number,
  onBack: React.PropTypes.func,
  onForward: React.PropTypes.func,
};

export default SessionNav;
