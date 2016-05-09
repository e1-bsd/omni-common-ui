import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { Form } from 'omni-common-ui';

class FormShowcase extends Component {
  render() {
    return <Showcase title="Form">
      <div>Hello, This is form show case</div>
      <Form.TextInput name="username" label="Username"/>
    </Showcase>;
  }
}

export default FormShowcase;
