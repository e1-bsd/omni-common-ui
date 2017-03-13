import styles from './style.postcss';

import React, { Component } from 'react';
import Card from 'components/Card';
import classnames from 'classnames';

class PersonCard extends Component {
  getChildContext() {
    const { backgroundless = false, withSeparatorLine = false } = this.props;
    return {
      backgroundless,
      withSeparatorLine,
    };
  }

  render() {
    const { borderless, statusAccentColor, statusAccentPosition } = this.props;
    const classes = classnames(styles.PersonCard, this.props.className,
        { [styles[`__${statusAccentPosition}`]]: !! statusAccentPosition },
        { [styles[`__${statusAccentColor}`]]: !! statusAccentColor });

    return <div className={classes}>
      <Card borderless={!! borderless} className={styles.PersonCard_Card}>
        {this.props.children}
      </Card>
    </div>;
  }
}

PersonCard.accentPosition = ['bottom', 'left'];

PersonCard.accentColors = ['grey', 'green', 'amber', 'red', 'invalid'];

PersonCard.childContextTypes = {
  backgroundless: React.PropTypes.bool,
  withSeparatorLine: React.PropTypes.bool,
};

PersonCard.propTypes = {
  backgroundless: React.PropTypes.bool,
  borderless: React.PropTypes.bool,
  className: React.PropTypes.string,
  withSeparatorLine: React.PropTypes.bool,
  statusAccentPosition: React.PropTypes.oneOf(PersonCard.accentPosition),
  statusAccentColor: React.PropTypes.oneOf(PersonCard.accentColors),
  children: React.PropTypes.node,
};

export default PersonCard;
