import React, { Component } from 'react';
import { Form } from 'omni-common-ui';

class RadioShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>
      <Form.Radio name="radio" label="Radio" items={['foo', 'bar']}></Form.Radio>
    </div>;
  }
}

export default RadioShowcase;
