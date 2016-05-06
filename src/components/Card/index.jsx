import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Card = (props) => {
  return <div className={styles.Card}>
    {props.children}
  </div>;
};

Card.propTypes = {
};

export default Card;
