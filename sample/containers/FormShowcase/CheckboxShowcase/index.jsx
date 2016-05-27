import React, { Component } from 'react';
import { Form } from 'omni-common-ui';

class CheckboxShowcase extends Component {

  render() {
    return <div>
      <Form.Checkbox name="checkBoxNormal" label="Normal Checkbox" items={['foo', 'bar']}/>
    </div>;
  }
}

export default CheckboxShowcase;
