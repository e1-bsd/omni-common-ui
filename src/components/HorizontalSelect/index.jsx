import styles from './style.postcss';

import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import is from 'is_js';
import HorizontalScroll from '../HorizontalScroll';
import ExpandableAnimationItem from '../ExpandableAnimationItem';

const wasLeftMouseButtonPressed = (e = window.event) => {
  const button = e.which || e.button;
  return button === 1;
};

const movementLimit = 20;

class HorizontalSelect extends PureComponent {
  constructor(props) {
    super();
    this.state = { value: props.value };
    this.scrollToElement = {
      selector: `.${styles.HorizontalSelect_option_active}`,
      duration: 300,
      easing: { style: 'ease-in-out' },
    };

    // this collection of goodies will prevent `onclick` firing after an x-axis drag
    this._onMouseDown = (e) => {
      if (! wasLeftMouseButtonPressed(e.nativeEvent)) return;
      this._startMouseX = e.screenX;
    };
    this._onClick = (option, e) => {
      const movement = Math.abs(this._startMouseX - e.screenX);
      if (this._startMouseX && movement > movementLimit) {
        // x-axis drag happened; block click
        e.preventDefault();
        return false;
      }
      this._onOptionSelect(option.value);
    };
    this._onOptionSelect = (value) => {
      this.props.onSelect && this.props.onSelect(value);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  _renderOptions() {
    const { getLinkHrefForValue } = this.props;
    return <ul className={styles.HorizontalSelect_options}>
      {
        this.props.options.map((option) => {
          const optionClassName = classnames(styles.HorizontalSelect_option, {
            [styles.HorizontalSelect_option_active]: option.value === this.state.value,
          }, option.className);
          if (! option._onClick) {
            option._onClick = this._onClick.bind(null, option);  // eslint-disable-line
          }
          return <li key={option.value} className={optionClassName}>
            <Link to={getLinkHrefForValue && getLinkHrefForValue(option.value)}
                draggable={false}
                onMouseDown={this._onMouseDown}
                onClick={option._onClick}>
              {option.html}
            </Link>
          </li>;
        })
      }
    </ul>;
  }

  _renderHorizontalSelect() {
    return <ExpandableAnimationItem isExpand={! this.props.isHide} height={150}>
      <HorizontalScroll className={styles.HorizontalSelect}
          innerClassName={styles.HorizontalSelect_scroller}
          scrollToElement={this.scrollToElement}>
        <div className={styles.HorizontalSelect_options_wrap}>
          {this._renderOptions()}
        </div>
      </HorizontalScroll>
    </ExpandableAnimationItem>;
  }

  render() {
    const { options } = this.props;
    if (! is.existy(options) || options.length === 0) {
      return null;
    }
    return <div className={styles.HorizontalSelect_wrap}>
      {this._renderHorizontalSelect()}
    </div>;
  }
}

HorizontalSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      html: PropTypes.node,
      value: PropTypes.string,
      className: PropTypes.string,
    })).isRequired,
  value: PropTypes.string,
  getLinkHrefForValue: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  optionClassName: PropTypes.string,
  isHide: PropTypes.bool,
};

export default HorizontalSelect;
