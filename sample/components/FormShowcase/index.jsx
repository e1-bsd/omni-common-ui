import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { Form } from 'omni-common-ui';
import SelectShowcase from './SelectShowcase';

class FormShowcase extends Component {

  handleFormChange(data) {
  }

  handleInvalid() {
  }

  handleValid() {
  }

  render() {
    return <Showcase title="Form">
      <Form onChange={(data) => this.handleFormChange(data)}
            onInvalid={() => this.handleInvalid()}
            onValid={() => this.handleValid()}>
        <Form.TextInput name="normal" label="Normal" value='' />
        <Form.TextInput name="disabled" label="Disabled" disabled={true} value=''/>
        <Form.TextInput
            name="number"
            label="Number"
            validations="isNumeric"
            validationError="This is not a valid number"
            value='' />
        <Form.TextInput
            name="email"
            label="Email"
            validations="isEmail"
            validationError="This is not a valid email"
            value='' />
        <Form.TextInput
            name="required"
            label="Required"
            required
            value='' />
        <SelectShowcase />
      </Form>
    </Showcase>;
  }
}

export default FormShowcase;
