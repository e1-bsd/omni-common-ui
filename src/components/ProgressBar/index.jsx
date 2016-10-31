import styles from './style.postcss';

import React from 'react';
import is from 'is_js';
import classnames from 'classnames';

const ProgressBar = (props) => {
  return <div className={classnames(styles.ProgressBar, {
    [styles.__rounded]: !! props.rounded,
    [styles.__larger]: !! props.larger,
  }, props.className)}>
    <div className={styles.ProgressBar_progress}
        style={{ width: `${calculateProgress() * 100}%` }} />
  </div>;

  function calculateProgress() {
    const { max } = props;
    let { value } = props;
    value = value || 0;

    if (value < 0) {
      value = 0;
    }

    if (is.number(max)) {
      return value / max;
    }

    if (value > 100) {
      value = 100;
    }

    return value / 100;
  }
};

ProgressBar.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.number,
  max: React.PropTypes.number,
  rounded: React.PropTypes.bool,
  larger: React.PropTypes.bool,
};

export default ProgressBar;
