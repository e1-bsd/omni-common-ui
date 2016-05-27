import 'react-select/dist/react-select.css';

import React, { Component }  from 'react';
import { HOC as FormsyDecorator } from 'formsy-react';
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
    const { name, label, items } = this.props;
    return <Field label={label}
                  getErrorMessage={() => this.props.getErrorMessage()}
                  showError={() => this.props.showError()}
                  showRequired={() => this.props.showRequired()}>
      {items.map((item, i) =>
          <div key={i}>
            <input
              type="checkbox"
              name={name} onChange={(e)=> this.handleChange(e, item)}
              />
            <span>{item}</span>
          </div>
      )}
    </Field>;
  }

}

export default FormsyDecorator(Checkbox);
