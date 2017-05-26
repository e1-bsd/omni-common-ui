import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import is from 'is_js';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const ProgressBar = (props) => {
  const { value, max } = props;

  return <div className={classnames(styles.ProgressBar, {
    [styles.__rounded]: !! props.rounded,
    [styles.__larger]: !! props.larger,
  }, props.className)}>
    <div className={styles.ProgressBar_progress}
        style={{ width: percentage(value, max) }} />
  </div>;
};

function fraction(value = 0, max) {
  if (is.number(max)) {
    return value / max;
  }

  if (value > 100) {
    value = 100;  // eslint-disable-line
  }

  return value / 100;
}

function clamp(fract) {
  return Math.min(1,
    Math.max(0, fract)
  );
}

function percentage(value, max) {
  return Math.round(  // eslint-disable-line
    clamp(
      fraction(value, max)
    ) * 100
  ) + '%';
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  max: PropTypes.number,
  rounded: PropTypes.bool,
  larger: PropTypes.bool,
};

export default pure(ProgressBar);
