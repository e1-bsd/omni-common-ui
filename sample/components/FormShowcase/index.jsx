import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { Form } from 'omni-common-ui';
import SelectShowcase from './SelectShowcase';

class FormShowcase extends Component {
  render() {
    return <Showcase title="Form">
      <Form.TextInput name="normal" label="Normal" />
      <Form.TextInput name="disabled" label="Disabled" disabled="true" />
      <SelectShowcase />
    </Showcase>;
  }
}

export default FormShowcase;
