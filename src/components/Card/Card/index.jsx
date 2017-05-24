import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
  backgroundless: PropTypes.bool,
};

Card.propTypes = {
  borderless: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
