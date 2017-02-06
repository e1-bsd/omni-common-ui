import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

export const ButtonContainer = ({ align, className, children }) => <div className={
    classnames(styles.ButtonContainer, {
      [styles.__alignRight]: align === 'right',
      [styles.__alignCenter]: align === 'center',
    }, className)}>
  {children}
</div>;

ButtonContainer.propTypes = {
  align: React.PropTypes.oneOf(['left', 'right', 'center']),  // default: left
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default ButtonContainer;
