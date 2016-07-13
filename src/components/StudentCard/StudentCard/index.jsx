import React, { Component } from 'react';
import { Card } from 'omni-common-ui';

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getChildContext() {
    return {
      withSeparatorLine: this.props.withSeparatorLine,
    };
  }

  render() {
    return <Card showStatusAccent={!! this.props.statusAccentColor}
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
  statusAccentColor: React.PropTypes.oneOf(StudentCard.accentColors),
  withSeparatorLine: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default StudentCard;
