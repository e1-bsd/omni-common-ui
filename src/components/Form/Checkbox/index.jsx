import 'react-select/dist/react-select.css';

import React, { Component } from 'react';
import { HOC as formsyDecorator } from 'formsy-react';
import Field from '../Field';

class Checkbox extends Component {
  componentDidMount() {
    this.props.setValue([]);
  }

  handleChange(e, item) {
    const checked = e.currentTarget.checked;

    let newValue = [];
    if (checked) {
      newValue = this.props.getValue().concat(item);
    } else {
      newValue = this.props.getValue().filter((it) => !this.cmp(it, item));
    }

    this.props.setValue(newValue);
  }

  cmp(a, b) {
    return a === b;
  }

  render() {
    const { name, label, items, validations, validationError } = this.props;

    return <Field label={label}
        getErrorMessage={() => this.props.getErrorMessage()}
        showError={() => this.props.showError()}
        showRequired={() => this.props.showRequired()}>
      {
        items.map((item, i) => <div key={i}>
          <input type="checkbox"
              name={name}
              onChange={(e) => this.handleChange(e, item)}
              validations={validations}
              validationError={validationError} />
          <span>{item}</span>
        </div>)
      }
    </Field>;
  }

}

Checkbox.propTypes = {
  setValue: React.PropTypes.func.isRequired,
  getValue: React.PropTypes.func.isRequired,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  items: React.PropTypes.array,
  getErrorMessage: React.PropTypes.func.isRequired,
  showRequired: React.PropTypes.func.isRequired,
  showError: React.PropTypes.func.isRequired,
  validations: React.PropTypes.func,
  validationError: React.PropTypes.string,
};

export default formsyDecorator(Checkbox);
