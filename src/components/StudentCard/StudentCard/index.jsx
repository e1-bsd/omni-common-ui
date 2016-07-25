import React, { Component } from 'react';
import { Card } from 'omni-common-ui';

class StudentCard extends Component {
  getChildContext() {
    return {
      withSeparatorLine: this.props.withSeparatorLine,
    };
  }

  render() {
    return <Card withLeftPaddedContentArea={!!this.props.withLeftPaddedContentArea}
        statusAccentColor={this.props.statusAccentColor}>
      {this.props.children}
    </Card>;
  }
}

StudentCard.accentColors = ['grey', 'green', 'amber', 'red', 'invalid'];

StudentCard.childContextTypes = {
  withSeparatorLine: React.PropTypes.bool,
};

StudentCard.propTypes = {
  withSeparatorLine: React.PropTypes.bool,
  withLeftPaddedContentArea: React.PropTypes.bool,
  statusAccentColor: React.PropTypes.oneOf(StudentCard.accentColors),
  children: React.PropTypes.node,
};

export default StudentCard;
