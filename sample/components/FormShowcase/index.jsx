import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { Form } from 'omni-common-ui';

class FormShowcase extends Component {
  render() {
    return <Showcase title="Form">
      <Form.TextInput name="normal" label="Normal"/>
      <Form.TextInput name="disabled" label="Disabled" disabled="true"/>
    </Showcase>;
  }
}

export default FormShowcase;
