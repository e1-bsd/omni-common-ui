import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { Button } from 'omni-common-ui';
import { Form } from 'omni-common-ui';
import SelectShowcase from './SelectShowcase';
import log from 'loglevel';

class FormShowcase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saveBtn: false,
      data: {},
    };
  }

  handleFormChange(data) {
    this.setState({ formData: data });
  }

  handleInvalid() {
    this.setState({ saveBtn: true });
  }

  handleValid() {
    this.setState({ saveBtn: false });
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
        <Button type={Button.Type.primary}
                disabled = {this.state.saveBtn}
                onClick={() => log.info(this.state.formData)}>
          Save
        </Button>
        <SelectShowcase />
      </Form>
    </Showcase>;
  }
}

export default FormShowcase;
