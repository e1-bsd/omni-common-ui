import Form from './';
import FormComponent from './Form';
import TextInput from './TextInput';
import Select from './Select';
import Field from './Field';

describe('Form', () => {
  it('can be used directly as Form component', () => {
    expect(FormComponent).toBe(Form);
  });

  it('has a TextInput property', () => {
    expect(TextInput).toBe(Form.TextInput);
  });

  it('has a Select property', () => {
    expect(Select).toBe(Form.Select);
  });

  it('does not expose Field component', () => {
    expect(Field).not.toBe(Form.Field);
  });
});
