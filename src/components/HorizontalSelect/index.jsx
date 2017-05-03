import styles from './style.postcss';

import React, { Component } from 'react';
import HorizontalScroll from '../HorizontalScroll';
import classnames from 'classnames';

class HorizontalSelect extends Component {

  constructor(props) {
    super();
    this.state = { value: props.value };
  }

  _onOptionSelect(value) {
    this.setState({ value }, () => {
      this.props.onSelect(value);
    });
  }

  render() {
    const { options } = this.props;
    return <HorizontalScroll className={styles.HorizontalSelect}>
      <div className={styles.HorizontalSelect_options_wrapper}>
        {
          options.map((option) => {
            const className = classnames(styles.HorizontalSelect_option, {
              [styles.HorizontalSelect_option_active]: option.value === this.state.value
            });
            return <div key={option.value}
                className={className}
                onClick={() => this._onOptionSelect(option.value)}>
              {option.html}
            </div>;
          })
        }
      </div>
    </HorizontalScroll>;
  }
}

HorizontalSelect.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      html: React.PropTypes.node,
      value: React.PropTypes.string,
    })),
  value: React.PropTypes.string,
  onSelect: React.PropTypes.func,
};

export default HorizontalSelect;
