import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Card = (props) => {
  const classes = classnames(styles.Card, styles.__1);
  return <div className={classes}>
    {props.children}
  </div>;
};

Card.propTypes = {
  children: React.PropTypes.node,
};

export default Card;
