import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Card = (props) => <div className={classnames(styles.Card, styles.__1, {
  [styles.__borderless]: !! props.borderless,
})}>
  {props.children}
</div>;

Card.propTypes = {
  borderless: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Card;
