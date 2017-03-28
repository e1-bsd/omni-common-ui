import styles from './style.postcss';
import React, { PureComponent } from 'react';

import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import classnames from 'classnames';
import is from 'is_js';

const baseOptions = {
  bounce: false,
  scrollX: true,
  scrollY: false,
  scrollbars: true,
  interactiveScrollbars: true,
  eventPassthrough: true,
  keyBindings: true,
  mouseWheel: true,
};

class HorizontalScroll extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isScrolling: false };
    this._onBeforeScrollStart = this._onBeforeScrollStart.bind(this);
    this._onScrollCancelOrEnd = this._onScrollCancelOrEnd.bind(this);
    this._onScrollRefresh = this._onScrollRefresh.bind(this);
  }

  componentDidMount() {
    const { onScrollReady } = this.props;
    if (is.function(onScrollReady)) {
      this.hostNode.withIScroll(true, (scroll) => {
        onScrollReady(scroll);
      });
    }
  }

  _onBeforeScrollStart() {
    this.setState({ isScrolling: true });
  }

  _onScrollCancelOrEnd() {
    this.setState({ isScrolling: false });
  }

  _onScrollRefresh(_iScroll) {
    this.setState({ hasScroll: ! (_iScroll.x === _iScroll.maxScrollX && _iScroll.x === 0) });
  }

  render() {
    const { className, innerClassName } = this.props;
    const iScrollClasses = classnames(styles.HorizontalScroll_iScroll, innerClassName, {
      [styles.__hasScroll]: !! this.state.hasScroll,
      [styles.__scrolling]: !! this.state.isScrolling,
    });

    return <div className={classnames(styles.HorizontalScroll, className)}>
      <ReactIScroll className={iScrollClasses}
          iScroll={iScroll}
          defer={false}
          options={baseOptions}
          ref={(node) => { this.hostNode = node; }}
          onBeforeScrollStart={this._onBeforeScrollStart}
          onScrollCancel={this._onScrollCancelOrEnd}
          onScrollEnd={this._onScrollCancelOrEnd}
          onRefresh={this._onScrollRefresh}>
        {this.props.children}
      </ReactIScroll>
    </div>;
  }
}

HorizontalScroll.propTypes = {
  className: React.PropTypes.string,
  innerClassName: React.PropTypes.string,
  children: React.PropTypes.node,
  onScrollReady: React.PropTypes.func,
};

export default HorizontalScroll;
