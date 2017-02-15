import styles from './style.postcss';
import React, { Component } from 'react';
import classnames from 'classnames';
import is from 'is_js';

export class Sticker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stickToTop: false,
    };
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
    if ((scrollY > offsetTop) !== this.state.stickToTop) {
      this.setState({ stickToTop: scrollY > offsetTop });
    }
  }

  render() {
    const className = classnames(this.props.className, styles.Sticker,
      { [styles.Sticker_sticky]: this.state.stickToTop });
    return <div>
      <div className={className} ref={(node) => {
        if (is.falsy(node)) return;
        this.sticker = node;
      }}>
        {this.props.children}
      </div>
      <div style={{ display: this.state.stickToTop ? 'block' : 'none' }}
          ref={(node) => {
            if (is.falsy(node)) return;
            this.placeholder = node;
          }} />
    </div>;
  }

}

Sticker.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Sticker;
