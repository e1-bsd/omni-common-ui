import { expect } from 'chai';
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
});
