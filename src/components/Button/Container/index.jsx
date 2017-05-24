import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const ButtonContainer = ({ align, className, children }) => <div className={
    classnames(styles.ButtonContainer, {
      [styles.__alignRight]: align === 'right',
      [styles.__alignCenter]: align === 'center',
    }, className)}>
  {children}
</div>;

ButtonContainer.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center']),  // default: left
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ButtonContainer;
