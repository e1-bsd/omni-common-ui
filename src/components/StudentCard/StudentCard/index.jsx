import styles from './style.postcss';

import React, { Component } from 'react';
import Card from 'components/Card';
import classnames from 'classnames';

class StudentCard extends Component {
  getChildContext() {
    const {
      backgroundless = false,
      withSeparatorLine = false,
      vertical = false,
    } = this.props;
    return {
      backgroundless,
      withSeparatorLine,
      vertical,
    };
  }

  render() {
    const { borderless, statusAccentColor, statusAccentPosition } = this.props;
    const classes = classnames(styles.StudentCard, this.props.className,
        { [styles[`__${statusAccentPosition}`]]: !! statusAccentPosition },
        { [styles[`__${statusAccentColor}`]]: !! statusAccentColor });

    return <div className={classes}>
      <Card borderless={!! borderless} className={styles.StudentCard_Card}>
        {this.props.children}
      </Card>
    </div>;
  }
}

StudentCard.accentPosition = ['bottom', 'left'];

StudentCard.accentColors = ['grey', 'green', 'amber', 'red', 'invalid'];

StudentCard.childContextTypes = {
  backgroundless: React.PropTypes.bool,
  withSeparatorLine: React.PropTypes.bool,
  vertical: React.PropTypes.bool,
};

StudentCard.propTypes = {
  backgroundless: React.PropTypes.bool,
  borderless: React.PropTypes.bool,
  className: React.PropTypes.string,
  withSeparatorLine: React.PropTypes.bool,
  statusAccentPosition: React.PropTypes.oneOf(StudentCard.accentPosition),
  statusAccentColor: React.PropTypes.oneOf(StudentCard.accentColors),
  children: React.PropTypes.node,
  vertical: React.PropTypes.bool,
};

export default StudentCard;
