import styles from './style.postcss';

import React, { Component } from 'react';
import { Link } from 'react-router';
import HorizontalScroll from '../HorizontalScroll';
import classnames from 'classnames';

class HorizontalSelect extends Component {

  constructor(props) {
    super();
    this.state = { value: props.value };
    this.scrollToElement = {
      selector: `.${styles.HorizontalSelect_option_active}`,
      duration: 1000,
    };
  }

  _onOptionSelect(value) {
    this.setState({ value }, () => {
      this.props.onSelect &&
        this.props.onSelect(value);
    });
  }

  render() {
    const { options, getLinkHrefForValue } = this.props;
    return <HorizontalScroll className={styles.HorizontalSelect}
        scrollToElement={this.scrollToElement}>
      <ul className={styles.HorizontalSelect_options_wrapper}>
        {
          options.map((option) => {
            const className = classnames(styles.HorizontalSelect_option, {
              [styles.HorizontalSelect_option_active]: option.value === this.state.value,
            });
            return <li key={option.value}
                className={className}>
              <Link to={getLinkHrefForValue && getLinkHrefForValue(option.value)}
                  onClick={() => this._onOptionSelect(option.value)}
                  draggable={false}>
                {option.html}
              </Link>
            </li>;
          })
        }
      </ul>
    </HorizontalScroll>;
  }
}

HorizontalSelect.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      html: React.PropTypes.node,
      value: React.PropTypes.string,
    })).isRequired,
  value: React.PropTypes.string,
  getLinkHrefForValue: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func,
};

export default HorizontalSelect;
