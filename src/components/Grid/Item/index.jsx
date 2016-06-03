import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Item = (props) => {
  const classes = classnames(props.className || 'col-xs-12', styles.Item);
  return <div className={classes}>
    {props.children}
  </div>;
};

Item.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Item;
