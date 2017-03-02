import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { Button, Form } from 'omni-common-ui';
import SelectShowcase from './SelectShowcase';
import RadioShowcase from './RadioShowcase';
import CheckboxShowcase from './CheckboxShowcase';
import log from 'domain/log';

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
    log.info(data);
  }

  handleInvalid() {
    this.setState({ saveBtn: true });
  }

  handleValid() {
    this.setState({ saveBtn: false });
  }

  render() {
    return <Showcase title="Form" titleLink="forms">
      <Form onChange={(data) => this.handleFormChange(data)}
          onInvalid={() => this.handleInvalid()}
          onValid={() => this.handleValid()}>
        <Form.TextInput name="normalText" label="Normal Text" value="" />
        <Form.TextInput name="disabled" label="Disabled" disabled value="disabled" />
        <Form.TextInput name="number"
            label="Number"
            validations="isNumeric"
            validationError="This is not a valid number"
            value="" />
        <Form.TextInput name="email"
            label="Email"
            validations="isEmail"
            validationError="This is not a valid email"
            value="" />
        <Form.TextInput name="requiredText"
            label="Required Text"
            required
            value="" />
        <SelectShowcase />
        <RadioShowcase />
        <CheckboxShowcase />
        <Button type={Button.Type.primary}
            disabled={this.state.saveBtn}
            onClick={() => log.info(this.state.formData)}>
          Save
        </Button>
      </Form>
    </Showcase>;
  }
}

export default FormShowcase;
