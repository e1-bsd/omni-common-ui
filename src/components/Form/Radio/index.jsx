import 'react-select/dist/react-select.css';

import React from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import Field from '../Field';

const Radio = (props) => {
  const { name, label, items } = props;
  return <Field label={label}
      getErrorMessage={() => props.getErrorMessage()}
      showError={() => props.showError()}
      showRequired={() => props.showRequired()}>
    {
      items.map((item, i) => <div key={i}>
        <input type="radio"
            name={name}
            onChange={(e) => handleChange(e, item)} />
        <span>{item}</span>
      </div>)
    }
  </Field>;

  function handleChange(e, item) {
    props.setValue(item);
  }
};

Radio.propTypes = {
  showRequired: React.PropTypes.func.isRequired,
  setValue: React.PropTypes.func.isRequired,
};

export default formsyDecorator(Radio);
