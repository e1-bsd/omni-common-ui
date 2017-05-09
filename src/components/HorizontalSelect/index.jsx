import styles from './style.postcss';

import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import HorizontalScroll from '../HorizontalScroll';
import classnames from 'classnames';

class HorizontalSelect extends PureComponent {
  constructor(props) {
    super();
    this.state = { value: props.value };
    this.scrollToElement = {
      selector: `.${styles.HorizontalSelect_option_active}`,
      duration: 1000,
    };

    // this collection of goodies will prevent `onclick` firing after a drag
    this._onMouseDown = (e) => {
      this._startMouseX = e.screenX;
    };
    this._onMouseUp = (option, e) => {
      if (this._startMouseX !== e.screenX) return;
      this._onOptionSelect(option.value);
      e.target.click();
    };
    this._onClick = (e) => {
      if (e.screenX === 0) return true;  // manually fired above
      e.preventDefault();
    };
    this._onOptionSelect = (value) => {
      this.setState({ value }, () => {
        this.props.onSelect &&
          this.props.onSelect(value);
      });
    };
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
            option._onMouseUp = this._onMouseUp.bind(null, option);  // eslint-disable-line
            return <li key={option.value}
                className={className}>
              <Link to={getLinkHrefForValue && getLinkHrefForValue(option.value)}
                  draggable={false}
                  onMouseDown={this._onMouseDown}
                  onMouseUp={option._onMouseUp}
                  onClick={this._onClick}>
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
