import styles from './TextInput/style.postcss';

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Form from './';
import FormComponent from './Form';
import TextInput from './TextInput';
import Select from './Select';

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

  it('show error when a input do not meet its email validation', ()=> {
    const wrapper = mount(<Form>
      <Form.TextInput name="email"
         label="Email"
         validations="isEmail"
         validationError="This is not a valid email"
         value='123'/></Form>);
      expect(wrapper.find(`.${styles.__error}`)).to.have.length(1);
  });
});
