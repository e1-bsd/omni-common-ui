import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Card = (props, { backgroundless }) => {
  const classes = classnames(styles.Card,
    props.className,
    styles.__1,
    {
      [styles.__backgroundless]: !! backgroundless,
      [styles.__borderless]: !! props.borderless,
    });
  return <div className={classes}>
    {props.children}
  </div>;
};


Card.contextTypes = {
  backgroundless: React.PropTypes.bool,
};

Card.propTypes = {
  borderless: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Card;
