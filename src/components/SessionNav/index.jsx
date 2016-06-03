import styles from './style.postcss';

import React from 'react';

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
    return current === 0 ?
      <span className={styles.SessionNav_emptyBtn}>&nbsp;</span> :
      <a className={styles.SessionNav_back} onClick={() => onBack()}></a>;
  }
  function renderForward() {
    return current + 1 === items.length ?
      <span>&nbsp;</span> :
      <a className={styles.SessionNav_forward} onClick={() => onForward()}></a>;
  }
};
SessionNav.propTypes = {
  items: React.PropTypes.array,
  current: React.PropTypes.number,
  onBack: React.PropTypes.func,
  onForward: React.PropTypes.func,
};

export default SessionNav;
