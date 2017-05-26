import styles from './style.postcss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { pure } from 'recompose';

const DEFAULT_MAX_LENGTH = 500;

const TextArea = ({ value, onChange, maxLength, className }) =>
  <textarea className={classnames(styles.TextArea, className)}
      onChange={onChange}
      maxLength={maxLength || DEFAULT_MAX_LENGTH}
      value={value} />;

TextArea.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
};

export default pure(TextArea);
