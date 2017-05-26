import styles from './style.postcss';

import React, { PureComponent } from 'react';
import Card from 'components/Card';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class StudentCard extends PureComponent {
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
  backgroundless: PropTypes.bool,
  withSeparatorLine: PropTypes.bool,
  vertical: PropTypes.bool,
};

StudentCard.propTypes = {
  backgroundless: PropTypes.bool,
  borderless: PropTypes.bool,
  className: PropTypes.string,
  withSeparatorLine: PropTypes.bool,
  statusAccentPosition: PropTypes.oneOf(StudentCard.accentPosition),
  statusAccentColor: PropTypes.oneOf(StudentCard.accentColors),
  children: PropTypes.node,
  vertical: PropTypes.bool,
};

export default StudentCard;
