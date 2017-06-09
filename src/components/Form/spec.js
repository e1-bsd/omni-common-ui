import Form from './';
import FormComponent from './Form';
import TextInput from './TextInput';
import Select from './Select';
import Field from './Field';

test('can be used directly as Form component', () => {
  expect(FormComponent).toBe(Form);
});

test('has a TextInput property', () => {
  expect(TextInput).toBe(Form.TextInput);
});

test('has a Select property', () => {
  expect(Select).toBe(Form.Select);
});

test('does not expose Field component', () => {
  expect(Field).not.toBe(Form.Field);
});
