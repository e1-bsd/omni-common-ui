import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { Form } from 'omni-common-ui';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', clearableValue: false },
];

class SelectShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(value) {
    this.setState({ value: value });
  }

  render() {
    return <Showcase title="Select boxes">
      <Form.Select options={options}
          value={this.state.value}
          onChange={(value) => this.onChange(value)} />
    </Showcase>;
  }
}

export default SelectShowcase;
