import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Card = (props) => <div className={classnames(styles.Card, styles.__1)}>
  {props.children}
</div>;

Card.propTypes = {
  children: React.PropTypes.node,
};

export default Card;
