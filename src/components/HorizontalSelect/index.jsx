import styles from './style.postcss';

import React, { Component } from 'react';
import HorizontalScroll from '../HorizontalScroll';

class HorizontalSelect extends Component {
  _onOptionSelect(value) {
    this.props.onSelect(value);
  }

  render() {
    const { options } = this.props;
    return <HorizontalScroll className={styles.HorizontalSelect}>
      <div className={styles.HorizontalSelect_options_wrapper}>
        {
          options.map((option) =>
            <div key={option.value}
                className={styles.HorizontalSelect_option}
                onClick={() => this._onOptionSelect(option.value)}>
              {option.html}
            </div>
          )
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
  onSelect: React.PropTypes.func,
};

export default HorizontalSelect;
