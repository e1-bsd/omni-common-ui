import React, { Component } from 'react';
import Container from './Container';

class ExpandedView extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
  }

  onHeightChanged(height) {
    this.setState({ height });
  }

  calculateCompensationHeight() {
    if (this.props.shouldForceHeight !== true) {
      return 'auto';
    }

    return Number.parseInt(this.state.height) + Number.parseInt(this.props.rowNormalHeight || 0);
  }

  render() {
    return <div>
      <div style={{ height: this.calculateCompensationHeight() }} />
      <Container onHeightChanged={(height) => this.onHeightChanged(height)} />
    </div>;
  }
}

ExpandedView.propTypes = {
  shouldForceHeight: React.PropTypes.bool,
  rowNormalHeight: React.PropTypes.number,
};

export default ExpandedView;
