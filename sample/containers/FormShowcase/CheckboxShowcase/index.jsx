import React, { Component } from 'react';
import { Form } from 'omni-common-ui';
import Formsy from 'formsy-react';

class CheckboxShowcase extends Component {

  constructor(props) {
    super(props);
    Formsy.addValidationRule('noMoreThanThree', (values, value) => value && value.length < 4);
  }

  render() {
    return <div>
      <Form.CheckboxList name="checkBoxNormal" label="Normal Checkbox" items={['foo', 'bar']} />
      <Form.CheckboxList name="customize"
          label="Customize Validation"
          items={['1', '2', '3', '4', '5']}
          validations="noMoreThanThree"
          validationError="noMoreThanThree" />
    </div>;
  }
}

export default CheckboxShowcase;

