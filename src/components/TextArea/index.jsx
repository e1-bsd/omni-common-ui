import styles from './style.postcss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pure from 'recompose/pure';

const DEFAULT_MAX_LENGTH = 500;

const TextArea = (props) => {
  const { value, onChange, maxLength, className } = props;
  return <textarea onChange={onChange}
      maxLength={maxLength || DEFAULT_MAX_LENGTH}
      value={value}
      {...props}
      className={classnames(styles.TextArea, className)} />;
};

TextArea.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
};

export default pure(TextArea);
