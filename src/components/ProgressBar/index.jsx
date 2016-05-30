import styles from './style.postcss';

import React from 'react';
import is from 'is_js';

const ProgressBar = (props) => {
  return <div className={styles.ProgressBar}>
    <div className={styles.ProgressBar_progress}
        style={{ width: `${calculateProgress() * 100}%` }} />
  </div>;

  function calculateProgress() {
    const { total } = props;
    let { progress } = props;
    progress = progress || 0;

    if (is.number(total)) {
      return progress / total;
    }

    return progress / 100;
  }
};

ProgressBar.propTypes = {
  progress: React.PropTypes.number,
  total: React.PropTypes.number,
};

export default ProgressBar;
