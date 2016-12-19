import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import DropdownBoxItem from './DropdownBoxItem';
import DropdownBoxContainer from './DropdownBoxContainer';

const DropdownBox = ({ className, children }) =>
  <div className={classnames(styles.DropdownBox, className)}>
    {React.Children.toArray(children).filter((child) => child.type === DropdownBoxItem)}
  </div>;

DropdownBox.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

DropdownBox.Item = DropdownBoxItem;
DropdownBox.Container = DropdownBoxContainer;

export default DropdownBox;
