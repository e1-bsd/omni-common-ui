/* jshint -W079 */

import _Form from './Form';
import _TextInput from './TextInput';
import _Select from './Select';

export const Form = _Form;
export const TextInput = _TextInput;
export const Select = _Select;

Form.TextInput = TextInput;
Form.Select = Select;

export default Form;
