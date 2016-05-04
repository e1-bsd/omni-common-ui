import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import { Type, validateType } from './type';

const Button = (props) => {
  validateType(props.type);
  const type = props.type || Type.default;
  const classes = classnames(styles.Button,
    { [styles.__inverse]: props.inverse },
    type);

  return <button className={classes}
      disabled={props.disabled}
      onClick={handleClick}>
    {props.children}
  </button>;

  function handleClick(e) {
    e.preventDefault();
    props.onClick(e);
  }
};

Button.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  type: React.PropTypes.string,
  inverse: React.PropTypes.bool,
};

export default Button;
