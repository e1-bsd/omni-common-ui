import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';

class Card extends Component {
  getChildContext() {
    return {
      isLeftPaddingRequiredInContentArea: this.props.withLeftPaddedContentArea
        && this.isShowingStatusAccent(this.props.statusAccentColor),
    };
  }

  isShowingStatusAccent(statusAccentColor) {
    return Card.accentColors.some(
      (c) => c === statusAccentColor
    );
  }

  render() {
    const getClassesWithStatusAccent = (statusAccentColor) => {
      const classes = [styles.Card, styles.__1];
      if (this.isShowingStatusAccent(statusAccentColor)) {
        classes.push([styles.Card_status, styles[`__${statusAccentColor}`]]);
      } else {
        classes.push([styles.Card_status]);
      }
      if (this.props.withThickerBorder) {
        classes.push([styles.__thickerBorder]);
      }
      return classnames(classes);
    };

    return <div className={getClassesWithStatusAccent(this.props.statusAccentColor)}>
      {this.props.children}
    </div>;
  }
}

Card.accentColors = ['grey', 'green', 'amber', 'red', 'invalid'];

Card.childContextTypes = {
  isLeftPaddingRequiredInContentArea: React.PropTypes.bool,
};

Card.propTypes = {
  withThickerBorder: React.PropTypes.bool,
  withLeftPaddedContentArea: React.PropTypes.bool,
  statusAccentColor: React.PropTypes.oneOf(Card.accentColors),
  children: React.PropTypes.node,
};

export default Card;
