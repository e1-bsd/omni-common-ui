import styles from './style.postcss';
import React, { Component } from 'react';
import classnames from 'classnames';
import is from 'is_js';
import testCssPropertyValues from 'domain/TestCSSPropertyValues';

export class Sticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickToTop: false,
    };
    this.isPositionStickySupported =
      !! testCssPropertyValues('position', ['sticky', '-webkit-sticky']);
  }

  componentDidMount() {
    this.offsetTop = this.sticker.offsetTop;
    this.scrollFn = () => {
      this._setStickToTopState();
    };
    window.addEventListener('scroll', this.scrollFn);
    this.scrollFn();
  }

  componentDidUpdate() {
    this.placeholder.style.height = `${this.sticker.offsetHeight}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFn);
  }

  _setStickToTopState() {
    const offsetTop = is.existy(this.offsetTop) ?
      this.offsetTop : 0;
    const scrollY = window.pageYOffset; // INTERNET EXPLORER
    if ((scrollY > offsetTop) !== this.state.stickToTop) {
      this.setState({ stickToTop: scrollY > offsetTop });
    }
  }

  render() {
    const isPlaceholderShown =
        this.state.stickToTop && ! this.isPositionStickySupported;
    const className = classnames(this.props.className, styles.Sticker, {
      [styles.Sticker_sticky]: this.state.stickToTop,
      [this.props.polyfilledClassName]:
        is.string(this.props.polyfilledClassName) && ! this.isPositionStickySupported,
      [styles.__native]: this.isPositionStickySupported,
      [styles.__guessWidth]: this.props.shouldGuessWidthWhenPolyfilled,
    });
    return <span> {/* inline wrapper required for position: sticky */}
      <div className={className} ref={(node) => {
        if (is.falsy(node)) return;
        this.sticker = node;
      }}>
        {this.props.children}
      </div>
      <div style={{ display: isPlaceholderShown ? 'block' : 'none' }}
          ref={(node) => {
            if (is.falsy(node)) return;
            this.placeholder = node;
          }} />
    </span>;
  }

}

Sticker.propTypes = {
  className: React.PropTypes.string,
  polyfilledClassName: React.PropTypes.string,
  shouldGuessWidthWhenPolyfilled: React.PropTypes.bool,
  children: React.PropTypes.node,
};

Sticker.defaultProps = {
  shouldGuessWidthWhenPolyfilled: true,
};

export default Sticker;
