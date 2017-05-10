import styles from './style.postcss';

import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import HorizontalScroll from '../HorizontalScroll';
import classnames from 'classnames';

const wasLeftMouseButtonPressed = (e = window.event) => {
  const button = e.which || e.button;
  return button === 1;
};

class HorizontalSelect extends PureComponent {
  constructor(props) {
    super();
    this.state = { value: props.value };
    this.scrollToElement = {
      selector: `.${styles.HorizontalSelect_option_active}`,
      duration: 1000,
    };

    // this collection of goodies will prevent `onclick` firing after an x-axis drag
    this._onMouseDown = (e) => {
      if (! wasLeftMouseButtonPressed(e.nativeEvent)) return;
      this._startMouseX = e.screenX;
    };
    this._onClick = (option, e) => {
      if (this._startMouseX && this._startMouseX !== e.screenX) {
        // x-axis drag happened; block click
        e.preventDefault();
        return false;
      }
      this._onOptionSelect(option.value);
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
    if (! is.existy(options) || options.length === 0) {
      return null;
    }
    return <div className={styles.HorizontalSelect_wrap}>
      <HorizontalScroll className={styles.HorizontalSelect}
          innerClassName={styles.HorizontalSelect_scroller}
          scrollToElement={this.scrollToElement}>
        <div className={styles.HorizontalSelect_options_wrap}>
          <ul className={styles.HorizontalSelect_options}>
            {
              options.map((option) => {
                const className = classnames(styles.HorizontalSelect_option, {
                  [styles.HorizontalSelect_option_active]: option.value === this.state.value,
                });
                if (! option._onClick) {
                  option._onClick = this._onClick.bind(null, option);  // eslint-disable-line
                }
                return <li key={option.value}
                    className={className}>
                  <Link to={getLinkHrefForValue && getLinkHrefForValue(option.value)}
                      draggable={false}
                      onMouseDown={this._onMouseDown}
                      onClick={option._onClick}>
                    {option.html}
                  </Link>
                </li>;
              })
            }
          </ul>
        </div>
      </HorizontalScroll>
    </div>;
  }
}

HorizontalSelect.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      html: React.PropTypes.node,
      value: React.PropTypes.string,
      className: React.PropTypes.string,
    })).isRequired,
  value: React.PropTypes.string,
  getLinkHrefForValue: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func,
};

export default HorizontalSelect;
