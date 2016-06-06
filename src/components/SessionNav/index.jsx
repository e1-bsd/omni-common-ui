import styles from './style.postcss';

import React from 'react';

const SessionNav = (props) => {
  const { current, onBack, onForward, items } = props;
  const currentSession = items[current];

  return <div className={styles.SessionNav}>
    {renderBack()}
    <div className={styles.SessionNav_content}>
      <div>{currentSession.name}</div>
      <div>{currentSession.date}</div>
    </div>
    {renderForward()}
  </div>;

  function renderBack() {
    if (current === 0) {
      return <span className={styles.SessionNav_emptyBtn}>&nbsp;</span>;
    }

    return <a className={styles.SessionNav_back} onClick={() => onBack()} />;
  }

  function renderForward() {
    if (current + 1 === items.length) {
      return <span className={styles.SessionNav_emptyBtn}>&nbsp;</span>;
    }

    return <a className={styles.SessionNav_forward} onClick={() => onForward()} />;
  }
};

SessionNav.propTypes = {
  items: React.PropTypes.array,
  current: React.PropTypes.number,
  onBack: React.PropTypes.func,
  onForward: React.PropTypes.func,
};

export default SessionNav;
