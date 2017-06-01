import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

const DropdownBoxItem = ({ children, onClick, show, className }) => {
  if (show === false) {
    return null;
  }

  return <div className={classnames(styles.DropdownBoxItem, className)}
      onClick={onClick}>
    {children}
  </div>;
};

DropdownBoxItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  show: PropTypes.bool,
};

export default pure(DropdownBoxItem);
