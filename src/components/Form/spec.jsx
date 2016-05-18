import styles from './Field/style.postcss';

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Form from './';
import FormComponent from './Form';
import TextInput from './TextInput';
import Select from './Select';
import Field from './Field';

describe('Form', () => {
  it('can be used directly as Form component', () => {
    expect(FormComponent).to.equal(Form);
  });

  it('has a TextInput property', () => {
    expect(TextInput).to.equal(Form.TextInput);
  });

  it('has a Select property', () => {
    expect(Select).to.equal(Form.Select);
  });

  it('does not expose Field component', () => {
    expect(Field).to.not.equal(Form.Field);
  });

  it('works along with Formsy', () => {
    const errorMessage = 'This is not a valid email';
    const wrapper = mount(<Form>
      <Form.TextInput name="email"
          label="Email"
          validations="isEmail"
          validationError={errorMessage}
          value="123" />
    </Form>);
    const errorClass = styles.Field_inputContainer_validationError;
    const errorText = wrapper.find(`.${errorClass}`).text();
    expect(wrapper.find(`.${styles.__error}`)).to.have.length(1);
    expect(errorText).to.equal(errorMessage);
  });
});
