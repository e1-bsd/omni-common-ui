import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';

const Card = (props) => {
  const getClassesWithStatusAccent = (showStatusAccent, statusAccentColor) => {
    const classes = [styles.Card, styles.__1];
    if (showStatusAccent) {
      if (Card.accentColors.some((c) => c === statusAccentColor)) {
        classes.push([styles.Card_status, styles[`__${statusAccentColor}`]]);
      } else {
        classes.push([styles.Card_status, styles.__grey]);
      }
    }
    return classnames(classes);
  };

  return <div className={getClassesWithStatusAccent(props.showStatusAccent,
      props.statusAccentColor)}>
    {props.children}
  </div>;
};

Card.accentColors = ['grey', 'green', 'amber', 'red', 'invalid'];

Card.propTypes = {
  showStatusAccent: React.PropTypes.bool,
  statusAccentColor: React.PropTypes.oneOf(Card.accentColors),
  children: React.PropTypes.node,
};

export default Card;
