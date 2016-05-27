import React, { Component } from 'react';
import { Form } from 'omni-common-ui';

class RadioShowcase extends Component {

  render() {
    return <div>
      <Form.Radio name="radio" label="Radio" items={['foo', 'bar']}></Form.Radio>
    </div>;
  }
}

export default RadioShowcase;
