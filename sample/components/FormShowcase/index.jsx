import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { Form } from 'omni-common-ui';
import SelectShowcase from './SelectShowcase';

class FormShowcase extends Component {

  handleFormChange(data) {
    console.log('form change', data);
  }

  render() {
    return <Showcase title="Form">
      <Form onChange={(data) => this.handleFormChange(data)}>
        <Form.TextInput name="normal" label="Normal" />
        <Form.TextInput name="disabled" label="Disabled" disabled={true} />
        <Form.TextInput name="required" label="Required Field" required />
        <SelectShowcase />
      </Form>
    </Showcase>;
  }
}

export default FormShowcase;
