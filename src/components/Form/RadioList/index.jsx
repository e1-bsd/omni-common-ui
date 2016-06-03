import 'react-select/dist/react-select.css';

import React from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import Field from '../Field';
import Radio from './Radio';

const RadioList = (props) => {
  const { name, label, items } = props;
  return <Field label={label}
      getErrorMessage={() => props.getErrorMessage()}
      showError={() => props.showError()}
      showRequired={() => props.showRequired()}>
    {
      items.map((item, i) =>
        <Radio item={item}
            name={name}
            key={i}
            onChecked={(e, option) => handleChange(e, option)} />)
    }
  </Field>;

  function handleChange(e, item) {
    props.setValue(item);
  }
};

RadioList.propTypes = {
  showRequired: React.PropTypes.func.isRequired,
  setValue: React.PropTypes.func.isRequired,
};

export default formsyDecorator(RadioList);
