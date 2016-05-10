import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import { Type, validateType } from './type';
import is from 'is_js';

const Button = (props) => {
  const type = props.type || Type.default;
  validateType(type);

  const classes = classnames(styles.Button, type);

  return <button className={classes}
      disabled={props.disabled}
      onClick={handleClick}>
    {props.children}
  </button>;

  function handleClick(e) {
    e.preventDefault();

    if (props.disabled) {
      return;
    }

    if (is.function(props.onClick)) {
      props.onClick(e);
    }
  }
};

Button.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  type: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

export default Button;
