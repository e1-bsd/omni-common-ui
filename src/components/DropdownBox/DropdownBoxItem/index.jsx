import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import { pure } from 'recompose';

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
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  show: React.PropTypes.bool,
};

export default pure(DropdownBoxItem);
