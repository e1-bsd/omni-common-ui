import _Form from './Form';
import _Checkbox from './Checkbox';
import _Radio from './Radio';
import _Select from './Select';
import _TextInput from './TextInput';

export const Form = _Form;
export const Checkbox = _Checkbox;
export const Radio = _Radio;
export const Select = _Select;
export const TextInput = _TextInput;

Form.Checkbox = Checkbox;
Form.Radio = Radio;
Form.Select = Select;
Form.TextInput = TextInput;

export default Form;
