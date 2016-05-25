import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from 'components/Card';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import is from 'is_js';

class ExpandedView extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
  }

  componentDidMount() {
    if (is.not.function(this.props.onHeightChanged)) {
      return;
    }

    this.domNode = ReactDOM.findDOMNode(this);
    this.resizeSensor = new ResizeSensor(this.domNode, () => this.updateHeight());
    this.updateHeight();
  }

  componentWillUnmount() {
    if (is.object(this.resizeSensor)) {
      this.resizeSensor.detach();
    }

    this.domNode = null;
  }

  updateHeight() {
    const { height } = getComputedStyle(this.domNode);
    this.setState({ height });
    this.props.onHeightChanged(height);
  }

  render() {
    return <Card>
      <div>
        {this.props.children}
      </div>
    </Card>;
  }
}

ExpandedView.propTypes = {
  onHeightChanged: React.PropTypes.func,
};

export default ExpandedView;
