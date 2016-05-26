import _Form from './Form';
import _TextInput from './TextInput';
import _Select from './Select';
import _Radio from './Radio';

export const Form = _Form;
export const TextInput = _TextInput;
export const Select = _Select;
export const Radio = _Radio;

Form.TextInput = TextInput;
Form.Select = Select;
Form.Radio = Radio;

export default Form;
