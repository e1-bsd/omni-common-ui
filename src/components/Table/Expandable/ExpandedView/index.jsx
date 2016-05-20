import React, { Component } from 'react';
import Container from './Container';

class ExpandedView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>
      <div style={{ height: this.state.height }}/>
      <Container onHeightChanged={(height) => this.setState({ height })}/>
    </div>;
  }
}

export default ExpandedView;
