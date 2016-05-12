import React, { Component } from 'react';
import { Form } from 'omni-common-ui';

const optionNormal = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', clearableValue: false },
];

const optionRequired = [
  { value: 'three', label: 'three' },
  { value: 'four', label: 'four' },
];

class SelectShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onNormalChange(normal) {
    this.setState({ normal: normal.value });
  }

  onRequiredChange(required) {
    this.setState({ required: required.value });
  }

  render() {
    return <div>
      <Form.Select
        options={optionNormal}
        name="normal"
        label="normal"
        value={this.state.normal}
        onChange={(value) => this.onNormalChange(value)} />
      <Form.Select
        options={optionRequired}
        name="required"
        label="required"
        value={this.state.required}
        required
        onChange={(value) => this.onRequiredChange(value)} />
    </div>;
  }
}

export default SelectShowcase;
