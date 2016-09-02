import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Card = (props, { backgroundless }) => <div className={classnames(styles.Card, styles.__1, {
  [styles.__backgroundless]: !! backgroundless,
  [styles.__borderless]: !! props.borderless,
})}>
  {props.children}
</div>;

Card.contextTypes = {
  backgroundless: React.PropTypes.bool,
};

Card.propTypes = {
  borderless: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Card;
