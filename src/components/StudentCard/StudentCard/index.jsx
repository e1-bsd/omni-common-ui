import styles from './style.postcss';

import React, { Component } from 'react';
import Card from 'components/Card';
import classnames from 'classnames';

class StudentCard extends Component {
  getChildContext() {
    return {
      withSeparatorLine: this.props.withSeparatorLine,
    };
  }

  render() {
    const { borderless, statusAccentColor, statusAccentPosition } = this.props;
    const classes = classnames(styles.StudentCard,
        { [styles[`__${statusAccentPosition}`]]: !! statusAccentPosition },
        { [styles[`__${statusAccentColor}`]]: !! statusAccentColor });

    return <div className={classes}>
      <Card borderless={!! borderless}>
        {this.props.children}
      </Card>
    </div>;
  }
}

StudentCard.accentPosition = ['bottom', 'left'];

StudentCard.accentColors = ['grey', 'green', 'amber', 'red', 'invalid'];

StudentCard.childContextTypes = {
  withSeparatorLine: React.PropTypes.bool,
};

StudentCard.propTypes = {
  borderless: React.PropTypes.bool,
  withSeparatorLine: React.PropTypes.bool,
  statusAccentPosition: React.PropTypes.oneOf(StudentCard.accentPosition),
  statusAccentColor: React.PropTypes.oneOf(StudentCard.accentColors),
  children: React.PropTypes.node,
};

export default StudentCard;
