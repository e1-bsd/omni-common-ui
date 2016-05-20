import styles from './style.postcss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import is from 'is_js';

class ExpandedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (is.not.function(this.props.onHeightChanged)) {
      return;
    }

    this.domNode = ReactDOM.findDOMNode(this);
    this.resizeSensor = new ResizeSensor(this.domNode, () => {
      const { height } = getComputedStyle(this.domNode);
      this.setState({ height });
      this.props.onHeightChanged(height);
    });
  }

  componentWillUnmount() {
    if (is.function(this.resizeSensor)) {
      this.resizeSensor(this.domNode);
    }

    this.domNode = null;
  }

  render() {
    return <div className={styles.ExpandedContainer}
        style={{ transform: `translateY(-${this.state.height})` }}>
      hey
    </div>;
  }
}

ExpandedContainer.propTypes = {
  onHeightChanged: React.PropTypes.func,
};

export default ExpandedContainer;
