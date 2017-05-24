import 'react-select/dist/react-select.css';

import React from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import Field from '../Field';
import Radio from './Radio';
import PropTypes from 'prop-types';

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
  showRequired: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array.isRequired,
};

export default formsyDecorator(RadioList);
